import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { j as ArrowLeft, t as X } from "../_libs/lucide-react.mjs";
import { S as workingTree, _ as uid, a as emptyGit, c as headSnapshot, d as parseGithubRemote, f as printTree, g as statusLines, h as slugify, i as dirtyPaths, l as languageFromPath, p as renderAsciiTree, r as commitStaged, t as Button, u as mergeArtifacts, v as useActiveProject, x as useWorkStore } from "./button-MnOYoZhe.mjs";
import { n as readSecrets, r as writeSecrets } from "./secrets-BRY8VAFA.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as zipProject, t as downloadBytes } from "./bundle-Z8qvW90W.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cli-C7ELpW--.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
function navigateApp(detail) {
	if (typeof window === "undefined") return;
	const payload = typeof detail === "string" ? { to: detail } : detail;
	window.dispatchEvent(new CustomEvent("agentsam:navigate", { detail: payload }));
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
function TerminalPane({ variant = "dock" }) {
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
						navigateApp("/files");
						return proj;
					}
					case "open-browser":
						store.openSideTab("browser", {
							title: effect.title ?? "Preview",
							srcdoc: effect.srcdoc ?? null,
							url: effect.url ?? "",
							ephemeral: false
						});
						navigateApp("/browse");
						return proj;
					case "vibe":
						store.send(store.activeTrailId, "trail", effect.prompt);
						navigateApp({
							to: "/trails/$trailId",
							params: { trailId: store.activeTrailId }
						});
						return proj;
					case "download-zip": {
						const bytes = zipProject(proj.files, proj.name);
						downloadBytes(bytes, `${slugify(proj.name)}.zip`, "application/zip");
						return proj;
					}
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
							navigateApp("/ship");
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
		children: [variant === "dock" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: hostRef,
			className: "terminal-host min-h-0 flex-1 px-1 pb-[env(safe-area-inset-bottom)]"
		})]
	});
}
function CliPage() {
	const project = useActiveProject();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex min-h-12 shrink-0 items-center gap-2 border-b border-border px-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				size: "icon",
				variant: "ghost",
				className: "size-11 md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/trails",
					"aria-label": "Back",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" })
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1 px-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] tracking-wide text-muted-foreground uppercase",
					children: "CLI"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "truncate font-mono text-xs text-clay",
					children: [project.name, " · offline-ready"]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-0 flex-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TerminalPane, { variant: "page" })
		})]
	});
}
//#endregion
export { CliPage as component };
