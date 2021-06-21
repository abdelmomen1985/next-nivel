import { GetStaticPaths, GetStaticProps } from 'next';
import React, { useState, useContext, useEffect } from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { accessible, rooms, suites } from '../../../data/rooms';

import { getLocalizationProps } from '../../../context/LangContext';
import Layout from '../../../Layouts/Layout';
import CustomModal from './../../../components/common/CustomModal/CustomModal';
import RoomCard from './../../../components/Rooms/RoomCard';
import RoomDetails from '../../../components/Rooms/RoomDetails';

import styles from './rooms.module.scss';
import { RoomType } from '../../../types/rooms';
import { initializeApollo } from './../../../lib/apolloClient';
import { LOAD_ROOMS } from '../../../query/rooms';
import useTranslation from './../../../hooks/useTranslation';

const RoomsPage = ({ roomsData }: { roomsData: RoomType[] }) => {
	const { t, locale } = useTranslation();
	const [currentShow, setCurrentShow] = useState<any[]>([...roomsData]);
	const [activeTab, setActiveTab] = useState(1);
	const [roomDetails, setRoomDetails] = useState<any>(undefined);
	const [openModal, setOpenModal] = useState(false);
	const pickRoomHandler = (
		room: RoomType,
		packagePrices: any[],
		basePrice: any
	) => {
		console.log(room);
	};
	useEffect(() => {
		console.log(roomDetails);
	}, [roomDetails]);
	return (
		<Layout>
			<h2 className="text-4xl font-bold mt-10 mb-10 text-primary-dark text-center">
				{t('roomsNdSuites')}
			</h2>
			<div className="border border-t-2 border-l-0 border-r-0 border-gray-400 my-5 py-5 px-5 flex justify-center items-center">
				<button
					onClick={() => {
						setActiveTab(1);
						setCurrentShow([...roomsData]);
					}}
					className={clsx(activeTab === 1 ? styles.active : '', styles.tab)}
				>
					{t('guestRooms')}
				</button>
				<button
					onClick={() => {
						setActiveTab(2);
						setCurrentShow([...suites]);
					}}
					className={clsx(activeTab === 2 ? styles.active : '', styles.tab)}
				>
					{t('suites')}
				</button>
				<button
					onClick={() => {
						setActiveTab(3);
						setCurrentShow([...accessible]);
					}}
					className={clsx(activeTab === 3 ? styles.active : '', styles.tab)}
				>
					{t('accessible')}
				</button>
			</div>
			<div className="mt-10 mb-5">
				<div className={styles.alert}>
					<FontAwesomeIcon icon={faCheckCircle} className="mx-1" />
					<p className="mx-1 text-base font-semibold">{t('roomsDesc')}</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{currentShow.map((room, i) => (
						<RoomCard
							purpose="view"
							key={i}
							room={room}
							setRoomDetails={setRoomDetails}
							setOpenModal={setOpenModal}
						/>
					))}
				</div>
			</div>

			<CustomModal
				closeWithin={true}
				wrapperStyle={{ zIndex: '9999' }}
				style={{
					width: '80%',
					overflowY: 'auto',
					maxHeight: '100%',
					top: '3rem',
					zIndex: '9999',
				}}
				title={roomDetails?.title}
				show={openModal && roomDetails !== undefined}
				onClose={() => {
					setOpenModal(false);
					setRoomDetails(undefined);
				}}
			>
				<RoomDetails
					pickRoomHandler={pickRoomHandler}
					setRoomDetails={setRoomDetails}
					roomDetails={roomDetails}
				/>
			</CustomModal>
		</Layout>
	);
};

export default RoomsPage;

export const getStaticProps: GetStaticProps = async (ctx) => {
	const localization = getLocalizationProps(ctx, 'common');
	const client = initializeApollo();
	const resp = await client.query({ query: LOAD_ROOMS });
	console.log(resp?.data?.rooms);
	return {
		props: {
			localization,
			roomsData: resp?.data?.rooms,
		},
	};
};
export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: ['en', 'ar'].map((lang) => ({ params: { lang } })),
		fallback: false,
	};
};
