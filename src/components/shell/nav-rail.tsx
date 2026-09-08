import { Link, useRouterState } from "@tanstack/react-router";
import { Box, FileCode, FolderGit2, MessageSquare, SquareTerminal, Upload } from "lucide-react";
import { StudioMark } from "@/components/mark";
import { cn } from "@/lib/utils";

const ITEMS = [
  { to: "/trails", label: "Trails", icon: MessageSquare, match: (p: string) => p === "/" || p.startsWith("/trails") },
  { to: "/projects", label: "Projects", icon: FolderGit2, match: (p: string) => p.startsWith("/projects") },
  { to: "/artifacts", label: "Artifacts", icon: Box, match: (p: string) => p.startsWith("/artifacts") },
  { to: "/cli", label: "CLI", icon: SquareTerminal, match: (p: string) => p.startsWith("/cli"), emphasize: true },
  { to: "/files", label: "Files", icon: FileCode, match: (p: string) => p.startsWith("/files") },
] as const;

export function NavRail() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Studio"
      className="flex w-14 shrink-0 flex-col items-center gap-1 border-r border-border bg-sidebar py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:w-12"
    >
      <Link
        to="/trails"
        aria-label="Studio home"
        className="mb-2 flex size-11 items-center justify-center rounded-xl text-accent md:size-9"
      >
        <StudioMark className="size-7" />
      </Link>

      {ITEMS.map((item) => {
        const active = item.match(pathname);
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            aria-label={item.label}
            aria-current={active ? "page" : undefined}
            title={item.label}
            className={cn(
              "flex size-11 items-center justify-center rounded-xl text-muted-foreground transition-colors duration-150 md:size-9 md:rounded-lg",
              "hover:bg-muted hover:text-foreground",
              active && "bg-muted text-foreground",
              "emphasize" in item && item.emphasize && !active && "text-stone",
            )}
          >
            <Icon className="size-5 md:size-4" />
          </Link>
        );
      })}

      <div className="mt-auto flex flex-col gap-1">
        <Link
          to="/ship"
          aria-label="Ship"
          aria-current={pathname.startsWith("/ship") ? "page" : undefined}
          title="Ship"
          className={cn(
            "flex size-11 items-center justify-center rounded-xl text-muted-foreground transition-colors duration-150 md:size-9 md:rounded-lg",
            "hover:bg-muted hover:text-foreground",
            pathname.startsWith("/ship") && "bg-muted text-foreground",
          )}
        >
          <Upload className="size-5 md:size-4" />
        </Link>
      </div>
    </nav>
  );
}
