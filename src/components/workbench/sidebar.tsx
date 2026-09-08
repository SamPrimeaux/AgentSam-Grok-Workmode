import { useMemo, useState } from "react";
import {
  Box,
  FileCode,
  FolderGit2,
  MessageSquare,
  MoreHorizontal,
  PanelLeft,
  Pin,
  Plus,
  Search,
  SquareTerminal,
  Trash2,
  Upload,
} from "lucide-react";
import { StudioMark } from "@/components/mark";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn, shortTime } from "@/lib/utils";
import { useWorkStore } from "@/lib/work/store";
import type { Project, Trail } from "@/lib/work/types";

function groupTrails(trails: Trail[], query: string) {
  const q = query.trim().toLowerCase();
  const filtered = q
    ? trails.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.messages.some((m) => m.content.toLowerCase().includes(q)),
      )
    : trails;
  const pinned = filtered.filter((t) => t.pinned);
  const rest = filtered.filter((t) => !t.pinned).sort((a, b) => b.updatedAt - a.updatedAt);
  const now = Date.now();
  const day = 86_400_000;
  return {
    pinned,
    today: rest.filter((t) => now - t.updatedAt < day),
    yesterday: rest.filter((t) => now - t.updatedAt >= day && now - t.updatedAt < 2 * day),
    earlier: rest.filter((t) => now - t.updatedAt >= 2 * day),
  };
}

