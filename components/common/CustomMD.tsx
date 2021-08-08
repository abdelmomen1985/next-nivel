import Markdown, { MarkdownToJSX } from 'markdown-to-jsx';
import React from 'react';
import { useSpeech } from './../../hooks/useSpeech';
export default function CustomMD({
	markdown,
	options,
}: {
	markdown: string | undefined;
	options?: MarkdownToJSX.Options;
}) {
	const { speechHandler } = useSpeech();
	return (
		<div onMouseEnter={() => speechHandler(markdown ?? '')}>
			<Markdown options={options}>{markdown ?? ''}</Markdown>
		</div>
	);
}
