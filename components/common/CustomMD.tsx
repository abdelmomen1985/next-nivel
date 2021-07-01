import Markdown, { MarkdownToJSX } from "markdown-to-jsx";
import React from "react";
export default function CustomMD({
  markdown,
  options,
}: {
  markdown: string | undefined;
  options?: MarkdownToJSX.Options;
}) {
  return <Markdown options={options}>{markdown ?? ""}</Markdown>;
}
