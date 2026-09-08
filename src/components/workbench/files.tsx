import { lazy, Suspense, useState } from "react";
import { Download, FileCode, Globe, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { languageFromPath, uid } from "@/lib/utils";
import { downloadText } from "@/lib/work/bundle";
import { useActiveProject, useWorkStore } from "@/lib/work/store";
import type { SideTab } from "@/lib/work/types";
import { cn } from "@/lib/utils";

const MonacoPane = lazy(() =>
  import("@/components/workbench/monaco-pane").then((m) => ({ default: m.MonacoPane })),
);

export function FilesStage({ tab }: { tab: SideTab }) {
  const project = useActiveProject();
  const upsertFile = useWorkStore((s) => s.upsertFile);
  const deleteFile = useWorkStore((s) => s.deleteFile);
  const selectFile = useWorkStore((s) => s.selectFile);
  const openSideTab = useWorkStore((s) => s.openSideTab);
  const selected = project.files.find((f) => f.id === tab.fileId) ?? project.files[0] ?? null;
  const [creating, setCreating] = useState(false);
  const [path, setPath] = useState("src/untitled.ts");

  const files = [...project.files].sort((a, b) => a.path.localeCompare(b.path));

  return (
    <div className="flex h-full min-h-0">
      <div className="flex w-44 shrink-0 flex-col border-r border-border bg-sidebar md:w-52">
        <div className="flex items-center gap-1 border-b border-border px-2 py-2">
          <p className="flex-1 truncate px-1 text-xs text-muted-foreground">Files</p>
          <Button type="button" size="icon-sm" variant="ghost" aria-label="New file" onClick={() => setCreating(true)}>
            <Plus className="size-4" />
          </Button>
        </div>
        <div className="scrollbar-thin flex-1 overflow-y-auto p-1">
          {files.length === 0 ? (
            <p className="px-2 py-3 text-xs text-muted-foreground">
              Captured files land here when AgentSam writes code.
            </p>
          ) : (
            files.map((file) => (
              <button
                key={file.id}
                type="button"
                onClick={() => selectFile(file.id)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-xs",
                  selected?.id === file.id ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/60",
                )}
              >
                <FileCode className="size-3.5 shrink-0" />
                <span className="truncate">{file.path}</span>
              </button>
            ))
          )}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        {selected ? (
          <>
            <div className="flex items-center gap-1 border-b border-border px-2 py-1.5">
              <span className="min-w-0 flex-1 truncate px-1 font-mono text-xs text-muted-foreground">
                {selected.path}
              </span>
              {selected.language === "html" || selected.path.endsWith(".html") ? (
                <Button
                  type="button"
                  size="icon-sm"
                  variant="ghost"
                  aria-label="Preview in browser"
                  onClick={() =>
                    openSideTab("browser", {
                      title: selected.path,
                      srcdoc: selected.content,
                      ephemeral: false,
                    })
                  }
                >
                  <Globe className="size-4" />
                </Button>
              ) : null}
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                aria-label="Download"
                onClick={() => downloadText(selected.content, selected.path.split("/").pop() || selected.path)}
              >
                <Download className="size-4" />
              </Button>
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                aria-label="Delete file"
                onClick={() => deleteFile(project.id, selected.id)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
            <div className="min-h-0 flex-1">
              <Suspense
                fallback={
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    Opening editor
                  </div>
                }
              >
                <MonacoPane
                  file={selected}
                  onChange={(value) =>
                    upsertFile(project.id, { ...selected, content: value, updatedAt: Date.now(), origin: "editor" })
                  }
                />
              </Suspense>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <FileCode className="mb-3 size-8 text-stone" />
            <h2 className="text-base font-medium">No file open</h2>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground text-pretty">
              Ask AgentSam to write something, or add a file of your own.
            </p>
            <Button type="button" variant="outline" size="sm" className="mt-4" onClick={() => setCreating(true)}>
              New file
            </Button>
          </div>
        )}
      </div>

      <Dialog open={creating} onOpenChange={setCreating}>
        <DialogContent>
          <DialogTitle>New file</DialogTitle>
          <DialogDescription>Stored on this project and opened in Monaco.</DialogDescription>
          <form
            className="mt-4 flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              const next = path.trim().replace(/^\/+/, "");
              if (!next) return;
              const file = {
                id: uid(),
                path: next,
                language: languageFromPath(next),
                content: "",
                updatedAt: Date.now(),
                kind: next.endsWith(".html") ? ("preview" as const) : ("code" as const),
                origin: "editor" as const,
              };
              upsertFile(project.id, file);
              const saved = useWorkStore
                .getState()
                .projects.find((p) => p.id === project.id)
                ?.files.find((f) => f.path === next);
              if (saved) selectFile(saved.id);
              setCreating(false);
            }}
          >
            <Input value={path} onChange={(e) => setPath(e.target.value)} autoFocus />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setCreating(false)}>
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
