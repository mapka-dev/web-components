import Editor from "@monaco-editor/react";
import { type FC, useEffect, useState } from "react";

/* 
 * This function evaluates the code in the context of the provided object.
 * Context is is injected as variables declared before code block from editor
 */
function evalInContext(context: Record<string, unknown>, code?: string) {
  if(!code) {
    return;
  }

  let vars = ""
  for (const key in context) {
    vars += `var ${key} = context[${key}];`;
  }

  try {
    new Function(
      'context',
      `
      ${vars}
      ${code}
      `
    )
    (context);
  } catch (error) {
    console.warn("Code evaluation failed", error);
  }
}

export interface CodeEditorProps {
  context?: Record<string, unknown>;
}

export const CodeEditor: FC<CodeEditorProps> = ({ context = {}}) => {
  const [code, setCode] = useState<string | undefined>();

  useEffect(() => {
    evalInContext(context, code);
  }, [code, context]);

  return (
    <Editor 
      height="100%" 
      width="100%"
      defaultLanguage="javascript" 
      onChange={setCode} 
    />
  );
};
