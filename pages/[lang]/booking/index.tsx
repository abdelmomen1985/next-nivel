import { useLazyQuery } from '@apollo/client';
import { GetServerSideProps } from 'next';
import Steps, { Step } from 'rc-steps';
import React, { useContext, useState, useEffect, useRef } from 'react';
import BookingFilters from '../../../components/booking/BookingFilters';
// import styles from "./rooms.module.scss";
import FirstBookingStep from '../../../components/booking/BookingSteps/FirstBookingStep';
import SecondBookingStep from '../../../components/booking/BookingSteps/SecondBookingStep';
import RoomDetails from '../../../components/Rooms/RoomDetails';
import { getLocalizationProps } from '../../../context/LangContext';
import { getRemoteSchemaUrl } from '../../../data/remoteSchemaUrl';
import Layout from '../../../Layouts/Layout';
import { GET_SINGLE_BOOKING } from '../../../query/booking';
import { BookingType } from '../../../types/booking';
import { LayoutType } from '../../../types/layout';
import BookingStay from './../../../components/booking/BookingStay';
import ThirdBookingSteps from './../../../components/booking/BookingSteps/ThirdBookingSteps';
import CustomModal from './../../../components/common/CustomModal/CustomModal';
import Filters from './../../../components/navigation/HeaderSections/Filters';
import { AppContext } from './../../../context/AppContext';
import useTranslation from './../../../hooks/useTranslation';
import { initializeApollo } from './../../../lib/apolloClient';
import {
	LOAD_ROOMS_BY_RATES,
	LOAD_ROOM_RATES,
	ROOMS_AGGREGATE,
	ROOM_AMENITIES,
} from './../../../query/rooms';
import { today, tomorrow } from '../../../utils/getDates';
import BookingRooms from './../../../components/booking/BookingSteps/BookingRooms';
import RoomsSteps from './../../../components/booking/BookingSteps/RoomsSteps';

