import { useState } from 'react';
import { useSpeech } from './../../hooks/useSpeech';
import useTranslation from './../../hooks/useTranslation';
import clsx from 'clsx';
import MeetingRoom from './MeetingRoom';
const EventsVenues = ({ meetingRooms, styles }: any) => {
	const { speechHandler } = useSpeech();
	const { t, locale } = useTranslation();
	const [activeTab, setActiveTab] = useState<string>('conference');

	return (
		<section className="my-10 w-full">
			<h2
				onMouseEnter={() => speechHandler(t('venues'))}
				className="text-2xl font-bold text-primary-dark text-center"
			>
				{t('venues')}
			</h2>
			<div className="border border-t-0 border-l-0 border-r-0 border-gray-400 my-5 py-5 px-5 flex justify-center items-center">
				<button
					onMouseEnter={() => speechHandler(t('banquet'))}
					onClick={() => {
						setActiveTab('banquet');
					}}
					className={clsx(
						activeTab === 'banquet' ? styles.active : '',
						styles.tab,
						'text-base md:text-sm lg:text-lg mx-2 md:mx-3 lg:mx-3'
					)}
				>
					{t('banquet')}
				</button>
				<button
					onMouseEnter={() => speechHandler(t('conference'))}
					onClick={() => {
						setActiveTab('conference');
					}}
					className={clsx(
						activeTab === 'conference' ? styles.active : '',
						styles.tab,
						'text-base md:text-sm lg:text-lg mx-2 md:mx-3 lg:mx-3'
					)}
				>
					{t('conference')}
				</button>
				<button
					onMouseEnter={() => speechHandler(t('square'))}
					onClick={() => {
						setActiveTab('square');
					}}
					className={clsx(
						activeTab === 'square' ? styles.active : '',
						styles.tab,
						'text-base md:text-sm lg:text-lg mx-2 md:mx-3 lg:mx-3'
					)}
				>
					{t('square')}
				</button>
				<button
					onMouseEnter={() => speechHandler(t('reception'))}
					onClick={() => {
						setActiveTab('reception');
					}}
					className={clsx(
						activeTab === 'reception' ? styles.active : '',
						styles.tab,
						'text-base md:text-sm lg:text-lg mx-2 md:mx-3 lg:mx-3'
					)}
				>
					{t('reception')}
				</button>
				<button
					onMouseEnter={() => speechHandler(t('class_room'))}
					onClick={() => {
						setActiveTab('class_room');
					}}
					className={clsx(
						activeTab === 'class_room' ? styles.active : '',
						styles.tab,
						'text-base md:text-sm lg:text-lg mx-2 md:mx-3 lg:mx-3'
					)}
				>
					{t('class_room')}
				</button>
				<button
					onMouseEnter={() => speechHandler(t('theatre'))}
					onClick={() => {
						setActiveTab('theatre');
					}}
					className={clsx(
						activeTab === 'theatre' ? styles.active : '',
						styles.tab,
						'text-base md:text-sm lg:text-lg mx-2 md:mx-3 lg:mx-3'
					)}
				>
					{t('theatre')}
				</button>
				<button
					onMouseEnter={() => speechHandler(t('u_shape'))}
					onClick={() => {
						setActiveTab('u_shape');
					}}
					className={clsx(
						activeTab === 'u_shape' ? styles.active : '',
						styles.tab,
						'text-base md:text-sm lg:text-lg mx-2 md:mx-3 lg:mx-3'
					)}
				>
					{t('u_shape')}
				</button>
			</div>
      <div className="flex flex-wrap justify-center items-start">
				{meetingRooms.map((meeting: any) => (
          <MeetingRoom meeting={meeting} key={meeting?.id} styles={styles} activeTab={activeTab} />
				))}
			</div>
		</section>
	);
};

export default EventsVenues;
