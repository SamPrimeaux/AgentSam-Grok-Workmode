import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { x as useWorkStore } from "./button-MnOYoZhe.mjs";
import { t as BrowserStage } from "./browser-PLU_Y5TD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/browse-BueLXIOi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BrowsePage() {
	const sideTabs = useWorkStore((s) => s.sideTabs);
	const openSideTab = useWorkStore((s) => s.openSideTab);
	(0, import_react.useEffect)(() => {
		if (!useWorkStore.getState().sideTabs.some((t) => t.kind === "browser")) openSideTab("browser", { ephemeral: false });
	}, [openSideTab]);
	const tab = (0, import_react.useMemo)(() => {
		const existing = sideTabs.find((t) => t.kind === "browser");
		if (existing) return existing;
		return {
			id: "browse-page",
			kind: "browser",
			title: "Browser",
			ephemeral: false,
			messages: [],
			parentTrailId: null,
			keptTrailId: null,
			url: "",
			srcdoc: null,
			fileId: null
		};
	}, [sideTabs]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-full min-h-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrowserStage, { tab })
	});
}
//#endregion
export { BrowsePage as component };
