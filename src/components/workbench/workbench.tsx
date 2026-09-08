import { useEffect } from "react";
import { Box, Columns2, Menu, PanelLeft, Share, SquareTerminal, Upload } from "lucide-react";
import { Group, Panel, Separator } from "react-resizable-panels";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/workbench/sidebar";
import { TrailThread } from "@/components/workbench/thread";
import { SideStage } from "@/components/workbench/side-stage";
import { CommandPalette } from "@/components/workbench/command-palette";
import { SettingsDialog } from "@/components/workbench/settings-dialog";
import { TerminalPane } from "@/components/workbench/terminal";
import { cn } from "@/lib/utils";
import { useActiveTrail, useWorkStore } from "@/lib/work/store";

function TitleBar() {
  const trail = useActiveTrail();
  const sideOpen = useWorkStore((s) => s.sideOpen);
  const sidebarOpen = useWorkStore((s) => s.sidebarOpen);
  const terminalOpen = useWorkStore((s) => s.terminalOpen);
  const openSideTab = useWorkStore((s) => s.openSideTab);
  const setSideOpen = useWorkStore((s) => s.setSideOpen);
  const setMobileNavOpen = useWorkStore((s) => s.setMobileNavOpen);
  const toggleSidebar = useWorkStore((s) => s.toggleSidebar);
  const toggleTerminal = useWorkStore((s) => s.toggleTerminal);
  const sideTabs = useWorkStore((s) => s.sideTabs);
  const renameTrail = useWorkStore((s) => s.renameTrail);

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
      toast("Trail copied");
    } catch {
      toast("Could not copy the trail");
    }
  }

  return (
    <header className="flex h-12 shrink-0 items-center gap-1 border-b border-border px-2">
      <Button
        type="button"
        size="icon-sm"
        variant="ghost"
        className="text-foreground md:hidden"
        aria-label="Open trails"
        onClick={() => setMobileNavOpen(true)}
      >
        <Menu className="size-4" />
      </Button>
      {!sidebarOpen ? (
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          className="hidden text-foreground md:inline-flex"
          aria-label="Open trails"
          onClick={toggleSidebar}
        >
          <PanelLeft className="size-4" />
        </Button>
      ) : null}
      <input
        value={trail.title}
        onChange={(e) => renameTrail(trail.id, e.target.value)}
        className="min-w-0 flex-1 bg-transparent px-2 text-sm font-medium tracking-tight outline-none md:max-w-sm"
        aria-label="Trail title"
      />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button type="button" size="icon-sm" variant="ghost" aria-label="Copy trail" onClick={() => void share()}>
            <Share className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Copy trail</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            size="icon-sm"
            variant={terminalOpen ? "secondary" : "ghost"}
            aria-label="Toggle CLI"
            onClick={toggleTerminal}
          >
            <SquareTerminal className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>CLI</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            aria-label="Open artifacts"
            onClick={() => openSideTab("artifacts", { ephemeral: false })}
          >
            <Box className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Artifacts</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            aria-label="Ship"
            onClick={() => openSideTab("deploy", { ephemeral: false })}
          >
            <Upload className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Ship</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            size="icon-sm"
            variant={sideOpen ? "secondary" : "ghost"}
            aria-label="Toggle side stage"
            onClick={toggleDual}
          >
            <Columns2 className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Side stage</TooltipContent>
      </Tooltip>
    </header>
  );
}

export function Workbench() {
  const sidebarOpen = useWorkStore((s) => s.sidebarOpen);
  const mobileNavOpen = useWorkStore((s) => s.mobileNavOpen);
  const sideOpen = useWorkStore((s) => s.sideOpen);
  const terminalOpen = useWorkStore((s) => s.terminalOpen);
  const setMobileNavOpen = useWorkStore((s) => s.setMobileNavOpen);
  const setSideOpen = useWorkStore((s) => s.setSideOpen);
  const startTrail = useWorkStore((s) => s.startTrail);
  const openSideTab = useWorkStore((s) => s.openSideTab);
  const toggleTerminal = useWorkStore((s) => s.toggleTerminal);

  useEffect(() => {
    void useWorkStore.persist.rehydrate();
    const unsub = useWorkStore.persist.onFinishHydration(() => {
      useWorkStore.getState().setHydrated(true);
    });
    if (useWorkStore.persist.hasHydrated()) useWorkStore.getState().setHydrated(true);
    return unsub;
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const meta = event.metaKey || event.ctrlKey;
      if (meta && event.key.toLowerCase() === "n") {
        event.preventDefault();
        if (event.shiftKey) openSideTab("chat");
        else startTrail();
      }
      if (meta && event.key.toLowerCase() === "b") {
        event.preventDefault();
        useWorkStore.getState().toggleSidebar();
      }
      if (meta && event.shiftKey && event.key.toLowerCase() === "s") {
        event.preventDefault();
        if (sideOpen) setSideOpen(false);
        else openSideTab("chat");
      }
      if ((meta && event.key === "`") || (event.ctrlKey && event.key === "`")) {
        event.preventDefault();
        toggleTerminal();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openSideTab, setSideOpen, sideOpen, startTrail, toggleTerminal]);

  return (
    <TooltipProvider>
      <div className="flex h-dvh overflow-hidden bg-background text-foreground">
        {mobileNavOpen ? (
          <button
            type="button"
            aria-label="Close trails"
            className="fixed inset-0 z-40 bg-ink/60 md:hidden"
            onClick={() => setMobileNavOpen(false)}
          />
        ) : null}

        <aside
          className={cn(
            "h-full bg-sidebar",
            mobileNavOpen ? "fixed inset-y-0 left-0 z-50 w-[min(22rem,92vw)]" : "hidden",
            sidebarOpen && "md:static md:z-auto md:block md:w-[280px] md:shrink-0",
          )}
        >
          <Sidebar />
        </aside>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <TitleBar />
          <Group orientation="vertical" className="min-h-0 flex-1" style={{ height: "100%" }}>
            <Panel id="main" minSize={40} className="flex min-h-0 min-w-0">
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
            </Panel>
            {terminalOpen ? (
              <>
                <Separator className="resize-separator hidden md:flex" />
                <Panel id="cli" defaultSize={28} minSize={16} className="hidden min-h-0 md:block">
                  <TerminalPane />
                </Panel>
              </>
            ) : null}
          </Group>
        </div>

        {terminalOpen ? (
          <div className="fixed inset-0 z-50 flex flex-col bg-background md:hidden">
            <TerminalPane />
          </div>
        ) : null}

        <CommandPalette />
        <SettingsDialog />
        <Toaster
          theme="dark"
          position="bottom-center"
          toastOptions={{
            className: cn("border-border bg-card text-foreground"),
          }}
        />
      </div>
    </TooltipProvider>
  );
}
