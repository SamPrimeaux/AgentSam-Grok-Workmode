import { useMemo, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Globe, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWorkStore } from "@/lib/work/store";
import type { SideTab } from "@/lib/work/types";

const BOOKMARKS = [
  { label: "MDN", url: "https://developer.mozilla.org/" },
  { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Main_Page" },
  { label: "npm", url: "https://www.npmjs.com/" },
  { label: "DuckDuckGo", url: "https://duckduckgo.com/" },
];

function resolveInput(raw: string) {
  const value = raw.trim();
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  if (value.includes(" ") || !value.includes(".")) {
    return `https://duckduckgo.com/?q=${encodeURIComponent(value)}`;
  }
  return `https://${value}`;
}

export function BrowserStage({ tab }: { tab: SideTab }) {
  const setTabUrl = useWorkStore((s) => s.setTabUrl);
  const [draft, setDraft] = useState(tab.url);
  const src = tab.srcdoc ? undefined : tab.url;
  const history = useMemo(() => (tab.url ? [tab.url] : []), [tab.url]);
  const [index, setIndex] = useState(0);

  function go(url: string) {
    const next = resolveInput(url);
    if (!next) return;
    setDraft(next);
    setTabUrl(tab.id, next);
    setIndex(history.length);
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    go(draft);
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <form onSubmit={onSubmit} className="flex items-center gap-1 border-b border-border px-2 py-2">
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          aria-label="Back"
          disabled={index <= 0}
          onClick={() => {
            const prev = history[index - 1];
            if (prev) {
              setIndex(index - 1);
              setDraft(prev);
              setTabUrl(tab.id, prev);
            }
          }}
        >
          <ArrowLeft className="size-4" />
        </Button>
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          aria-label="Forward"
          disabled
        >
          <ArrowRight className="size-4" />
        </Button>
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          aria-label="Reload"
          onClick={() => tab.url && setTabUrl(tab.id, tab.url)}
        >
          <RotateCw className="size-4" />
        </Button>
        <div className="relative min-w-0 flex-1">
          <Globe className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Search or enter a URL"
            className="h-9 pl-8"
            aria-label="Address"
          />
        </div>
      </form>

      {tab.srcdoc ? (
        <iframe
          title={tab.title}
          srcDoc={tab.srcdoc}
          sandbox="allow-scripts allow-forms"
          className="h-full w-full bg-paper"
        />
      ) : src ? (
        <iframe
          key={src}
          title={tab.title}
          src={src}
          className="h-full w-full bg-card"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <Globe className="mb-3 size-8 text-stone" />
          <h2 className="text-base font-medium">Browser</h2>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground text-pretty">
            Look something up without leaving the trail. Links in replies open here.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {BOOKMARKS.map((item) => (
              <Button
                key={item.url}
                type="button"
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => go(item.url)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
