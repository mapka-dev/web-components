import { type FC, useEffect, useMemo, useRef, useState } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { Stack } from "@mantine/core";

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
  value?: string;
  waitForContext?: boolean;
}

export const CodeEditor: FC<CodeEditorProps> = ({
  context,
  value = "",
  waitForContext = false,
}) => {
  const [code, setCode] = useState<string>(value);
  const editorRef = useRef<EditorView | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const onChangeExtension = useMemo(() => {
    return EditorView.updateListener.of(({ state }) => {
      setCode(state.doc.toString());
    });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    if (editorRef.current) return;

    const state = EditorState.create({
      doc: value,
      extensions: [basicSetup, javascript(), onChangeExtension],
    });
    editorRef.current = new EditorView({
      parent: containerRef.current,
      state,
    });
  }, [onChangeExtension, value]);

  useEffect(() => {
    if (!containerRef.current) return;
    if (!editorRef.current) return;

    const state = editorRef.current.state;
    if (value !== state.doc.toString()) {
      state.update({
        changes: {
          from: 0,
          to: state.doc.length,
          insert: value,
        },
      });
    }
  }, [value]);

  useEffect(() => {
    if (!waitForContext || context) {
      evalInContext(code, context);
    }
  }, [code, context, waitForContext]);

  return <Stack ref={containerRef} />;
};
