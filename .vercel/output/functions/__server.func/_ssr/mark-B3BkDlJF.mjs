import "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn } from "./button-MnOYoZhe.mjs";
import { a as Trigger, i as Root3, n as Portal, r as Provider, t as Content2 } from "../_libs/@radix-ui/react-tooltip+[...].mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, { ...props });
}
function TooltipContent({ className, sideOffset = 6, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
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
//#endregion
export { TooltipTrigger as a, TooltipProvider as i, Tooltip as n, TooltipContent as r, StudioMark as t };
