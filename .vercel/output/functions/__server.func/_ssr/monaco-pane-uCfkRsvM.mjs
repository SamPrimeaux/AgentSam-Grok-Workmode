import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Ft } from "../_libs/monaco-editor__react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/monaco-pane-uCfkRsvM.js
var import_jsx_runtime = require_jsx_runtime();
var THEME = "agentsam";
function MonacoPane({ file, onChange }) {
	const onMount = (_editor, monaco) => {
		monaco.editor.defineTheme(THEME, {
			base: "vs-dark",
			inherit: true,
			rules: [],
			colors: {
				"editor.background": "#070708",
				"editor.foreground": "#F3F1EC",
				"editorLineNumber.foreground": "#8A7F72",
				"editorLineNumber.activeForeground": "#C4B8A8",
				"editor.lineHighlightBackground": "#101011",
				"editorCursor.foreground": "#C4B8A8",
				"editor.selectionBackground": "#C4B8A833",
				"editorGutter.background": "#070708",
				"editorWidget.background": "#101011",
				"editorWidget.border": "#221F1C"
			}
		});
		monaco.editor.setTheme(THEME);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ft, {
		height: "100%",
		theme: THEME,
		path: file.path,
		language: file.language,
		value: file.content,
		onChange: (value) => onChange(value ?? ""),
		onMount,
		options: {
			minimap: { enabled: false },
			fontSize: 13,
			fontFamily: "IBM Plex Mono, ui-monospace, SF Mono, Menlo, monospace",
			scrollBeyondLastLine: false,
			smoothScrolling: true,
			padding: {
				top: 12,
				bottom: 12
			},
			renderLineHighlight: "line",
			automaticLayout: true,
			tabSize: 2,
			wordWrap: "on"
		}
	});
}
//#endregion
export { MonacoPane };
