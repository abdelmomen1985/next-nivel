import { GetStaticPaths, GetStaticProps } from 'next';
import React, { useState, useEffect } from 'react';
import Steps, { Step } from 'rc-steps';
import { accessible, rooms, suites } from '../../../data/rooms';

import Layout from '../../../Layouts/Layout';
import { getLocalizationProps } from '../../../context/LangContext';
import CustomModal from './../../../components/common/CustomModal/CustomModal';
import RoomCard from './../../../components/Rooms/RoomCard';
import RoomDetails from '../../../components/Rooms/RoomDetails';

// import styles from "./rooms.module.scss";
import FirstBookingStep from '../../../components/booking/FirstBookingStep';
import SecondBookingStep from '../../../components/booking/SecondBookingStep';
import Filters from './../../../components/navigation/HeaderSections/Filters';
import BookingFilters from '../../../components/booking/BookingFilters';
import BookingStay from './../../../components/booking/BookingStay';
import { useMutation } from '@apollo/client';
import { LOAD_ROOMS } from './../../../query/rooms';
import { initializeApollo } from './../../../lib/apolloClient';
import { RoomType } from '../../../types/rooms';

const MeetingsPage = ({ roomsData }: { roomsData: RoomType[] }) => {
	const [currentShow, setCurrentShow] = useState<any[]>([...roomsData]);
	const [roomDetails, setRoomDetails] = useState<RoomType | undefined>(
		undefined
	);
	const [openModal, setOpenModal] = useState(false);
	const [filterValues, setFilterValues] = useState<any>(undefined);
	const [currentStep, setCurrentStep] = useState<number>(1);
	const [stepTitle, setStepTitle] = useState<string>('Select a room');
	const [selectedRoom, setSelectedRoom] = useState<any>(undefined);
	const [showEdit, setShowEdit] = useState(false);

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
	const editStayHandler = () => {
		setShowEdit(true);
		setCurrentStep(1);
		setStepTitle('Select a room');
	};

	const pickRoomHandler = (room: RoomType) => {
		setSelectedRoom(room);
		console.log(room);
		console.log(filterValues);
		setCurrentStep(2);
		setStepTitle('Select a Rate');
	};
	return (
		<Layout withFilters={false}>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="col-span-2">
					<div className="mt-8">
						<h5 className="mx-12 text-lg font-medium text-primary-light my-1">
							Step {currentStep} of 3
						</h5>
						<h3 className="mx-12 text-xl font-bold text-primary-dark mt-1 mb-3">
							{stepTitle}
						</h3>
					</div>
					<Steps
						progressDot
						status="process"
						size="small"
						current={currentStep}
					>
						<Step title=" " description=" " />
						<Step title=" " description=" " />
						<Step title=" " description=" " />
						<Step title=" " description=" " />
					</Steps>
					{currentStep === 1 && (
						<div>
							{showEdit && (
								<Filters
									updateFilters={setFilterValues}
									title="booking"
									filterValues={filterValues}
									hideFilters={() => setShowEdit(false)}
								/>
							)}
							<BookingFilters
								filterValues={filterValues}
								updateFilters={setFilterValues}
							/>
						</div>
					)}
					{currentStep === 2 && <SecondBookingStep />}
				</div>
				<BookingStay
					editStayHandler={editStayHandler}
					filterValues={filterValues}
					currentStep={currentStep}
				/>
			</div>
			{currentStep === 1 && (
				<FirstBookingStep
					pickRoomHandler={pickRoomHandler}
					currentShow={currentShow}
					setOpenModal={setOpenModal}
					setRoomDetails={setRoomDetails}
				/>
			)}

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
				title={roomDetails?.title}
				show={openModal && roomDetails !== undefined}
				onClose={() => {
					setOpenModal(false);
					setRoomDetails(undefined);
				}}
			>
				<RoomDetails
					pickRoomHandler={pickRoomHandler}
					purpose="booking"
					roomDetails={roomDetails!}
				/>
			</CustomModal>
		</Layout>
	);
};

export default MeetingsPage;

export const getStaticProps: GetStaticProps = async (ctx) => {
	const localization = getLocalizationProps(ctx, 'common');
	const client = initializeApollo();
	const resp = await client.query({ query: LOAD_ROOMS });
	console.log(resp.data);
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
