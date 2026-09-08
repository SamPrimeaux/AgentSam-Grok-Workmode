import { i as __toESM } from "../_runtime.mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useRouter, f as createRouter, g as createRootRoute, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as number, c as union, i as literal, n as array, o as object, r as boolean, s as string, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Dvu2_7E1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-C1tqBePz.css";
var APP_NAME = "AgentSam";
var Route$4 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#070708"
			},
			{
				name: "description",
				content: "AgentSam Work — trails, projects, artifacts, Monaco, and a CLI to ship via GitHub or Cloudflare."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-background font-sans text-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter = () => import("./routes-Ds5GGSpN.mjs");
var Route$3 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var STUDIO_MODELS = [
	{
		id: "grok-4.6",
		label: "Grok 4.6",
		short: "4.6",
		hint: "Flagship · agents & code",
		maxTokens: 4200
	},
	{
		id: "grok-4.5",
		label: "Grok 4.5",
		short: "4.5",
		hint: "Previous flagship",
		maxTokens: 3200
	},
	{
		id: "grok-4.20",
		label: "Grok 4.20",
		short: "4.20",
		hint: "Long context",
		maxTokens: 3600
	},
	{
		id: "grok-4.3",
		label: "Grok 4.3",
		short: "4.3",
		hint: "Fast mid-tier",
		maxTokens: 2400
	},
	{
		id: "grok-build-0.1",
		label: "Grok Build",
		short: "Build",
		hint: "Vibecode",
		maxTokens: 4800
	}
];
var DEFAULT_MODEL_ID = "grok-4.6";
var MODEL_IDS = new Set(STUDIO_MODELS.map((m) => m.id));
function getModel(id) {
	return STUDIO_MODELS.find((m) => m.id === id) ?? STUDIO_MODELS[0];
}
var Body$2 = object({
	messages: array(object({
		role: _enum([
			"user",
			"assistant",
			"system"
		]),
		content: string().max(12e3)
	})).min(1).max(24),
	mode: _enum(["trail", "side"]).optional(),
	model: string().max(80).optional(),
	parentTitle: string().max(200).optional(),
	parentExcerpt: string().max(8e3).optional(),
	workspace: array(object({
		path: string().max(240),
		content: string().max(8e3)
	})).max(24).optional()
});
var TRAIL_SYSTEM = `You are AgentSam, the studio operator for InnerAnimalMedia.
Calm, precise, no fluff. Help with software, writing, research, and shipping work.
This workbench has a virtual git workspace, Monaco, an xterm CLI, and GitHub / Cloudflare Pages ship methods.

When you create or edit files, use fenced code blocks tagged with a path:
\`\`\`html index.html
\`\`\`
Prefer short structured answers. Do not use emoji unless asked.
For deploys, tell the user they can run \`git push\` or \`wrangler pages deploy\` in the CLI after adding tokens in Ship.`;
var SIDE_SYSTEM = `You are a focused AgentSam helper side-chat.
Be concise. This session is ephemeral unless the user keeps it as a stored trail.
When you create files, fence them with a path. No emoji unless asked.`;
var BUILD_EXTRA = `You are in vibecode mode. Write complete, runnable files. Prefer small static sites, wrangler.toml, and GitHub Actions that deploy to Cloudflare Pages.`;
var Route$2 = createFileRoute("/api/chat")({ server: { handlers: { POST: async ({ request }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return Response.json({ error: "AI is not available in this environment." }, { status: 503 });
	let parsed;
	try {
		parsed = Body$2.parse(await request.json());
	} catch {
		return Response.json({ error: "Invalid request." }, { status: 400 });
	}
	const mode = parsed.mode ?? "trail";
	const modelId = parsed.model && MODEL_IDS.has(parsed.model) ? parsed.model : DEFAULT_MODEL_ID;
	const model = getModel(modelId);
	const messages = [{
		role: "system",
		content: mode === "side" ? SIDE_SYSTEM : TRAIL_SYSTEM
	}];
	if (modelId === "grok-build-0.1") messages.push({
		role: "system",
		content: BUILD_EXTRA
	});
	if (mode === "side" && parsed.parentTitle) messages.push({
		role: "system",
		content: `Continuing from stored trail “${parsed.parentTitle}”. Use this as context only:\n\n${parsed.parentExcerpt ?? "(empty trail)"}`
	});
	if (parsed.workspace?.length) {
		const listing = parsed.workspace.map((f) => `## ${f.path}\n${f.content}`).join("\n\n").slice(0, 4e4);
		messages.push({
			role: "system",
			content: `Current project workspace (virtual). Edit by rewriting fenced files with paths.\n\n${listing}`
		});
	}
	for (const message of parsed.messages) {
		if (message.role === "system") continue;
		messages.push({
			role: message.role,
			content: message.content
		});
	}
	const maxTokens = mode === "side" ? Math.min(1600, model.maxTokens) : model.maxTokens;
	const upstream = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: model.id,
			stream: true,
			temperature: model.id === "grok-build-0.1" ? .4 : .6,
			max_tokens: maxTokens,
			messages
		})
	});
	if (!upstream.ok || !upstream.body) {
		const detail = await upstream.text().catch(() => "");
		return Response.json({ error: `Studio model error ${upstream.status}${detail ? `: ${detail.slice(0, 180)}` : ""}` }, { status: 502 });
	}
	const reader = upstream.body.getReader();
	const decoder = new TextDecoder();
	const stream = new ReadableStream({
		async start(controller) {
			const encoder = new TextEncoder();
			let buffer = "";
			try {
				for (;;) {
					const { done, value } = await reader.read();
					if (done) break;
					buffer += decoder.decode(value, { stream: true });
					const lines = buffer.split("\n");
					buffer = lines.pop() ?? "";
					for (const line of lines) {
						const trimmed = line.trim();
						if (!trimmed.startsWith("data:")) continue;
						const data = trimmed.slice(5).trim();
						if (!data || data === "[DONE]") continue;
						try {
							const delta = JSON.parse(data).choices?.[0]?.delta?.content;
							if (delta) controller.enqueue(encoder.encode(delta));
						} catch {}
					}
				}
			} catch (err) {
				controller.error(err);
				return;
			}
			controller.close();
		},
		cancel() {
			reader.cancel().catch(() => void 0);
		}
	});
	return new Response(stream, { headers: {
		"Content-Type": "text/plain; charset=utf-8",
		"Cache-Control": "no-cache, no-transform",
		"X-Content-Type-Options": "nosniff"
	} });
} } } });
var Body$1 = object({
	token: string().min(8).max(200),
	accountId: string().min(8).max(80),
	projectName: string().min(1).max(80),
	files: array(object({
		path: string().min(1).max(240),
		content: string().max(4e5)
	})).min(1).max(80)
});
var CF = "https://api.cloudflare.com/client/v4";
async function cf(token, path, init) {
	const res = await fetch(`${CF}${path}`, {
		...init,
		headers: {
			Authorization: `Bearer ${token}`,
			...init?.body && !(init.body instanceof FormData) ? { "Content-Type": "application/json" } : {},
			...init?.headers ?? {}
		}
	});
	const text = await res.text();
	let json = null;
	try {
		json = text ? JSON.parse(text) : null;
	} catch {
		json = { errors: [{ message: text.slice(0, 240) }] };
	}
	return {
		ok: res.ok,
		status: res.status,
		json
	};
}
function cfError(json) {
	return (json?.errors)?.[0]?.message ?? "Cloudflare request failed";
}
var Route$1 = createFileRoute("/api/cloudflare")({ server: { handlers: { POST: async ({ request }) => {
	let parsed;
	try {
		parsed = Body$1.parse(await request.json());
	} catch {
		return Response.json({ error: "Invalid Cloudflare request." }, { status: 400 });
	}
	const { token, accountId, projectName, files } = parsed;
	const slug = projectName.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 50);
	const existing = await cf(token, `/accounts/${accountId}/pages/projects/${slug}`);
	if (existing.status === 401 || existing.status === 403) return Response.json({ error: "Cloudflare rejected the token." }, { status: 401 });
	if (!existing.ok) {
		const created = await cf(token, `/accounts/${accountId}/pages/projects`, {
			method: "POST",
			body: JSON.stringify({
				name: slug,
				production_branch: "main"
			})
		});
		if (!created.ok) return Response.json({ error: cfError(created.json) }, { status: 502 });
	}
	const form = new FormData();
	for (const file of files) {
		const path = file.path.replace(/^\/+/, "");
		form.append(path, new Blob([file.content], { type: "application/octet-stream" }), path);
	}
	const deployed = await cf(token, `/accounts/${accountId}/pages/projects/${slug}/deployments`, {
		method: "POST",
		body: form
	});
	if (!deployed.ok) return Response.json({ error: cfError(deployed.json) }, { status: 502 });
	const result = deployed.json?.result;
	const url = result?.url ?? `https://${slug}.pages.dev`;
	return Response.json({
		ok: true,
		url,
		id: result?.id ?? "",
		project: slug,
		files: files.length
	});
} } } });
var Body = object({
	token: string().min(8).max(200),
	owner: string().min(1).max(80),
	repo: string().min(1).max(80),
	branch: string().min(1).max(80).default("main"),
	message: string().min(1).max(240),
	private: boolean().optional(),
	files: array(object({
		path: string().min(1).max(240),
		content: string().max(4e5)
	})).min(1).max(80)
});
var GH = "https://api.github.com";
async function gh(token, path, init) {
	const res = await fetch(`${GH}${path}`, {
		...init,
		headers: {
			Accept: "application/vnd.github+json",
			Authorization: `Bearer ${token}`,
			"User-Agent": "AgentSam-Work",
			"X-GitHub-Api-Version": "2022-11-28",
			...init?.body ? { "Content-Type": "application/json" } : {},
			...init?.headers ?? {}
		}
	});
	const text = await res.text();
	let json = null;
	try {
		json = text ? JSON.parse(text) : null;
	} catch {
		json = { message: text.slice(0, 240) };
	}
	return {
		ok: res.ok,
		status: res.status,
		json
	};
}
var Route = createFileRoute("/api/github")({ server: { handlers: { POST: async ({ request }) => {
	let parsed;
	try {
		parsed = Body.parse(await request.json());
	} catch {
		return Response.json({ error: "Invalid GitHub request." }, { status: 400 });
	}
	const { token, owner, repo, branch, message, files } = parsed;
	const existing = await gh(token, `/repos/${owner}/${repo}`);
	if (existing.status === 401 || existing.status === 403) return Response.json({ error: "GitHub rejected the token." }, { status: 401 });
	if (existing.status === 404) {
		const created = await gh(token, "/user/repos", {
			method: "POST",
			body: JSON.stringify({
				name: repo,
				private: parsed.private ?? true,
				description: "Shipped from AgentSam Work",
				auto_init: false
			})
		});
		if (!created.ok) {
			if (!(await gh(token, `/orgs/${owner}/repos`, {
				method: "POST",
				body: JSON.stringify({
					name: repo,
					private: parsed.private ?? true,
					description: "Shipped from AgentSam Work",
					auto_init: false
				})
			})).ok) {
				const detail = created.json?.message ?? "could not create repo";
				return Response.json({ error: `GitHub create failed: ${detail}` }, { status: 502 });
			}
		}
	}
	const blobs = [];
	for (const file of files) {
		const blob = await gh(token, `/repos/${owner}/${repo}/git/blobs`, {
			method: "POST",
			body: JSON.stringify({
				content: file.content,
				encoding: "utf-8"
			})
		});
		const sha = blob.json?.sha;
		if (!blob.ok || !sha) return Response.json({ error: `Could not write ${file.path}` }, { status: 502 });
		blobs.push({
			path: file.path.replace(/^\/+/, ""),
			sha
		});
	}
	const ref = await gh(token, `/repos/${owner}/${repo}/git/ref/heads/${branch}`);
	const refSha = ref.json?.object?.sha;
	let parentSha;
	let baseTree;
	if (ref.ok && refSha) {
		parentSha = refSha;
		baseTree = (await gh(token, `/repos/${owner}/${repo}/git/commits/${refSha}`)).json?.tree?.sha;
	}
	const tree = await gh(token, `/repos/${owner}/${repo}/git/trees`, {
		method: "POST",
		body: JSON.stringify({
			base_tree: baseTree,
			tree: blobs.map((b) => ({
				path: b.path,
				mode: "100644",
				type: "blob",
				sha: b.sha
			}))
		})
	});
	const treeSha = tree.json?.sha;
	if (!tree.ok || !treeSha) return Response.json({ error: "Could not build git tree." }, { status: 502 });
	const commit = await gh(token, `/repos/${owner}/${repo}/git/commits`, {
		method: "POST",
		body: JSON.stringify({
			message,
			tree: treeSha,
			parents: parentSha ? [parentSha] : []
		})
	});
	const commitSha = commit.json?.sha;
	if (!commit.ok || !commitSha) return Response.json({ error: "Could not create commit." }, { status: 502 });
	if (parentSha) {
		if (!(await gh(token, `/repos/${owner}/${repo}/git/refs/heads/${branch}`, {
			method: "PATCH",
			body: JSON.stringify({ sha: commitSha })
		})).ok) return Response.json({ error: "Could not update branch." }, { status: 502 });
	} else if (!(await gh(token, `/repos/${owner}/${repo}/git/refs`, {
		method: "POST",
		body: JSON.stringify({
			ref: `refs/heads/${branch}`,
			sha: commitSha
		})
	})).ok) return Response.json({ error: "Could not create branch." }, { status: 502 });
	const url = `https://github.com/${owner}/${repo}`;
	return Response.json({
		ok: true,
		url,
		sha: commitSha,
		files: blobs.length
	});
} } } });
var rootRouteChildren = {
	IndexRoute: Route$3.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$4
	}),
	ApiChatRoute: Route$2.update({
		id: "/api/chat",
		path: "/api/chat",
		getParentRoute: () => Route$4
	}),
	ApiCloudflareRoute: Route$1.update({
		id: "/api/cloudflare",
		path: "/api/cloudflare",
		getParentRoute: () => Route$4
	}),
	ApiGithubRoute: Route.update({
		id: "/api/github",
		path: "/api/github",
		getParentRoute: () => Route$4
	})
};
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { getModel as i, STUDIO_MODELS as r, router_exports as t };
