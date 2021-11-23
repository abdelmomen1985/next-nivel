import Markdown, { MarkdownToJSX } from "markdown-to-jsx";
import removeMarkdown from "markdown-to-text";
import React, { useEffect } from "react";
import { useSpeech } from "./../../hooks/useSpeech";

export default function CustomMD({
  markdown,
  options,
}: {
  markdown: string | undefined;
  options?: MarkdownToJSX.Options;
}) {
  const { speechHandler } = useSpeech();
  useEffect(() => {
    console.log("markdown", markdown);
  }, [markdown]);
  return (
    <div onMouseEnter={() => speechHandler(removeMarkdown(markdown ?? ""))}>
      <Markdown options={options}>{markdown ?? ""}</Markdown>
    </div>
  );
}
