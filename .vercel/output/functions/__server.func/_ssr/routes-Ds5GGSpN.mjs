import { i as __toESM } from "../_runtime.mjs";
import { c as require_jsx_runtime, r as Slot } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as ArrowUp, C as Download, D as ChevronDown, E as Cloud, M as ArrowLeft, O as Check, S as Ellipsis, T as Columns2, _ as KeyRound, a as Square, b as FolderGit2, c as Search, d as Play, f as Pin, g as Menu, h as MessageSquare, i as Trash2, j as ArrowRight, k as Box, l as RotateCw, m as PanelLeft, n as Upload, o as SquareTerminal, p as Paperclip, s as Share, t as X, u as Plus, v as Globe, w as Copy, x as FileCode, y as Github } from "../_libs/lucide-react.mjs";
import { i as getModel, r as STUDIO_MODELS } from "./router-Dvu2_7E1.mjs";
import { n as nn, r as qt, t as Qt } from "../_libs/react-resizable-panels.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as DialogPortal$1, i as DialogOverlay$1, n as DialogContent$1, o as DialogTitle$1, r as DialogDescription$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as Root2, i as Portal2, n as Item2, o as Separator2, r as Label2, s as Trigger, t as Content2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { a as Trigger$1, i as Root3, n as Portal, r as Provider, t as Content2$1 } from "../_libs/@radix-ui/react-tooltip+[...].mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
import { t as Markdown } from "../_libs/react-markdown+[...].mjs";
import { t as remarkGfm } from "../_libs/remark-gfm.mjs";
import { n as zipSync, t as strToU8 } from "../_libs/fflate.mjs";
import { t as _e } from "../_libs/cmdk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Ds5GGSpN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
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
function TooltipProvider({ delayDuration = 400, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider, {
		delayDuration,
		...props
	});
}
function Tooltip({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root3, { ...props });
}
function TooltipTrigger({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger$1, { ...props });
}
function TooltipContent({ className, sideOffset = 6, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2$1, {
		sideOffset,
		className: cn("z-50 rounded-md bg-popover px-2 py-1 text-xs text-popover-foreground shadow-hairline", className),
		...props
	}) });
}
function StudioMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("text-accent", className),
		"aria-hidden": "true",
		fill: "none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16",
				cy: "16.4",
				r: "12.2",
				stroke: "currentColor",
				strokeWidth: "1.15",
				opacity: "0.55"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16",
				cy: "16.4",
				r: "8.1",
				stroke: "currentColor",
				strokeWidth: "1.15",
				opacity: "0.85"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16.2",
				cy: "16.1",
				r: "3.4",
				fill: "currentColor",
				className: "text-paper"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M13.2 16.1c.4-1.8 1.6-3 2.9-3",
				stroke: "currentColor",
				strokeWidth: "0.9",
				strokeLinecap: "round",
				className: "text-clay",
				opacity: "0.9"
			})
		]
	});
}
function DropdownMenu(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, { ...props });
}
function DropdownMenuTrigger(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, { ...props });
}
function DropdownMenuContent({ className, sideOffset = 6, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		sideOffset,
		className: cn("z-50 min-w-44 overflow-hidden rounded-xl bg-popover p-1 text-sm text-popover-foreground shadow-hairline", className),
		...props
	}) });
}
function DropdownMenuItem({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
		className: cn("flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 outline-none select-none", "focus:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-40", className),
		...props
	});
}
function DropdownMenuSeparator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
		className: cn("my-1 h-px bg-border", className),
		...props
	});
}
function DropdownMenuLabel({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
		className: cn("px-2.5 py-1.5 text-xs text-muted-foreground", className),
		...props
	});
}
function Dialog(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, { ...props });
}
function DialogPortal(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortal$1, { ...props });
}
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		className: cn("fixed inset-0 z-50 bg-ink/70", className),
		...props
	});
}
function DialogContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent$1, {
		className: cn("fixed top-1/2 left-1/2 z-50 w-[min(28rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-card p-5 shadow-hairline", className),
		...props,
		children
	})] });
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("text-base font-medium tracking-tight", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("mt-1 text-sm text-muted-foreground", className),
		...props
	});
}
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		suppressHydrationWarning: true,
		className: cn("flex h-10 w-full rounded-lg bg-muted px-3 text-sm text-foreground shadow-hairline placeholder:text-muted-foreground", "focus-visible:outline-none focus-visible:shadow-[0_0_0_1px_var(--color-ring)]", "disabled:cursor-not-allowed disabled:opacity-40", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		suppressHydrationWarning: true,
		className: cn("flex min-h-20 w-full resize-none rounded-lg bg-transparent px-1 py-1 text-sm text-foreground placeholder:text-muted-foreground", "focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40", className),
		...props
	});
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
	content: "You are in AgentSam Work.\n\nThis pane is a **stored trail**. Projects hold the workspace. Artifacts catch files, previews, and deploys. The CLI is a real xterm over a virtual git + wrangler bench — side chats stay ephemeral unless you keep them.\n\nWhat are you working on?",
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
		if (current && current.messages.length === 0 && current.title === "New trail") return;
		const trail = newTrail({ projectId: get().activeProjectId });
		set((s) => ({
			trails: [trail, ...s.trails],
			activeTrailId: trail.id,
			navView: "trails"
		}));
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
	enqueueCommand: (cmd) => set((s) => ({
		pendingCommands: [...s.pendingCommands, cmd],
		terminalOpen: true
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
		const shaped = ensureShape(persisted ?? {});
		return {
			...current,
			...shaped
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
		activeSideTabId: s.activeSideTabId
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
function groupTrails(trails, query) {
	const q = query.trim().toLowerCase();
	const filtered = q ? trails.filter((t) => t.title.toLowerCase().includes(q) || t.messages.some((m) => m.content.toLowerCase().includes(q))) : trails;
	const pinned = filtered.filter((t) => t.pinned);
	const rest = filtered.filter((t) => !t.pinned).sort((a, b) => b.updatedAt - a.updatedAt);
	const now = Date.now();
	const day = 864e5;
	return {
		pinned,
		today: rest.filter((t) => now - t.updatedAt < day),
		yesterday: rest.filter((t) => now - t.updatedAt >= day && now - t.updatedAt < 2 * day),
		earlier: rest.filter((t) => now - t.updatedAt >= 2 * day)
	};
}
function TrailRow({ trail, onRename }) {
	const active = useWorkStore((s) => s.activeTrailId === trail.id);
	const setActiveTrail = useWorkStore((s) => s.setActiveTrail);
	const pinTrail = useWorkStore((s) => s.pinTrail);
	const deleteTrail = useWorkStore((s) => s.deleteTrail);
	const setMobileNavOpen = useWorkStore((s) => s.setMobileNavOpen);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("group flex items-center rounded-lg", active ? "bg-muted" : "hover:bg-muted/60"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => {
				setActiveTrail(trail.id);
				setMobileNavOpen(false);
			},
			className: "flex min-w-0 flex-1 items-center gap-2 px-2.5 py-2 text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-0 flex-1 truncate text-sm",
				children: trail.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "shrink-0 text-[11px] text-muted-foreground tabular-nums",
				children: shortTime(trail.updatedAt)
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				size: "icon-sm",
				variant: "ghost",
				className: "mr-1 opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100 max-md:opacity-100",
				"aria-label": `Trail actions for ${trail.title}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "size-4" })
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
			align: "end",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
					onSelect: () => onRename(trail),
					children: "Rename"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					onSelect: () => pinTrail(trail.id),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pin, { className: "size-3.5" }), trail.pinned ? "Unpin" : "Pin"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					className: "text-destructive",
					onSelect: () => deleteTrail(trail.id),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), "Delete"]
				})
			]
		})] })]
	});
}
function Section({ label, trails, onRename }) {
	if (!trails.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-2.5 pb-1 text-[11px] tracking-[0.12em] text-muted-foreground uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-0.5",
			children: trails.map((trail) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrailRow, {
				trail,
				onRename
			}, trail.id))
		})]
	});
}
function Sidebar() {
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
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [title, setTitle] = (0, import_react.useState)("");
	const [newProjectOpen, setNewProjectOpen] = (0, import_react.useState)(false);
	const [projectName, setProjectName] = (0, import_react.useState)("");
	const [renamingProject, setRenamingProject] = (0, import_react.useState)(null);
	const projectTrails = (0, import_react.useMemo)(() => trails.filter((t) => t.projectId === activeProjectId), [trails, activeProjectId]);
	const groups = (0, import_react.useMemo)(() => groupTrails(projectTrails, search), [projectTrails, search]);
	const project = projects.find((p) => p.id === activeProjectId) ?? projects[0];
	const artifacts = [...project.files].sort((a, b) => b.updatedAt - a.updatedAt);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full bg-sidebar",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex w-12 shrink-0 flex-col items-center gap-1 border-r border-border py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioMark, { className: "mb-2 size-7" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RailButton, {
						label: "Trails",
						active: navView === "trails",
						onClick: () => setNavView("trails"),
						icon: MessageSquare
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RailButton, {
						label: "Projects",
						active: navView === "projects",
						onClick: () => setNavView("projects"),
						icon: FolderGit2
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RailButton, {
						label: "Artifacts",
						active: navView === "artifacts",
						onClick: () => setNavView("artifacts"),
						icon: Box
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RailButton, {
						label: "CLI",
						onClick: () => openSideTab("terminal"),
						icon: SquareTerminal
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RailButton, {
						label: "Files",
						onClick: () => openSideTab("files", { ephemeral: false }),
						icon: FileCode
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-auto flex flex-col gap-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RailButton, {
							label: "Ship",
							onClick: () => openSideTab("deploy", { ephemeral: false }),
							icon: Upload
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 px-3 pt-4 pb-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-medium tracking-tight",
									children: project.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground",
									children: navView === "projects" ? "Projects" : navView === "artifacts" ? "Artifacts" : "Work"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "icon-sm",
								variant: "ghost",
								className: "ml-auto hidden text-foreground md:inline-flex",
								"aria-label": "Collapse sidebar",
								onClick: toggleSidebar,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeft, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "icon-sm",
								variant: "ghost",
								className: "text-foreground md:ml-0",
								"aria-label": navView === "projects" ? "New project" : "New trail",
								onClick: () => {
									if (navView === "projects") {
										setProjectName("");
										setNewProjectOpen(true);
									} else startTrail();
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
							})
						]
					}),
					navView === "trails" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-3 pb-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex h-10 items-center gap-2 rounded-lg bg-muted px-2.5 shadow-hairline",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: search,
								onChange: (e) => setSearch(e.target.value),
								placeholder: "Search trails",
								className: "h-full w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "scrollbar-thin flex-1 overflow-y-auto px-2 pb-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
								label: "Pinned",
								trails: groups.pinned,
								onRename: (t) => {
									setEditing(t);
									setTitle(t.title);
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
								label: "Today",
								trails: groups.today,
								onRename: (t) => {
									setEditing(t);
									setTitle(t.title);
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
								label: "Yesterday",
								trails: groups.yesterday,
								onRename: (t) => {
									setEditing(t);
									setTitle(t.title);
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
								label: "Earlier",
								trails: groups.earlier,
								onRename: (t) => {
									setEditing(t);
									setTitle(t.title);
								}
							})
						]
					})] }) : null,
					navView === "projects" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "scrollbar-thin flex-1 overflow-y-auto px-2 pb-4",
						children: projects.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("group mb-0.5 flex items-center rounded-lg", item.id === activeProjectId ? "bg-muted" : "hover:bg-muted/60"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "flex min-w-0 flex-1 flex-col px-2.5 py-2 text-left",
								onClick: () => setActiveProject(item.id),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate text-sm",
									children: item.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[11px] text-muted-foreground",
									children: [
										item.files.length,
										" files · ",
										trails.filter((t) => t.projectId === item.id).length,
										" trails"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									size: "icon-sm",
									variant: "ghost",
									className: "mr-1 opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100 max-md:opacity-100",
									"aria-label": `Project actions for ${item.name}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "size-4" })
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
								align: "end",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
										onSelect: () => {
											setRenamingProject(item);
											setProjectName(item.name);
										},
										children: "Rename"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
										className: "text-destructive",
										disabled: projects.length <= 1,
										onSelect: () => deleteProject(item.id),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), "Delete"]
									})
								]
							})] })]
						}, item.id))
					}) : null,
					navView === "artifacts" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "scrollbar-thin flex-1 overflow-y-auto px-2 pb-4",
						children: artifacts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-2.5 py-3 text-sm text-muted-foreground",
							children: "No artifacts on this project yet."
						}) : artifacts.map((file) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left hover:bg-muted/60",
							onClick: () => {
								if (file.kind === "preview" || file.path.endsWith(".html")) openSideTab("browser", {
									title: file.path,
									srcdoc: file.content,
									ephemeral: false
								});
								else if (file.kind === "deploy" && file.url) openSideTab("browser", {
									url: file.url,
									title: file.title ?? "Deploy",
									ephemeral: false
								});
								else selectFile(file.id);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { className: "size-3.5 shrink-0 text-stone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-0 flex-1 truncate text-sm",
								children: file.title ?? file.path
							})]
						}, file.id))
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-border px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] tracking-[0.14em] text-muted-foreground uppercase",
							children: "InnerAnimalMedia"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-xs text-clay",
							children: "Studio"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: Boolean(editing),
				onOpenChange: (open) => !open && setEditing(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Rename trail" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "The name appears in the stored trail list." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-4 flex flex-col gap-3",
						onSubmit: (e) => {
							e.preventDefault();
							if (editing) renameTrail(editing.id, title);
							setEditing(null);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: title,
							onChange: (e) => setTitle(e.target.value),
							autoFocus: true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								onClick: () => setEditing(null),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								children: "Save"
							})]
						})]
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: newProjectOpen,
				onOpenChange: setNewProjectOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "New project" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "A workspace with files, git, and ship targets." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-4 flex flex-col gap-3",
						onSubmit: (e) => {
							e.preventDefault();
							createProject(projectName || "Untitled");
							setNewProjectOpen(false);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: projectName,
							onChange: (e) => setProjectName(e.target.value),
							placeholder: "Name",
							autoFocus: true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								onClick: () => setNewProjectOpen(false),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								children: "Create"
							})]
						})]
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: Boolean(renamingProject),
				onOpenChange: (open) => !open && setRenamingProject(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Rename project" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "The name is local to this studio." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-4 flex flex-col gap-3",
						onSubmit: (e) => {
							e.preventDefault();
							if (renamingProject) renameProject(renamingProject.id, projectName);
							setRenamingProject(null);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: projectName,
							onChange: (e) => setProjectName(e.target.value),
							autoFocus: true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								onClick: () => setRenamingProject(null),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								children: "Save"
							})]
						})]
					})
				] })
			})
		]
	});
}
function RailButton({ label, icon: Icon, active, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": label,
		title: label,
		onClick,
		className: cn("flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground", active && "bg-muted text-foreground"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
	});
}
function CopyButton({ text }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: "inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground",
		onClick: async () => {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			setTimeout(() => setCopied(false), 1200);
		},
		"aria-label": copied ? "Copied" : "Copy",
		children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" })
	});
}
var SHELL_LANGS = /* @__PURE__ */ new Set([
	"bash",
	"sh",
	"zsh",
	"shell",
	"cli",
	"console"
]);
function CodeBlock({ language, text }) {
	const selectFile = useWorkStore((s) => s.selectFile);
	const upsertFile = useWorkStore((s) => s.upsertFile);
	const enqueueCommand = useWorkStore((s) => s.enqueueCommand);
	const artifact = (0, import_react.useMemo)(() => extractArtifacts("```" + language + "\n" + text + "\n```"), [language, text])[0];
	const runnable = SHELL_LANGS.has((language.split(/\s+/)[0] ?? "").toLowerCase());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden rounded-xl bg-ink shadow-hairline",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 border-b border-border px-3 py-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[11px] tracking-wide text-muted-foreground uppercase",
				children: artifact?.path ?? language ?? "code"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "ml-auto flex items-center",
				children: [
					runnable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "icon-sm",
						variant: "ghost",
						"aria-label": "Run in CLI",
						onClick: () => {
							for (const line of text.split("\n")) {
								const cmd = line.replace(/^\s*\$\s?/, "").trim();
								if (cmd && !cmd.startsWith("#")) enqueueCommand(cmd);
							}
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5" })
					}) : null,
					artifact ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "icon-sm",
						variant: "ghost",
						"aria-label": "Open in files",
						onClick: () => {
							const file = {
								...artifact,
								language: artifact.language || languageFromPath(artifact.path)
							};
							const projectId = useWorkStore.getState().activeProjectId;
							upsertFile(projectId, file);
							const saved = useWorkStore.getState().projects.find((p) => p.id === projectId)?.files.find((f) => f.path === file.path);
							if (saved) selectFile(saved.id);
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCode, { className: "size-3.5" })
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, { text })
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
			className: "overflow-x-auto p-3 font-mono text-[12.5px] leading-relaxed text-paper",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: text })
		})]
	});
}
function MessageMarkdown({ content }) {
	const openSideTab = useWorkStore((s) => s.openSideTab);
	const setTabUrl = useWorkStore((s) => s.setTabUrl);
	const sideTabs = useWorkStore((s) => s.sideTabs);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, {
			remarkPlugins: [remarkGfm],
			components: {
				a: ({ href, children }) => {
					if (!href) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children });
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "inline text-left text-accent underline decoration-accent/40 underline-offset-[3px]",
						onClick: () => {
							const existing = sideTabs.find((t) => t.kind === "browser");
							if (existing) {
								useWorkStore.getState().setActiveSideTab(existing.id);
								setTabUrl(existing.id, href);
								useWorkStore.setState({ sideOpen: true });
								return;
							}
							openSideTab("browser", {
								url: href,
								title: "Browser",
								ephemeral: false
							});
						},
						children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "ml-1 inline size-3 opacity-70" })]
					});
				},
				pre: ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "not-prose",
					children
				}),
				code: ({ className, children, ...props }) => {
					const text = String(children).replace(/\n$/, "");
					const lang = /language-(\S+)/.exec(className ?? "")?.[1];
					if (!className && !text.includes("\n")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
						className: cn("rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.85em]", className),
						...props,
						children
					});
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock, {
						language: lang ?? "text",
						text
					});
				}
			},
			children: content
		})
	});
}
function ModelSelect({ compact = false }) {
	const modelId = useWorkStore((s) => s.modelId);
	const setModelId = useWorkStore((s) => s.setModelId);
	const model = getModel(modelId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: cn("inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground", compact && "px-1.5"),
			"aria-label": "Select model",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "max-w-28 truncate",
				children: compact ? model.short : model.label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-3 opacity-70" })]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
		align: "start",
		className: "w-64",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: "Model" }), STUDIO_MODELS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
			onSelect: () => setModelId(item.id),
			className: cn(item.id === modelId && "bg-muted"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] text-muted-foreground",
					children: item.hint
				})]
			})
		}, item.id))]
	})] });
}
function Composer({ targetId, targetKind, placeholder = "Work with AgentSam" }) {
	const value = useWorkStore((s) => s.drafts[targetId] ?? "");
	const setDraft = useWorkStore((s) => s.setDraft);
	const send = useWorkStore((s) => s.send);
	const stop = useWorkStore((s) => s.stop);
	const streaming = useWorkStore((s) => s.streamingIds.includes(targetId));
	const fileRef = (0, import_react.useRef)(null);
	const areaRef = (0, import_react.useRef)(null);
	function resize() {
		const el = areaRef.current;
		if (!el) return;
		el.style.height = "auto";
		el.style.height = `${Math.min(el.scrollHeight, 220)}px`;
	}
	function onKeyDown(event) {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			if (!streaming) send(targetId, targetKind);
		}
	}
	async function onFiles(files) {
		if (!files?.length) return;
		const chunks = [];
		for (const file of Array.from(files).slice(0, 4)) {
			if (file.size > 2e5) continue;
			const text = await file.text();
			chunks.push(`Attached \`${file.name}\`:\n\`\`\`${file.name}\n${text.slice(0, 8e3)}\n\`\`\``);
		}
		if (!chunks.length) return;
		setDraft(targetId, [value, ...chunks].filter(Boolean).join("\n\n"));
		requestAnimationFrame(resize);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "px-3 pb-24 md:px-4 md:pb-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("mx-auto flex w-full max-w-3xl flex-col rounded-2xl bg-card p-2 pl-3 shadow-hairline", "focus-within:shadow-[0_0_0_1px_var(--color-ring)]"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				ref: areaRef,
				value,
				rows: 1,
				placeholder,
				onChange: (e) => {
					setDraft(targetId, e.target.value);
					resize();
				},
				onKeyDown,
				onInput: resize,
				onPaste: (e) => {
					if (e.clipboardData.files.length) {
						e.preventDefault();
						onFiles(e.clipboardData.files);
					}
				},
				className: "max-h-52 min-h-[44px] py-2.5",
				"aria-label": placeholder
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1 pt-1 max-md:pr-14",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileRef,
						type: "file",
						className: "hidden",
						suppressHydrationWarning: true,
						multiple: true,
						onChange: (e) => {
							onFiles(e.target.files);
							e.target.value = "";
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "icon-sm",
						variant: "ghost",
						"aria-label": "Attach a file",
						onClick: () => fileRef.current?.click(),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelSelect, { compact: true }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ml-auto" }),
					streaming ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "icon-sm",
						variant: "secondary",
						"aria-label": "Stop",
						className: "rounded-full",
						onClick: () => stop(targetId),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-3 fill-current" })
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "icon-sm",
						"aria-label": "Send",
						className: "rounded-full",
						disabled: !value.trim(),
						onClick: () => void send(targetId, targetKind),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-4" })
					})
				]
			})]
		})
	});
}
var STARTERS = [
	"Sketch a dual-pane React layout with an ephemeral helper chat",
	"Add a landing hero to index.html and preview it",
	"Prepare this workspace for Cloudflare Pages and GitHub Actions"
];
function MessageBubble({ message, trailId, streaming, startedAt }) {
	const [now, setNow] = (0, import_react.useState)(Date.now());
	(0, import_react.useEffect)(() => {
		if (!streaming) return;
		const t = window.setInterval(() => setNow(Date.now()), 250);
		return () => window.clearInterval(t);
	}, [streaming]);
	if (message.role === "user") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-end",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "max-w-[min(100%,40rem)] rounded-2xl bg-accent px-4 py-3 text-sm leading-relaxed text-accent-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "whitespace-pre-wrap",
				children: message.content
			})
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			streaming && !message.content ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "thinking text-sm",
				children: ["Thinking", startedAt ? ` · ${formatElapsed(now - startedAt)}` : ""]
			}) : null,
			streaming && message.content ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: ["Working", startedAt ? ` · ${formatElapsed(now - startedAt)}` : ""]
			}) : null,
			message.content ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageMarkdown, {
				content: message.content,
				trailId
			}) : null
		]
	});
}
function MessageList({ messages, trailId, streaming }) {
	const scroller = (0, import_react.useRef)(null);
	const stick = (0, import_react.useRef)(true);
	(0, import_react.useEffect)(() => {
		const el = scroller.current;
		if (!el || !stick.current) return;
		el.scrollTop = el.scrollHeight;
	}, [messages, streaming]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: scroller,
		className: "scrollbar-thin flex-1 overflow-y-auto px-4 py-6",
		onScroll: (e) => {
			const el = e.currentTarget;
			stick.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto flex w-full max-w-3xl flex-col gap-6",
			children: messages.map((message, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageBubble, {
				message,
				trailId,
				streaming: streaming && index === messages.length - 1 && message.role === "assistant",
				startedAt: streaming ? message.createdAt : void 0
			}, message.id))
		})
	});
}
function TrailThread() {
	const trail = useActiveTrail();
	const send = useWorkStore((s) => s.send);
	const streaming = useWorkStore((s) => s.streamingIds.includes(trail.id));
	const empty = trail.messages.length === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col",
		children: [
			empty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyTrail, { onPrompt: (text) => void send(trail.id, "trail", text) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageList, {
				messages: trail.messages,
				trailId: trail.id,
				streaming
			}),
			trail.id === "trail-studio" && trail.messages.length === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto mb-2 flex w-full max-w-3xl flex-wrap gap-2 px-4",
				children: STARTERS.map((prompt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					className: "h-auto max-w-full rounded-full px-3 py-2 text-left text-xs font-normal text-muted-foreground",
					onClick: () => void send(trail.id, "trail", prompt),
					children: prompt
				}, prompt))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Composer, {
				targetId: trail.id,
				targetKind: "trail"
			})
		]
	});
}
function EmptyTrail({ onPrompt }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col items-center justify-center px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioMark, { className: "mb-4 size-12" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-medium tracking-tight text-balance",
				children: "What is on the bench?"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-sm text-sm text-muted-foreground text-pretty",
				children: "This trail is stored on the project. Side chats stay ephemeral until you keep them."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 flex max-w-lg flex-wrap justify-center gap-2",
				children: STARTERS.map((prompt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					className: "h-auto rounded-full px-3 py-2 text-left text-xs font-normal text-muted-foreground",
					onClick: () => onPrompt(prompt),
					children: prompt
				}, prompt))
			})
		]
	});
}
var BOOKMARKS = [
	{
		label: "MDN",
		url: "https://developer.mozilla.org/"
	},
	{
		label: "Wikipedia",
		url: "https://en.wikipedia.org/wiki/Main_Page"
	},
	{
		label: "npm",
		url: "https://www.npmjs.com/"
	},
	{
		label: "DuckDuckGo",
		url: "https://duckduckgo.com/"
	}
];
function resolveInput(raw) {
	const value = raw.trim();
	if (!value) return "";
	if (/^https?:\/\//i.test(value)) return value;
	if (value.includes(" ") || !value.includes(".")) return `https://duckduckgo.com/?q=${encodeURIComponent(value)}`;
	return `https://${value}`;
}
function BrowserStage({ tab }) {
	const setTabUrl = useWorkStore((s) => s.setTabUrl);
	const [draft, setDraft] = (0, import_react.useState)(tab.url);
	const src = tab.srcdoc ? void 0 : tab.url;
	const history = (0, import_react.useMemo)(() => tab.url ? [tab.url] : [], [tab.url]);
	const [index, setIndex] = (0, import_react.useState)(0);
	function go(url) {
		const next = resolveInput(url);
		if (!next) return;
		setDraft(next);
		setTabUrl(tab.id, next);
		setIndex(history.length);
	}
	function onSubmit(event) {
		event.preventDefault();
		go(draft);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "flex items-center gap-1 border-b border-border px-2 py-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "icon-sm",
					variant: "ghost",
					"aria-label": "Back",
					disabled: index <= 0,
					onClick: () => {
						const prev = history[index - 1];
						if (prev) {
							setIndex(index - 1);
							setDraft(prev);
							setTabUrl(tab.id, prev);
						}
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "icon-sm",
					variant: "ghost",
					"aria-label": "Forward",
					disabled: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "icon-sm",
					variant: "ghost",
					"aria-label": "Reload",
					onClick: () => tab.url && setTabUrl(tab.id, tab.url),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: draft,
						onChange: (e) => setDraft(e.target.value),
						placeholder: "Search or enter a URL",
						className: "h-9 pl-8",
						"aria-label": "Address"
					})]
				})
			]
		}), tab.srcdoc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
			title: tab.title,
			srcDoc: tab.srcdoc,
			sandbox: "allow-scripts allow-forms",
			className: "h-full w-full bg-paper"
		}) : src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
			title: tab.title,
			src,
			className: "h-full w-full bg-card",
			sandbox: "allow-scripts allow-same-origin allow-forms allow-popups"
		}, src) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col items-center justify-center px-6 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "mb-3 size-8 text-stone" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-medium",
					children: "Browser"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-sm text-sm text-muted-foreground text-pretty",
					children: "Look something up without leaving the trail. Links in replies open here."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 flex flex-wrap justify-center gap-2",
					children: BOOKMARKS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						className: "rounded-full",
						onClick: () => go(item.url),
						children: item.label
					}, item.url))
				})
			]
		})]
	});
}
function zipProject(files, name) {
	const entries = {};
	for (const file of files) {
		const path = file.path.replace(/^\/+/, "");
		if (!path) continue;
		entries[path] = strToU8(file.content);
	}
	if (!Object.keys(entries).length) entries["README.md"] = strToU8(`# ${name}\n`);
	return zipSync(entries, { level: 6 });
}
function downloadBytes(bytes, filename, mime) {
	const blob = new Blob([bytes], { type: mime });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}
