import React from 'react';
import styles from './home.module.scss';
import useTranslation from './../../hooks/useTranslation';

const eventsData = [
	{
		count: '208',
		unit: {
			ar: 'متر مربع',
			en: 'SQ. M.',
		},
		title: {
			ar: 'من مساجة الحدث الإجمالية',
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
			ar: 'من أضخم إعدادات الغرف',
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
const MeetingsNdEvents = () => {
	const { t, locale } = useTranslation();
	return (
		<section className="mt-5 mb-0 w-full relative ">
			<img src="/images/meeting.jpg" className="w-full" />
			<div className={styles.meetingsContainer}>
				<h3>{t('meetingsNdEvents')}</h3>
				<div className="grid grid-cols-4 gap-2 my-3 mx-2 items-center">
					{eventsData.map((event, i) => (
						<div className="mx-5 text-center" key={i}>
							<h5>
								<span className="text-primary-dark text-4xl font-bold">
									{event.count}
								</span>{' '}
								<span className="text-black text-base font-medium">
									{event.unit[locale]}
								</span>
							</h5>
							<h4 className="text-black text-lg font-bold">
								{event.title[locale]}
							</h4>
						</div>
					))}
				</div>
				<button className="btn-primary-light text-white text-lg font-semibold capitalize block">
					{t('meetStyle')}
				</button>
			</div>
		</section>
	);
};

export default MeetingsNdEvents;
