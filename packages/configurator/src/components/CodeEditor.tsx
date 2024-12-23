import { type FC, useEffect, useMemo, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

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
  const [code, setCode] = useState<string>(defaultValue);

  const extensions = useMemo(() => [javascript()], []);
  useEffect(() => {
    if (!waitForContext || context) {
      evalInContext(code, context);
    }
  }, [code, context, waitForContext]);

  return (
    // @ts-expect-error - CodeMirror typings are incorrect for react 19?
    <CodeMirror
      value={code}
      height="100%"
      width="100%"
      extensions={extensions}
      onChange={setCode}
    />
  );
};
