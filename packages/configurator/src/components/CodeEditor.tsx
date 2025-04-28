import Editor from "@monaco-editor/react";
import { type FC, useEffect, useState } from "react";

/*
 * This function evaluates the code in the context of the provided object.
 * Context is is injected as variables declared before code block from editor
 */
function evalInContext(context: Record<string, unknown> = {}, code?: string) {
  if (!code) {
    return;
  }

  let lets = "";
  for (const key in context) {
    lets += `let ${key} = context["${key}"];`;
  }

  const codeWithVars = `
  ${lets}
  ${code}
  `;

  try {
    new Function("context", codeWithVars)(context);
  } catch (error) {
    console.warn("Code evaluation failed", codeWithVars, error);
  }
}

export interface CodeEditorProps {
  context?: Record<string, unknown>;
  defaultValue?: string;
  waitForContext?: boolean;
}

export const CodeEditor: FC<CodeEditorProps> = ({ context, defaultValue = "", waitForContext = false }) => {
  const [code, setCode] = useState<string | undefined>(defaultValue);
  
  useEffect(() => {   
    if (!waitForContext || context) {
      evalInContext(context, code);
    }
  }, [code, context, waitForContext]);

  return <Editor 
    height="100%" 
    width="100%"  
    defaultLanguage="javascript" 
    onChange={setCode} 
    value={code} 
  />;
};
