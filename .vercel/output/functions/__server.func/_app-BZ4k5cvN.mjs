import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { d as useRouterState, m as Outlet, v as Link, y as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { c as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { O as Box, _ as Globe, b as FileCode, d as Plus, h as MessageSquare, l as Search, n as WifiOff, r as Upload, s as SquareTerminal, y as FolderGit2 } from "./_libs/lucide-react.mjs";
import { n as cn, t as Button, x as useWorkStore } from "./_ssr/button-MnOYoZhe.mjs";
import { i as TooltipProvider, t as StudioMark } from "./_ssr/mark-B3BkDlJF.mjs";
import { i as DialogTitle, n as DialogContent, r as DialogDescription, t as Dialog } from "./_ssr/dialog-n-0QUNAG.mjs";
import { t as Input } from "./_ssr/input-AmxdtNg2.mjs";
import { n as readSecrets, r as writeSecrets, t as clearSecrets } from "./_ssr/secrets-BRY8VAFA.mjs";
import { t as Toaster } from "./_libs/sonner.mjs";
import { t as _e } from "./_libs/cmdk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app-BZ4k5cvN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CommandPalette() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const trails = useWorkStore((s) => s.trails);
	const projects = useWorkStore((s) => s.projects);
	const startTrail = useWorkStore((s) => s.startTrail);
	const setActiveTrail = useWorkStore((s) => s.setActiveTrail);
	const setActiveProject = useWorkStore((s) => s.setActiveProject);
	const openSideTab = useWorkStore((s) => s.openSideTab);
	const createProject = useWorkStore((s) => s.createProject);
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
							const id = startTrail();
							navigate({
								to: "/trails/$trailId",
								params: { trailId: id }
							});
							setOpen(false);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "New trail"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
						onSelect: () => {
							createProject();
							navigate({ to: "/projects" });
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
							navigate({ to: "/cli" });
							setOpen(false);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareTerminal, { className: "size-4" }), "Open CLI"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
						onSelect: () => {
							navigate({ to: "/browse" });
							setOpen(false);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-4" }), "Open browser"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
						onSelect: () => {
							navigate({ to: "/files" });
							setOpen(false);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCode, { className: "size-4" }), "Open files"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
						onSelect: () => {
							navigate({ to: "/artifacts" });
							setOpen(false);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { className: "size-4" }), "Open artifacts"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
						onSelect: () => {
							navigate({ to: "/ship" });
							setOpen(false);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }), "Ship"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
						onSelect: () => {
							navigate({ to: "/trails" });
							setOpen(false);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" }), "Trails"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
				heading: "Projects",
				children: projects.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Item, {
					value: `project ${project.name}`,
					onSelect: () => {
						setActiveProject(project.id);
						navigate({ to: "/trails" });
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
						navigate({
							to: "/trails/$trailId",
							params: { trailId: trail.id }
						});
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
var ITEMS = [
	{
		to: "/trails",
		label: "Trails",
		icon: MessageSquare,
		match: (p) => p === "/" || p.startsWith("/trails")
	},
	{
		to: "/projects",
		label: "Projects",
		icon: FolderGit2,
		match: (p) => p.startsWith("/projects")
	},
	{
		to: "/artifacts",
		label: "Artifacts",
		icon: Box,
		match: (p) => p.startsWith("/artifacts")
	},
	{
		to: "/cli",
		label: "CLI",
		icon: SquareTerminal,
		match: (p) => p.startsWith("/cli"),
		emphasize: true
	},
	{
		to: "/files",
		label: "Files",
		icon: FileCode,
		match: (p) => p.startsWith("/files")
	}
];
function NavRail() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		"aria-label": "Studio",
		className: "flex w-14 shrink-0 flex-col items-center gap-1 border-r border-border bg-sidebar py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:w-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/trails",
				"aria-label": "Studio home",
				className: "mb-2 flex size-11 items-center justify-center rounded-xl text-accent md:size-9",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioMark, { className: "size-7" })
			}),
			ITEMS.map((item) => {
				const active = item.match(pathname);
				const Icon = item.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: item.to,
					"aria-label": item.label,
					"aria-current": active ? "page" : void 0,
					title: item.label,
					className: cn("flex size-11 items-center justify-center rounded-xl text-muted-foreground transition-colors duration-150 md:size-9 md:rounded-lg", "hover:bg-muted hover:text-foreground", active && "bg-muted text-foreground", "emphasize" in item && item.emphasize && !active && "text-stone"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5 md:size-4" })
				}, item.to);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-auto flex flex-col gap-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/ship",
					"aria-label": "Ship",
					"aria-current": pathname.startsWith("/ship") ? "page" : void 0,
					title: "Ship",
					className: cn("flex size-11 items-center justify-center rounded-xl text-muted-foreground transition-colors duration-150 md:size-9 md:rounded-lg", "hover:bg-muted hover:text-foreground", pathname.startsWith("/ship") && "bg-muted text-foreground"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-5 md:size-4" })
				})
			})
		]
	});
}
function useOnline() {
	const [online, setOnline] = (0, import_react.useState)(() => typeof navigator === "undefined" ? true : navigator.onLine);
	(0, import_react.useEffect)(() => {
		const on = () => setOnline(true);
		const off = () => setOnline(false);
		window.addEventListener("online", on);
		window.addEventListener("offline", off);
		setOnline(navigator.onLine);
		return () => {
			window.removeEventListener("online", on);
			window.removeEventListener("offline", off);
		};
	}, []);
	return online;
}
function OfflineBanner() {
	const online = useOnline();
	const queued = useWorkStore((s) => s.offlineQueue.length);
	if (online) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "status",
		className: "flex shrink-0 items-center gap-2 border-b border-border bg-card px-3 py-2 text-xs text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WifiOff, {
				className: "size-3.5 shrink-0 text-stone",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "min-w-0 flex-1 leading-snug",
				children: ["Offline — trails stay on this device. CLI still works.", queued > 0 ? ` ${queued} message${queued === 1 ? "" : "s"} queued.` : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/cli",
				className: "shrink-0 rounded-md px-2 py-1.5 font-medium text-accent underline-offset-2 hover:underline",
				children: "Open CLI"
			})
		]
	});
}
function registerOfflineShell() {
	if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
	const register = () => {
		navigator.serviceWorker.register("/sw.js").catch(() => {});
	};
	if (document.readyState === "complete") register();
	else window.addEventListener("load", register, { once: true });
}
function AppShell() {
	const navigate = useNavigate();
	const online = useOnline();
	const flushOfflineQueue = useWorkStore((s) => s.flushOfflineQueue);
	(0, import_react.useEffect)(() => {
		useWorkStore.persist.rehydrate();
		const unsub = useWorkStore.persist.onFinishHydration(() => {
			useWorkStore.getState().setHydrated(true);
		});
		if (useWorkStore.persist.hasHydrated()) useWorkStore.getState().setHydrated(true);
		registerOfflineShell();
		return unsub;
	}, []);
	(0, import_react.useEffect)(() => {
		if (online) flushOfflineQueue();
	}, [online, flushOfflineQueue]);
	(0, import_react.useEffect)(() => {
		function onNav(event) {
			const detail = event.detail;
			if (!detail?.to) return;
			navigate({
				to: detail.to,
				params: detail.params
			});
		}
		window.addEventListener("agentsam:navigate", onNav);
		return () => window.removeEventListener("agentsam:navigate", onNav);
	}, [navigate]);
	(0, import_react.useEffect)(() => {
		function onKey(event) {
			const meta = event.metaKey || event.ctrlKey;
			if (meta && event.key.toLowerCase() === "n" && !event.shiftKey) {
				event.preventDefault();
				const id = useWorkStore.getState().startTrail();
				navigate({
					to: "/trails/$trailId",
					params: { trailId: id }
				});
			}
			if (meta && event.key === "`") {
				event.preventDefault();
				navigate({ to: "/cli" });
			}
			if (meta && event.key.toLowerCase() === "b") {
				event.preventDefault();
				navigate({ to: "/trails" });
			}
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh overflow-hidden bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavRail, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfflineBanner, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "min-h-0 flex-1 overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				})]
			}),
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
var SplitComponent = AppShell;
//#endregion
export { SplitComponent as component };
