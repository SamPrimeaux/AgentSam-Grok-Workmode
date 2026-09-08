AgentSam Work is ready — a calm dark studio for stored trails, throwaway helpers, a browser, and files.
Trails live in the left rail. They persist. The main pane is the conversation you keep.
Side stage (columns icon) is the dual window. It can be:

Helper chat — ephemeral, discarded when you close it, unless you Keep trail
Browser — look something up without leaving the bench; links in replies open here
Files / Monaco — code AgentSam writes is captured and editable

The + on the side stage stacks those tabs. Cmd+K searches trails and runs commands.
Try a starter on the Studio trail, then open a side chat next to it.This is nice. can u implement cli / xterm/monaco so i can cleanly have ability to agentically create/vibecode/deploy via cloudflare/github methods? also incorporate model selection options + add ui for Artifacts and ProjectsAgentSam Work is now a vibecode bench: projects, artifacts, Monaco, a real xterm CLI, model picker, and GitHub / Cloudflare ship.
What to try

Projects (folder in the rail) — switch workspaces; each one owns files, git, and ship targets
Artifacts — captured code, HTML previews, and deploy receipts
Files — Monaco on the project tree; HTML opens in the browser pane
CLI (Ctrl+` or the terminal icon) — help, ls, git init, git add ., git commit -m "init", wrangler pages deploy, vibe add a hero to index.html
Model — Grok 4.6, 4.5, 4.20, 4.3, or Grok Build under the composer
Ship — GitHub push and Cloudflare Pages. Tokens stay in this browser (export GITHUB_TOKEN=… / export CLOUDFLARE_API_TOKEN=… also work in the CLI)

Side chats stay ephemeral until you keep them. Shell fences in replies have a Run control that sends the command to the CLI.  ( goal is next building a real cloudflare oauth , real google oauth , real xterm, real capabilities.
