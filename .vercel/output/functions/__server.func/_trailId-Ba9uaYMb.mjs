import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link, y as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { c as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { C as Copy, D as Check, E as ChevronDown, O as Box, _ as Globe, b as FileCode, c as Share, d as Plus, f as Play, h as MessageSquare, j as ArrowLeft, k as ArrowUp, m as Paperclip, o as Square, r as Upload, s as SquareTerminal, t as X, w as Columns2 } from "./_libs/lucide-react.mjs";
import { a as getModel, i as STUDIO_MODELS, n as Route } from "./_ssr/router-DHbBYV48.mjs";
import { b as useActiveTrail, l as languageFromPath, n as cn, o as extractArtifacts, s as formatElapsed, t as Button, x as useWorkStore, y as useActiveSideTab } from "./_ssr/button-MnOYoZhe.mjs";
import { a as TooltipTrigger, n as Tooltip, r as TooltipContent, t as StudioMark } from "./_ssr/mark-B3BkDlJF.mjs";
import { i as DialogTitle, n as DialogContent, r as DialogDescription, t as Dialog } from "./_ssr/dialog-n-0QUNAG.mjs";
import { n as Textarea } from "./_ssr/input-AmxdtNg2.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as ArtifactsStage } from "./_ssr/artifacts-DIQwxoJv.mjs";
import { t as BrowserStage } from "./_ssr/browser-PLU_Y5TD.mjs";
import { t as FilesStage } from "./_ssr/files-DUua6B2l.mjs";
import { a as DropdownMenuTrigger, i as DropdownMenuLabel, n as DropdownMenuContent, r as DropdownMenuItem, s as TrailsPanel, t as DropdownMenu } from "./_ssr/studio-panels-BqtSGCf3.mjs";
import { t as DeployStage } from "./_ssr/deploy-_9edsGdK.mjs";
import { t as Markdown } from "./_libs/react-markdown+[...].mjs";
import { t as remarkGfm } from "./_libs/remark-gfm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_trailId-Ba9uaYMb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	const navigate = useNavigate();
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
							navigate({ to: "/cli" });
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
							navigate({ to: "/files" });
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
	const navigate = useNavigate();
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
							} else openSideTab("browser", {
								url: href,
								title: "Browser",
								ephemeral: false
							});
							navigate({ to: "/browse" });
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
		className: "px-3 pb-[max(1rem,env(safe-area-inset-bottom))] md:px-4 md:pb-4",
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
function TrailWorkspace({ trail }) {
	const sideOpen = useWorkStore((s) => s.sideOpen);
	const sideTabs = useWorkStore((s) => s.sideTabs);
	const setSideOpen = useWorkStore((s) => s.setSideOpen);
	const openSideTab = useWorkStore((s) => s.openSideTab);
	const renameTrail = useWorkStore((s) => s.renameTrail);
	const setActiveTrail = useWorkStore((s) => s.setActiveTrail);
	(0, import_react.useEffect)(() => {
		setActiveTrail(trail.id);
	}, [trail.id, setActiveTrail]);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "hidden h-full w-[min(20rem,32vw)] shrink-0 border-r border-border md:block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrailsPanel, {
				activeId: trail.id,
				showBrandFooter: false
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-0 min-w-0 flex-1 flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex min-h-12 shrink-0 items-center gap-1 border-b border-border px-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "icon",
						variant: "ghost",
						className: "size-11 text-foreground md:hidden md:size-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/trails",
							"aria-label": "Back to trails",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: trail.title,
						onChange: (e) => renameTrail(trail.id, e.target.value),
						className: "min-w-0 flex-1 bg-transparent px-2 text-sm font-medium tracking-tight outline-none",
						"aria-label": "Trail title"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "icon",
							variant: "ghost",
							className: "size-11 md:size-8",
							"aria-label": "Copy trail",
							onClick: () => void share(),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share, { className: "size-4" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: "Copy trail" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "icon",
							variant: "ghost",
							className: "size-11 md:size-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/cli",
								"aria-label": "Open CLI",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareTerminal, { className: "size-4" })
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: "CLI" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "icon",
							variant: sideOpen ? "secondary" : "ghost",
							className: "hidden size-8 md:inline-flex",
							"aria-label": "Toggle side stage",
							onClick: toggleDual,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Columns2, { className: "size-4" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: "Side stage" })] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
			})]
		})]
	});
}
function TrailPage() {
	const { trailId } = Route.useParams();
	const trail = useWorkStore((s) => s.trails.find((t) => t.id === trailId));
	if (!trail) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col items-center justify-center gap-3 px-6 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "That trail is not on this device."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "secondary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/trails",
				children: "Back to trails"
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrailWorkspace, { trail });
}
//#endregion
export { TrailPage as component };
