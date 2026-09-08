import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { titleFromText, uid } from "@/lib/utils";
import { extractArtifacts, mergeArtifacts } from "@/lib/work/files";
import { DEFAULT_MODEL_ID } from "@/lib/work/models";
import { newProject } from "@/lib/work/seed";
import { streamChat } from "@/lib/work/stream";
import type {
  Artifact,
  ChatMessage,
  NavView,
  Project,
  SideKind,
  SideTab,
  Trail,
} from "@/lib/work/types";

const WELCOME_ID = "trail-studio";
const PROJECT_ID = "project-studio";

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome-msg",
  role: "assistant",
  content:
    "You are in AgentSam Work.\n\nThis pane is a **stored trail**. Projects hold the workspace. Artifacts catch files, previews, and deploys. The CLI is a real xterm over a virtual git + wrangler bench — side chats stay ephemeral unless you keep them.\n\nWhat are you working on?",
  createdAt: 1_746_000_000_000,
};

function starterProject(): Project {
  const project = newProject("Studio", "InnerAnimalMedia workspace");
  return { ...project, id: PROJECT_ID };
}

const STARTER_TRAIL: Trail = {
  id: WELCOME_ID,
  title: "Studio",
  createdAt: 1_746_000_000_000,
  updatedAt: 1_746_000_000_000,
  pinned: true,
  messages: [WELCOME_MESSAGE],
  files: [],
  projectId: PROJECT_ID,
};

const aborts = new Map<string, AbortController>();

function newTrail(partial?: Partial<Trail>): Trail {
  const now = Date.now();
  return {
    id: uid(),
    title: "New trail",
    createdAt: now,
    updatedAt: now,
    pinned: false,
    messages: [],
    files: [],
    projectId: PROJECT_ID,
    ...partial,
  };
}

const SIDE_TITLES: Record<SideKind, string> = {
  chat: "Side chat",
  browser: "Browser",
  files: "Files",
  terminal: "CLI",
  artifacts: "Artifacts",
  deploy: "Ship",
};

function newSideTab(kind: SideKind, extra?: Partial<SideTab>): SideTab {
  return {
    id: uid(),
    kind,
    title: SIDE_TITLES[kind],
    ephemeral: kind === "chat",
    messages: [],
    parentTrailId: null,
    keptTrailId: null,
    url: "",
    srcdoc: null,
    fileId: null,
    ...extra,
  };
}

function excerptOf(trail: Trail | undefined) {
  if (!trail) return null;
  const slice = trail.messages.filter((m) => m.role !== "system").slice(-6);
  if (!slice.length) return null;
  return slice
    .map((m) => `${m.role === "user" ? "User" : "AgentSam"}: ${m.content.slice(0, 600)}`)
    .join("\n\n");
}

function workspacePayload(project: Project) {
  return project.files
    .filter((f) => f.origin !== "deploy")
    .slice(0, 24)
    .map((f) => ({
      path: f.path,
      content: f.content.slice(0, 2500),
    }));
}

type WorkState = {
  hydrated: boolean;
  projects: Project[];
  activeProjectId: string;
  trails: Trail[];
  activeTrailId: string;
  drafts: Record<string, string>;
  sidebarOpen: boolean;
  mobileNavOpen: boolean;
  sideOpen: boolean;
  terminalOpen: boolean;
  settingsOpen: boolean;
  navView: NavView;
  modelId: string;
  sideTabs: SideTab[];
  activeSideTabId: string | null;
  streamingIds: string[];
  search: string;
  confirmDiscardId: string | null;
  pendingCommands: string[];
  setHydrated: (value: boolean) => void;
  setSearch: (value: string) => void;
  setDraft: (id: string, value: string) => void;
  setNavView: (view: NavView) => void;
  setModelId: (id: string) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setMobileNavOpen: (open: boolean) => void;
  setSideOpen: (open: boolean) => void;
  setTerminalOpen: (open: boolean) => void;
  setSettingsOpen: (open: boolean) => void;
  toggleTerminal: () => void;
  setActiveTrail: (id: string) => void;
  startTrail: () => void;
  renameTrail: (id: string, title: string) => void;
  pinTrail: (id: string) => void;
  deleteTrail: (id: string) => void;
  setActiveProject: (id: string) => void;
  createProject: (name?: string) => string;
  renameProject: (id: string, name: string) => void;
  deleteProject: (id: string) => void;
  patchProject: (id: string, patch: Partial<Project> | ((p: Project) => Project)) => void;
  upsertFile: (projectId: string, file: Artifact) => void;
  deleteFile: (projectId: string, fileId: string) => void;
  selectFile: (fileId: string) => void;
  addReceipt: (file: Artifact) => void;
  openSideTab: (kind: SideKind, extra?: Partial<SideTab>) => string;
  closeSideTab: (id: string, force?: boolean) => void;
  setActiveSideTab: (id: string) => void;
  setTabUrl: (id: string, url: string) => void;
  setConfirmDiscard: (id: string | null) => void;
  keepSideChat: (id: string) => string | null;
  enqueueCommand: (cmd: string) => void;
  consumeCommands: () => string[];
  send: (targetId: string, targetKind: "trail" | "side", text?: string) => Promise<void>;
  stop: (id: string) => void;
};