function downloadText(content, filename) {
	downloadBytes(strToU8(content), filename, "text/plain;charset=utf-8");
}
var MonacoPane = (0, import_react.lazy)(() => import("./monaco-pane-uCfkRsvM.mjs").then((m) => ({ default: m.MonacoPane })));
function FilesStage({ tab }) {
	const project = useActiveProject();
	const upsertFile = useWorkStore((s) => s.upsertFile);
	const deleteFile = useWorkStore((s) => s.deleteFile);
	const selectFile = useWorkStore((s) => s.selectFile);
	const openSideTab = useWorkStore((s) => s.openSideTab);
	const selected = project.files.find((f) => f.id === tab.fileId) ?? project.files[0] ?? null;
	const [creating, setCreating] = (0, import_react.useState)(false);
	const [path, setPath] = (0, import_react.useState)("src/untitled.ts");
	const files = [...project.files].sort((a, b) => a.path.localeCompare(b.path));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex w-44 shrink-0 flex-col border-r border-border bg-sidebar md:w-52",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 border-b border-border px-2 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "flex-1 truncate px-1 text-xs text-muted-foreground",
						children: "Files"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "icon-sm",
						variant: "ghost",
						"aria-label": "New file",
						onClick: () => setCreating(true),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "scrollbar-thin flex-1 overflow-y-auto p-1",
					children: files.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-2 py-3 text-xs text-muted-foreground",
						children: "Captured files land here when AgentSam writes code."
					}) : files.map((file) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => selectFile(file.id),
						className: cn("flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-xs", selected?.id === file.id ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/60"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCode, { className: "size-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: file.path
						})]
					}, file.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 border-b border-border px-2 py-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-0 flex-1 truncate px-1 font-mono text-xs text-muted-foreground",
							children: selected.path
						}),
						selected.language === "html" || selected.path.endsWith(".html") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "icon-sm",
							variant: "ghost",
							"aria-label": "Preview in browser",
							onClick: () => openSideTab("browser", {
								title: selected.path,
								srcdoc: selected.content,
								ephemeral: false
							}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-4" })
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "icon-sm",
							variant: "ghost",
							"aria-label": "Download",
							onClick: () => downloadText(selected.content, selected.path.split("/").pop() || selected.path),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "icon-sm",
							variant: "ghost",
							"aria-label": "Delete file",
							onClick: () => deleteFile(project.id, selected.id),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-h-0 flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
						fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-full items-center justify-center text-sm text-muted-foreground",
							children: "Opening editor"
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonacoPane, {
							file: selected,
							onChange: (value) => upsertFile(project.id, {
								...selected,
								content: value,
								updatedAt: Date.now(),
								origin: "editor"
							})
						})
					})
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 flex-col items-center justify-center px-6 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCode, { className: "mb-3 size-8 text-stone" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-medium",
							children: "No file open"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 max-w-sm text-sm text-muted-foreground text-pretty",
							children: "Ask AgentSam to write something, or add a file of your own."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							className: "mt-4",
							onClick: () => setCreating(true),
							children: "New file"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: creating,
				onOpenChange: setCreating,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "New file" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Stored on this project and opened in Monaco." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-4 flex flex-col gap-3",
						onSubmit: (e) => {
							e.preventDefault();
							const next = path.trim().replace(/^\/+/, "");
							if (!next) return;
							const file = {
								id: uid(),
								path: next,
								language: languageFromPath(next),
								content: "",
								updatedAt: Date.now(),
								kind: next.endsWith(".html") ? "preview" : "code",
								origin: "editor"
							};
							upsertFile(project.id, file);
							const saved = useWorkStore.getState().projects.find((p) => p.id === project.id)?.files.find((f) => f.path === next);
							if (saved) selectFile(saved.id);
							setCreating(false);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: path,
							onChange: (e) => setPath(e.target.value),
							autoFocus: true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								onClick: () => setCreating(false),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								children: "Create"
							})]
						})]
					})
				] })
			})
		]
	});
}
function kindOf(file) {
	if (file.kind) return file.kind;
	if (file.path.endsWith(".html")) return "preview";
	if (file.path.includes(".agentsam/deploys")) return "deploy";
	return "code";
}
function ArtifactsStage() {
	const project = useActiveProject();
	const selectFile = useWorkStore((s) => s.selectFile);
	const deleteFile = useWorkStore((s) => s.deleteFile);
	const openSideTab = useWorkStore((s) => s.openSideTab);
	const files = [...project.files].sort((a, b) => b.updatedAt - a.updatedAt);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-b border-border px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-medium",
				children: "Artifacts"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-xs text-muted-foreground",
				children: "Files, previews, and deploys captured on this project."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "scrollbar-thin flex-1 overflow-y-auto p-2",
			children: files.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-full flex-col items-center justify-center px-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { className: "mb-3 size-8 text-stone" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-medium",
						children: "Nothing captured yet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 max-w-xs text-sm text-muted-foreground",
						children: "Code from trails, HTML previews, and ship receipts land here."
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-1",
				children: files.map((file) => {
					const kind = kindOf(file);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "group flex items-center gap-2 rounded-xl px-2 py-2 hover:bg-muted/60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex min-w-0 flex-1 items-center gap-2 text-left",
							onClick: () => {
								if (kind === "preview") {
									openSideTab("browser", {
										title: file.path,
										srcdoc: file.content,
										ephemeral: false
									});
									return;
								}
								if (kind === "deploy" && file.url) {
									openSideTab("browser", {
										url: file.url,
										title: file.title ?? "Deploy",
										ephemeral: false
									});
									return;
								}
								selectFile(file.id);
							},
							children: [kind === "deploy" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cloud, { className: "size-3.5 shrink-0 text-stone" }) : kind === "preview" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-3.5 shrink-0 text-stone" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCode, { className: "size-3.5 shrink-0 text-stone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate text-sm",
									children: file.title ?? file.path
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "block text-[11px] text-muted-foreground",
									children: [
										kind,
										" · ",
										shortTime(file.updatedAt)
									]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "icon-sm",
							variant: "ghost",
							className: cn("opacity-0 group-hover:opacity-100 max-md:opacity-100"),
							"aria-label": `Delete ${file.path}`,
							onClick: () => deleteFile(project.id, file.id),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
						})]
					}, file.id);
				})
			})
		})]
	});
}
var KEY = "agentsam-ship-secrets";
var EMPTY = {
	githubToken: "",
	cloudflareToken: ""
};
function readSecrets() {
	if (typeof window === "undefined") return { ...EMPTY };
	try {
		const raw = window.localStorage.getItem(KEY);
		if (!raw) return { ...EMPTY };
		const parsed = JSON.parse(raw);
		return {
			githubToken: typeof parsed.githubToken === "string" ? parsed.githubToken : "",
			cloudflareToken: typeof parsed.cloudflareToken === "string" ? parsed.cloudflareToken : ""
		};
	} catch {
		return { ...EMPTY };
	}
}
function writeSecrets(next) {
	if (typeof window === "undefined") return;
	const merged = {
		...readSecrets(),
		...next
	};
	window.localStorage.setItem(KEY, JSON.stringify(merged));
}
function clearSecrets() {
	if (typeof window === "undefined") return;
	window.localStorage.removeItem(KEY);
}
async function postJson$1(url, body) {
	const res = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body)
	});
	const json = await res.json().catch(() => ({}));
	if (!res.ok) throw new Error(json.error || `Request failed ${res.status}`);
	return json;
}
function DeployStage() {
	const project = useActiveProject();
	const patchProject = useWorkStore((s) => s.patchProject);
	const upsertFile = useWorkStore((s) => s.upsertFile);
	const setSettingsOpen = useWorkStore((s) => s.setSettingsOpen);
	const [busy, setBusy] = (0, import_react.useState)(null);
	function saveDeploy(key, value) {
		patchProject(project.id, { deploy: {
			...project.deploy,
			[key]: value
		} });
	}
	async function pushGithub() {
		const token = readSecrets().githubToken;
		if (!token) {
			setSettingsOpen(true);
			toast("Add a GitHub token first");
			return;
		}
		const owner = project.deploy.githubOwner.trim();
		const repo = project.deploy.githubRepo.trim() || slugify(project.name);
		if (!owner || !repo) {
			toast("Owner and repo are required");
			return;
		}
		setBusy("github");
		try {
			const result = await postJson$1("/api/github", {
				token,
				owner,
				repo,
				branch: project.deploy.githubBranch || "main",
				message: `ship: ${project.name}`,
				files: project.files.map((f) => ({
					path: f.path,
					content: f.content
				}))
			});
			const url = result.url ?? `https://github.com/${owner}/${repo}`;
			patchProject(project.id, { deploy: {
				...project.deploy,
				githubOwner: owner,
				githubRepo: repo,
				lastGithubUrl: url,
				lastGithubAt: Date.now()
			} });
			upsertFile(project.id, {
				id: uid(),
				path: `.agentsam/deploys/github-${Date.now()}.log`,
				language: languageFromPath("log"),
				content: `Pushed ${result.files ?? project.files.length} files\n${url}\n${result.sha ?? ""}`,
				updatedAt: Date.now(),
				kind: "deploy",
				origin: "deploy",
				title: "GitHub push",
				url
			});
			toast("Pushed to GitHub");
		} catch (err) {
			toast(err instanceof Error ? err.message : "GitHub push failed");
		} finally {
			setBusy(null);
		}
	}
	async function deployCloudflare() {
		const token = readSecrets().cloudflareToken;
		if (!token) {
			setSettingsOpen(true);
			toast("Add a Cloudflare token first");
			return;
		}
		const accountId = project.deploy.cloudflareAccountId.trim();
		const name = project.deploy.cloudflareProject.trim() || slugify(project.name);
		if (!accountId) {
			toast("Cloudflare account id is required");
			return;
		}
		setBusy("cloudflare");
		try {
			const result = await postJson$1("/api/cloudflare", {
				token,
				accountId,
				projectName: name,
				files: project.files.map((f) => ({
					path: f.path,
					content: f.content
				}))
			});
			const url = result.url ?? `https://${name}.pages.dev`;
			patchProject(project.id, { deploy: {
				...project.deploy,
				cloudflareProject: name,
				lastCloudflareUrl: url,
				lastCloudflareAt: Date.now()
			} });
			upsertFile(project.id, {
				id: uid(),
				path: `.agentsam/deploys/cloudflare-${Date.now()}.log`,
				language: "plaintext",
				content: `Deployed ${result.files ?? project.files.length} files\n${url}`,
				updatedAt: Date.now(),
				kind: "deploy",
				origin: "deploy",
				title: "Cloudflare Pages",
				url
			});
			toast("Deployed to Cloudflare Pages");
		} catch (err) {
			toast(err instanceof Error ? err.message : "Cloudflare deploy failed");
		} finally {
			setBusy(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "scrollbar-thin h-full overflow-y-auto px-4 py-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex w-full max-w-md flex-col gap-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-medium tracking-tight",
					children: "Ship"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground text-pretty",
					children: "Push the workspace to GitHub, or upload it as a Cloudflare Pages project. Tokens stay in this browser."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-2xl bg-card p-4 shadow-hairline",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "size-4 text-stone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium",
							children: "GitHub"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "owner",
								value: project.deploy.githubOwner,
								onChange: (e) => saveDeploy("githubOwner", e.target.value),
								"aria-label": "GitHub owner"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "repo",
									value: project.deploy.githubRepo,
									onChange: (e) => saveDeploy("githubRepo", e.target.value),
									"aria-label": "GitHub repo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "branch",
									className: "w-28",
									value: project.deploy.githubBranch,
									onChange: (e) => saveDeploy("githubBranch", e.target.value),
									"aria-label": "GitHub branch"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								onClick: () => void pushGithub(),
								disabled: busy !== null,
								children: busy === "github" ? "Pushing…" : "Push repository"
							}),
							project.deploy.lastGithubUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-xs text-muted-foreground",
								children: project.deploy.lastGithubUrl
							}) : null
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-2xl bg-card p-4 shadow-hairline",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cloud, { className: "size-4 text-stone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium",
							children: "Cloudflare Pages"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "account id",
								value: project.deploy.cloudflareAccountId,
								onChange: (e) => saveDeploy("cloudflareAccountId", e.target.value),
								"aria-label": "Cloudflare account id"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "project name",
								value: project.deploy.cloudflareProject,
								onChange: (e) => saveDeploy("cloudflareProject", e.target.value),
								"aria-label": "Cloudflare project name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								onClick: () => void deployCloudflare(),
								disabled: busy !== null,
								children: busy === "cloudflare" ? "Deploying…" : "Deploy pages"
							}),
							project.deploy.lastCloudflareUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-xs text-muted-foreground",
								children: project.deploy.lastCloudflareUrl
							}) : null
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					onClick: () => setSettingsOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-4" }), "Tokens"]
				})
			]
		})
	});
}
function TabIcon({ kind }) {
	if (kind === "chat") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-3.5" });
	if (kind === "browser") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-3.5" });
	if (kind === "artifacts") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { className: "size-3.5" });
	if (kind === "deploy") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-3.5" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCode, { className: "size-3.5" });
}
function SideStage() {
	const tabs = useWorkStore((s) => s.sideTabs);
	const activeId = useWorkStore((s) => s.activeSideTabId);
	const setActiveSideTab = useWorkStore((s) => s.setActiveSideTab);
	const closeSideTab = useWorkStore((s) => s.closeSideTab);
	const openSideTab = useWorkStore((s) => s.openSideTab);
	const setSideOpen = useWorkStore((s) => s.setSideOpen);
	const confirmId = useWorkStore((s) => s.confirmDiscardId);
	const setConfirmDiscard = useWorkStore((s) => s.setConfirmDiscard);
	const keepSideChat = useWorkStore((s) => s.keepSideChat);
	const tab = useActiveSideTab();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-12 items-center gap-1 border-b border-border px-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "scrollbar-thin flex min-w-0 flex-1 items-center gap-1 overflow-x-auto",
					children: [tabs.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("flex h-8 shrink-0 items-center rounded-full pl-2.5", item.id === activeId ? "bg-muted text-foreground" : "text-muted-foreground"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setActiveSideTab(item.id),
							className: "flex items-center gap-1.5 py-1 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabIcon, { kind: item.kind }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "max-w-28 truncate",
								children: item.title
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": `Close ${item.title}`,
							className: "rounded-full p-1.5 hover:bg-background hover:text-foreground",
							onClick: () => closeSideTab(item.id),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })
						})]
					}, item.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "icon-sm",
							variant: "ghost",
							"aria-label": "Add side pane",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
						align: "start",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								onSelect: () => openSideTab("chat"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-3.5" }), "Helper chat"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								onSelect: () => openSideTab("browser", { ephemeral: false }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-3.5" }), "Browser"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								onSelect: () => openSideTab("files", { ephemeral: false }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCode, { className: "size-3.5" }), "Files"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								onSelect: () => openSideTab("artifacts", { ephemeral: false }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { className: "size-3.5" }), "Artifacts"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								onSelect: () => openSideTab("deploy", { ephemeral: false }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-3.5" }), "Ship"]
							})
						]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "icon-sm",
					variant: "ghost",
					className: "ml-auto",
					"aria-label": "Close side stage",
					onClick: () => setSideOpen(false),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-0 flex-1",
				children: [
					tab?.kind === "chat" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideChat, { tabId: tab.id }) : null,
					tab?.kind === "browser" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrowserStage, { tab }) : null,
					tab?.kind === "files" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilesStage, { tab }) : null,
					tab?.kind === "artifacts" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtifactsStage, {}) : null,
					tab?.kind === "deploy" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeployStage, {}) : null,
					!tab ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-full flex-col items-center justify-center px-6 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "The side stage is empty."
						})
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: Boolean(confirmId),
				onOpenChange: (open) => !open && setConfirmDiscard(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Discard this helper chat?" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Side chats are ephemeral. Keep it as a stored trail, or discard it." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex justify-end gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								onClick: () => setConfirmDiscard(null),
								children: "Cancel"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "secondary",
								onClick: () => {
									if (confirmId) keepSideChat(confirmId);
									setConfirmDiscard(null);
								},
								children: "Keep trail"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "destructive",
								onClick: () => {
									if (confirmId) closeSideTab(confirmId, true);
								},
								children: "Discard"
							})
						]
					})
				] })
			})
		]
	});
}
function SideChat({ tabId }) {
	const tab = useWorkStore((s) => s.sideTabs.find((t) => t.id === tabId));
	const keepSideChat = useWorkStore((s) => s.keepSideChat);
	const trails = useWorkStore((s) => s.trails);
	const streaming = useWorkStore((s) => s.streamingIds.includes(tabId));
	if (!tab) return null;
	const parent = trails.find((t) => t.id === tab.parentTrailId);
	const empty = tab.messages.length === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 border-b border-border px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "min-w-0 flex-1 truncate text-xs text-muted-foreground",
					children: tab.ephemeral ? "Ephemeral helper · disappears unless you keep it" : `Kept as ${tab.title}`
				}), tab.ephemeral ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "sm",
					variant: "outline",
					className: "h-7 rounded-full",
					onClick: () => keepSideChat(tab.id),
					disabled: tab.messages.length === 0,
					children: "Keep trail"
				}) : null]
			}),
			parent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-3 mt-3 rounded-xl bg-muted px-3 py-2 text-xs text-muted-foreground",
				children: ["Continuing from ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-foreground",
					children: parent.title
				})]
			}) : null,
			empty ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col items-center justify-center px-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioMark, { className: "mb-3 size-10" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-medium",
						children: "Side chat"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 max-w-sm text-sm text-muted-foreground text-pretty",
						children: "Helper chats are temporary and disappear when you close the tab. Keep one to save it as a stored trail."
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageList, {
				messages: tab.messages,
				trailId: parent?.id,
				streaming
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Composer, {
				targetId: tab.id,
				targetKind: "side",
				placeholder: "Ask a helper"
			})
		]
	});
}
function CommandPalette() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const trails = useWorkStore((s) => s.trails);
	const projects = useWorkStore((s) => s.projects);
	const startTrail = useWorkStore((s) => s.startTrail);
	const setActiveTrail = useWorkStore((s) => s.setActiveTrail);
	const setActiveProject = useWorkStore((s) => s.setActiveProject);
	const openSideTab = useWorkStore((s) => s.openSideTab);
	const toggleSidebar = useWorkStore((s) => s.toggleSidebar);
	const toggleTerminal = useWorkStore((s) => s.toggleTerminal);
	const createProject = useWorkStore((s) => s.createProject);
	const setNavView = useWorkStore((s) => s.setNavView);
	(0, import_react.useEffect)(() => {
		function onKey(event) {
			if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
				event.preventDefault();
				setOpen((v) => !v);
			}
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Dialog, {
		open,
		onOpenChange: setOpen,
		label: "Command palette",
		overlayClassName: "fixed inset-0 z-50 bg-ink/60",
		contentClassName: "fixed top-[18vh] left-1/2 z-50 w-[min(36rem,calc(100vw-1.5rem))] -translate-x-1/2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Input, { placeholder: "Search trails, projects, or run a command" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.List, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Empty, { children: "Nothing matches." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Group, {
				heading: "Actions",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
						onSelect: () => {
							startTrail();
							setOpen(false);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "New trail"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
						onSelect: () => {
							createProject();
							setOpen(false);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderGit2, { className: "size-4" }), "New project"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
						onSelect: () => {
							openSideTab("chat");
							setOpen(false);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-4" }), "New side chat"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
						onSelect: () => {
							toggleTerminal();
							setOpen(false);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareTerminal, { className: "size-4" }), "Toggle CLI"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
						onSelect: () => {
							openSideTab("browser", { ephemeral: false });
							setOpen(false);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-4" }), "Open browser"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
						onSelect: () => {
							openSideTab("files", { ephemeral: false });
							setOpen(false);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCode, { className: "size-4" }), "Open files"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
						onSelect: () => {
							openSideTab("artifacts", { ephemeral: false });
							setOpen(false);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { className: "size-4" }), "Open artifacts"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
						onSelect: () => {
							openSideTab("deploy", { ephemeral: false });
							setOpen(false);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }), "Ship"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
						onSelect: () => {
							toggleSidebar();
							setOpen(false);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" }), "Toggle sidebar"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
				heading: "Projects",
				children: projects.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Item, {
					value: `project ${project.name}`,
					onSelect: () => {
						setActiveProject(project.id);
						setNavView("trails");
						setOpen(false);
					},
					children: project.name
				}, project.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
				heading: "Trails",
				children: trails.map((trail) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Item, {
					value: trail.title,
					onSelect: () => {
						setActiveTrail(trail.id);
						setOpen(false);
					},
					children: trail.title
				}, trail.id))
			})
		] })]
	});
}
function SettingsDialog() {
	const open = useWorkStore((s) => s.settingsOpen);
	const setSettingsOpen = useWorkStore((s) => s.setSettingsOpen);
	const [github, setGithub] = (0, import_react.useState)("");
	const [cloudflare, setCloudflare] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const secrets = readSecrets();
		setGithub(secrets.githubToken);
		setCloudflare(secrets.cloudflareToken);
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: setSettingsOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Ship tokens" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Stored only in this browser. Used to push GitHub repos and deploy Cloudflare Pages — never sent to AgentSam." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-4 flex flex-col gap-3",
				onSubmit: (e) => {
					e.preventDefault();
					writeSecrets({
						githubToken: github.trim(),
						cloudflareToken: cloudflare.trim()
					});
					setSettingsOpen(false);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1.5 text-xs text-muted-foreground",
						children: ["GitHub token", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "password",
							autoComplete: "off",
							value: github,
							onChange: (e) => setGithub(e.target.value),
							placeholder: "ghp_…"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1.5 text-xs text-muted-foreground",
						children: ["Cloudflare API token", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "password",
							autoComplete: "off",
							value: cloudflare,
							onChange: (e) => setCloudflare(e.target.value),
							placeholder: "Pages edit permission"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted-foreground",
						children: "CLI: export GITHUB_TOKEN=… · export CLOUDFLARE_API_TOKEN=…"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							onClick: () => {
								clearSecrets();
								setGithub("");
								setCloudflare("");
							},
							children: "Clear"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							children: "Save"
						})]
					})
				]
			})
		] })
	});
}
function normalizePath(input) {
	const raw = input.trim() || "/";
	const parts = (raw.startsWith("/") ? raw : `/${raw}`).split("/").filter((p) => p && p !== ".");
	const stack = [];
	for (const part of parts) if (part === "..") stack.pop();
	else stack.push(part);
	return `/${stack.join("/")}`;
}
function joinPath(cwd, input) {
	if (!input) return normalizePath(cwd || "/");
	if (input.startsWith("/")) return normalizePath(input);
	return normalizePath(`${cwd || "/"}/${input}`);
}
function toStoragePath(abs) {
	return normalizePath(abs).replace(/^\//, "");
}
function parentDir(abs) {
	const n = normalizePath(abs);
	if (n === "/") return "/";
	const i = n.lastIndexOf("/");
	return i <= 0 ? "/" : n.slice(0, i);
}
function baseName(abs) {
	const n = normalizePath(abs);
	if (n === "/") return "";
	return n.slice(n.lastIndexOf("/") + 1);
}
function tokenize(input) {
	const out = [];
	let cur = "";
	let quote = null;
	for (let i = 0; i < input.length; i++) {
		const c = input[i];
		if (quote) {
			if (c === quote) quote = null;
			else cur += c;
			continue;
		}
		if (c === "\"" || c === "'") {
			quote = c;
			continue;
		}
		if (c === "\\" && i + 1 < input.length) {
			cur += input[++i];
			continue;
		}
		if (/\s/.test(c)) {
			if (cur) {
				out.push(cur);
				cur = "";
			}
			continue;
		}
		cur += c;
	}
	if (cur) out.push(cur);
	return out;
}
function ok(project, stdout, effect) {
	return {
		stdout,
		stderr: "",
		project,
		effect
	};
}
function fail(project, stderr) {
	return {
		stdout: "",
		stderr,
		project
	};
}
function touchFile(project, path, content = "", origin = "terminal") {
	const storage = toStoragePath(path);
	const file = {
		id: uid(),
		path: storage,
		language: languageFromPath(storage),
		content,
		updatedAt: Date.now(),
		kind: storage.endsWith(".html") ? "preview" : "code",
		origin
	};
	return {
		...project,
		updatedAt: Date.now(),
		files: mergeArtifacts(project.files, [file])
	};
}
function ensureDir(project, abs) {
	const storage = toStoragePath(abs);
	if (!storage) return project;
	if (project.dirs.includes(storage)) return project;
	return {
		...project,
		dirs: [...project.dirs, storage]
	};
}
function findFile(project, abs) {
	const storage = toStoragePath(abs);
	return project.files.find((f) => f.path === storage);
}
function globStage(project, args) {
	const cwd = project.cwd || "/";
	if (args.length === 0 || args.includes(".") || args.includes("-A") || args.includes("--all")) return project.files.map((f) => f.path);
	const out = [];
	for (const arg of args) {
		const storage = toStoragePath(joinPath(cwd, arg));
		if (arg.endsWith("/") || project.dirs.includes(storage)) {
			const prefix = storage ? `${storage}/` : "";
			out.push(...project.files.filter((f) => f.path.startsWith(prefix)).map((f) => f.path));
		} else out.push(storage);
	}
	return [...new Set(out)];
}
var HELP = `AgentSam CLI — virtual workspace over this project

files     ls  cd  pwd  cat  tree  mkdir  touch  rm  mv  cp  open
git       git init | status | add | commit | log | diff | remote | push
github    gh repo create  ·  git push
cloud     wrangler pages deploy  ·  wrangler whoami
ship      zip  ·  vibe <prompt>
tokens    export GITHUB_TOKEN=…  ·  export CLOUDFLARE_API_TOKEN=…

Git and wrangler here operate on the in-browser workspace.
Push/deploy use tokens from Ship, never stored on the server.`;
function runCommand(project, raw) {
	const line = raw.trim();
	if (!line) return ok(project, "");
	if (line.startsWith("#")) return ok(project, "");
	const tokens = tokenize(line);
	const cmd = tokens[0] ?? "";
	const args = tokens.slice(1);
	const cwd = project.cwd || "/";
	switch (cmd) {
		case "help":
		case "?": return ok(project, HELP);
		case "clear":
		case "cls": return ok(project, "", { type: "clear" });
		case "pwd": return ok(project, cwd === "/" ? "/workspace" : `/workspace${cwd}`);
		case "whoami": return ok(project, "sam");
		case "date": return ok(project, (/* @__PURE__ */ new Date()).toISOString());
		case "cd": {
			const dest = joinPath(cwd, args[0] ?? "/");
			if (dest === "/") return ok({
				...project,
				cwd: "/"
			}, "");
			const storage = toStoragePath(dest);
			if (!(project.dirs.includes(storage) || project.files.some((f) => f.path === storage || f.path.startsWith(`${storage}/`)))) return fail(project, `cd: no such directory: ${args[0] ?? dest}`);
			if (project.files.some((f) => f.path === storage)) return fail(project, `cd: not a directory: ${args[0]}`);
			return ok({
				...project,
				cwd: dest
			}, "");
		}
		case "ls": {
			const target = joinPath(cwd, args.find((a) => !a.startsWith("-")) ?? ".");
			return ok(project, printTree(project.files, project.dirs, target).join("  ") || "");
		}
		case "tree": return ok(project, renderAsciiTree(project.files));
		case "cat":
		case "head":
		case "tail": {
			if (!args[0]) return fail(project, `${cmd}: missing file`);
			const file = findFile(project, joinPath(cwd, args[0]));
			if (!file) return fail(project, `${cmd}: ${args[0]}: no such file`);
			const lines = file.content.split("\n");
			if (cmd === "head") return ok(project, lines.slice(0, 20).join("\n"));
			if (cmd === "tail") return ok(project, lines.slice(-20).join("\n"));
			return ok(project, file.content);
		}
		case "wc": {
			const file = findFile(project, joinPath(cwd, args[0] ?? ""));
			if (!file) return fail(project, `wc: ${args[0] ?? ""}: no such file`);
			const lines = file.content.split("\n").length;
			return ok(project, `${lines} ${file.content.trim() ? file.content.trim().split(/\s+/).length : 0} ${file.content.length} ${file.path}`);
		}
		case "echo": return ok(project, args.join(" "));
		case "mkdir": {
			if (!args.length) return fail(project, "mkdir: missing operand");
			let next = project;
			for (const arg of args.filter((a) => a !== "-p")) {
				const abs = joinPath(cwd, arg);
				next = ensureDir(next, abs);
				let cursor = parentDir(abs);
				while (cursor !== "/") {
					next = ensureDir(next, cursor);
					cursor = parentDir(cursor);
				}
			}
			return ok(next, "");
		}
		case "touch": {
			if (!args[0]) return fail(project, "touch: missing file");
			const abs = joinPath(cwd, args[0]);
			const existing = findFile(project, abs);
			if (existing) return ok({
				...project,
				files: project.files.map((f) => f.id === existing.id ? {
					...f,
					updatedAt: Date.now()
				} : f)
			}, "");
			return ok(ensureDir(touchFile(project, abs), parentDir(abs)), "");
		}
		case "rm": {
			const recursive = args.includes("-r") || args.includes("-rf") || args.includes("-fr");
			const targets = args.filter((a) => !a.startsWith("-"));
			if (!targets.length) return fail(project, "rm: missing operand");
			let files = [...project.files];
			let dirs = [...project.dirs];
			for (const t of targets) {
				const storage = toStoragePath(joinPath(cwd, t));
				if ((dirs.includes(storage) || files.some((f) => f.path.startsWith(`${storage}/`))) && !recursive) return fail(project, `rm: ${t}: is a directory`);
				files = files.filter((f) => f.path !== storage && !f.path.startsWith(`${storage}/`));
				dirs = dirs.filter((d) => d !== storage && !d.startsWith(`${storage}/`));
			}
			return ok({
				...project,
				files,
				dirs,
				updatedAt: Date.now()
			}, "");
		}
		case "mv":
		case "cp": {
			if (args.length < 2) return fail(project, `${cmd}: missing operand`);
			const src = findFile(project, joinPath(cwd, args[0]));
			if (!src) return fail(project, `${cmd}: ${args[0]}: no such file`);
			const destStorage = toStoragePath(joinPath(cwd, args[1]));
			const copy = {
				...src,
				id: cmd === "cp" ? uid() : src.id,
				path: destStorage,
				language: languageFromPath(destStorage),
				updatedAt: Date.now(),
				origin: "terminal"
			};
			let files = mergeArtifacts(project.files, [copy]);
			if (cmd === "mv") files = files.filter((f) => !(f.path === src.path && f.id === src.id));
			return ok({
				...project,
				files,
				updatedAt: Date.now()
			}, "");
		}
		case "open": {
			if (!args[0]) return fail(project, "open: missing file");
			const file = findFile(project, joinPath(cwd, args[0]));
			if (!file) return fail(project, `open: ${args[0]}: no such file`);
			if (file.path.endsWith(".html")) return ok(project, `preview ${file.path}`, {
				type: "open-browser",
				srcdoc: file.content,
				title: file.path
			});
			return ok(project, `opening ${file.path}`, {
				type: "open-file",
				path: file.path
			});
		}
		case "zip": return ok(project, `packing ${project.files.length} files`, { type: "download-zip" });
		case "export": {
			const joined = args.join(" ");
			const eq = joined.indexOf("=");
			if (eq < 0) return fail(project, "export: use export NAME=value");
			const key = joined.slice(0, eq).trim();
			const value = joined.slice(eq + 1).trim();
			if (key === "GITHUB_TOKEN") return ok(project, "GITHUB_TOKEN set (saved locally)", {
				type: "set-secret",
				key: "githubToken",
				value
			});
			if (key === "CLOUDFLARE_API_TOKEN" || key === "CF_API_TOKEN") return ok(project, "CLOUDFLARE_API_TOKEN set (saved locally)", {
				type: "set-secret",
				key: "cloudflareToken",
				value
			});
			return fail(project, `export: unknown token ${key}`);
		}
		case "vibe":
		case "agentsam": {
			const prompt = (cmd === "agentsam" ? args.slice(args[0] === "vibe" ? 1 : 0).join(" ") : args.join(" ")).trim();
			if (!prompt) return fail(project, "vibe: describe what to build");
			return ok(project, "sending to AgentSam…", {
				type: "vibe",
				prompt
			});
		}
		case "git": return gitCommand(project, args);
		case "gh": return ghCommand(project, args);
		case "wrangler":
		case "npx": return wranglerCommand(project, cmd === "npx" ? args.slice(args[0] === "wrangler" ? 1 : 0) : args);
		case "npm": return npmCommand(project, args);
		default: return fail(project, `command not found: ${cmd}\ntry help`);
	}
}
function gitCommand(project, args) {
	const sub = args[0] ?? "status";
	switch (sub) {
		case "init":
			if (project.git.initialized) return ok(project, `Reinitialized git in /workspace`);
			return ok({
				...project,
				git: {
					...emptyGit(),
					initialized: true
				},
				updatedAt: Date.now()
			}, "Initialized empty Git repository in /workspace/.git/");
		case "status": return ok(project, statusLines(project).join("\n"));
		case "add": {
			if (!project.git.initialized) return fail(project, "fatal: not a git repository");
			const paths = globStage(project, args.slice(1));
			const staged = [.../* @__PURE__ */ new Set([...project.git.staged, ...paths])];
			return ok({
				...project,
				git: {
					...project.git,
					staged
				}
			}, "");
		}
		case "commit": {
			if (!project.git.initialized) return fail(project, "fatal: not a git repository");
			const dashM = args.findIndex((a) => a === "-m");
			const message = dashM >= 0 ? args.slice(dashM + 1).join(" ").replace(/^["']|["']$/g, "") : "";
			if (!message) return fail(project, "git commit: need -m \"message\"");
			const result = commitStaged(project, message);
			return ok({
				...project,
				git: result.git,
				updatedAt: Date.now()
			}, result.output);
		}
		case "log":
			if (!project.git.commits.length) return ok(project, "no commits");
			return ok(project, project.git.commits.slice(0, 12).map((c) => `commit ${c.id}\nDate: ${new Date(c.at).toISOString()}\n\n    ${c.message}`).join("\n\n"));
		case "diff": {
			const head = headSnapshot(project.git);
			const now = workingTree(project.files);
			const paths = dirtyPaths(project).slice(0, 20);
			if (!paths.length) return ok(project, "");
			const chunks = paths.map((path) => {
				return `--- a/${path}\n+++ b/${path}\n${summarizeDiff((head[path] ?? "").split("\n"), (now[path] ?? "").split("\n"))}`;
			});
			return ok(project, chunks.join("\n\n"));
		}
		case "branch": return ok(project, `* ${project.git.branch}`);
		case "remote":
			if (args[1] === "add" && args[2] && args[3]) {
				const remotes = project.git.remotes.filter((r) => r.name !== args[2]);
				remotes.push({
					name: args[2],
					url: args[3]
				});
				const parsed = parseGithubRemote(args[3]);
				const deploy = parsed ? {
					...project.deploy,
					githubOwner: parsed.owner,
					githubRepo: parsed.repo
				} : project.deploy;
				return ok({
					...project,
					git: {
						...project.git,
						remotes
					},
					deploy
				}, "");
			}
			if (args[1] === "-v" || args[1] === "v") return ok(project, project.git.remotes.map((r) => `${r.name}\t${r.url} (push)`).join("\n") || "");
			return ok(project, project.git.remotes.map((r) => r.name).join("\n"));
		case "push": {
			if (!project.git.initialized) return fail(project, "fatal: not a git repository");
			if (!project.git.commits.length) return fail(project, "error: src refspec main does not match any");
			const remote = project.git.remotes.find((r) => r.name === (args[1] ?? "origin"));
			if (remote) {
				const parsed = parseGithubRemote(remote.url);
				if (parsed && (!project.deploy.githubOwner || !project.deploy.githubRepo)) project = {
					...project,
					deploy: {
						...project.deploy,
						githubOwner: parsed.owner,
						githubRepo: parsed.repo
					}
				};
			}
			const message = project.git.commits[0]?.message ?? "update";
			return ok(project, "pushing to GitHub…", {
				type: "github-push",
				message
			});
		}
		case "pull": return ok(project, "Already up to date.");
		default: return fail(project, `git: '${sub}' is not a supported command`);
	}
}
function ghCommand(project, args) {
	if (`${args[0] ?? ""} ${args[1] ?? ""}`.trim() === "auth status") return ok(project, "github.com: token is read from Ship / GITHUB_TOKEN");
	if (args[0] === "repo" && args[1] === "create") {
		const name = args[2] && !args[2].startsWith("-") ? args[2] : slugify(project.name);
		const vis = args.includes("--public") ? "public" : "private";
		const remote = `https://github.com/${project.deploy.githubOwner || "you"}/${name}.git`;
		return ok({
			...project,
			deploy: {
				...project.deploy,
				githubRepo: name,
				githubBranch: project.deploy.githubBranch || "main"
			},
			git: {
				...project.git,
				initialized: true,
				remotes: [{
					name: "origin",
					url: remote
				}, ...project.git.remotes.filter((r) => r.name !== "origin")]
			}
		}, `creating ${vis} repo ${name} and pushing…`, {
			type: "github-push",
			message: "init from AgentSam"
		});
	}
	return fail(project, "gh: try  gh repo create [name]  or  gh auth status");
}
function wranglerCommand(project, args) {
	const joined = args.join(" ");
	if (args[0] === "whoami") return ok(project, "Cloudflare token is read from Ship / CLOUDFLARE_API_TOKEN");
	if (args[0] === "pages" && args[1] === "deploy") return ok(project, "uploading Pages project…", { type: "cloudflare-deploy" });
	if (args[0] === "pages" && args[1] === "project" && args[2] === "create") {
		const name = args[3] || slugify(project.name);
		return ok({
			...project,
			deploy: {
				...project.deploy,
				cloudflareProject: name
			}
		}, `project name set to ${name}`);
	}
	if (args[0] === "deploy" || joined.includes("pages deploy")) return ok(project, "uploading Pages project…", { type: "cloudflare-deploy" });
	return fail(project, "wrangler: try  wrangler pages deploy  ·  wrangler whoami");
}
function npmCommand(project, args) {
	if (args[0] === "init") {
		const pkg = {
			name: slugify(project.name),
			private: true,
			type: "module",
			scripts: { deploy: "wrangler pages deploy ." }
		};
		return ok(touchFile(project, "/package.json", JSON.stringify(pkg, null, 2) + "\n"), "wrote package.json");
	}
	if (args[0] === "run" && args[1] === "deploy") return ok(project, "npm run deploy → wrangler pages deploy", { type: "cloudflare-deploy" });
	return fail(project, "npm: try  npm init  or  npm run deploy");
}
function summarizeDiff(a, b) {
	const max = Math.max(a.length, b.length);
	const lines = [];
	let shown = 0;
	for (let i = 0; i < max && shown < 40; i++) {
		if (a[i] === b[i]) continue;
		if (a[i] != null) lines.push(`-${a[i]}`);
		if (b[i] != null) lines.push(`+${b[i]}`);
		shown += 1;
	}
	return lines.join("\n") || "(no textual diff)";
}
function promptPath(cwd) {
	if (!cwd || cwd === "/") return "~";
	return `~/${baseName(cwd)}`;
}
async function postJson(url, body) {
	const res = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body)
	});
	const json = await res.json().catch(() => ({}));
	if (!res.ok) throw new Error(json.error || `Request failed ${res.status}`);
	return json;
}
function writeLines(term, text) {
	if (!text) return;
	for (const line of text.split("\n")) term.writeln(line);
}
function TerminalPane() {
	const hostRef = (0, import_react.useRef)(null);
	const project = useActiveProject();
	const projectRef = (0, import_react.useRef)(project);
	projectRef.current = project;
	const session = (0, import_react.useRef)(null);
	const pending = useWorkStore((s) => s.pendingCommands);
	(0, import_react.useEffect)(() => {
		const host = hostRef.current;
		if (!host) return;
		let disposed = false;
		let dispose = () => {};
		(async () => {
			const [{ Terminal }, { FitAddon }] = await Promise.all([import("../_libs/xterm__xterm.mjs").then((n) => n.t), import("../_libs/xterm__addon-fit.mjs").then((n) => n.t)]);
			await Promise.resolve({});
			if (disposed || !hostRef.current) return;
			const term = new Terminal({
				cursorBlink: true,
				convertEol: true,
				fontSize: 12.5,
				fontFamily: "IBM Plex Mono, ui-monospace, SF Mono, Menlo, monospace",
				lineHeight: 1.35,
				theme: {
					background: "#070708",
					foreground: "#F3F1EC",
					cursor: "#C4B8A8",
					cursorAccent: "#070708",
					selectionBackground: "#C4B8A855",
					black: "#070708",
					red: "#c45c4a",
					green: "#C4B8A8",
					yellow: "#C4B8A8",
					blue: "#8A7F72",
					magenta: "#C4B8A8",
					cyan: "#8A7F72",
					white: "#F3F1EC",
					brightBlack: "#8A7F72",
					brightWhite: "#F3F1EC"
				},
				scrollback: 2e3
			});
			const fit = new FitAddon();
			term.loadAddon(fit);
			term.open(host);
			fit.fit();
			const history = [];
			let histIndex = -1;
			let buffer = "";
			let busy = false;
			const prompt = () => {
				const cwd = promptPath(projectRef.current.cwd);
				term.write(`\x1b[38;2;196;184;168msam\x1b[0m \x1b[38;2;138;127;114m${cwd}\x1b[0m $ `);
			};
			const applyEffect = async (proj, effect) => {
				if (!effect) return proj;
				const store = useWorkStore.getState();
				switch (effect.type) {
					case "clear":
						term.reset();
						return proj;
					case "open-file": {
						const file = proj.files.find((f) => f.path === effect.path);
						if (file) store.selectFile(file.id);
						return proj;
					}
					case "open-browser":
						store.openSideTab("browser", {
							title: effect.title ?? "Preview",
							srcdoc: effect.srcdoc ?? null,
							url: effect.url ?? "",
							ephemeral: false
						});
						return proj;
					case "vibe":
						store.send(store.activeTrailId, "trail", effect.prompt);
						return proj;
					case "download-zip":
						downloadBytes(zipProject(proj.files, proj.name), `${slugify(proj.name)}.zip`, "application/zip");
						return proj;
					case "set-secret":
						writeSecrets({ [effect.key]: effect.value });
						return proj;
					case "github-push": {
						const token = readSecrets().githubToken;
						if (!token) {
							term.writeln("No GitHub token. Open Ship or: export GITHUB_TOKEN=…");
							store.setSettingsOpen(true);
							return proj;
						}
						const owner = proj.deploy.githubOwner.trim();
						const repo = proj.deploy.githubRepo.trim() || slugify(proj.name);
						if (!owner) {
							term.writeln("Set GitHub owner in Ship, or: git remote add origin https://github.com/owner/repo.git");
							store.openSideTab("deploy", { ephemeral: false });
							return proj;
						}
						try {
							const result = await postJson("/api/github", {
								token,
								owner,
								repo,
								branch: proj.deploy.githubBranch || "main",
								message: effect.message,
								files: proj.files.map((f) => ({
									path: f.path,
									content: f.content
								}))
							});
							const url = result.url ?? `https://github.com/${owner}/${repo}`;
							term.writeln(`remote: ${url}`);
							term.writeln(`${result.files ?? proj.files.length} files  ${result.sha ?? ""}`);
							const next = {
								...proj,
								deploy: {
									...proj.deploy,
									githubOwner: owner,
									githubRepo: repo,
									lastGithubUrl: url,
									lastGithubAt: Date.now()
								},
								files: [...proj.files, {
									id: uid(),
									path: `.agentsam/deploys/github-${Date.now()}.log`,
									language: languageFromPath("log"),
									content: `Pushed ${result.files ?? proj.files.length} files\n${url}\n${result.sha ?? ""}`,
									updatedAt: Date.now(),
									kind: "deploy",
									origin: "deploy",
									title: "GitHub push",
									url
								}]
							};
							toast("Pushed to GitHub");
							return next;
						} catch (err) {
							term.writeln(err instanceof Error ? err.message : "push failed");
							return proj;
						}
					}
					case "cloudflare-deploy": {
						const token = readSecrets().cloudflareToken;
						if (!token) {
							term.writeln("No Cloudflare token. Open Ship or: export CLOUDFLARE_API_TOKEN=…");
							store.setSettingsOpen(true);
							return proj;
						}
						const accountId = proj.deploy.cloudflareAccountId.trim();
						if (!accountId) {
							term.writeln("Set Cloudflare account id in Ship.");
							store.openSideTab("deploy", { ephemeral: false });
							return proj;
						}
						const name = proj.deploy.cloudflareProject.trim() || slugify(proj.name);
						try {
							const result = await postJson("/api/cloudflare", {
								token,
								accountId,
								projectName: name,
								files: proj.files.map((f) => ({
									path: f.path,
									content: f.content
								}))
							});
							const url = result.url ?? `https://${name}.pages.dev`;
							term.writeln(`deployed ${result.files ?? proj.files.length} files`);
							term.writeln(url);
							toast("Deployed to Cloudflare Pages");
							return {
								...proj,
								deploy: {
									...proj.deploy,
									cloudflareProject: name,
									lastCloudflareUrl: url,
									lastCloudflareAt: Date.now()
								},
								files: [...proj.files, {
									id: uid(),
									path: `.agentsam/deploys/cloudflare-${Date.now()}.log`,
									language: "plaintext",
									content: `Deployed ${result.files ?? proj.files.length} files\n${url}`,
									updatedAt: Date.now(),
									kind: "deploy",
									origin: "deploy",
									title: "Cloudflare Pages",
									url
								}]
							};
						} catch (err) {
							term.writeln(err instanceof Error ? err.message : "deploy failed");
							return proj;
						}
					}
				}
			};
			const queued = [];
			const run = async (line) => {
				if (busy) {
					queued.push(line);
					return;
				}
				busy = true;
				try {
					const result = runCommand(projectRef.current, line);
					writeLines(term, result.stdout);
					writeLines(term, result.stderr);
					const next = await applyEffect(result.project, result.effect);
					useWorkStore.getState().patchProject(next.id, next);
					projectRef.current = useWorkStore.getState().projects.find((p) => p.id === next.id) ?? next;
				} catch (err) {
					term.writeln(err instanceof Error ? err.message : "command failed");
				} finally {
					busy = false;
					const nextLine = queued.shift();
					if (nextLine != null) {
						await run(nextLine);
						return;
					}
					prompt();
				}
			};
			term.writeln("AgentSam CLI  ·  type help");
			prompt();
			const flushEnter = () => {
				term.write("\r\n");
				const line = buffer;
				buffer = "";
				histIndex = -1;
				if (line.trim()) history.unshift(line);
				run(line);
			};
			host.querySelector("textarea")?.addEventListener("keydown", (event) => {
				if (event.key === "Enter" && !event.shiftKey) {
					event.preventDefault();
					event.stopPropagation();
					flushEnter();
				}
			});
			term.onData((data) => {
				let i = 0;
				while (i < data.length) {
					if (data.startsWith("\x1B[A", i)) {
						i += 3;
						if (!history.length) continue;
						histIndex = Math.min(history.length - 1, histIndex + 1);
						const next = history[histIndex] ?? "";
						term.write("\x1B[2K\r");
						prompt();
						buffer = next;
						term.write(buffer);
						continue;
					}
					if (data.startsWith("\x1B[B", i)) {
						i += 3;
						if (histIndex <= 0) {
							histIndex = -1;
							term.write("\x1B[2K\r");
							prompt();
							buffer = "";
							continue;
						}
						histIndex -= 1;
						const next = history[histIndex] ?? "";
						term.write("\x1B[2K\r");
						prompt();
						buffer = next;
						term.write(buffer);
						continue;
					}
					const ch = data[i];
					i += 1;
					if (ch === "\r" || ch === "\n") {
						if (ch === "\n" && data[i - 2] === "\r") continue;
						if (!buffer && data.length <= 2) continue;
						flushEnter();
						continue;
					}
					if (ch === "") {
						term.write("^C\r\n");
						buffer = "";
						busy = false;
						prompt();
						continue;
					}
					if (ch === "\f") {
						term.reset();
						prompt();
						term.write(buffer);
						continue;
					}
					if (ch === "" || ch === "\b") {
						if (!buffer.length) continue;
						buffer = buffer.slice(0, -1);
						term.write("\b \b");
						continue;
					}
					if (ch === "\x1B") {
						while (i < data.length && data[i] !== "[" && data[i] < "@") i += 1;
						if (i < data.length) i += 1;
						continue;
					}
					if (ch < " ") continue;
					buffer += ch;
					term.write(ch);
				}
			});
			const observer = new ResizeObserver(() => {
				try {
					fit.fit();
				} catch {}
			});
			observer.observe(host);
			session.current = {
				term,
				run,
				dispose: () => {
					observer.disconnect();
					term.dispose();
				}
			};
			dispose = session.current.dispose;
			term.focus();
		})();
		return () => {
			disposed = true;
			dispose();
			session.current = null;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!pending.length) return;
		const cmds = useWorkStore.getState().consumeCommands();
		const run = session.current?.run;
		if (!run) return;
		(async () => {
			for (const cmd of cmds) {
				session.current?.term.writeln(cmd);
				await run(cmd);
			}
		})();
	}, [pending]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-8 shrink-0 items-center gap-2 border-t border-border px-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "px-1 font-mono text-[11px] tracking-wide text-muted-foreground uppercase",
					children: "CLI"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate font-mono text-[11px] text-clay",
					children: project.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "icon-sm",
					variant: "ghost",
					className: "ml-auto size-7",
					"aria-label": "Close terminal",
					onClick: () => useWorkStore.getState().setTerminalOpen(false),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: hostRef,
			className: "terminal-host min-h-0 flex-1"
		})]
	});
}
function TitleBar() {
	const trail = useActiveTrail();
	const sideOpen = useWorkStore((s) => s.sideOpen);
	const sidebarOpen = useWorkStore((s) => s.sidebarOpen);
	const terminalOpen = useWorkStore((s) => s.terminalOpen);
	const openSideTab = useWorkStore((s) => s.openSideTab);
	const setSideOpen = useWorkStore((s) => s.setSideOpen);
	const setMobileNavOpen = useWorkStore((s) => s.setMobileNavOpen);
	const toggleSidebar = useWorkStore((s) => s.toggleSidebar);
	const toggleTerminal = useWorkStore((s) => s.toggleTerminal);
	const sideTabs = useWorkStore((s) => s.sideTabs);
	const renameTrail = useWorkStore((s) => s.renameTrail);
	function toggleDual() {
		if (sideOpen) {
			setSideOpen(false);
			return;
		}
		if (sideTabs[0]) {
			setSideOpen(true);
			return;
		}
		openSideTab("chat");
	}
	async function share() {
		const markdown = [
			`# ${trail.title}`,
			"",
			...trail.messages.map((m) => `**${m.role}**\n\n${m.content}`)
		].join("\n\n");
		try {
			await navigator.clipboard.writeText(markdown);
			toast("Trail copied");
		} catch {
			toast("Could not copy the trail");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "flex h-12 shrink-0 items-center gap-1 border-b border-border px-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				size: "icon-sm",
				variant: "ghost",
				className: "text-foreground md:hidden",
				"aria-label": "Open trails",
				onClick: () => setMobileNavOpen(true),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-4" })
			}),
			!sidebarOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				size: "icon-sm",
				variant: "ghost",
				className: "hidden text-foreground md:inline-flex",
				"aria-label": "Open trails",
				onClick: toggleSidebar,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeft, { className: "size-4" })
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: trail.title,
				onChange: (e) => renameTrail(trail.id, e.target.value),
				className: "min-w-0 flex-1 bg-transparent px-2 text-sm font-medium tracking-tight outline-none md:max-w-sm",
				"aria-label": "Trail title"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "icon-sm",
					variant: "ghost",
					"aria-label": "Copy trail",
					onClick: () => void share(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share, { className: "size-4" })
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: "Copy trail" })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "icon-sm",
					variant: terminalOpen ? "secondary" : "ghost",
					"aria-label": "Toggle CLI",
					onClick: toggleTerminal,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareTerminal, { className: "size-4" })
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: "CLI" })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "icon-sm",
					variant: "ghost",
					"aria-label": "Open artifacts",
					onClick: () => openSideTab("artifacts", { ephemeral: false }),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { className: "size-4" })
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: "Artifacts" })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "icon-sm",
					variant: "ghost",
					"aria-label": "Ship",
					onClick: () => openSideTab("deploy", { ephemeral: false }),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" })
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: "Ship" })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "icon-sm",
					variant: sideOpen ? "secondary" : "ghost",
					"aria-label": "Toggle side stage",
					onClick: toggleDual,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Columns2, { className: "size-4" })
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: "Side stage" })] })
		]
	});
}
function Workbench() {
	const sidebarOpen = useWorkStore((s) => s.sidebarOpen);
	const mobileNavOpen = useWorkStore((s) => s.mobileNavOpen);
	const sideOpen = useWorkStore((s) => s.sideOpen);
	const terminalOpen = useWorkStore((s) => s.terminalOpen);
	const setMobileNavOpen = useWorkStore((s) => s.setMobileNavOpen);
	const setSideOpen = useWorkStore((s) => s.setSideOpen);
	const startTrail = useWorkStore((s) => s.startTrail);
	const openSideTab = useWorkStore((s) => s.openSideTab);
	const toggleTerminal = useWorkStore((s) => s.toggleTerminal);
	(0, import_react.useEffect)(() => {
		useWorkStore.persist.rehydrate();
		const unsub = useWorkStore.persist.onFinishHydration(() => {
			useWorkStore.getState().setHydrated(true);
		});
		if (useWorkStore.persist.hasHydrated()) useWorkStore.getState().setHydrated(true);
		return unsub;
	}, []);
	(0, import_react.useEffect)(() => {
		function onKey(event) {
			const meta = event.metaKey || event.ctrlKey;
			if (meta && event.key.toLowerCase() === "n") {
				event.preventDefault();
				if (event.shiftKey) openSideTab("chat");
				else startTrail();
			}
			if (meta && event.key.toLowerCase() === "b") {
				event.preventDefault();
				useWorkStore.getState().toggleSidebar();
			}
			if (meta && event.shiftKey && event.key.toLowerCase() === "s") {
				event.preventDefault();
				if (sideOpen) setSideOpen(false);
				else openSideTab("chat");
			}
			if (meta && event.key === "`" || event.ctrlKey && event.key === "`") {
				event.preventDefault();
				toggleTerminal();
			}
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		openSideTab,
		setSideOpen,
		sideOpen,
		startTrail,
		toggleTerminal
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh overflow-hidden bg-background text-foreground",
		children: [
			mobileNavOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": "Close trails",
				className: "fixed inset-0 z-40 bg-ink/60 md:hidden",
				onClick: () => setMobileNavOpen(false)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: cn("h-full bg-sidebar", mobileNavOpen ? "fixed inset-y-0 left-0 z-50 w-[min(22rem,92vw)]" : "hidden", sidebarOpen && "md:static md:z-auto md:block md:w-[280px] md:shrink-0"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleBar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(qt, {
					orientation: "vertical",
					className: "min-h-0 flex-1",
					style: { height: "100%" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Qt, {
						id: "main",
						minSize: 40,
						className: "flex min-h-0 min-w-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-h-0 min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex min-h-0 min-w-0 flex-1 flex-col",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrailThread, {})
							}), sideOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Close side stage overlay",
								className: "fixed inset-0 z-40 bg-ink/60 md:hidden",
								onClick: () => setSideOpen(false)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
								className: cn("min-h-0 bg-background", "max-md:fixed max-md:inset-0 max-md:z-50", "md:relative md:w-[min(46vw,32rem)] md:shrink-0 md:border-l md:border-border"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideStage, {})
							})] }) : null]
						})
					}), terminalOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(nn, { className: "resize-separator hidden md:flex" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Qt, {
						id: "cli",
						defaultSize: 28,
						minSize: 16,
						className: "hidden min-h-0 md:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TerminalPane, {})
					})] }) : null]
				})]
			}),
			terminalOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex flex-col bg-background md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TerminalPane, {})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandPalette, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsDialog, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				theme: "dark",
				position: "bottom-center",
				toastOptions: { className: cn("border-border bg-card text-foreground") }
			})
		]
	}) });
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Workbench, {});
}
//#endregion
export { Home as component };
