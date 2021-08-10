import React from 'react';
import { useSpeech } from './../../hooks/useSpeech';
import useTranslation from './../../hooks/useTranslation';

const EventData = ({ event }: any) => {
	const { speechHandler } = useSpeech();
	const { t, locale } = useTranslation();
	return (
		<div className="md:mx-5 mx-2 my-4 md:my-0 text-center">
			<h5>
				<span
					onMouseEnter={() => speechHandler(event.count)}
					className="text-primary-dark text-4xl font-bold"
				>
					{event.count}
				</span>{' '}
				<span
					onMouseEnter={() => speechHandler(event.unit[locale])}
					className="text-black text-base font-medium"
				>
					{event.unit[locale]}
				</span>
			</h5>
			<h4
				onMouseEnter={() => speechHandler(event.title[locale])}
				className="text-black text-lg font-bold"
			>
				{event.title[locale]}
			</h4>
		</div>
	);
};

export default EventData;
