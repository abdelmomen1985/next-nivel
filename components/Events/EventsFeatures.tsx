import React from 'react';
import { useSpeech } from './../../hooks/useSpeech';
import useTranslation from './../../hooks/useTranslation';

const EventsFeatures = () => {
	const { speechHandler } = useSpeech();
	const { t, locale } = useTranslation();
	return (
		<section className="my-4 mx-0 w-full bg-gray-200 py-8 px-10 md:px-20  grid  grid-cols-1 md:grid-cols-2 items-start gap-4">
			<div className="flex justify-start items-start mx-auto">
				<img
					src="/images/icons/outline/cocktail.svg"
					className="w-16 h-24 md:w-auto md:h-auto"
				/>
				<div className="mx-4">
					<h3
						onMouseEnter={() => speechHandler(t('hostingEvent'))}
						className="text-xl font-semibold text-primary-dark my-2 "
					>
						{t('hostingEvent')}
					</h3>
					<p
						onMouseEnter={() => speechHandler(t('hostingEventDisc'))}
						className="text-base font-normal text-black w-full"
					>
						{t('hostingEventDisc')}
					</p>
					<button
						onMouseEnter={() => speechHandler(t('requestPricing'))}
						className="my-2 btn-primary-light py-2 md:py-4 px-4 md:px-8 font-medium"
					>
						{t('requestPricing')}
					</button>
				</div>
			</div>
			<div className="flex justify-start items-start mx-auto">
				<img
					src="/images/icons/outline/meeting.svg"
					className="w-16 h-24 md:w-auto md:h-auto"
				/>
				<div className="mx-4">
					<h3
						onMouseEnter={() => speechHandler(t('travelGroup'))}
						className="text-xl font-semibold text-primary-dark my-2 "
					>
						{t('travelGroup')}
					</h3>
					<p
						onMouseEnter={() => speechHandler(t('travelGroupDisc'))}
						className="text-base font-normal text-black w-full"
					>
						{t('travelGroupDisc')}
					</p>
					<button
						onMouseEnter={() => speechHandler(t('bookRoomBlock'))}
						className="my-2 btn-primary-light py-2 md:py-4 px-4 md:px-8  font-medium"
					>
						{t('bookRoomBlock')}
					</button>
				</div>
			</div>
		</section>
	);
};

export default EventsFeatures;
