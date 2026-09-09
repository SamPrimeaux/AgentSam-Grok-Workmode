import Editor, { type OnMount } from "@monaco-editor/react";
import type { Artifact } from "@/lib/work/types";

const THEME = "agentsam";

export function MonacoPane({ file, onChange }: { file: Artifact; onChange: (value: string) => void }) {
  const onMount: OnMount = (editor, monaco) => {
    monaco.editor.defineTheme(THEME, {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "8A7F72" },
        { token: "string", foreground: "C4B8A8" },
        { token: "keyword", foreground: "F3F1EC" },
      ],
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
        "editorIndentGuide.background": "#221F1C",
        "editorIndentGuide.activeBackground": "#2A2622",
      },
    });
    monaco.editor.setTheme(THEME);
    editor.addAction({
      id: "agentsam.format",
      label: "Format document",
      keybindings: [monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyF],
      run: async (ed) => {
        await ed.getAction("editor.action.formatDocument")?.run();
      },
    });
    editor.focus();
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
      loading={<div className="flex h-full items-center justify-center text-sm text-muted-foreground">Loading Monaco</div>}
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
        formatOnPaste: true,
        bracketPairColorization: { enabled: true },
        guides: { indentation: true },
        mouseWheelZoom: true,
      }}
    />
  );
}
