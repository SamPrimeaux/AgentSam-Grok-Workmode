import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { O as Box, T as Cloud, _ as Globe, a as Trash2, b as FileCode } from "../_libs/lucide-react.mjs";
import { m as shortTime, n as cn, t as Button, v as useActiveProject, x as useWorkStore } from "./button-MnOYoZhe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/artifacts-DIQwxoJv.js
var import_jsx_runtime = require_jsx_runtime();
function kindOf(file) {
	if (file.kind) return file.kind;
	if (file.path.endsWith(".html")) return "preview";
	if (file.path.includes(".agentsam/deploys")) return "deploy";
	return "code";
}
function ArtifactsStage() {
	const navigate = useNavigate();
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
									navigate({ to: "/browse" });
									return;
								}
								if (kind === "deploy" && file.url) {
									openSideTab("browser", {
										url: file.url,
										title: file.title ?? "Deploy",
										ephemeral: false
									});
									navigate({ to: "/browse" });
									return;
								}
								selectFile(file.id);
								navigate({ to: "/files" });
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
//#endregion
export { ArtifactsStage as t };