function ensureShape(raw: Partial<WorkState> | undefined): Pick<
  WorkState,
  | "projects"
  | "activeProjectId"
  | "trails"
  | "activeTrailId"
  | "drafts"
  | "sidebarOpen"
  | "sideOpen"
  | "terminalOpen"
  | "navView"
  | "modelId"
  | "sideTabs"
  | "activeSideTabId"
> {
  const seed = starterProject();
  let projects = Array.isArray(raw?.projects) && raw!.projects!.length ? raw!.projects! : [seed];
  if (!projects.some((p) => p.id === PROJECT_ID) && (!raw?.projects || raw.projects.length === 0)) {
    projects = [seed];
  }
  projects = projects.map((p) => ({
    ...seed,
    ...p,
    files: (p.files ?? []).map((f) => ({ kind: "code" as const, origin: "seed" as const, ...f })),
    dirs: p.dirs ?? [],
    git: p.git ?? seed.git,
    deploy: { ...seed.deploy, ...p.deploy },
    cwd: p.cwd || "/",
  }));
  const activeProjectId =
    projects.some((p) => p.id === raw?.activeProjectId) ? raw!.activeProjectId! : projects[0]!.id;

  const trails = (raw?.trails?.length ? raw.trails : [STARTER_TRAIL]).map((t) => ({
    ...STARTER_TRAIL,
    ...t,
    files: t.files ?? [],
    projectId: t.projectId || activeProjectId,
  }));

  const project = projects.find((p) => p.id === activeProjectId) ?? projects[0]!;
  const captured = trails.flatMap((t) => t.files);
  if (captured.length) {
    project.files = mergeArtifacts(project.files, captured);
  }

  return {
    projects,
    activeProjectId,
    trails,
    activeTrailId: trails.some((t) => t.id === raw?.activeTrailId) ? raw!.activeTrailId! : trails[0]!.id,
    drafts: raw?.drafts ?? {},
    sidebarOpen: raw?.sidebarOpen ?? true,
    sideOpen: raw?.sideOpen ?? false,
    terminalOpen: raw?.terminalOpen ?? false,
    navView: raw?.navView ?? "trails",
    modelId: raw?.modelId || DEFAULT_MODEL_ID,
    sideTabs: raw?.sideTabs ?? [],
    activeSideTabId: raw?.activeSideTabId ?? null,
  };
}

