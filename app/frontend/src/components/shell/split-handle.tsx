import { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

type Axis = "x" | "y";

export function SplitHandle({
  axis,
  onDrag,
  onDoubleClick,
  label,
}: {
  axis: Axis;
  onDrag: (deltaPx: number) => void;
  onDoubleClick?: () => void;
  label: string;
}) {
  const last = useRef(0);
  const dragging = useRef(false);

  const move = useCallback(
    (client: number) => {
      if (!dragging.current) return;
      const delta = client - last.current;
      last.current = client;
      if (delta) onDrag(delta);
    },
    [onDrag],
  );

  const stop = useCallback(() => {
    dragging.current = false;
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }, []);

  const start = useCallback(
    (client: number) => {
      dragging.current = true;
      last.current = client;
      document.body.style.cursor = axis === "x" ? "col-resize" : "row-resize";
      document.body.style.userSelect = "none";
    },
    [axis],
  );

  return (
    <div
      role="separator"
      aria-orientation={axis === "x" ? "vertical" : "horizontal"}
      aria-label={label}
      tabIndex={0}
      onDoubleClick={onDoubleClick}
      onPointerDown={(e) => {
        e.preventDefault();
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        start(axis === "x" ? e.clientX : e.clientY);
      }}
      onPointerMove={(e) => move(axis === "x" ? e.clientX : e.clientY)}
      onPointerUp={stop}
      onPointerCancel={stop}
      className={cn(
        "group relative z-20 shrink-0 touch-none",
        axis === "x" ? "w-2 cursor-col-resize" : "h-2 cursor-row-resize",
      )}
    >
      <span
        className={cn(
          "pointer-events-none absolute rounded-full bg-stone/25 transition-all duration-150",
          "group-hover:bg-clay group-hover:shadow-[0_0_14px_rgba(196,184,168,0.55)]",
          "group-active:bg-foreground group-active:shadow-[0_0_18px_rgba(243,241,236,0.45)]",
          "group-focus-visible:bg-clay",
          axis === "x"
            ? "top-1/2 left-1/2 h-12 w-px -translate-x-1/2 -translate-y-1/2 group-hover:h-24 group-hover:w-0.5"
            : "top-1/2 left-1/2 h-px w-12 -translate-x-1/2 -translate-y-1/2 group-hover:h-0.5 group-hover:w-24",
        )}
      />
    </div>
  );
}
