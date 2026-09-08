import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { x as useWorkStore } from "./button-MnOYoZhe.mjs";
import { t as FilesStage } from "./files-DUua6B2l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/files-CCIm6MrU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FilesPage() {
	const sideTabs = useWorkStore((s) => s.sideTabs);
	const openSideTab = useWorkStore((s) => s.openSideTab);
	const activeProjectId = useWorkStore((s) => s.activeProjectId);
	const projects = useWorkStore((s) => s.projects);
	const project = projects.find((p) => p.id === activeProjectId) ?? projects[0];
	(0, import_react.useEffect)(() => {
		if (!useWorkStore.getState().sideTabs.some((t) => t.kind === "files")) openSideTab("files", {
			ephemeral: false,
			fileId: project.files[0]?.id ?? null
		});
	}, [openSideTab, project.files]);
	const tab = (0, import_react.useMemo)(() => {
		const existing = sideTabs.find((t) => t.kind === "files");
		if (existing) return existing;
		return {
			id: "files-page",
			kind: "files",
			title: "Files",
			ephemeral: false,
			messages: [],
			parentTrailId: null,
			keptTrailId: null,
			url: "",
			srcdoc: null,
			fileId: project.files[0]?.id ?? null
		};
	}, [sideTabs, project.files]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-full min-h-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilesStage, { tab })
	});
}
//#endregion
export { FilesPage as component };
