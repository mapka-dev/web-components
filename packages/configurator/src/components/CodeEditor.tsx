import * as monaco from "monaco-editor";
import { type FC, useEffect, useRef, useState } from "react";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

/**
 * Monaco environment is used to load monaco workers
 * @see https://github.com/microsoft/monaco-editor/issues/4739
 */
self.MonacoEnvironment = {
  getWorker(_, label) {
    switch (label) {
      case "typescript":
      case "javascript":
        return new tsWorker();
      default:
        return new editorWorker();
    }
  },
};

/*
 * This function evaluates the code in the context of the provided object.
 * Context is is injected as variables declared before code block from editor
 */
async function evalInContext(code?: string, context: Record<string, unknown> = {}) {
  if (!code) {
    return;
  }

  let lets = "";
  for (const key in context) {
    lets += `let ${key} = context["${key}"];`;
  }

  const codeWithVars = `
  return async () => {
    ${lets}
    ${code}
  }`;

  try {
    const fn = new Function("context", codeWithVars)(context);
    await fn();
  } catch (error) {
    console.warn("Code evaluation failed", codeWithVars, error);
  }
}

export interface CodeEditorProps {
  context?: Record<string, unknown>;
  defaultValue?: string;
  waitForContext?: boolean;
}

export const CodeEditor: FC<CodeEditorProps> = ({
  context,
  defaultValue = "",
  waitForContext = false,
}) => {
  const container = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [code, setCode] = useState<string>(defaultValue);

  useEffect(() => {
    if (!container.current) return;
    if (editorRef.current) return;

    const editor = monaco.editor.create(container.current, {
      language: "javascript",
    });
    editor.onDidChangeModelContent(() => {
      setCode(editor.getValue());
    });
    editorRef.current = editor;
  }, []);

  useEffect(() => {
    if (!editorRef.current) return;

    const currentValue = editorRef.current.getValue();
    if (currentValue !== code) {
      editorRef.current.setValue(code);
    }
  }, [code]);

  useEffect(() => {
    if (!waitForContext || context) {
      evalInContext(code, context);
    }
  }, [code, context, waitForContext]);

  return <div ref={container} style={{ height: "100%", width: "100%" }} />;
};