function TrailRow({ trail, onRename }: { trail: Trail; onRename: (trail: Trail) => void }) {
  const active = useWorkStore((s) => s.activeTrailId === trail.id);
  const setActiveTrail = useWorkStore((s) => s.setActiveTrail);
  const pinTrail = useWorkStore((s) => s.pinTrail);
  const deleteTrail = useWorkStore((s) => s.deleteTrail);
  const setMobileNavOpen = useWorkStore((s) => s.setMobileNavOpen);

  return (
    <div className={cn("group flex items-center rounded-lg", active ? "bg-muted" : "hover:bg-muted/60")}>
      <button
        type="button"
        onClick={() => {
          setActiveTrail(trail.id);
          setMobileNavOpen(false);
        }}
        className="flex min-w-0 flex-1 items-center gap-2 px-2.5 py-2 text-left"
      >
        <span className="min-w-0 flex-1 truncate text-sm">{trail.title}</span>
        <span className="shrink-0 text-[11px] text-muted-foreground tabular-nums">{shortTime(trail.updatedAt)}</span>
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            className="mr-1 opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100 max-md:opacity-100"
            aria-label={`Trail actions for ${trail.title}`}
          >
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => onRename(trail)}>Rename</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => pinTrail(trail.id)}>
            <Pin className="size-3.5" />
            {trail.pinned ? "Unpin" : "Pin"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive" onSelect={() => deleteTrail(trail.id)}>
            <Trash2 className="size-3.5" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function Section({ label, trails, onRename }: { label: string; trails: Trail[]; onRename: (t: Trail) => void }) {
  if (!trails.length) return null;
  return (
    <div className="mb-3">
      <p className="px-2.5 pb-1 text-[11px] tracking-[0.12em] text-muted-foreground uppercase">{label}</p>
      <div className="flex flex-col gap-0.5">
        {trails.map((trail) => (
          <TrailRow key={trail.id} trail={trail} onRename={onRename} />
        ))}
      </div>
    </div>
  );
}

export function Sidebar() {
  const trails = useWorkStore((s) => s.trails);
  const projects = useWorkStore((s) => s.projects);
  const activeProjectId = useWorkStore((s) => s.activeProjectId);
  const search = useWorkStore((s) => s.search);
  const navView = useWorkStore((s) => s.navView);
  const setSearch = useWorkStore((s) => s.setSearch);
  const setNavView = useWorkStore((s) => s.setNavView);
  const startTrail = useWorkStore((s) => s.startTrail);
  const toggleSidebar = useWorkStore((s) => s.toggleSidebar);
  const renameTrail = useWorkStore((s) => s.renameTrail);
  const createProject = useWorkStore((s) => s.createProject);
  const renameProject = useWorkStore((s) => s.renameProject);
  const deleteProject = useWorkStore((s) => s.deleteProject);
  const setActiveProject = useWorkStore((s) => s.setActiveProject);
  const openSideTab = useWorkStore((s) => s.openSideTab);
  const selectFile = useWorkStore((s) => s.selectFile);
  const [editing, setEditing] = useState<Trail | null>(null);
  const [title, setTitle] = useState("");
  const [newProjectOpen, setNewProjectOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [renamingProject, setRenamingProject] = useState<Project | null>(null);

  const projectTrails = useMemo(
    () => trails.filter((t) => t.projectId === activeProjectId),
    [trails, activeProjectId],
  );
  const groups = useMemo(() => groupTrails(projectTrails, search), [projectTrails, search]);
  const project = projects.find((p) => p.id === activeProjectId) ?? projects[0]!;
  const artifacts = [...project.files].sort((a, b) => b.updatedAt - a.updatedAt);

  return (
    <div className="flex h-full bg-sidebar">
      <nav className="flex w-12 shrink-0 flex-col items-center gap-1 border-r border-border py-3">
        <StudioMark className="mb-2 size-7" />
        <RailButton
          label="Trails"
          active={navView === "trails"}
          onClick={() => setNavView("trails")}
          icon={MessageSquare}
        />
        <RailButton
          label="Projects"
          active={navView === "projects"}
          onClick={() => setNavView("projects")}
          icon={FolderGit2}
        />
        <RailButton
          label="Artifacts"
          active={navView === "artifacts"}
          onClick={() => setNavView("artifacts")}
          icon={Box}
        />
        <RailButton label="CLI" onClick={() => openSideTab("terminal")} icon={SquareTerminal} />
        <RailButton
          label="Files"
          onClick={() => openSideTab("files", { ephemeral: false })}
          icon={FileCode}
        />
        <div className="mt-auto flex flex-col gap-1">
          <RailButton label="Ship" onClick={() => openSideTab("deploy", { ephemeral: false })} icon={Upload} />
        </div>
      </nav>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2 px-3 pt-4 pb-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium tracking-tight">{project.name}</p>
            <p className="text-[11px] text-muted-foreground">
              {navView === "projects" ? "Projects" : navView === "artifacts" ? "Artifacts" : "Work"}
            </p>
          </div>
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            className="ml-auto hidden text-foreground md:inline-flex"
            aria-label="Collapse sidebar"
            onClick={toggleSidebar}
          >
            <PanelLeft className="size-4" />
          </Button>
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            className="text-foreground md:ml-0"
            aria-label={navView === "projects" ? "New project" : "New trail"}
            onClick={() => {
              if (navView === "projects") {
                setProjectName("");
                setNewProjectOpen(true);
              } else startTrail();
            }}
          >
            <Plus className="size-4" />
          </Button>
        </div>

        {navView === "trails" ? (
          <>
            <div className="px-3 pb-3">
              <label className="flex h-10 items-center gap-2 rounded-lg bg-muted px-2.5 shadow-hairline">
                <Search className="size-4 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search trails"
                  className="h-full w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </label>
            </div>
            <div className="scrollbar-thin flex-1 overflow-y-auto px-2 pb-4">
              <Section label="Pinned" trails={groups.pinned} onRename={(t) => { setEditing(t); setTitle(t.title); }} />
              <Section label="Today" trails={groups.today} onRename={(t) => { setEditing(t); setTitle(t.title); }} />
              <Section label="Yesterday" trails={groups.yesterday} onRename={(t) => { setEditing(t); setTitle(t.title); }} />
              <Section label="Earlier" trails={groups.earlier} onRename={(t) => { setEditing(t); setTitle(t.title); }} />
            </div>
          </>
        ) : null}

        {navView === "projects" ? (
          <div className="scrollbar-thin flex-1 overflow-y-auto px-2 pb-4">
            {projects.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "group mb-0.5 flex items-center rounded-lg",
                  item.id === activeProjectId ? "bg-muted" : "hover:bg-muted/60",
                )}
              >
                <button
                  type="button"
                  className="flex min-w-0 flex-1 flex-col px-2.5 py-2 text-left"
                  onClick={() => setActiveProject(item.id)}
                >
                  <span className="truncate text-sm">{item.name}</span>
                  <span className="text-[11px] text-muted-foreground">
                    {item.files.length} files · {trails.filter((t) => t.projectId === item.id).length} trails
                  </span>
                </button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="ghost"
                      className="mr-1 opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100 max-md:opacity-100"
                      aria-label={`Project actions for ${item.name}`}
                    >
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => { setRenamingProject(item); setProjectName(item.name); }}>
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive"
                      disabled={projects.length <= 1}
                      onSelect={() => deleteProject(item.id)}
                    >
                      <Trash2 className="size-3.5" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        ) : null}

        {navView === "artifacts" ? (
          <div className="scrollbar-thin flex-1 overflow-y-auto px-2 pb-4">
            {artifacts.length === 0 ? (
              <p className="px-2.5 py-3 text-sm text-muted-foreground">No artifacts on this project yet.</p>
            ) : (
              artifacts.map((file) => (
                <button
                  key={file.id}
                  type="button"
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left hover:bg-muted/60"
                  onClick={() => {
                    if (file.kind === "preview" || file.path.endsWith(".html")) {
                      openSideTab("browser", { title: file.path, srcdoc: file.content, ephemeral: false });
                    } else if (file.kind === "deploy" && file.url) {
                      openSideTab("browser", { url: file.url, title: file.title ?? "Deploy", ephemeral: false });
                    } else {
                      selectFile(file.id);
                    }
                  }}
                >
                  <Box className="size-3.5 shrink-0 text-stone" />
                  <span className="min-w-0 flex-1 truncate text-sm">{file.title ?? file.path}</span>
                </button>
              ))
            )}
          </div>
        ) : null}

        <div className="border-t border-border px-4 py-3">
          <p className="text-[11px] tracking-[0.14em] text-muted-foreground uppercase">InnerAnimalMedia</p>
          <p className="mt-0.5 text-xs text-clay">Studio</p>
        </div>
      </div>

      <Dialog open={Boolean(editing)} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent>
          <DialogTitle>Rename trail</DialogTitle>
          <DialogDescription>The name appears in the stored trail list.</DialogDescription>
          <form
            className="mt-4 flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (editing) renameTrail(editing.id, title);
              setEditing(null);
            }}
          >
            <Input value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setEditing(null)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={newProjectOpen} onOpenChange={setNewProjectOpen}>
        <DialogContent>
          <DialogTitle>New project</DialogTitle>
          <DialogDescription>A workspace with files, git, and ship targets.</DialogDescription>
          <form
            className="mt-4 flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              createProject(projectName || "Untitled");
              setNewProjectOpen(false);
            }}
          >
            <Input value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Name" autoFocus />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setNewProjectOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(renamingProject)} onOpenChange={(open) => !open && setRenamingProject(null)}>
        <DialogContent>
          <DialogTitle>Rename project</DialogTitle>
          <DialogDescription>The name is local to this studio.</DialogDescription>
          <form
            className="mt-4 flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (renamingProject) renameProject(renamingProject.id, projectName);
              setRenamingProject(null);
            }}
          >
            <Input value={projectName} onChange={(e) => setProjectName(e.target.value)} autoFocus />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setRenamingProject(null)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function RailButton({
  label,
  icon: Icon,
  active,
  onClick,
}: {
  label: string;
  icon: typeof MessageSquare;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cn(
        "flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground",
        active && "bg-muted text-foreground",
      )}
    >
      <Icon className="size-4" />
    </button>
  );
}
