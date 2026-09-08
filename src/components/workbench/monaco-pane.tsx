import Editor, { type OnMount } from "@monaco-editor/react";
import type { Artifact } from "@/lib/work/types";

const THEME = "agentsam";

export function MonacoPane({ file, onChange }: { file: Artifact; onChange: (value: string) => void }) {
  const onMount: OnMount = (_editor, monaco) => {
    monaco.editor.defineTheme(THEME, {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#070708",
        "editor.foreground": "#F3F1EC",
        "editorLineNumber.foreground": "#8A7F72",
        "editorLineNumber.activeForeground": "#C4B8A8",
        "editor.lineHighlightBackground": "#101011",
        "editorCursor.foreground": "#C4B8A8",
        "editor.selectionBackground": "#C4B8A833",
        "editorGutter.background": "#070708",
        "editorWidget.background": "#101011",
        "editorWidget.border": "#221F1C",
      },
    });
    monaco.editor.setTheme(THEME);
  };

  return (
    <Editor
      height="100%"
      theme={THEME}
      path={file.path}
      language={file.language}
      value={file.content}
      onChange={(value) => onChange(value ?? "")}
      onMount={onMount}
      options={{
        minimap: { enabled: false },
        fontSize: 13,
        fontFamily: "IBM Plex Mono, ui-monospace, SF Mono, Menlo, monospace",
        scrollBeyondLastLine: false,
        smoothScrolling: true,
        padding: { top: 12, bottom: 12 },
        renderLineHighlight: "line",
        automaticLayout: true,
        tabSize: 2,
        wordWrap: "on",
      }}
    />
  );
}
