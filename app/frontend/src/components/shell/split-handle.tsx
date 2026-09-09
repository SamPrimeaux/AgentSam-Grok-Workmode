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
        "group relative z-20 shrink-0 touch-none outline-none",
        axis === "x" ? "w-2 cursor-col-resize self-stretch" : "h-2 cursor-row-resize w-full",
      )}
    >
      <span
        className={cn(
          "pointer-events-none absolute bg-border/80 transition-shadow duration-150",
          "group-hover:shadow-[0_0_0_1px_var(--color-ring)]",
          "group-focus-visible:shadow-[0_0_0_1px_var(--color-ring)]",
          "group-active:shadow-[0_0_0_1px_var(--color-ring)]",
          axis === "x"
            ? "inset-y-0 left-1/2 w-px -translate-x-1/2"
            : "inset-x-0 top-1/2 h-px -translate-y-1/2",
        )}
      />
    </div>
  );
}