export const useWorkStore = create<WorkState>()(
  persist(
    (set, get) => ({
      hydrated: false,
      ...ensureShape(undefined),
      mobileNavOpen: false,
      settingsOpen: false,
      streamingIds: [],
      search: "",
      confirmDiscardId: null,
      pendingCommands: [],
      setHydrated: (value) => set({ hydrated: value }),
      setSearch: (search) => set({ search }),
      setDraft: (id, value) => set((s) => ({ drafts: { ...s.drafts, [id]: value } })),
      setNavView: (navView) => set({ navView, sidebarOpen: true }),
      setModelId: (modelId) => set({ modelId }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen }),
      setSideOpen: (sideOpen) => set({ sideOpen }),
      setTerminalOpen: (terminalOpen) => set({ terminalOpen }),
      setSettingsOpen: (settingsOpen) => set({ settingsOpen }),
      toggleTerminal: () => set((s) => ({ terminalOpen: !s.terminalOpen })),
      setActiveTrail: (id) => set({ activeTrailId: id, navView: "trails" }),
      startTrail: () => {
        const current = get().trails.find((t) => t.id === get().activeTrailId);
        if (current && current.messages.length === 0 && current.title === "New trail") return;
        const trail = newTrail({ projectId: get().activeProjectId });
        set((s) => ({
          trails: [trail, ...s.trails],
          activeTrailId: trail.id,
          navView: "trails",
        }));
      },
      renameTrail: (id, title) =>
        set((s) => ({
          trails: s.trails.map((t) =>
            t.id === id ? { ...t, title: title.trim() || t.title, updatedAt: Date.now() } : t,
          ),
        })),
      pinTrail: (id) =>
        set((s) => ({
          trails: s.trails.map((t) => (t.id === id ? { ...t, pinned: !t.pinned } : t)),
        })),
      deleteTrail: (id) =>
        set((s) => {
          const trails = s.trails.filter((t) => t.id !== id);
          const fallback = trails[0] ?? newTrail({ projectId: s.activeProjectId });
          const nextTrails = trails.length ? trails : [fallback];
          return {
            trails: nextTrails,
            activeTrailId: s.activeTrailId === id ? nextTrails[0]!.id : s.activeTrailId,
          };
        }),
      setActiveProject: (id) => {
        const project = get().projects.find((p) => p.id === id);
        if (!project) return;
        const trail = get().trails.find((t) => t.projectId === id) ?? get().trails[0];
        set({
          activeProjectId: id,
          activeTrailId: trail?.id ?? get().activeTrailId,
          navView: "trails",
        });
      },
      createProject: (name) => {
        const project = newProject(name?.trim() || "Untitled");
        const trail = newTrail({ projectId: project.id, title: project.name, pinned: true });
        set((s) => ({
          projects: [project, ...s.projects],
          trails: [trail, ...s.trails],
          activeProjectId: project.id,
          activeTrailId: trail.id,
          navView: "trails",
        }));
        return project.id;
      },
      renameProject: (id, name) =>
        set((s) => ({
          projects: s.projects.map((p) =>
            p.id === id ? { ...p, name: name.trim() || p.name, updatedAt: Date.now() } : p,
          ),
        })),
      deleteProject: (id) =>
        set((s) => {
          if (s.projects.length <= 1) return s;
          const projects = s.projects.filter((p) => p.id !== id);
          const trails = s.trails.filter((t) => t.projectId !== id);
          const next = projects[0]!;
          const fallbackTrail = trails.find((t) => t.projectId === next.id) ?? trails[0];
          return {
            projects,
            trails: trails.length ? trails : [newTrail({ projectId: next.id })],
            activeProjectId: s.activeProjectId === id ? next.id : s.activeProjectId,
            activeTrailId:
              s.activeTrailId && trails.some((t) => t.id === s.activeTrailId)
                ? s.activeTrailId
                : fallbackTrail?.id ?? s.activeTrailId,
          };
        }),
      patchProject: (id, patch) =>
        set((s) => ({
          projects: s.projects.map((p) => {
            if (p.id !== id) return p;
            const next = typeof patch === "function" ? patch(p) : { ...p, ...patch };
            return { ...next, updatedAt: Date.now() };
          }),
        })),
      upsertFile: (projectId, file) =>
        set((s) => ({
          projects: s.projects.map((p) =>
            p.id === projectId ? { ...p, files: mergeArtifacts(p.files, [file]), updatedAt: Date.now() } : p,
          ),
        })),
      deleteFile: (projectId, fileId) =>
        set((s) => ({
          projects: s.projects.map((p) =>
            p.id === projectId ? { ...p, files: p.files.filter((f) => f.id !== fileId) } : p,
          ),
          sideTabs: s.sideTabs.map((tab) => (tab.fileId === fileId ? { ...tab, fileId: null } : tab)),
        })),
      selectFile: (fileId) => {
        const { openSideTab, sideTabs, projects, activeProjectId } = get();
        const project = projects.find((p) => p.id === activeProjectId);
        const file = project?.files.find((f) => f.id === fileId);
        const existing = sideTabs.find((t) => t.kind === "files");
        if (existing) {
          set({
            sideOpen: true,
            activeSideTabId: existing.id,
            sideTabs: sideTabs.map((t) =>
              t.id === existing.id ? { ...t, fileId, title: file?.path ?? "Files" } : t,
            ),
          });
          return;
        }
        openSideTab("files", { fileId, ephemeral: false, title: file?.path ?? "Files" });
      },
      addReceipt: (file) => {
        const id = get().activeProjectId;
        get().upsertFile(id, file);
      },
      openSideTab: (kind, extra) => {
        if (kind === "terminal") {
          set({ terminalOpen: true });
          return "terminal";
        }
        const existing =
          kind === "files" || kind === "artifacts" || kind === "deploy"
            ? get().sideTabs.find((t) => t.kind === kind)
            : undefined;
        if (existing) {
          set({
            sideOpen: true,
            activeSideTabId: existing.id,
            sideTabs: get().sideTabs.map((t) => (t.id === existing.id ? { ...t, ...extra } : t)),
          });
          return existing.id;
        }
        const tab = newSideTab(kind, {
          parentTrailId: kind === "chat" ? get().activeTrailId : extra?.parentTrailId ?? null,
          ...extra,
        });
        if (kind === "chat" && tab.parentTrailId) {
          const parent = get().trails.find((t) => t.id === tab.parentTrailId);
          if (parent) tab.title = `From ${parent.title}`;
        }
        set((s) => ({
          sideOpen: true,
          sideTabs: [...s.sideTabs, tab],
          activeSideTabId: tab.id,
        }));
        return tab.id;
      },
      closeSideTab: (id, force = false) => {
        const tab = get().sideTabs.find((t) => t.id === id);
        if (!tab) return;
        if (
          !force &&
          tab.kind === "chat" &&
          tab.ephemeral &&
          !tab.keptTrailId &&
          tab.messages.length > 0
        ) {
          set({ confirmDiscardId: id });
          return;
        }
        set((s) => {
          const sideTabs = s.sideTabs.filter((t) => t.id !== id);
          return {
            sideTabs,
            activeSideTabId:
              s.activeSideTabId === id ? (sideTabs[sideTabs.length - 1]?.id ?? null) : s.activeSideTabId,
            sideOpen: sideTabs.length > 0,
            confirmDiscardId: s.confirmDiscardId === id ? null : s.confirmDiscardId,
          };
        });
        get().stop(id);
      },
      setActiveSideTab: (id) => set({ activeSideTabId: id, sideOpen: true }),
      setTabUrl: (id, url) =>
        set((s) => ({
          sideTabs: s.sideTabs.map((t) =>
            t.id === id ? { ...t, url, srcdoc: null, title: hostname(url) || t.title } : t,
          ),
        })),
      setConfirmDiscard: (confirmDiscardId) => set({ confirmDiscardId }),
      keepSideChat: (id) => {
        const tab = get().sideTabs.find((t) => t.id === id);
        if (!tab || tab.kind !== "chat") return null;
        const files = extractArtifacts(tab.messages.map((m) => m.content).join("\n\n"));
        const trail = newTrail({
          title: titleFromText(tab.messages.find((m) => m.role === "user")?.content ?? tab.title),
          messages: tab.messages,
          files,
          projectId: get().activeProjectId,
        });
        if (files.length) {
          get().patchProject(get().activeProjectId, (p) => ({
            ...p,
            files: mergeArtifacts(p.files, files),
          }));
        }
        set((s) => ({
          trails: [trail, ...s.trails],
          sideTabs: s.sideTabs.map((t) =>
            t.id === id ? { ...t, ephemeral: false, keptTrailId: trail.id, title: trail.title } : t,
          ),
        }));
        return trail.id;
      },
      enqueueCommand: (cmd) =>
        set((s) => ({
          pendingCommands: [...s.pendingCommands, cmd],
          terminalOpen: true,
        })),
      consumeCommands: () => {
        const cmds = get().pendingCommands;
        if (cmds.length) set({ pendingCommands: [] });
        return cmds;
      },
      stop: (id) => {
        aborts.get(id)?.abort();
        aborts.delete(id);
        set((s) => ({ streamingIds: s.streamingIds.filter((x) => x !== id) }));
      },
      send: async (targetId, targetKind, text) => {
        const state = get();
        if (state.streamingIds.includes(targetId)) return;
        const draft = (text ?? state.drafts[targetId] ?? "").trim();
        if (!draft) return;

        const userMsg: ChatMessage = {
          id: uid(),
          role: "user",
          content: draft.slice(0, 12000),
          createdAt: Date.now(),
        };
        const assistantId = uid();
        const assistantMsg: ChatMessage = {
          id: assistantId,
          role: "assistant",
          content: "",
          createdAt: Date.now(),
        };

        if (targetKind === "trail") {
          set((s) => ({
            drafts: { ...s.drafts, [targetId]: "" },
            trails: s.trails.map((t) =>
              t.id === targetId
                ? {
                    ...t,
                    title: t.messages.length === 0 ? titleFromText(userMsg.content) : t.title,
                    updatedAt: Date.now(),
                    messages: [...t.messages, userMsg, assistantMsg],
                  }
                : t,
            ),
            streamingIds: [...s.streamingIds, targetId],
          }));
        } else {
          set((s) => ({
            drafts: { ...s.drafts, [targetId]: "" },
            sideTabs: s.sideTabs.map((t) =>
              t.id === targetId ? { ...t, messages: [...t.messages, userMsg, assistantMsg] } : t,
            ),
            streamingIds: [...s.streamingIds, targetId],
          }));
        }

        const controller = new AbortController();
        aborts.set(targetId, controller);

        const after = get();
        let history: ChatMessage[] = [];
        let parentTitle: string | null = null;
        let parentExcerpt: string | null = null;
        if (targetKind === "trail") {
          history = after.trails.find((t) => t.id === targetId)?.messages ?? [];
        } else {
          const tab = after.sideTabs.find((t) => t.id === targetId);
          history = tab?.messages ?? [];
          const parent = after.trails.find((t) => t.id === tab?.parentTrailId);
          parentTitle = parent?.title ?? null;
          parentExcerpt = excerptOf(parent);
        }

        const payload = history
          .filter((m) => m.id !== assistantId && m.content.trim())
          .slice(-16)
          .map((m) => ({ role: m.role, content: m.content }));

        const project = after.projects.find((p) => p.id === after.activeProjectId) ?? after.projects[0]!;

        const write = (content: string, done = false) => {
          if (targetKind === "trail") {
            set((s) => ({
              trails: s.trails.map((t) =>
                t.id === targetId
                  ? {
                      ...t,
                      updatedAt: Date.now(),
                      messages: t.messages.map((m) => (m.id === assistantId ? { ...m, content } : m)),
                      files: done ? mergeArtifacts(t.files, extractArtifacts(content, t.id)) : t.files,
                    }
                  : t,
              ),
            }));
          } else {
            set((s) => ({
              sideTabs: s.sideTabs.map((t) =>
                t.id === targetId
                  ? {
                      ...t,
                      messages: t.messages.map((m) => (m.id === assistantId ? { ...m, content } : m)),
                    }
                  : t,
              ),
            }));
          }
          if (done) {
            const captured = extractArtifacts(content, targetId);
            if (captured.length) {
              const parentId = get().activeProjectId;
              set((s) => ({
                projects: s.projects.map((p) =>
                  p.id === parentId ? { ...p, files: mergeArtifacts(p.files, captured), updatedAt: Date.now() } : p,
                ),
              }));
            }
          }
        };

        try {
          let assembled = "";
          await streamChat({
            messages: payload,
            mode: targetKind,
            model: after.modelId,
            parentTitle,
            parentExcerpt,
            workspace: workspacePayload(project),
            signal: controller.signal,
            onDelta: (chunk) => {
              assembled += chunk;
              write(assembled, false);
            },
          });
          write(assembled, true);
        } catch (err) {
          if ((err as Error).name === "AbortError") return;
          const message = err instanceof Error ? err.message : "The studio model could not reply.";
          write(message, true);
        } finally {
          aborts.delete(targetId);
          set((s) => ({ streamingIds: s.streamingIds.filter((x) => x !== targetId) }));
        }
      },
    }),
    {
      name: "agentsam-work-v1",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      version: 2,
      merge: (persisted, current) => {
        const shaped = ensureShape((persisted ?? {}) as Partial<WorkState>);
        return { ...current, ...shaped };
      },
      partialize: (s) => ({
        projects: s.projects,
        activeProjectId: s.activeProjectId,
        trails: s.trails,
        activeTrailId: s.activeTrailId,
        drafts: s.drafts,
        sidebarOpen: s.sidebarOpen,
        sideOpen: s.sideOpen,
        terminalOpen: s.terminalOpen,
        navView: s.navView,
        modelId: s.modelId,
        sideTabs: s.sideTabs,
        activeSideTabId: s.activeSideTabId,
      }),
    },
  ),
);

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export function useActiveTrail() {
  return useWorkStore((s) => s.trails.find((t) => t.id === s.activeTrailId) ?? s.trails[0]!);
}

export function useActiveProject() {
  return useWorkStore((s) => s.projects.find((p) => p.id === s.activeProjectId) ?? s.projects[0]!);
}

export function useActiveSideTab() {
  return useWorkStore((s) => s.sideTabs.find((t) => t.id === s.activeSideTabId) ?? null);
}

export function useProjectTrails() {
  const projectId = useWorkStore((s) => s.activeProjectId);
  return useWorkStore((s) => s.trails.filter((t) => t.projectId === projectId));
}
