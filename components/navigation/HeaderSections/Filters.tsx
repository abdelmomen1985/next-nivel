import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import useTranslation from './../../../hooks/useTranslation';
import { tomorrow } from '../../../utils/getDates';
import { useSpeech } from './../../../hooks/useSpeech';
import DatePickerFilter from './DatePickerFilter';
import RoomsFilters from './RoomsFilters';
import SpecialFilters from './SpecialFilters';
import { v4 as uuidv4 } from 'uuid';

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
const Filters = ({
	filterValues = filtersDefaultValues,
	title = 'header',
	updateFilters,
	hideFilters,
	specialRatesCount,
	setSpecialRatesCount,
}: {
	filterValues?: any;
	title?: string;
	updateFilters: (filters: any) => void;
	hideFilters?: () => void;
	specialRatesCount?: number;
	setSpecialRatesCount?: (val: number) => void;
}) => {
	const { handleSubmit, register, setValue } = useForm({
		mode: 'onTouched',
		reValidateMode: 'onBlur',
	});
	const { t, locale } = useTranslation();
	const { speechHandler } = useSpeech();
	const router = useRouter();
	const datePickerRef = useRef<HTMLDivElement>(null);
	const [initalDateRange, setInitialDateRange] = useState([
		filterValues?.currentDateRange,
	]);
	const [currentDateRange, setCurrentDateRange] = useState({
		...filterValues?.currentDateRange,
	});
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [showRooms, setShowRooms] = useState(false);
	const [roomCount, setRoomCount] = useState(filterValues?.roomCount);
	const [totalGuestCount, setTotalGuestCount] = useState(
		filterValues?.totalGuestCount
	);

	const [roomDetails, setRoomDetails] = useState([
		...filterValues?.roomDetails,
	]);
	const handleClick = (e: any) => {
		if (datePickerRef.current?.contains(e.target)) {
			console.log('inside');
			return;
		}
		console.log('outside');
		setShowDatePicker(false);
		setShowRooms(false);
	};

	const checkRoomsHandler = async (data: any) => {
		let searchData = {
			...data,
			roomCount,
			totalGuestCount,
			currentDateRange: {
				startDate: new Date(currentDateRange?.startDate),
				endDate: new Date(currentDateRange?.endDate),
				key: currentDateRange?.key,
			},
			roomDetails,
		};
		console.log(searchData);
		sessionStorage.setItem('filterValues', JSON.stringify(searchData));
		router.push(`/${locale}/booking`);
	};
	const updateFiltersHandler = (data: any) => {
		let searchData = {
			...data,
			roomCount,
			totalGuestCount,
			currentDateRange: {
				startDate: new Date(currentDateRange?.startDate),
				endDate: new Date(currentDateRange?.endDate),
				key: currentDateRange?.key,
			},
			roomDetails,
		};
		updateFilters((prev: any) => ({ ...prev, ...searchData }));
	};
	const handleFilterChange = (label: any, value: boolean) => {
		if (value) {
			setSpecialRatesCount!((prev) => prev + 1);
		} else {
			setSpecialRatesCount!((prev) => prev - 1);
		}
		let newFilters = {};
		newFilters[label] = value;
		updateFilters((prev: any) => ({ ...prev, ...newFilters }));
	};

	useEffect(() => {
		let roomDets = [...roomDetails];
		let newRoomCount = roomDets.length;
		let newAdultCount = roomDets.reduce(
			(accumulator, current) => accumulator + current.adultsCount,
			0
		);
		let newKidCount = roomDets.reduce(
			(accumulator, current) => accumulator + current.childCount,
			0
		);
		let guestCount = newAdultCount + newKidCount;
		setRoomCount(newRoomCount);
		setTotalGuestCount(guestCount);
	}, [roomDetails]);
	useEffect(() => {
		let loadedDateRange = {
			startDate: new Date(filterValues?.currentDateRange?.startDate),
			endDate: new Date(filterValues?.currentDateRange?.endDate),
			key: filterValues?.currentDateRange?.key,
		};
		const newRoomDetails = filterValues?.roomDetails.map((room: any) => {
			if (room?.childrenAges && room?.childrenAges.length > 0) {
				return { ...room, id: uuidv4() };
			} else {
				return { ...room, childrenAges: [], id: uuidv4() };
			}
		});
		setCurrentDateRange({ ...loadedDateRange });
		setInitialDateRange([filterValues?.currentDateRange]);
		setRoomCount(filterValues?.roomCount);
		setRoomDetails([...newRoomDetails]);
		setTotalGuestCount(filterValues?.guestCount);
		setValue('AARPRate', filterValues?.AARPRate);
		setValue('aaaRate', filterValues?.aaaRate);
		setValue('governmentRates', filterValues?.governmentRates);
		setValue('seniorRate', filterValues?.seniorRate);
		setValue('travelAgents', filterValues?.travelAgents);
		setValue('usePoints', filterValues?.usePoints);
		setValue('corporateAccount', filterValues?.corporateAccount);
		setValue('groupCode', filterValues?.groupCode);
		setValue('promotionCode', filterValues?.promotionCode);
	}, [filterValues]);

	useEffect(() => {
		document.addEventListener('mousedown', handleClick);
		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, []);
	return (
		<div
			className={clsx(
				title === 'booking'
					? 'bg-gray-300 py-10 mx-0  lg:mx-5'
					: 'bg-white py-5',
				'w-full flex flex-wrap justify-center items-center '
			)}
		>
			{title === 'booking' && (
				<div className="w-full mx-8 flex justify-between items-start mb-4">
					<h3
						onMouseEnter={() => speechHandler(t('editStay'))}
						className="text-2xl text-primary-dark font-semibold"
					>
						{t('editStay')}
					</h3>
					<button
						onMouseEnter={() => speechHandler(t('close'))}
						onClick={hideFilters!}
						type="button"
						className="bg-transparent border-none"
					>
						<FontAwesomeIcon
							icon={faTimes}
							className="text-primary-dark text-2xl font-normal"
						/>
					</button>
				</div>
			)}
			<form
				onSubmit={handleSubmit(
					title === 'header' ? checkRoomsHandler : updateFiltersHandler
				)}
				className="w-full flex flex-wrap justify-center items-center my-3"
			>
				<DatePickerFilter
					setShowDatePicker={setShowDatePicker}
					currentDateRange={currentDateRange}
					showDatePicker={showDatePicker}
					datePickerRef={datePickerRef}
					setInitialDateRange={setInitialDateRange}
					setCurrentDateRange={setCurrentDateRange}
					initalDateRange={initalDateRange}
				/>
				<div className="grid grid-cols-2 gap-1">
					<RoomsFilters
						roomCount={roomCount}
						totalGuestCount={totalGuestCount}
						setShowRooms={setShowRooms}
						showRooms={showRooms}
						datePickerRef={datePickerRef}
						roomDetails={roomDetails}
						setRoomDetails={setRoomDetails}
					/>
					<SpecialFilters
						specialRatesCount={specialRatesCount}
						handleFilterChange={handleFilterChange}
						register={register}
					/>
				</div>

				{
					<button
						onMouseEnter={() =>
							speechHandler(
								title === 'header' ? t('checkRoomsRates') : t('update')
							)
						}
						type="submit"
						className="btn-primary-light mx-2 py-3 px-8 text-white capitalize"
					>
						{title === 'header' ? t('checkRoomsRates') : t('update')}
					</button>
				}
			</form>
		</div>
	);
};

export default Filters;
