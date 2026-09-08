import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as Trash2, d as Plus, l as Search, p as Pin, x as Ellipsis } from "../_libs/lucide-react.mjs";
import { m as shortTime, n as cn, t as Button, x as useWorkStore } from "./button-MnOYoZhe.mjs";
import { a as Root2, i as Portal2, n as Item2, o as Separator2, r as Label2, s as Trigger, t as Content2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { i as DialogTitle, n as DialogContent, r as DialogDescription, t as Dialog } from "./dialog-n-0QUNAG.mjs";
import { t as Input } from "./input-AmxdtNg2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio-panels-BqtSGCf3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
function TrailRow({ trail, activeId, onRename }) {
	const navigate = useNavigate();
	const setActiveTrail = useWorkStore((s) => s.setActiveTrail);
	const pinTrail = useWorkStore((s) => s.pinTrail);
	const deleteTrail = useWorkStore((s) => s.deleteTrail);
	const active = activeId === trail.id;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("group flex items-center rounded-lg", active ? "bg-muted" : "hover:bg-muted/60"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => {
				setActiveTrail(trail.id);
				navigate({
					to: "/trails/$trailId",
					params: { trailId: trail.id }
				});
			},
			className: "flex min-h-11 min-w-0 flex-1 items-center gap-2 px-2.5 py-2 text-left md:min-h-0",
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
				size: "icon",
				variant: "ghost",
				className: "mr-1 size-11 opacity-100 md:size-8 md:opacity-0 md:group-hover:opacity-100 md:data-[state=open]:opacity-100",
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
					onSelect: () => {
						deleteTrail(trail.id);
						if (active) navigate({ to: "/trails" });
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), "Delete"]
				})
			]
		})] })]
	});
}
function Section({ label, trails, activeId, onRename }) {
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
				activeId,
				onRename
			}, trail.id))
		})]
	});
}
function TrailsPanel({ activeId, showBrandFooter = true }) {
	const navigate = useNavigate();
	const trails = useWorkStore((s) => s.trails);
	const activeProjectId = useWorkStore((s) => s.activeProjectId);
	const projects = useWorkStore((s) => s.projects);
	const search = useWorkStore((s) => s.search);
	const setSearch = useWorkStore((s) => s.setSearch);
	const startTrail = useWorkStore((s) => s.startTrail);
	const renameTrail = useWorkStore((s) => s.renameTrail);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [title, setTitle] = (0, import_react.useState)("");
	const project = projects.find((p) => p.id === activeProjectId) ?? projects[0];
	const projectTrails = (0, import_react.useMemo)(() => trails.filter((t) => t.projectId === activeProjectId), [trails, activeProjectId]);
	const groups = (0, import_react.useMemo)(() => groupTrails(projectTrails, search), [projectTrails, search]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 px-3 pt-4 pb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-sm font-medium tracking-tight",
						children: project.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted-foreground",
						children: "Work"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "icon",
					variant: "ghost",
					className: "size-11 text-foreground md:size-8",
					"aria-label": "New trail",
					onClick: () => {
						const id = startTrail();
						navigate({
							to: "/trails/$trailId",
							params: { trailId: id }
						});
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-3 pb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex h-11 items-center gap-2 rounded-lg bg-muted px-2.5 shadow-hairline md:h-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: search,
						onChange: (e) => setSearch(e.target.value),
						placeholder: "Search trails",
						className: "h-full w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "scrollbar-thin flex-1 overflow-y-auto px-2 pb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						label: "Pinned",
						trails: groups.pinned,
						activeId,
						onRename: (t) => {
							setEditing(t);
							setTitle(t.title);
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						label: "Today",
						trails: groups.today,
						activeId,
						onRename: (t) => {
							setEditing(t);
							setTitle(t.title);
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						label: "Yesterday",
						trails: groups.yesterday,
						activeId,
						onRename: (t) => {
							setEditing(t);
							setTitle(t.title);
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						label: "Earlier",
						trails: groups.earlier,
						activeId,
						onRename: (t) => {
							setEditing(t);
							setTitle(t.title);
						}
					}),
					!projectTrails.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-2.5 py-6 text-sm text-muted-foreground",
						children: "No trails yet. Start one and it stays on this device."
					}) : null
				]
			}),
			showBrandFooter ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-[0.14em] text-muted-foreground uppercase",
					children: "InnerAnimalMedia"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-xs text-clay",
					children: "Studio"
				})]
			}) : null,
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
			})
		]
	});
}
function ProjectsPanel() {
	const navigate = useNavigate();
	const projects = useWorkStore((s) => s.projects);
	const trails = useWorkStore((s) => s.trails);
	const activeProjectId = useWorkStore((s) => s.activeProjectId);
	const createProject = useWorkStore((s) => s.createProject);
	const renameProject = useWorkStore((s) => s.renameProject);
	const deleteProject = useWorkStore((s) => s.deleteProject);
	const setActiveProject = useWorkStore((s) => s.setActiveProject);
	const [newOpen, setNewOpen] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [renaming, setRenaming] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 px-3 pt-4 pb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium tracking-tight",
						children: "Projects"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted-foreground",
						children: "Workspaces with files, git, and ship targets"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "icon",
					variant: "ghost",
					className: "size-11 text-foreground md:size-8",
					"aria-label": "New project",
					onClick: () => {
						setName("");
						setNewOpen(true);
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "scrollbar-thin flex-1 overflow-y-auto px-2 pb-4",
				children: projects.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("group mb-0.5 flex items-center rounded-lg", item.id === activeProjectId ? "bg-muted" : "hover:bg-muted/60"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "flex min-h-11 min-w-0 flex-1 flex-col px-2.5 py-2 text-left md:min-h-0",
						onClick: () => {
							setActiveProject(item.id);
							navigate({ to: "/trails" });
						},
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
							size: "icon",
							variant: "ghost",
							className: "mr-1 size-11 md:size-8",
							"aria-label": `Project actions for ${item.name}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "size-4" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
						align: "end",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
								onSelect: () => {
									setRenaming(item);
									setName(item.name);
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
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: newOpen,
				onOpenChange: setNewOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "New project" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "A workspace with files, git, and ship targets." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-4 flex flex-col gap-3",
						onSubmit: (e) => {
							e.preventDefault();
							createProject(name || "Untitled");
							setNewOpen(false);
							navigate({ to: "/trails" });
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: name,
							onChange: (e) => setName(e.target.value),
							placeholder: "Name",
							autoFocus: true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								onClick: () => setNewOpen(false),
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
				open: Boolean(renaming),
				onOpenChange: (open) => !open && setRenaming(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Rename project" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "The name is local to this studio." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-4 flex flex-col gap-3",
						onSubmit: (e) => {
							e.preventDefault();
							if (renaming) renameProject(renaming.id, name);
							setRenaming(null);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: name,
							onChange: (e) => setName(e.target.value),
							autoFocus: true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								onClick: () => setRenaming(null),
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
//#endregion
export { DropdownMenuTrigger as a, DropdownMenuLabel as i, DropdownMenuContent as n, ProjectsPanel as o, DropdownMenuItem as r, TrailsPanel as s, DropdownMenu as t };
