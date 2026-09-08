import "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime, r as Slot } from "../_libs/@radix-ui/react-collection+[...].mjs";
import "./router-DHbBYV48.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid() {
	return crypto.randomUUID();
}
function shortTime(ts) {
	const d = new Date(ts);
	const now = /* @__PURE__ */ new Date();
	if (d.toDateString() === now.toDateString()) return d.toLocaleTimeString([], {
		hour: "numeric",
		minute: "2-digit"
	});
	return d.toLocaleDateString([], {
		month: "short",
		day: "numeric"
	});
}
function titleFromText(text) {
	const line = text.replace(/\s+/g, " ").trim();
	if (!line) return "New trail";
	return line.length > 42 ? `${line.slice(0, 42).trimEnd()}…` : line;
}
function formatElapsed(ms) {
	const s = Math.max(0, Math.floor(ms / 1e3));
	const m = Math.floor(s / 60);
	const r = s % 60;
	if (m <= 0) return `${r}s`;
	return `${m}m ${r.toString().padStart(2, "0")}s`;
}
function languageFromPath(path) {
	return {
		ts: "typescript",
		tsx: "typescript",
		js: "javascript",
		jsx: "javascript",
		py: "python",
		rs: "rust",
		go: "go",
		rb: "ruby",
		json: "json",
		yml: "yaml",
		yaml: "yaml",
		md: "markdown",
		html: "html",
		css: "css",
		sh: "shell",
		sql: "sql",
		swift: "swift",
		kt: "kotlin",
		java: "java",
		toml: "toml",
		svg: "xml"
	}[path.split(".").pop()?.toLowerCase() ?? ""] ?? "plaintext";
}
var FENCE_RE = /```([^\n`]*)\n([\s\S]*?)```/g;
function looksLikePath(value) {
	if (!value) return false;
	if (/\s/.test(value)) return false;
	if (value.includes("/") || value.includes(".")) return true;
	return false;
}
function parseFenceInfo(info, body) {
	const raw = info.trim();
	const filenameMatch = /(?:filename|title|file|path)\s*=\s*["']?([^\s"']+)/i.exec(raw) ?? /(?:filename|title|file|path):\s*([^\s]+)/i.exec(raw);
	if (filenameMatch?.[1]) {
		const path = filenameMatch[1].replace(/[,"']+$/g, "");
		const langToken = raw.split(/\s+/)[0] ?? "";
		return {
			language: (looksLikePath(langToken) ? languageFromPath(path) : langToken || languageFromPath(path)) || "plaintext",
			path
		};
	}
	const parts = raw.split(/\s+/).filter(Boolean);
	if (parts.length >= 2 && looksLikePath(parts[1] ?? "")) return {
		language: parts[0] || languageFromPath(parts[1]),
		path: parts[1]
	};
	if (parts.length === 1 && looksLikePath(parts[0] ?? "")) return {
		language: languageFromPath(parts[0]),
		path: parts[0]
	};
	const first = body.split("\n", 3).slice(0, 2).join("\n");
	const fileLine = /(?:^|\n)\s*(?:\/\/|#|--)\s*(?:file(?:name|path)?|path)\s*:\s*(\S+)/i.exec(first);
	if (fileLine?.[1]) return {
		language: parts[0] || languageFromPath(fileLine[1]),
		path: fileLine[1]
	};
	return {
		language: parts[0] || "plaintext",
		path: null
	};
}
function extractArtifacts(markdown, trailId) {
	const out = [];
	let index = 0;
	for (const match of markdown.matchAll(FENCE_RE)) {
		const info = match[1] ?? "";
		const content = (match[2] ?? "").replace(/\n$/, "");
		if (!content.trim()) continue;
		const { language, path } = parseFenceInfo(info, content);
		const lines = content.split("\n").length;
		if (!(Boolean(path) || language !== "plaintext" && lines >= 4)) continue;
		const resolved = path ?? `snippet-${index + 1}.${language === "plaintext" ? "txt" : language}`;
		out.push({
			id: uid(),
			path: resolved.replace(/^\/+/, ""),
			language: language || languageFromPath(resolved),
			content,
			updatedAt: Date.now(),
			kind: "code",
			origin: "chat",
			trailId
		});
		index += 1;
	}
	return out;
}
function mergeArtifacts(existing, incoming) {
	const next = [...existing];
	for (const file of incoming) {
		const i = next.findIndex((f) => f.path === file.path);
		if (i >= 0) next[i] = {
			...next[i],
			content: file.content,
			language: file.language,
			updatedAt: file.updatedAt,
			kind: file.kind ?? next[i].kind,
			origin: file.origin ?? next[i].origin,
			title: file.title ?? next[i].title,
			url: file.url ?? next[i].url,
			trailId: file.trailId ?? next[i].trailId
		};
		else next.push(file);
	}
	return next;
}
function printTree(files, dirs = [], cwd = "/") {
	const prefix = cwd === "/" ? "" : cwd.replace(/^\//, "") + "/";
	const names = /* @__PURE__ */ new Set();
	for (const dir of dirs) {
		const abs = dir.replace(/^\//, "");
		if (prefix && !abs.startsWith(prefix) && abs !== prefix.slice(0, -1)) continue;
		const rest = prefix ? abs.slice(prefix.length) : abs;
		if (!rest) continue;
		names.add(rest.split("/")[0] + "/");
	}
	for (const file of files) {
		if (prefix && !file.path.startsWith(prefix) && file.path !== prefix.slice(0, -1)) continue;
		const rest = prefix ? file.path.slice(prefix.length) : file.path;
		if (!rest) continue;
		const head = rest.split("/")[0];
		names.add(rest.includes("/") ? `${head}/` : head);
	}
	return [...names].sort((a, b) => a.localeCompare(b));
}
function renderAsciiTree(files) {
	if (!files.length) return "(empty)";
	const lines = ["."];
	const sorted = [...files].sort((a, b) => a.path.localeCompare(b.path));
	for (const file of sorted) {
		const parts = file.path.split("/");
		lines.push(`${"  ".repeat(Math.max(0, parts.length - 1))}└─ ${parts[parts.length - 1]}`);
	}
	return lines.join("\n");
}
function emptyGit() {
	return {
		initialized: false,
		branch: "main",
		remotes: [],
		commits: [],
		staged: [],
		snapshots: {}
	};
}
function parseGithubRemote(url) {
	const value = url.trim().replace(/\.git$/, "");
	const https = /github\.com[/:]([^/]+)\/([^/]+)\/?$/i.exec(value);
	if (!https) return null;
	return {
		owner: https[1],
		repo: https[2]
	};
}
function workingTree(files) {
	const tree = {};
	for (const file of files) tree[file.path] = file.content;
	return tree;
}
function headSnapshot(git) {
	const last = git.commits[0];
	if (!last) return {};
	return git.snapshots[last.id] ?? {};
}
function dirtyPaths(project) {
	const head = headSnapshot(project.git);
	const now = workingTree(project.files);
	const paths = /* @__PURE__ */ new Set([...Object.keys(head), ...Object.keys(now)]);
	const changed = [];
	for (const path of paths) if ((head[path] ?? null) !== (now[path] ?? null)) changed.push(path);
	return changed.sort();
}
function statusLines(project) {
	if (!project.git.initialized) return ["not a git repository (run git init)"];
	const head = headSnapshot(project.git);
	const now = workingTree(project.files);
	const staged = new Set(project.git.staged);
	const lines = [`On branch ${project.git.branch}`, project.git.commits.length === 0 ? "No commits yet" : ""].filter(Boolean);
	const stagedLines = [];
	const unstagedLines = [];
	const untracked = [];
	const paths = /* @__PURE__ */ new Set([
		...Object.keys(head),
		...Object.keys(now),
		...staged
	]);
	for (const path of [...paths].sort()) {
		const inHead = path in head;
		const inNow = path in now;
		const isStaged = staged.has(path);
		if (isStaged) {
			if (!inNow) stagedLines.push(`  deleted:    ${path}`);
			else if (!inHead) stagedLines.push(`  new file:   ${path}`);
			else stagedLines.push(`  modified:   ${path}`);
		}
		if (!inHead && inNow && !isStaged) untracked.push(path);
		else if (inHead && !inNow && !isStaged) unstagedLines.push(`  deleted:    ${path}`);
		else if (inHead && inNow && head[path] !== now[path] && !isStaged) unstagedLines.push(`  modified:   ${path}`);
	}
	if (stagedLines.length) lines.push("", "Changes to be committed:", ...stagedLines);
	if (unstagedLines.length) lines.push("", "Changes not staged for commit:", ...unstagedLines);
	if (untracked.length) lines.push("", "Untracked files:", ...untracked.map((p) => `  ${p}`));
	if (!stagedLines.length && !unstagedLines.length && !untracked.length) lines.push("nothing to commit, working tree clean");
	return lines;
}
function commitStaged(project, message) {
	const staged = project.git.staged;
	if (!staged.length) return {
		git: project.git,
		output: "nothing to commit, no staged files"
	};
	const now = workingTree(project.files);
	const nextTree = { ...headSnapshot(project.git) };
	for (const path of staged) if (path in now) nextTree[path] = now[path];
	else delete nextTree[path];
	const id = uid().slice(0, 8);
	const commit = {
		id,
		message,
		at: Date.now(),
		paths: [...staged]
	};
	return {
		git: {
			...project.git,
			commits: [commit, ...project.git.commits],
			staged: [],
			snapshots: {
				...project.git.snapshots,
				[id]: nextTree
			}
		},
		output: `[${`${project.git.branch} ${id}`}] ${message}\n ${staged.length} file${staged.length === 1 ? "" : "s"} changed`
	};
}
function file(path, content, extra) {
	return {
		id: uid(),
		path,
		language: languageFromPath(path),
		content,
		updatedAt: Date.now(),
		kind: extra?.kind ?? (path.endsWith(".html") ? "preview" : "code"),
		origin: extra?.origin ?? "seed",
		title: extra?.title,
		url: extra?.url
	};
}
function emptyDeploy() {
	return {
		githubOwner: "",
		githubRepo: "",
		githubBranch: "main",
		cloudflareAccountId: "",
		cloudflareProject: ""
	};
}
function slugify(name) {
	return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "studio";
}
function seedFiles(projectName) {
	const slug = slugify(projectName);
	return [
		file("README.md", `# ${projectName}

