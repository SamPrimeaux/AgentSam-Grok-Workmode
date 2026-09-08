//#region node_modules/.nitro/vite/services/ssr/assets/secrets-BRY8VAFA.js
var KEY = "agentsam-ship-secrets";
var EMPTY = {
	githubToken: "",
	cloudflareToken: ""
};
function readSecrets() {
	if (typeof window === "undefined") return { ...EMPTY };
	try {
		const raw = window.localStorage.getItem(KEY);
		if (!raw) return { ...EMPTY };
		const parsed = JSON.parse(raw);
		return {
			githubToken: typeof parsed.githubToken === "string" ? parsed.githubToken : "",
			cloudflareToken: typeof parsed.cloudflareToken === "string" ? parsed.cloudflareToken : ""
		};
	} catch {
		return { ...EMPTY };
	}
}
function writeSecrets(next) {
	if (typeof window === "undefined") return;
	const merged = {
		...readSecrets(),
		...next
	};
	window.localStorage.setItem(KEY, JSON.stringify(merged));
}
function clearSecrets() {
	if (typeof window === "undefined") return;
	window.localStorage.removeItem(KEY);
}
//#endregion
export { readSecrets as n, writeSecrets as r, clearSecrets as t };
