import { GetStaticPaths, GetStaticProps } from 'next';
import React, { useState } from 'react';
import clsx from 'clsx';
import Layout from '../../../Layouts/Layout';
import { getLocalizationProps } from '../../../context/LangContext';

import styles from './meetings.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import useTranslation from './../../../hooks/useTranslation';

import { initializeApollo } from '../../../lib/apolloClient';
import { MEETING_ROOMS } from './../../../query/meeting_rooms';
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
const MeetingsPage = ({ meetingRooms }: { meetingRooms: any[] }) => {
	const { t, locale } = useTranslation();
	const [activeTab, setActiveTab] = useState<string>('conference');
	return (
		<Layout>
			<section className="w-full">
				<img src="/images/restaurant.png" className="w-full" />
			</section>
			<section className="my-5 w-full text-center">
				<h3 className="text-3xl font-bold text-primary-dark">
					Meetings and Events
				</h3>
				<p className="text-xl font-medium text-gray-dark w-full mx-auto md:w-1/2 my-3">
					Our dedicated staff are available to help you plan your next meeting
					or event – we have two flexible meeting rooms available, as well as
					A/V equipment, and a business center.
				</p>
			</section>
			<hr />
			<section className="my-5 py-10 flex flex-wrap items-center justify-between px-10">
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
			</section>
			<section className="my-4 mx-0 w-full bg-gray-200 py-8 px-10 md:px-20  grid grid-cols-2 items-start gap-4">
				<div className="flex justify-start items-start mx-auto">
					<img src="/images/icons/outline/cocktail.svg" className="" />
					<div className="mx-2">
						<h3 className="text-xl font-semibold text-primary-dark my-2 ">
							Hosting an Event?
						</h3>
						<p className="text-base font-normal text-black w-2/3 md:2-full">
							Submit your proposal to find out what we can offer for your event.
						</p>
						<button className="my-2 btn-primary-light py-4 px-8 font-medium">
							Request Pricing
						</button>
					</div>
				</div>
				<div className="flex justify-start items-start mx-auto">
					<img src="/images/icons/stroke/meeting.svg" className="" />
					<div className="mx-2">
						<h3 className="text-xl font-semibold text-primary-dark my-2 ">
							Traveling as a group?
						</h3>
						<p className="text-base font-normal text-black w-2/3 md:2-full">
							Keep the team together by reserving a group of ten or more rooms.
						</p>
						<button className="my-2 btn-primary-light py-4 px-8 font-medium">
							Book a room block
						</button>
					</div>
				</div>
			</section>
			<section className="my-10 w-full">
				<h2 className="text-2xl font-bold text-primary-dark text-center">
					Venues
				</h2>
				<div className="border border-t-0 border-l-0 border-r-0 border-gray-400 my-5 py-5 px-5 flex justify-center items-center">
					<button
						onClick={() => {
							setActiveTab('conference');
						}}
						className={clsx(
							activeTab === 'conference' ? styles.active : '',
							styles.tab
						)}
					>
						Conference
					</button>
					<button
						onClick={() => {
							setActiveTab('wedding');
						}}
						className={clsx(
							activeTab === 'wedding' ? styles.active : '',
							styles.tab
						)}
					>
						Wedding
					</button>
					<button
						onClick={() => {
							setActiveTab('reception');
						}}
						className={clsx(
							activeTab === 'reception' ? styles.active : '',
							styles.tab
						)}
					>
						Reception
					</button>
					<button
						onClick={() => {
							setActiveTab('theatre');
						}}
						className={clsx(
							activeTab === 'theatre' ? styles.active : '',
							styles.tab
						)}
					>
						Theatre
					</button>
				</div>
				<div className="flex flex-wrap justify-start items-start">
					{meetingRooms.map((meeting) => (
						<div key={meeting.id} className={styles.meeting}>
							<h3 className="capitalize">{meeting?.title[locale]}</h3>
							<h5 className="flex justify-center items-center">
								<FontAwesomeIcon icon={faUser} className="mx-1" />
								<span>{meeting?.guests[activeTab]} Guests</span>
							</h5>
							<h5 className="flex justify-center items-center">
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
								<span>{meeting?.space} sq. m.</span>
							</h5>
						</div>
					))}
				</div>
			</section>
		</Layout>
	);
};

export default MeetingsPage;

export const getStaticProps: GetStaticProps = async (ctx) => {
	const localization = getLocalizationProps(ctx, 'common');
	const client = initializeApollo();
	const resp = await client.query({ query: MEETING_ROOMS });

	return {
		props: {
			localization,
			meetingRooms: resp?.data?.meeting_rooms,
		},
	};
};
export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: ['en', 'ar'].map((lang) => ({ params: { lang } })),
		fallback: false,
	};
};
