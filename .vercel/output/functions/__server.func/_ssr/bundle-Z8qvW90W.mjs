import { n as zipSync, t as strToU8 } from "../_libs/fflate.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bundle-Z8qvW90W.js
function zipProject(files, name) {
	const entries = {};
	for (const file of files) {
		const path = file.path.replace(/^\/+/, "");
		if (!path) continue;
		entries[path] = strToU8(file.content);
	}
	if (!Object.keys(entries).length) entries["README.md"] = strToU8(`# ${name}\n`);
	return zipSync(entries, { level: 6 });
}
function downloadBytes(bytes, filename, mime) {
	const blob = new Blob([bytes], { type: mime });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}
function downloadText(content, filename) {
	downloadBytes(strToU8(content), filename, "text/plain;charset=utf-8");
}
//#endregion
export { downloadText as n, zipProject as r, downloadBytes as t };
