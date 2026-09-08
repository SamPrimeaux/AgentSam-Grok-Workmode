import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { A as ArrowRight, _ as Globe, j as ArrowLeft, u as RotateCw } from "../_libs/lucide-react.mjs";
import { t as Button, x as useWorkStore } from "./button-MnOYoZhe.mjs";
import { t as Input } from "./input-AmxdtNg2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/browser-PLU_Y5TD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
//#endregion
export { BrowserStage as t };
