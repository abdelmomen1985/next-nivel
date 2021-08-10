import Markdown, { MarkdownToJSX } from 'markdown-to-jsx';
import React from 'react';
import { useSpeech } from './../../hooks/useSpeech';
import removeMarkdown from 'markdown-to-text';

export default function CustomMD({
	markdown,
	options,
}: {
	markdown: string | undefined;
	options?: MarkdownToJSX.Options;
}) {
	const { speechHandler } = useSpeech();
	return (
		<div onMouseEnter={() => speechHandler(removeMarkdown(markdown ?? ''))}>
			<Markdown options={options}>{markdown ?? ''}</Markdown>
		</div>
	);
}
