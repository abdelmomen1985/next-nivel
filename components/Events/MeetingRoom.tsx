import React from 'react';
import { useSpeech } from './../../hooks/useSpeech';
import useTranslation from './../../hooks/useTranslation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const MeetingRoom = ({ meeting, styles, activeTab }: any) => {
	const { speechHandler } = useSpeech();
	const { t, locale } = useTranslation();
	return (
		<div key={meeting.id} className={styles.meeting}>
			<h3
				onMouseEnter={() => speechHandler(meeting?.title[locale])}
				className="capitalize"
			>
				{meeting?.title[locale]}
			</h3>
			<h5
				onMouseEnter={() =>
					speechHandler(`${meeting?.guests[activeTab]} 
									${locale === 'en' ? 'Guests' : 'ضيف'}`)
				}
				className="flex justify-center items-center"
			>
				<FontAwesomeIcon icon={faUser} className="mx-1" />
				<span>
					{meeting?.guests[activeTab]} {locale === 'en' ? 'Guests' : 'ضيف'}
				</span>
			</h5>
			<h5
				onMouseEnter={() => speechHandler(`${meeting?.space} ${t('sqM')}`)}
				className="flex justify-center items-center"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					className="bi bi-rulers"
					viewBox="0 0 16 16"
				>
					<path d="M1 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h5v-1H2v-1h4v-1H4v-1h2v-1H2v-1h4V9H4V8h2V7H2V6h4V2h1v4h1V4h1v2h1V2h1v4h1V4h1v2h1V2h1v4h1V1a1 1 0 0 0-1-1H1z" />
				</svg>
				<span>
					{meeting?.space} {t('sqM')}
				</span>
			</h5>
		</div>
	);
};

export default MeetingRoom;
