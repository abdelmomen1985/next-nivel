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
import FirstStep from '../../../components/booking/FirstStep';
import Filters from './../../../components/navigation/HeaderSections/Filters';
import BookingFilters from '../../../components/booking/BookingFilters';

const MeetingsPage = () => {
	const [currentShow, setCurrentShow] = useState<any[]>([...rooms]);
	const [modalDetails, setModalDetails] = useState<any>(undefined);
	const [openModal, setOpenModal] = useState(false);
	const [filterValues, setFilterValues] = useState<any>(undefined);
	const [currentStep, setCurrentStep] = useState<number>(1);
	const [stepTitle, setStepTitle] = useState<string>('Select a room');
	const [selectedRoom, setSelectedRoom] = useState<any>(undefined);
	const [showEdit, setShowEdit] = useState(false);
	const [childCount, setChildCount] = useState(0);
	const [adultCount, setAdultCount] = useState(0);
	const [nightsCount, setNightsCount] = useState(0);

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
	useEffect(() => {
		setAdultCount(
			filterValues?.roomDetails.reduce(
				(accumulator, current) => accumulator + current.adultsCount,
				0
			)
		);
		setChildCount(
			filterValues?.roomDetails.reduce(
				(accumulator, current) => accumulator + current.childCount,
				0
			)
		);
		setNightsCount(
			(filterValues?.currentDateRange?.endDate?.getTime() -
				filterValues?.currentDateRange?.startDate?.getTime()) /
				(1000 * 3600 * 24)
		);
	}, [filterValues]);
	const pickRoomHandler = (room: any) => {
		setSelectedRoom(room);
		console.log(room);
	};
	return (
		<Layout withFilters={false}>
			<div className="mt-8">
				<h5 className="mx-12 text-lg font-medium text-primary-light my-1">
					Step {currentStep} of 3
				</h5>
				<h3 className="mx-12 text-xl font-bold text-primary-dark mt-1 mb-3">
					{stepTitle}
				</h3>
			</div>
			<Steps progressDot status="process" size="small" current={currentStep}>
				<Step title=" " description=" " />
				<Step title=" " description=" " />
				<Step title=" " description=" " />
				<Step title=" " description=" " />
			</Steps>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="col-span-2">
					{showEdit && (
						<Filters
							updateFilters={setFilterValues}
							title="booking"
							filterValues={filterValues}
						/>
					)}

					<BookingFilters />
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
							<>
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
									{nightsCount === 0 && 'Day only'}
									{nightsCount === 1 && `${nightsCount} night `}
									{nightsCount > 1 && `${nightsCount} nights`}
								</h3>
								<h5>
									<span>{filterValues?.roomCount} Rooms</span>
									{adultCount > 0 && <span>, {adultCount} Adult</span>}

									{childCount > 0 && <span>, {childCount} Children</span>}
								</h5>
							</>
						)}
						<button
							onClick={editStayHandler}
							className="btn-transparent text-lg underline my-1 text-primary-dark cursor-pointer"
						>
							Edit Stay
						</button>
					</div>
				</div>
			</div>
			{currentStep === 1 && (
				<FirstStep
					pickRoomHandler={pickRoomHandler}
					currentShow={currentShow}
					setOpenModal={setOpenModal}
					setModalDetails={setModalDetails}
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
				title={modalDetails?.title}
				show={openModal && modalDetails !== undefined}
				onClose={() => {
					setOpenModal(false);
					setModalDetails(undefined);
				}}
			>
				<RoomDetails
					pickRoomHandler={pickRoomHandler}
					purpose="booking"
					modalDetails={modalDetails}
				/>
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
