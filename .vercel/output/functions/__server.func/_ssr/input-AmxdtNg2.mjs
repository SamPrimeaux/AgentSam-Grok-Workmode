import "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn } from "./button-MnOYoZhe.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		suppressHydrationWarning: true,
		className: cn("flex h-10 w-full rounded-lg bg-muted px-3 text-sm text-foreground shadow-hairline placeholder:text-muted-foreground", "focus-visible:outline-none focus-visible:shadow-[0_0_0_1px_var(--color-ring)]", "disabled:cursor-not-allowed disabled:opacity-40", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		suppressHydrationWarning: true,
		className: cn("flex min-h-20 w-full resize-none rounded-lg bg-transparent px-1 py-1 text-sm text-foreground placeholder:text-muted-foreground", "focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40", className),
		...props
	});
}
//#endregion
export { Textarea as n, Input as t };
