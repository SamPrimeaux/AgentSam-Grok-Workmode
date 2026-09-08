import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { T as Cloud, g as KeyRound, v as Github } from "../_libs/lucide-react.mjs";
import { _ as uid, h as slugify, l as languageFromPath, t as Button, v as useActiveProject, x as useWorkStore } from "./button-MnOYoZhe.mjs";
import { t as Input } from "./input-AmxdtNg2.mjs";
import { n as readSecrets } from "./secrets-BRY8VAFA.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/deploy-_9edsGdK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
			const result = await postJson("/api/github", {
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
			const result = await postJson("/api/cloudflare", {
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
//#endregion
export { DeployStage as t };
