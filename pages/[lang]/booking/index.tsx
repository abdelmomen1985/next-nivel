import { GetStaticPaths, GetStaticProps } from 'next';
import React, { useState, useEffect } from 'react';

import { accessible, rooms, suites } from '../../../data/rooms';

import Layout from '../../../Layouts/Layout';
import { getLocalizationProps } from '../../../context/LangContext';
import CustomModal from './../../../components/common/CustomModal/CustomModal';
import RoomCard from './../../../components/Rooms/RoomCard';
import RoomDetails from '../../../components/Rooms/RoomDetails';

// import styles from "./rooms.module.scss";
import {} from 'react';
import Filters from './../../../components/navigation/HeaderSections/Filters';

const MeetingsPage = () => {
	const [currentShow, setCurrentShow] = useState<any[]>([...rooms]);
	const [modalDetails, setModalDetails] = useState<any>(undefined);
	const [openModal, setOpenModal] = useState(false);
	const [filterValues, setFilterValues] = useState<any>(undefined);
	useEffect(() => {
		let localDefaultFilters = sessionStorage.getItem('filterValues');
		if (localDefaultFilters) {
			let newDefaultFilters: any = JSON.parse(localDefaultFilters);
			let finalDefaultFilters = {
				...newDefaultFilters,
				currentDateRange: {
					startDate: new Date(newDefaultFilters?.currentDateRange?.startDate),
					endDate: new Date(newDefaultFilters?.currentDateRange?.endDate),
					key: newDefaultFilters?.currentDateRange?.key,
				},
			};
			setFilterValues(finalDefaultFilters);
		}
	}, []);
	return (
		<Layout withFilters={false}>
			<div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="col-span-2">
						<Filters filterValues={filterValues} />
					</div>
					<div className="mx-auto">
						<img
							src="/images/hero-slider/1.png"
							style={{
								width: '300px',
								height: '250px',
								margin: '10px auto',
							}}
						/>
						<div className="my-3">
							<img
								style={{
									width: '290px',
									height: '80px',
									margin: '10px auto',
								}}
								src="/images/logo.png"
							/>
							{filterValues && (
								<h3>
									{filterValues?.currentDateRange?.startDate?.toLocaleDateString(
										'en-GB',
										{
											day: 'numeric',
											month: 'short',
										}
									)}{' '}
									-{' '}
									{filterValues?.currentDateRange?.endDate?.toLocaleDateString(
										'en-GB',
										{
											day: 'numeric',
											month: 'short',
											year: 'numeric',
										}
									)}{' '}
									(
									{(filterValues?.currentDateRange?.endDate?.getTime() -
										filterValues?.currentDateRange?.startDate?.getTime()) /
										(1000 * 3600 * 24)}{' '}
									night )
								</h3>
							)}
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{currentShow.map((room, i) => (
						<RoomCard
							purpose="booking"
							key={i}
							room={room}
							setModalDetails={setModalDetails}
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
					top: 0,
					zIndex: '9999',
				}}
				title={modalDetails?.title}
				show={openModal && modalDetails !== undefined}
				onClose={() => {
					setOpenModal(false);
					setModalDetails(undefined);
				}}
			>
				<RoomDetails purpose="booking" modalDetails={modalDetails} />
			</CustomModal>
		</Layout>
	);
};

export default MeetingsPage;

export const getStaticProps: GetStaticProps = async (ctx) => {
	const localization = getLocalizationProps(ctx, 'common');
	return {
		props: {
			localization,
		},
	};
};
export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: ['en', 'ar'].map((lang) => ({ params: { lang } })),
		fallback: false,
	};
};
