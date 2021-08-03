import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
// import Speech from 'react-speech';

import useTranslation from './../../hooks/useTranslation';
import styles from './home.module.scss';

const eventsData = [
	{
		count: '208',
		unit: {
			ar: 'متر مربع',
			en: 'SQ. M.',
		},
		title: {
			ar: 'من المساحة الإجمالية',
			en: 'OF TOTAL EVENT SPACE',
		},
	},
	{
		count: '104',
		unit: {
			ar: 'متر مربع',
			en: 'SQ. M.',
		},
		title: {
			ar: 'من إعدادات الغرف',
			en: 'OF LARGEST ROOM SETUP',
		},
	},
	{
		count: '2',
		unit: {
			ar: '',
			en: '',
		},
		title: {
			ar: 'غرف اجتماعات',
			en: 'MEETING ROOMS',
		},
	},
	{
		count: '484',
		unit: {
			ar: '',
			en: '',
		},
		title: {
			ar: 'غرف ضيوف',
			en: 'Guest Rooms',
		},
	},
];
let Speech: JSX.IntrinsicAttributes;
const MeetingsNdEvents = () => {
	const { t, locale } = useTranslation();
	const [currentSpeech, setCurrentSpeech] = useState<string>(
		t('meetingsNdEvents')
	);
	console.log(currentSpeech);
	const [imported, setImported] = useState<boolean>(false);
	useEffect(() => {
		if (!window) {
			return;
		}
		importSpeech();
	}, []);
	const importSpeech = async () => {
		Speech = (await import('react-speech')).default;
		setImported(true);
		console.log('imported');
	};
	const speachHandler = (text: string) => {
		setCurrentSpeech(text);
	};
	return (
		<>
			<section className="mt-5 mb-0 w-full relative ">
				{imported && (
					<Speech
						style={{ buttons: { width: '50px', height: '50px' } }}
						// lang={locale === 'en' ? 'en-GB' : 'ar-SA'}
						lang="en-GB"
						voice="Google UK English Male"
						text={currentSpeech}
						resume={true}
						stop={true}
					/>
				)}
				<img src="/images/meeting.jpg" className="w-full" />
				<div className={styles.meetingsContainer}>
					<h3>{t('meetingsNdEvents')}</h3>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-2 my-3 mx-2 items-center">
						{eventsData.map((event, i) => (
							<div
								className={clsx(
									styles.singleMeeting,
									'mx-auto md:mx-5 text-center'
								)}
								key={i}
							>
								<h5>
									<span className="text-primary-dark text-lg md:text-2xl lg:text-4xl font-bold">
										{event.count}
									</span>{' '}
									<span className="text-black text-sm md:text-base font-medium">
										{event.unit[locale]}
									</span>
								</h5>
								<h4 className="text-black text-base md:text-lg font-bold">
									{event.title[locale]}
								</h4>
							</div>
						))}
					</div>
					<div className={styles.meetingFooterSection}>
						<button className="btn-primary-light text-white text-lg font-semibold capitalize block">
							{t('meetStyle')}
						</button>
					</div>
				</div>
			</section>
		</>
	);
};

export default MeetingsNdEvents;
