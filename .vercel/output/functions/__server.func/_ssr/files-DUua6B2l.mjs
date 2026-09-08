import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { S as Download, _ as Globe, a as Trash2, b as FileCode, d as Plus } from "../_libs/lucide-react.mjs";
import { _ as uid, l as languageFromPath, n as cn, t as Button, v as useActiveProject, x as useWorkStore } from "./button-MnOYoZhe.mjs";
import { i as DialogTitle, n as DialogContent, r as DialogDescription, t as Dialog } from "./dialog-n-0QUNAG.mjs";
import { t as Input } from "./input-AmxdtNg2.mjs";
import { n as downloadText } from "./bundle-Z8qvW90W.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/files-DUua6B2l.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
//#endregion
export { FilesStage as t };