Workspace for AgentSam Work.

- Trails are stored chats
- Side chats stay ephemeral until you keep them
- Files open in Monaco
- CLI is a real xterm over this virtual workspace
- Ship via GitHub or Cloudflare Pages

## CLI

\`\`\`
ls
cat README.md
git init
git add .
git commit -m "init"
wrangler pages deploy
\`\`\`

Tokens live in Ship — they never leave this browser except toward GitHub or Cloudflare.
`),
		file("index.html", `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${projectName}</title>
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <main>
      <p class="kicker">InnerAnimalMedia</p>
      <h1>${projectName}</h1>
      <p class="lede">A calm studio workbench. Edit this page in Monaco, preview it in the browser pane, then ship it with the CLI.</p>
      <p class="meta">wrangler pages deploy · git push</p>
    </main>
    <script src="./src/app.js"><\/script>
  </body>
</html>
`),
		file("styles.css", `:root {
  color-scheme: dark;
  --ink: #070708;
  --paper: #f3f1ec;
  --stone: #c4b8a8;
  --clay: #8a7f72;
}

* { box-sizing: border-box; }
html, body { margin: 0; min-height: 100%; background: var(--ink); color: var(--paper); }
body {
  font: 16px/1.5 "Instrument Sans", ui-sans-serif, system-ui, sans-serif;
  display: grid;
  place-items: center;
  padding: 48px 24px;
}
main { max-width: 36rem; }
.kicker {
  margin: 0 0 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--clay);
  font-size: 11px;
}
h1 {
  margin: 0 0 16px;
  font-size: 2.4rem;
  letter-spacing: -0.04em;
  font-weight: 500;
}
.lede { margin: 0; color: var(--stone); }
.meta { margin: 28px 0 0; color: var(--clay); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; }
`),
		file("src/app.js", `document.documentElement.dataset.ready = "sam";
console.info("${projectName} ready");
`),
		file("wrangler.toml", `name = "${slug}"
compatibility_date = "2026-09-01"
pages_build_output_dir = "."
`),
		file(".github/workflows/deploy.yml", `name: Cloudflare Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    steps:
      - uses: actions/checkout@v4
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: \${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: \${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy . --project-name=${slug}
`)
	];
}
function newProject(name = "Studio", description = "Default workspace") {
	const now = Date.now();
	return {
		id: uid(),
		name,
		description,
		createdAt: now,
		updatedAt: now,
		files: seedFiles(name),
		dirs: [
			"src",
			".github",
			".github/workflows"
		],
		git: emptyGit(),
		deploy: {
			...emptyDeploy(),
			cloudflareProject: slugify(name),
			githubRepo: slugify(name),
			githubBranch: "main"
		},
		cwd: "/"
	};
}
async function streamChat(opts) {
	const res = await fetch("/api/chat", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			messages: opts.messages.map((m) => ({
				role: m.role,
				content: m.content
			})),
			mode: opts.mode,
			model: opts.model,
			parentTitle: opts.parentTitle ?? void 0,
			parentExcerpt: opts.parentExcerpt ?? void 0,
			workspace: opts.workspace
		}),
		signal: opts.signal
	});
	if (!res.ok) {
		let message = `Studio model error ${res.status}`;
		try {
			const body = await res.json();
			if (body.error) message = body.error;
		} catch {}
		throw new Error(message);
	}
	if (!res.body) {
		const text = await res.text();
		if (text) opts.onDelta(text);
		return text;
	}
	const reader = res.body.getReader();
	const decoder = new TextDecoder();
	let full = "";
	for (;;) {
		const { done, value } = await reader.read();
		if (done) break;
		const chunk = decoder.decode(value, { stream: true });
		if (!chunk) continue;
		full += chunk;
		opts.onDelta(chunk);
	}
	return full;
}
var WELCOME_ID = "trail-studio";
var PROJECT_ID = "project-studio";
var WELCOME_MESSAGE = {
	id: "welcome-msg",
	role: "assistant",
	content: "You are in AgentSam Work.\n\nThis pane is a **stored trail**. Use the rail for Projects, Artifacts, Files, Ship, and a full-page **CLI** built for phones — it keeps working offline. Trails and projects stay on this device.\n\nWhat are you working on?",
	createdAt: 1746e9
};
function starterProject() {
	return {
		...newProject("Studio", "InnerAnimalMedia workspace"),
		id: PROJECT_ID
	};
}
var STARTER_TRAIL = {
	id: WELCOME_ID,
	title: "Studio",
	createdAt: 1746e9,
	updatedAt: 1746e9,
	pinned: true,
	messages: [WELCOME_MESSAGE],
	files: [],
	projectId: PROJECT_ID
};
var aborts = /* @__PURE__ */ new Map();
function newTrail(partial) {
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
		...partial
	};
}
var SIDE_TITLES = {
	chat: "Side chat",
	browser: "Browser",
	files: "Files",
	terminal: "CLI",
	artifacts: "Artifacts",
	deploy: "Ship"
};
function newSideTab(kind, extra) {
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
		...extra
	};
}
function excerptOf(trail) {
	if (!trail) return null;
	const slice = trail.messages.filter((m) => m.role !== "system").slice(-6);
	if (!slice.length) return null;
	return slice.map((m) => `${m.role === "user" ? "User" : "AgentSam"}: ${m.content.slice(0, 600)}`).join("\n\n");
}
function workspacePayload(project) {
	return project.files.filter((f) => f.origin !== "deploy").slice(0, 24).map((f) => ({
		path: f.path,
		content: f.content.slice(0, 2500)
	}));
}
function ensureShape(raw) {
	const seed = starterProject();
	let projects = Array.isArray(raw?.projects) && raw.projects.length ? raw.projects : [seed];
	if (!projects.some((p) => p.id === PROJECT_ID) && (!raw?.projects || raw.projects.length === 0)) projects = [seed];
	projects = projects.map((p) => ({
		...seed,
		...p,
		files: (p.files ?? []).map((f) => ({
			kind: "code",
			origin: "seed",
			...f
		})),
		dirs: p.dirs ?? [],
		git: p.git ?? seed.git,
		deploy: {
			...seed.deploy,
			...p.deploy
		},
		cwd: p.cwd || "/"
	}));
	const activeProjectId = projects.some((p) => p.id === raw?.activeProjectId) ? raw.activeProjectId : projects[0].id;
	const trails = (raw?.trails?.length ? raw.trails : [STARTER_TRAIL]).map((t) => ({
		...STARTER_TRAIL,
		...t,
		files: t.files ?? [],
		projectId: t.projectId || activeProjectId
	}));
	const project = projects.find((p) => p.id === activeProjectId) ?? projects[0];
	const captured = trails.flatMap((t) => t.files);
	if (captured.length) project.files = mergeArtifacts(project.files, captured);
	return {
		projects,
		activeProjectId,
		trails,
		activeTrailId: trails.some((t) => t.id === raw?.activeTrailId) ? raw.activeTrailId : trails[0].id,
		drafts: raw?.drafts ?? {},
		sidebarOpen: raw?.sidebarOpen ?? true,
		sideOpen: raw?.sideOpen ?? false,
		terminalOpen: raw?.terminalOpen ?? false,
		navView: raw?.navView ?? "trails",
		modelId: raw?.modelId || "grok-4.6",
		sideTabs: raw?.sideTabs ?? [],
		activeSideTabId: raw?.activeSideTabId ?? null
	};
}
var useWorkStore = create()(persist((set, get) => ({
	hydrated: false,
	...ensureShape(void 0),
	mobileNavOpen: false,
	settingsOpen: false,
	streamingIds: [],
	search: "",
	confirmDiscardId: null,
	pendingCommands: [],
	offlineQueue: [],
	setHydrated: (value) => set({ hydrated: value }),
	setSearch: (search) => set({ search }),
	setDraft: (id, value) => set((s) => ({ drafts: {
		...s.drafts,
		[id]: value
	} })),
	setNavView: (navView) => set({
		navView,
		sidebarOpen: true
	}),
	setModelId: (modelId) => set({ modelId }),
	toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
	setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
	setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen }),
	setSideOpen: (sideOpen) => set({ sideOpen }),
	setTerminalOpen: (terminalOpen) => set({ terminalOpen }),
	setSettingsOpen: (settingsOpen) => set({ settingsOpen }),
	toggleTerminal: () => set((s) => ({ terminalOpen: !s.terminalOpen })),
	setActiveTrail: (id) => set({
		activeTrailId: id,
		navView: "trails"
	}),
	startTrail: () => {
		const current = get().trails.find((t) => t.id === get().activeTrailId);
		if (current && current.messages.length === 0 && current.title === "New trail") return current.id;
		const trail = newTrail({ projectId: get().activeProjectId });
		set((s) => ({
			trails: [trail, ...s.trails],
			activeTrailId: trail.id,
			navView: "trails"
		}));
		return trail.id;
	},
	flushOfflineQueue: async () => {
		if (typeof navigator !== "undefined" && !navigator.onLine) return;
		const queue = [...get().offlineQueue];
		if (!queue.length) return;
		set({ offlineQueue: [] });
		for (const item of queue) {
			const assistantId = uid();
			const replaceNote = (messages) => {
				return [...messages.filter((m) => m.id !== item.noteId), {
					id: assistantId,
					role: "assistant",
					content: "",
					createdAt: Date.now()
				}];
			};
			if (item.targetKind === "trail") set((s) => ({
				trails: s.trails.map((t) => t.id === item.targetId ? {
					...t,
					updatedAt: Date.now(),
					messages: replaceNote(t.messages)
				} : t),
				streamingIds: s.streamingIds.includes(item.targetId) ? s.streamingIds : [...s.streamingIds, item.targetId]
			}));
			else set((s) => ({
				sideTabs: s.sideTabs.map((t) => t.id === item.targetId ? {
					...t,
					messages: replaceNote(t.messages)
				} : t),
				streamingIds: s.streamingIds.includes(item.targetId) ? s.streamingIds : [...s.streamingIds, item.targetId]
			}));
			const controller = new AbortController();
			aborts.set(item.targetId, controller);
			const after = get();
			let history = [];
			let parentTitle = null;
			let parentExcerpt = null;
			if (item.targetKind === "trail") history = after.trails.find((t) => t.id === item.targetId)?.messages ?? [];
			else {
				const tab = after.sideTabs.find((t) => t.id === item.targetId);
				history = tab?.messages ?? [];
				const parent = after.trails.find((t) => t.id === tab?.parentTrailId);
				parentTitle = parent?.title ?? null;
				parentExcerpt = excerptOf(parent);
			}
			const payload = history.filter((m) => m.id !== assistantId && m.content.trim()).slice(-16).map((m) => ({
				role: m.role,
				content: m.content
			}));
			const project = after.projects.find((p) => p.id === after.activeProjectId) ?? after.projects[0];
			const write = (content, done = false) => {
				if (item.targetKind === "trail") set((s) => ({ trails: s.trails.map((t) => t.id === item.targetId ? {
					...t,
					updatedAt: Date.now(),
					messages: t.messages.map((m) => m.id === assistantId ? {
						...m,
						content
					} : m),
					files: done ? mergeArtifacts(t.files, extractArtifacts(content, t.id)) : t.files
				} : t) }));
				else set((s) => ({ sideTabs: s.sideTabs.map((t) => t.id === item.targetId ? {
					...t,
					messages: t.messages.map((m) => m.id === assistantId ? {
						...m,
						content
					} : m)
				} : t) }));
				if (done) {
					const captured = extractArtifacts(content, item.targetId);
					if (captured.length) {
						const parentId = get().activeProjectId;
						set((s) => ({ projects: s.projects.map((p) => p.id === parentId ? {
							...p,
							files: mergeArtifacts(p.files, captured),
							updatedAt: Date.now()
						} : p) }));
					}
				}
			};
			try {
				let assembled = "";
				await streamChat({
					messages: payload,
					mode: item.targetKind,
					model: after.modelId,
					parentTitle,
					parentExcerpt,
					workspace: workspacePayload(project),
					signal: controller.signal,
					onDelta: (chunk) => {
						assembled += chunk;
						write(assembled, false);
					}
				});
				write(assembled, true);
			} catch (err) {
				if (err.name === "AbortError") continue;
				write(err instanceof Error ? err.message : "The studio model could not reply.", true);
			} finally {
				aborts.delete(item.targetId);
				set((s) => ({ streamingIds: s.streamingIds.filter((x) => x !== item.targetId) }));
			}
		}
	},
	renameTrail: (id, title) => set((s) => ({ trails: s.trails.map((t) => t.id === id ? {
		...t,
		title: title.trim() || t.title,
		updatedAt: Date.now()
	} : t) })),
	pinTrail: (id) => set((s) => ({ trails: s.trails.map((t) => t.id === id ? {
		...t,
		pinned: !t.pinned
	} : t) })),
	deleteTrail: (id) => set((s) => {
		const trails = s.trails.filter((t) => t.id !== id);
		const fallback = trails[0] ?? newTrail({ projectId: s.activeProjectId });
		const nextTrails = trails.length ? trails : [fallback];
		return {
			trails: nextTrails,
			activeTrailId: s.activeTrailId === id ? nextTrails[0].id : s.activeTrailId
		};
	}),
	setActiveProject: (id) => {
		if (!get().projects.find((p) => p.id === id)) return;
		set({
			activeProjectId: id,
			activeTrailId: (get().trails.find((t) => t.projectId === id) ?? get().trails[0])?.id ?? get().activeTrailId,
			navView: "trails"
		});
	},
	createProject: (name) => {
		const project = newProject(name?.trim() || "Untitled");
		const trail = newTrail({
			projectId: project.id,
			title: project.name,
			pinned: true
		});
		set((s) => ({
			projects: [project, ...s.projects],
			trails: [trail, ...s.trails],
			activeProjectId: project.id,
			activeTrailId: trail.id,
			navView: "trails"
		}));
		return project.id;
	},
	renameProject: (id, name) => set((s) => ({ projects: s.projects.map((p) => p.id === id ? {
		...p,
		name: name.trim() || p.name,
		updatedAt: Date.now()
	} : p) })),
	deleteProject: (id) => set((s) => {
		if (s.projects.length <= 1) return s;
		const projects = s.projects.filter((p) => p.id !== id);
		const trails = s.trails.filter((t) => t.projectId !== id);
		const next = projects[0];
		const fallbackTrail = trails.find((t) => t.projectId === next.id) ?? trails[0];
		return {
			projects,
			trails: trails.length ? trails : [newTrail({ projectId: next.id })],
			activeProjectId: s.activeProjectId === id ? next.id : s.activeProjectId,
			activeTrailId: s.activeTrailId && trails.some((t) => t.id === s.activeTrailId) ? s.activeTrailId : fallbackTrail?.id ?? s.activeTrailId
		};
	}),
	patchProject: (id, patch) => set((s) => ({ projects: s.projects.map((p) => {
		if (p.id !== id) return p;
		return {
			...typeof patch === "function" ? patch(p) : {
				...p,
				...patch
			},
			updatedAt: Date.now()
		};
	}) })),
	upsertFile: (projectId, file) => set((s) => ({ projects: s.projects.map((p) => p.id === projectId ? {
		...p,
		files: mergeArtifacts(p.files, [file]),
		updatedAt: Date.now()
	} : p) })),
	deleteFile: (projectId, fileId) => set((s) => ({
		projects: s.projects.map((p) => p.id === projectId ? {
			...p,
			files: p.files.filter((f) => f.id !== fileId)
		} : p),
		sideTabs: s.sideTabs.map((tab) => tab.fileId === fileId ? {
			...tab,
			fileId: null
		} : tab)
	})),
	selectFile: (fileId) => {
		const { openSideTab, sideTabs, projects, activeProjectId } = get();
		const file = projects.find((p) => p.id === activeProjectId)?.files.find((f) => f.id === fileId);
		const existing = sideTabs.find((t) => t.kind === "files");
		if (existing) {
			set({
				sideOpen: true,
				activeSideTabId: existing.id,
				sideTabs: sideTabs.map((t) => t.id === existing.id ? {
					...t,
					fileId,
					title: file?.path ?? "Files"
				} : t)
			});
			return;
		}
		openSideTab("files", {
			fileId,
			ephemeral: false,
			title: file?.path ?? "Files"
		});
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
		const existing = kind === "files" || kind === "artifacts" || kind === "deploy" ? get().sideTabs.find((t) => t.kind === kind) : void 0;
		if (existing) {
			set({
				sideOpen: true,
				activeSideTabId: existing.id,
				sideTabs: get().sideTabs.map((t) => t.id === existing.id ? {
					...t,
					...extra
				} : t)
			});
			return existing.id;
		}
		const tab = newSideTab(kind, {
			parentTrailId: kind === "chat" ? get().activeTrailId : extra?.parentTrailId ?? null,
			...extra
		});
		if (kind === "chat" && tab.parentTrailId) {
			const parent = get().trails.find((t) => t.id === tab.parentTrailId);
			if (parent) tab.title = `From ${parent.title}`;
		}
		set((s) => ({
			sideOpen: true,
			sideTabs: [...s.sideTabs, tab],
			activeSideTabId: tab.id
		}));
		return tab.id;
	},
	closeSideTab: (id, force = false) => {
		const tab = get().sideTabs.find((t) => t.id === id);
		if (!tab) return;
		if (!force && tab.kind === "chat" && tab.ephemeral && !tab.keptTrailId && tab.messages.length > 0) {
			set({ confirmDiscardId: id });
			return;
		}
		set((s) => {
			const sideTabs = s.sideTabs.filter((t) => t.id !== id);
			return {
				sideTabs,
				activeSideTabId: s.activeSideTabId === id ? sideTabs[sideTabs.length - 1]?.id ?? null : s.activeSideTabId,
				sideOpen: sideTabs.length > 0,
				confirmDiscardId: s.confirmDiscardId === id ? null : s.confirmDiscardId
			};
		});
		get().stop(id);
	},
	setActiveSideTab: (id) => set({
		activeSideTabId: id,
		sideOpen: true
	}),
	setTabUrl: (id, url) => set((s) => ({ sideTabs: s.sideTabs.map((t) => t.id === id ? {
		...t,
		url,
		srcdoc: null,
		title: hostname(url) || t.title
	} : t) })),
	setConfirmDiscard: (confirmDiscardId) => set({ confirmDiscardId }),
	keepSideChat: (id) => {
		const tab = get().sideTabs.find((t) => t.id === id);
		if (!tab || tab.kind !== "chat") return null;
		const files = extractArtifacts(tab.messages.map((m) => m.content).join("\n\n"));
		const trail = newTrail({
			title: titleFromText(tab.messages.find((m) => m.role === "user")?.content ?? tab.title),
			messages: tab.messages,
			files,
			projectId: get().activeProjectId
		});
		if (files.length) get().patchProject(get().activeProjectId, (p) => ({
			...p,
			files: mergeArtifacts(p.files, files)
		}));
		set((s) => ({
			trails: [trail, ...s.trails],
			sideTabs: s.sideTabs.map((t) => t.id === id ? {
				...t,
				ephemeral: false,
				keptTrailId: trail.id,
				title: trail.title
			} : t)
		}));
		return trail.id;
	},
	enqueueCommand: (cmd) => set((s) => ({ pendingCommands: [...s.pendingCommands, cmd] })),
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
		if (typeof navigator !== "undefined" && !navigator.onLine) {
			const noteId = uid();
			const queued = {
				id: uid(),
				targetId,
				targetKind,
				text: draft.slice(0, 12e3),
				noteId,
				createdAt: Date.now()
			};
			const userMsg = {
				id: uid(),
				role: "user",
				content: queued.text,
				createdAt: Date.now()
			};
			const note = {
				id: noteId,
				role: "assistant",
				content: "Saved on this device — you're offline. Open **CLI** from the rail to keep shipping locally. This message will retry when you're back online.",
				createdAt: Date.now()
			};
			if (targetKind === "trail") set((s) => ({
				drafts: {
					...s.drafts,
					[targetId]: ""
				},
				offlineQueue: [...s.offlineQueue, queued],
				trails: s.trails.map((t) => t.id === targetId ? {
					...t,
					title: t.messages.length === 0 ? titleFromText(userMsg.content) : t.title,
					updatedAt: Date.now(),
					messages: [
						...t.messages,
						userMsg,
						note
					]
				} : t)
			}));
			else set((s) => ({
				drafts: {
					...s.drafts,
					[targetId]: ""
				},
				offlineQueue: [...s.offlineQueue, queued],
				sideTabs: s.sideTabs.map((t) => t.id === targetId ? {
					...t,
					messages: [
						...t.messages,
						userMsg,
						note
					]
				} : t)
			}));
			return;
		}
		const userMsg = {
			id: uid(),
			role: "user",
			content: draft.slice(0, 12e3),
			createdAt: Date.now()
		};
		const assistantId = uid();
		const assistantMsg = {
			id: assistantId,
			role: "assistant",
			content: "",
			createdAt: Date.now()
		};
		if (targetKind === "trail") set((s) => ({
			drafts: {
				...s.drafts,
				[targetId]: ""
			},
			trails: s.trails.map((t) => t.id === targetId ? {
				...t,
				title: t.messages.length === 0 ? titleFromText(userMsg.content) : t.title,
				updatedAt: Date.now(),
				messages: [
					...t.messages,
					userMsg,
					assistantMsg
				]
			} : t),
			streamingIds: [...s.streamingIds, targetId]
		}));
		else set((s) => ({
			drafts: {
				...s.drafts,
				[targetId]: ""
			},
			sideTabs: s.sideTabs.map((t) => t.id === targetId ? {
				...t,
				messages: [
					...t.messages,
					userMsg,
					assistantMsg
				]
			} : t),
			streamingIds: [...s.streamingIds, targetId]
		}));
		const controller = new AbortController();
		aborts.set(targetId, controller);
		const after = get();
		let history = [];
		let parentTitle = null;
		let parentExcerpt = null;
		if (targetKind === "trail") history = after.trails.find((t) => t.id === targetId)?.messages ?? [];
		else {
			const tab = after.sideTabs.find((t) => t.id === targetId);
			history = tab?.messages ?? [];
			const parent = after.trails.find((t) => t.id === tab?.parentTrailId);
			parentTitle = parent?.title ?? null;
			parentExcerpt = excerptOf(parent);
		}
		const payload = history.filter((m) => m.id !== assistantId && m.content.trim()).slice(-16).map((m) => ({
			role: m.role,
			content: m.content
		}));
		const project = after.projects.find((p) => p.id === after.activeProjectId) ?? after.projects[0];
		const write = (content, done = false) => {
			if (targetKind === "trail") set((s) => ({ trails: s.trails.map((t) => t.id === targetId ? {
				...t,
				updatedAt: Date.now(),
				messages: t.messages.map((m) => m.id === assistantId ? {
					...m,
					content
				} : m),
				files: done ? mergeArtifacts(t.files, extractArtifacts(content, t.id)) : t.files
			} : t) }));
			else set((s) => ({ sideTabs: s.sideTabs.map((t) => t.id === targetId ? {
				...t,
				messages: t.messages.map((m) => m.id === assistantId ? {
					...m,
					content
				} : m)
			} : t) }));
			if (done) {
				const captured = extractArtifacts(content, targetId);
				if (captured.length) {
					const parentId = get().activeProjectId;
					set((s) => ({ projects: s.projects.map((p) => p.id === parentId ? {
						...p,
						files: mergeArtifacts(p.files, captured),
						updatedAt: Date.now()
					} : p) }));
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
				}
			});
			write(assembled, true);
		} catch (err) {
			if (err.name === "AbortError") return;
			write(err instanceof Error ? err.message : "The studio model could not reply.", true);
		} finally {
			aborts.delete(targetId);
			set((s) => ({ streamingIds: s.streamingIds.filter((x) => x !== targetId) }));
		}
	}
}), {
	name: "agentsam-work-v1",
	storage: createJSONStorage(() => localStorage),
	skipHydration: true,
	version: 2,
	merge: (persisted, current) => {
		const raw = persisted ?? {};
		const shaped = ensureShape(raw);
		return {
			...current,
			...shaped,
			offlineQueue: Array.isArray(raw.offlineQueue) ? raw.offlineQueue : []
		};
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
		offlineQueue: s.offlineQueue
	})
}));
function hostname(url) {
	try {
		return new URL(url).hostname.replace(/^www\./, "");
	} catch {
		return "";
	}
}
function useActiveTrail() {
	return useWorkStore((s) => s.trails.find((t) => t.id === s.activeTrailId) ?? s.trails[0]);
}
function useActiveProject() {
	return useWorkStore((s) => s.projects.find((p) => p.id === s.activeProjectId) ?? s.projects[0]);
}
function useActiveSideTab() {
	return useWorkStore((s) => s.sideTabs.find((t) => t.id === s.activeSideTabId) ?? null);
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-[color,background-color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 active:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
			outline: "shadow-hairline bg-transparent hover:bg-muted",
			accent: "bg-accent text-accent-foreground hover:bg-accent/90",
			destructive: "text-destructive hover:bg-destructive/10"
		},
		size: {
			default: "h-10 px-4",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-11 px-5",
			icon: "size-10",
			"icon-sm": "size-8 rounded-md"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
//#endregion
export { workingTree as S, uid as _, emptyGit as a, useActiveTrail as b, headSnapshot as c, parseGithubRemote as d, printTree as f, statusLines as g, slugify as h, dirtyPaths as i, languageFromPath as l, shortTime as m, cn as n, extractArtifacts as o, renderAsciiTree as p, commitStaged as r, formatElapsed as s, Button as t, mergeArtifacts as u, useActiveProject as v, useWorkStore as x, useActiveSideTab as y };
