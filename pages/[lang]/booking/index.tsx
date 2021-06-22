import { GetStaticPaths, GetStaticProps } from 'next';
import React, { useState, useEffect, useContext } from 'react';
import Steps, { Step } from 'rc-steps';
import { accessible, rooms, suites } from '../../../data/rooms';

import Layout from '../../../Layouts/Layout';
import { getLocalizationProps } from '../../../context/LangContext';
import CustomModal from './../../../components/common/CustomModal/CustomModal';
import RoomCard from './../../../components/Rooms/RoomCard';
import RoomDetails from '../../../components/Rooms/RoomDetails';

// import styles from "./rooms.module.scss";
import FirstBookingStep from '../../../components/booking/BookingSteps/FirstBookingStep';
import SecondBookingStep from '../../../components/booking/BookingSteps/SecondBookingStep';
import Filters from './../../../components/navigation/HeaderSections/Filters';
import BookingFilters from '../../../components/booking/BookingFilters';
import BookingStay from './../../../components/booking/BookingStay';
import { useLazyQuery, useMutation } from '@apollo/client';
import { LOAD_ROOMS, ROOMS_AGGREGATE } from './../../../query/rooms';
import { initializeApollo } from './../../../lib/apolloClient';
import { RoomType } from '../../../types/rooms';
import ThirdBookingSteps from './../../../components/booking/BookingSteps/ThirdBookingSteps';
import useTranslation from './../../../hooks/useTranslation';
import { AppContext } from './../../../context/AppContext';

const MeetingsPage = ({ roomsData }: { roomsData: RoomType[] }) => {
	const { t, locale } = useTranslation();
	const { isMobile, isTablet } = useContext(AppContext);
	const [currentShow, setCurrentShow] = useState<any[]>([...roomsData]);
	const [roomDetails, setRoomDetails] = useState<RoomType | undefined>(
		undefined
	);
	const [openModal, setOpenModal] = useState(false);
	const [filterValues, setFilterValues] = useState<any>(undefined);
	const [currentStep, setCurrentStep] = useState<number>(1);
	const [stepTitle, setStepTitle] = useState<any>({
		ar: 'اختر غرفة',
		en: 'Select a room',
	});
	const [selectedRoom, setSelectedRoom] = useState<any>(undefined);
	const [showEdit, setShowEdit] = useState(false);
	const [selectedPackage, setSelectedPackage] = useState(undefined);
	const [filterRooms, { data: filteredRooms }] = useLazyQuery(ROOMS_AGGREGATE, {
		onCompleted() {
			console.log(filteredRooms?.rooms_aggregate?.nodes);
			setCurrentShow([...filteredRooms?.rooms_aggregate?.nodes]);
		},
		onError(err) {
			console.log(err);
		},
	});
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

	useEffect(() => {
		console.log(filterValues?.selectedRoomType);
		console.log(filterValues?.accessibility);
		let variables = {} as any;
		if (filterValues?.accessibility) {
			variables.accessibility = filterValues?.accessibility;
		}
		if (filterValues?.selectedRoomType !== 'all') {
			variables.type = filterValues?.selectedRoomType;
		}
		console.log(variables);
		filterRooms({
			variables,
		});
	}, [filterValues]);
	const editStayHandler = () => {
		setShowEdit(true);
		setCurrentStep(1);
		setStepTitle({
			ar: 'اختر غرفة',
			en: 'Select a room',
		});
	};

	const pickRoomHandler = (
		room: RoomType,
		packagePrices: any[],
		basePrice: any
	) => {
		console.log(room, packagePrices, basePrice);
		setSelectedRoom({ ...room, packagePrices, basePrice });
		setCurrentStep(2);
		setStepTitle({
			ar: 'اختر السعر ',
			en: 'Select a rate',
		});
	};
	const pickPackageHandler = (selectedPack: any) => {
		setSelectedPackage(selectedPack);
		setCurrentStep(3);
		setStepTitle({
			ar: 'بيانات السداد والضيوف',
			en: 'Payment and Guest Details',
		});
	};
	return (
		<Layout withFilters={false}>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-2 lg:gap-4">
				<div className="col-span-2 order-last md:order-none">
					<div className="mt-8">
						<h5 className="mx-4 md:mx-12 text-lg font-medium text-primary-light my-1 capitalize">
							{t('step')} {currentStep} {t('of')} 3
						</h5>
						<h3 className="mx-4 md:mx-12 text-xl font-bold text-primary-dark mt-1 mb-3">
							{stepTitle[locale]}
						</h3>
					</div>
					{!isMobile && (
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
					)}
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
					{currentStep === 2 && (
						<SecondBookingStep
							selectedRoom={selectedRoom}
							filterValues={filterValues}
							pickPackageHandler={pickPackageHandler}
						/>
					)}
					{currentStep === 3 && (
						<ThirdBookingSteps
							selectedRoom={selectedRoom}
							filterValues={filterValues}
							selectedPackage={selectedPackage}
						/>
					)}
				</div>
				<BookingStay
					editStayHandler={editStayHandler}
					filterValues={filterValues}
					currentStep={currentStep}
					selectedRoom={selectedRoom}
					setCurrentStep={setCurrentStep}
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
