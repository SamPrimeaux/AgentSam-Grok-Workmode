import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Columns2, Share, SquareTerminal, Users } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TrailThread } from "@/components/workbench/thread";
import { SideStage } from "@/components/workbench/side-stage";
import { TrailsPanel } from "@/components/shell/studio-panels";
import { cn } from "@/lib/utils";
import { useWorkStore } from "@/lib/work/store";
import type { Trail } from "@/lib/work/types";

export function TrailWorkspace({ trail }: { trail: Trail }) {
  const sideOpen = useWorkStore((s) => s.sideOpen);
  const sideTabs = useWorkStore((s) => s.sideTabs);
  const terminalOpen = useWorkStore((s) => s.terminalOpen);
  const setSideOpen = useWorkStore((s) => s.setSideOpen);
  const openSideTab = useWorkStore((s) => s.openSideTab);
  const renameTrail = useWorkStore((s) => s.renameTrail);
  const setActiveTrail = useWorkStore((s) => s.setActiveTrail);
  const toggleTerminal = useWorkStore((s) => s.toggleTerminal);

  useEffect(() => {
    setActiveTrail(trail.id);
  }, [trail.id, setActiveTrail]);

  function toggleDual() {
    if (sideOpen) {
      setSideOpen(false);
      return;
    }
    if (sideTabs[0]) {
      setSideOpen(true);
      return;
    }
    openSideTab("chat");
  }

  async function share() {
    const markdown = [`# ${trail.title}`, "", ...trail.messages.map((m) => `**${m.role}**\n\n${m.content}`)].join(
      "\n\n",
    );
    try {
      await navigator.clipboard.writeText(markdown);
      toast("Chat copied");
    } catch {
      toast("Could not copy the chat");
    }
  }

  return (
    <div className="flex h-full min-h-0">
      <aside className="hidden h-full w-[min(20rem,32vw)] shrink-0 border-r border-border md:block">
        <TrailsPanel activeId={trail.id} showBrandFooter={false} />
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="flex min-h-12 shrink-0 items-center gap-1 border-b border-border px-2">
          <Button asChild size="icon" variant="ghost" className="size-11 text-foreground md:hidden md:size-8">
            <Link to="/trails" aria-label="Back to chats">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <input
            value={trail.title}
            onChange={(e) => renameTrail(trail.id, e.target.value)}
            className="min-w-0 flex-1 bg-transparent px-2 text-sm font-medium tracking-tight outline-none"
            aria-label="Chat title"
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="size-11 md:size-8"
                aria-label="Copy chat"
                onClick={() => void share()}
              >
                <Share className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy chat</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="size-11 md:size-8"
                aria-label="Open co-worker"
                onClick={() => openSideTab("chat")}
              >
                <Users className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Co-worker</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="icon"
                variant={terminalOpen ? "secondary" : "ghost"}
                className="size-11 md:size-8"
                aria-label="Toggle CLI drawer"
                onClick={toggleTerminal}
              >
                <SquareTerminal className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>CLI drawer</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="icon"
                variant={sideOpen ? "secondary" : "ghost"}
                className="hidden size-8 md:inline-flex"
                aria-label="Toggle side stage"
                onClick={toggleDual}
              >
                <Columns2 className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Side stage</TooltipContent>
          </Tooltip>
        </header>

        <div className="flex min-h-0 min-w-0 flex-1">
          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            <TrailThread />
          </div>
          {sideOpen ? (
            <>
              <button
                type="button"
                aria-label="Close side stage overlay"
                className="fixed inset-0 z-40 bg-ink/60 md:hidden"
                onClick={() => setSideOpen(false)}
              />
              <aside
                className={cn(
                  "min-h-0 bg-background",
                  "max-md:fixed max-md:inset-0 max-md:z-50",
                  "md:relative md:w-[min(46vw,32rem)] md:shrink-0 md:border-l md:border-border",
                )}
              >
                <SideStage />
              </aside>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
