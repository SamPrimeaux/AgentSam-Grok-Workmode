import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { clearSecrets, readSecrets, writeSecrets } from "@/lib/work/secrets";
import { useWorkStore } from "@/lib/work/store";

export function SettingsDialog() {
  const open = useWorkStore((s) => s.settingsOpen);
  const setSettingsOpen = useWorkStore((s) => s.setSettingsOpen);
  const [github, setGithub] = useState("");
  const [cloudflare, setCloudflare] = useState("");

  useEffect(() => {
    if (!open) return;
    const secrets = readSecrets();
    setGithub(secrets.githubToken);
    setCloudflare(secrets.cloudflareToken);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setSettingsOpen}>
      <DialogContent>
        <DialogTitle>Ship tokens</DialogTitle>
        <DialogDescription>
          Stored only in this browser. Used to push GitHub repos and deploy Cloudflare Pages — never sent to AgentSam.
        </DialogDescription>
        <form
          className="mt-4 flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            writeSecrets({ githubToken: github.trim(), cloudflareToken: cloudflare.trim() });
            setSettingsOpen(false);
          }}
        >
          <label className="flex flex-col gap-1.5 text-xs text-muted-foreground">
            GitHub token
            <Input
              type="password"
              autoComplete="off"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              placeholder="ghp_…"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-xs text-muted-foreground">
            Cloudflare API token
            <Input
              type="password"
              autoComplete="off"
              value={cloudflare}
              onChange={(e) => setCloudflare(e.target.value)}
              placeholder="Pages edit permission"
            />
          </label>
          <p className="text-[11px] text-muted-foreground">
            CLI: export GITHUB_TOKEN=… · export CLOUDFLARE_API_TOKEN=…
          </p>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                clearSecrets();
                setGithub("");
                setCloudflare("");
              }}
            >
              Clear
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