const filtersDefaultValues = {
	AARPRate: false,
	aaaRate: false,
	currentDateRange: {
		startDate: new Date(),
		endDate: tomorrow,
		key: 'selection',
	},
	governmentRates: false,
	roomCount: 1,
	roomDetails: [{ adultsCount: 1, childCount: 0 }],
	seniorRate: false,
	totalGuestCount: 1,
	travelAgents: false,
	usePoints: false,
	corporateAccount: ' ',
	groupCode: ' ',
	promotionCode: ' ',
};
const BookingPage = ({
	roomsData,
	layout,
	singleBooking,
}: {
	roomsData: any[];
	layout: LayoutType;
	singleBooking: BookingType;
}) => {
	const { t, locale } = useTranslation();
	const firstRender = useRef(true);
	const { isMobile } = useContext(AppContext);
	const [currentRooms, setCurrentRooms] = useState<any[]>([...roomsData]);
	const [currentRoom, setCurrentRoom] = useState<number>(0);
	const [roomDetails, setRoomDetails] = useState<any>(undefined);
	const [openModal, setOpenModal] = useState(false);
	const [filterValues, setFilterValues] = useState<any>(filtersDefaultValues);
	const [currentStep, setCurrentStep] = useState<number>(1);
	const [stepTitle, setStepTitle] = useState<any>({
		ar: 'اختر غرفة',
		en: 'Select a room',
	});
	const [selectedRooms, setSelectedRooms] = useState<any[]>([]);
	const [selectedRoom, setSelectedRoom] = useState<any>(undefined);
	const [showEdit, setShowEdit] = useState(() =>
		singleBooking ? true : false
	);
	const [selectedPackage, setSelectedPackage] = useState<any>(undefined);
	const [selectedPackages, setSelectedPackages] = useState<any>([]);
	const [specialRatesCount, setSpecialRatesCount] = useState<number>(0);
	const [roomAmenitiesState, setRoomAmenitiesState] = useState([]);
	const [userData, setUserData] = useState<any>(undefined);
	const [isPayable, setIsPayable] = useState<boolean>(false);

	const [filterRooms, { data: filteredRooms }] = useLazyQuery(ROOMS_AGGREGATE, {
		onCompleted() {
			console.log(filteredRooms?.rooms_aggregate?.nodes);
			setCurrentRooms([...filteredRooms?.rooms_aggregate?.nodes]);
		},
		onError(err) {
			console.log(err);
		},
	});
	const [fetchRoomAmenities, { data: roomAmenitiesData }] = useLazyQuery(
		ROOM_AMENITIES,
		{
			onCompleted() {
				console.log(roomAmenitiesData, 'roomAmenitiesData');
				setRoomAmenitiesState([...roomAmenitiesData.roomAmenities]);
			},
			onError(err) {
				console.log(err);
			},
		}
	);
	const [fetchRoomRates, { data: packagePrices }] = useLazyQuery(
		LOAD_ROOM_RATES,
		{
			onCompleted() {
				if (filterValues?.roomDetails.length === 1) {
					setSelectedRoom((prev: any) => ({
						...prev,
						packagePrices: [...packagePrices.room_rates],
					}));
				} else if (filterValues?.roomDetails.length > 1) {
					let newSelectedRooms = [...selectedRooms];
					newSelectedRooms[currentRoom] = {
						...newSelectedRooms[currentRoom],
						packagePrices: [...packagePrices.room_rates],
					};
					setSelectedRooms([...newSelectedRooms]);
				}
				setCurrentStep(2);
			},
			onError(err) {
				console.log(err);
			},
			fetchPolicy: 'no-cache',
		}
	);
	useEffect(() => {
		if (singleBooking) return;
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
		if (singleBooking) return;
		setSelectedRooms([...filterValues?.roomDetails]);
		setSelectedPackages([]);
		setCurrentRoom(0);
		setCurrentStep(1);
	}, [filterValues]);

	useEffect(() => {
		if (singleBooking) {
			console.log(singleBooking);
			let currentDateRange = {
				startDate: new Date(singleBooking?.check_in),
				endDate: new Date(singleBooking?.check_out),
				key: 'selection',
			};
			setFilterValues((prev: any) => ({ ...prev, currentDateRange }));
			setUserData({ ...singleBooking?.client_data });
		}
	}, [singleBooking]);

	useEffect(() => {
		if (firstRender.current) {
			console.log('leaving');
			firstRender.current = false;
			return;
		}
		if (
			selectedPackages.length === selectedRooms.length &&
			selectedRooms[selectedRooms.length - 1].name
		) {
			setIsPayable(true);
		} else {
			setIsPayable(false);
		}
	}, [selectedPackages]);

	/*
  useEffect(() => {
    let variables = {} as any;
    if (filterValues?.accessibility) {
      variables.accessibility = filterValues?.accessibility;
    }
    if (filterValues?.selectedRoomType !== "all") {
      variables.type = filterValues?.selectedRoomType;
    }
    console.log(variables);
    filterRooms({
      variables,
    });
  }, [filterValues]);
  */
	const editStayHandler = () => {
		setShowEdit(true);
		setCurrentStep(1);
		setStepTitle({
			ar: 'اختر غرفة',
			en: 'Select a room',
		});
	};
	const pickRoomHandler = (room: any) => {
		let pickedRoom = {
			id: room.RelWithStrapiRoom.id,
			name: room.RelWithStrapiRoom.name,
			images: room.RelWithStrapiRoom.images,
			slug: room.RelWithStrapiRoom.slug,
			accessibility: room.RelWithStrapiRoom.accessibility,
			area: room.RelWithStrapiRoom.area,
			description_ar: room.RelWithStrapiRoom.description_ar,
			description_en: room.RelWithStrapiRoom.description_en,
			basePrice: {
				base_price: room.base_price,
				id: room.id,
				rate: {
					description: room.rate.description,
					title: room.rate.title,
				},
			},
		};
		fetchRoomRates({
			variables: {
				room_id: room?.RelWithStrapiRoom?.id,
			},
		});
		if (filterValues?.roomDetails.length === 1) {
			setSelectedRoom({ ...pickedRoom });
		} else if (filterValues?.roomDetails.length > 1) {
			let newSelectedRooms = [...selectedRooms];
			newSelectedRooms[currentRoom] = {
				...newSelectedRooms[currentRoom],
				...pickedRoom,
			};
			setSelectedRooms([...newSelectedRooms]);
		}
		setStepTitle({
			ar: 'اختر السعر ',
			en: 'Select a rate',
		});
	};
	const selectRoomHandler = (room: any) => {
		setRoomDetails({ ...room });
		setOpenModal(true);
		fetchRoomAmenities({
			variables: {
				room_id: room?.RelWithStrapiRoom?.id,
			},
		});
	};
	const lastStepMove = () => {
		setCurrentStep(3);
		setStepTitle({
			ar: 'بيانات السداد والضيوف',
			en: 'Payment and Guest Details',
		});
	};
	const pickPackageHandler = (selectedPack: any) => {
		if (filterValues?.roomDetails.length === 1) {
			setSelectedPackage(selectedPack);
			lastStepMove();
		} else if (filterValues?.roomDetails.length > 1) {
			let newSelectedPackages = [...selectedPackages];
			newSelectedPackages[currentRoom] = {
				...newSelectedPackages[currentRoom],
				...selectedPack,
			};
			setSelectedPackages([...newSelectedPackages]);
			setCurrentRoom((prev) => prev + 1);
			if (currentRoom === selectedRooms.length - 1) {
				lastStepMove();
				return;
			}
			setCurrentStep(1);
		}
	};
	const changeRoom = (roomNumber: number) => {
		setCurrentRoom(roomNumber);
		setCurrentStep(1);
	};
	return (
		<Layout withFilters={false} layout={layout}>
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
					{!isMobile && filterValues?.roomDetails.length === 1 && (
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

					{!isMobile && filterValues?.roomDetails?.length > 1 && (
						<RoomsSteps
							changeRoom={changeRoom}
							rooms={selectedRooms}
							currentRoom={currentRoom}
							moveToPay={lastStepMove}
							isPayable={isPayable}
							currentStep={currentStep}
						/>
					)}
					{currentStep === 1 && (
						<div>
							{showEdit && (
								<Filters
									updateFilters={setFilterValues}
									title="booking"
									filterValues={filterValues}
									hideFilters={() => setShowEdit(false)}
									specialRatesCount={specialRatesCount}
									setSpecialRatesCount={setSpecialRatesCount}
								/>
							)}

							<BookingFilters
								filterValues={filterValues}
								updateFilters={setFilterValues}
								specialRatesCount={specialRatesCount}
								setSpecialRatesCount={setSpecialRatesCount}
							/>
						</div>
					)}
					{currentStep === 2 && (
						<SecondBookingStep
							selectedRoom={
								selectedRooms?.length === 1
									? selectedRoom
									: selectedRooms[currentRoom]
							}
							filterValues={filterValues}
							pickPackageHandler={pickPackageHandler}
						/>
					)}
					{currentStep === 3 && (
						<ThirdBookingSteps
							selectedRoom={selectedRoom}
							filterValues={filterValues}
							selectedPackage={selectedPackage}
							userData={userData}
							bookingId={singleBooking?.id}
							selectedRooms={selectedRooms}
							selectedPackages={selectedPackages}
						/>
					)}
					{currentStep === 1 && (
						<FirstBookingStep
							pickRoomHandler={pickRoomHandler}
							currentRooms={currentRooms}
							selectRoom={selectRoomHandler}
							remoteUrl={layout?.remoteSchemaUrl}
						/>
					)}
				</div>
				<div>
					<BookingStay
						editStayHandler={editStayHandler}
						filterValues={filterValues}
						currentStep={currentStep}
						selectedRoom={selectedRoom}
						setCurrentStep={setCurrentStep}
						remoteUrl={layout?.remoteSchemaUrl}
					/>
					{filterValues?.roomDetails.length > 1 && (
						<BookingRooms
							rooms={selectedRooms}
							currentRoom={currentRoom}
							selectedPackages={selectedPackages}
							changeRoom={changeRoom}
							moveToPay={lastStepMove}
							isPayable={isPayable}
							currentStep={currentStep}
						/>
					)}
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
				title={roomDetails?.title}
				show={openModal && roomDetails !== undefined}
				onClose={() => {
					setOpenModal(false);
					setRoomDetails(undefined);
				}}
			>
				<RoomDetails
					purpose="booking"
					roomDetails={roomDetails!}
					roomAmenities={roomAmenitiesState}
					remoteUrl={layout?.remoteSchemaUrl}
				/>
			</CustomModal>
		</Layout>
	);
};
export default BookingPage;

export const getBookingData = async (res_code: string | number) => {
	console.log('booking data');
	const client = initializeApollo();
	const resp = await client.query({
		query: GET_SINGLE_BOOKING,
		variables: {
			res_code,
		},
	});

	return resp?.data?.bookings_aggregate?.nodes[0];
};
export const getAnyProps = async (ctx: any) => {
	const localization = getLocalizationProps(ctx, 'common');
	// console.log('query', ctx.query);
	let res_code = ctx.query.res_code;
	let singleBooking;
	if (res_code) {
		singleBooking = await getBookingData(res_code);
	}
	const remoteSchemaUrl = await getRemoteSchemaUrl();
	const client = initializeApollo();
	const resp = await client.query({ query: LOAD_ROOMS_BY_RATES });
	return {
		props: {
			localization,
			roomsData: resp?.data?.room_rates,
			layout: { ...resp?.data?.layout, remoteSchemaUrl },
			singleBooking: singleBooking ? singleBooking : null,
		},
	};
};

/*
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ["ar", "en"].map((lang) => ({ params: { lang } })),
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async (ctx) => {
  return await getAnyProps(ctx);
};
*/

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	return await getAnyProps(ctx);
};
