import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-date-range';
import { useForm } from 'react-hook-form';
import styles from '../navigation.module.scss';
import useTranslation from './../../../hooks/useTranslation';

const today = new Date();
const tomorrow = new Date(today.setDate(today.getDate() + 1));
const singleRoom = {
	adultsCount: 1,
	childCount: 0,
};
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
	const router = useRouter();
	const datePickerRef = useRef<HTMLDivElement>(null);
	const specialRateRef = useRef<HTMLDivElement>(null);
	const [initalDateRange, setInitialDateRange] = useState([
		filterValues?.currentDateRange,
	]);
	const [currentDateRange, setCurrentDateRange] = useState({
		...filterValues?.currentDateRange,
	});
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [showRooms, setShowRooms] = useState(false);
	const [showSpecialRate, setShowSpecialRate] = useState(false);
	const [roomCount, setRoomCount] = useState(filterValues?.roomCount);
	const [totalGuestCount, setTotalGuestCount] = useState(
		filterValues?.totalGuestCount
	);
	const [currentLocale, setCurrentLocale] = useState(
		locale === 'en' ? 'en-GB' : 'ar-EG'
	);
	const [roomDetails, setRoomDetails] = useState([
		...filterValues?.roomDetails,
	]);
	const handleClick = (e: any) => {
		if (datePickerRef.current?.contains(e.target)) {
			console.log('inside');
			return;
		} else if (specialRateRef?.current?.contains(e.target)) {
			console.log('inside special');
			return;
		}
		console.log('outside');
		setShowDatePicker(false);
		setShowRooms(false);
		setShowSpecialRate(false);
	};
	const removeRoomHandler = (roomIndex: number) => {
		setRoomDetails((prev) =>
			prev.filter((_room, index) => index !== roomIndex)
		);
	};
	const incrementGuestsHandler = (type: string, roomIndex: number) => {
		let roomDets = [...roomDetails];
		let newRoomDetails = roomDets.map((room, index) => {
			if (index === roomIndex) {
				switch (type) {
					case 'kid':
						return { ...room, childCount: room.childCount + 1 };
					case 'adult':
						return { ...room, adultsCount: room.adultsCount + 1 };
					default:
						return room;
				}
			} else {
				return room;
			}
		});
		setRoomDetails(newRoomDetails);
	};
	const decrementGuestsHandler = (type: string, roomIndex: number) => {
		let roomDets = [...roomDetails];
		let newRoomDetails = roomDets.map((room, index) => {
			if (index === roomIndex) {
				switch (type) {
					case 'kid':
						return { ...room, childCount: room.childCount - 1 };
					case 'adult':
						return { ...room, adultsCount: room.adultsCount - 1 };
					default:
						return room;
				}
			} else {
				return room;
			}
		});
		setRoomDetails(newRoomDetails);
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
		setCurrentDateRange({ ...loadedDateRange });
		setInitialDateRange([filterValues?.currentDateRange]);
		setRoomDetails(filterValues?.roomDetails);
		setRoomCount(filterValues?.roomCount);
		setRoomDetails([...filterValues?.roomDetails]);
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
		locale === 'en' ? setCurrentLocale('en-GB') : setCurrentLocale('ar-EG');
	}, [locale]);
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
					<h3 className="text-2xl text-primary-dark font-semibold">
						{t('editStay')}
					</h3>
					<button
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
				<div className={styles.dateContainer}>
					<h3
						className="flex justify-center items-center cursor-pointer"
						onClick={() => setShowDatePicker(true)}
					>
						<span className="mx-1 text-5xl font-bold">
							{currentDateRange?.startDate.toLocaleDateString(currentLocale, {
								day: 'numeric',
							})}
						</span>
						<div>
							<span className="block text-lg my-0 text-black font-semibold">
								{currentDateRange?.startDate.toLocaleDateString(currentLocale, {
									month: 'short',
								})}
							</span>
							<span className="block text-lg my-0 text-black font-normal">
								{currentDateRange?.startDate.toLocaleDateString(currentLocale, {
									weekday: 'short',
								})}
							</span>
						</div>
					</h3>
					<h3
						className="flex justify-center items-center cursor-pointer"
						onClick={() => setShowDatePicker(true)}
					>
						<span className="mx-1 text-5xl font-bold">
							{currentDateRange?.endDate.toLocaleDateString(currentLocale, {
								day: 'numeric',
							})}
						</span>
						<div>
							<span className="block text-lg my-0 text-black font-semibold">
								{currentDateRange?.endDate.toLocaleDateString(currentLocale, {
									month: 'short',
								})}
							</span>
							<span className="block text-lg my-0 text-black font-normal">
								{currentDateRange?.endDate.toLocaleDateString(currentLocale, {
									weekday: 'short',
								})}
							</span>
						</div>
					</h3>
					{showDatePicker && (
						<div className={styles.datePickerContainer} ref={datePickerRef}>
							<DateRange
								onChange={(item) => {
									setInitialDateRange([item?.selection]);
									setCurrentDateRange({ ...item?.selection });
								}}
								moveRangeOnFirstSelection={false}
								ranges={initalDateRange}
								editableDateInputs={false}
								minDate={new Date()}
								showPreview={false}
								showDateDisplay={false}
							/>
						</div>
					)}
				</div>
				<div className="grid grid-cols-2 gap-1">
					<div className="mx-2 relative">
						<button
							onClick={() => setShowRooms(true)}
							className="btn-outline-primary-dark text-xs md:text-base my-4 md:my-0"
							type="button"
						>
							{roomCount} {t('rooms')}, {totalGuestCount} {t('guests')}
						</button>
						{showRooms && (
							<div
								className={clsx(
									styles.datePickerContainer,
									styles.roomDetailsContainer,
									'shadow-xl border-2'
								)}
								ref={datePickerRef}
							>
								<div className="grid grid-cols-3 gap-2 items-center my-3">
									<h5 className="text-lg font-medium">{t('rooms')}</h5>
									<h5 className="text-center text-lg font-medium">
										{t('adults')}
									</h5>
									<h5 className="text-center text-lg font-medium">
										{t('kids')}
									</h5>
								</div>
								{roomDetails.map((room, i) => (
									<div
										key={i}
										className="grid grid-cols-3 gap-2 items-center my-4 border-b pb-3"
									>
										<div className="flex justify-start items-center">
											{roomDetails.length > 1 && (
												<button
													type="button"
													onClick={() => removeRoomHandler(i)}
													className="w-8 h-8 rounded-full border border-gray-400 text-2xl mx-2"
												>
													&times;
												</button>
											)}{' '}
											<h3 className="text-center text-lg font-medium mx-2">
												{t('room')} {i + 1}
											</h3>
										</div>
										<div className="flex justify-between items-center mx-3">
											<button
												type="button"
												disabled={room.adultsCount === 1}
												onClick={() => decrementGuestsHandler('adult', i)}
												className="w-8 h-8 rounded-full border border-gray-400 text-lg mx-1"
											>
												&minus;
											</button>
											<h5 className="text-center text-lg font-medium mx-1">
												{room.adultsCount}
											</h5>
											<button
												type="button"
												onClick={() => incrementGuestsHandler('adult', i)}
												className="w-8 h-8 rounded-full border border-gray-400 text-lg mx-1"
											>
												&#43;
											</button>
										</div>
										<div className="flex justify-between items-center mx-3">
											<button
												type="button"
												disabled={room.childCount === 0}
												onClick={() => decrementGuestsHandler('kid', i)}
												className="w-8 h-8 rounded-full border border-gray-400 text-lg mx-1"
											>
												&minus;
											</button>
											<h5 className="text-center text-lg font-medium mx-1">
												{room.childCount}
											</h5>
											<button
												type="button"
												onClick={() => incrementGuestsHandler('kid', i)}
												className="w-8 h-8 rounded-full border border-gray-400 text-lg mx-1"
											>
												&#43;
											</button>
										</div>
									</div>
								))}
								<button
									type="button"
									onClick={() =>
										setRoomDetails((prev) => [...prev, { ...singleRoom }])
									}
									className="flex justify-start items-center my-4 border-none bg-transparent"
								>
									<i className="w-8 h-8 rounded-full border border-gray-400 text-2xl mx-2">
										&#43;
									</i>
									<h3 className="text-center text-lg font-normal">
										{t('addRoom')}
									</h3>
								</button>

								<div className="flex justify-end items-center my-t mb-0 mr-2">
									<button
										type="button"
										onClick={() => setShowRooms(false)}
										className="bg-transparent text-gray-dark text-lg font-medium cursor-pointer"
									>
										{t('close')}
									</button>
								</div>
							</div>
						)}
					</div>
					<div className="mx-2 relative">
						<button
							onClick={() => setShowSpecialRate(true)}
							className="btn-outline-primary-dark text-xs md:text-base my-4 md:my-0 relative"
							type="button"
						>
							{specialRatesCount! > 0 && (
								<span className={styles.notification}>{specialRatesCount}</span>
							)}
							{t('specialRates')}
						</button>
						<div
							className={clsx(
								showSpecialRate ? styles.datePickerContainer : 'hidden',
								styles.specialRatesContainer,
								'shadow-xl border-2'
							)}
							ref={specialRateRef}
						>
							<div className="grid grid-cols-3 gap-1 items-center my-2 mx-1">
								<div
									className={clsx(
										styles.formGroup,
										'flex justify-start items-center mx-1'
									)}
								>
									<input
										type="checkbox"
										onChange={(e: any) =>
											handleFilterChange('usePoints', e.target.checked)
										}
										className="mx-1"
										ref={register}
										name="usePoints"
									/>
									<label
										className="text-sm md:text-base text-primary-dark font-medium"
										htmlFor="usePoints"
									>
										Use Points
									</label>
								</div>
								<div
									className={clsx(
										styles.formGroup,
										'flex justify-start items-center mx-1'
									)}
								>
									<input
										type="checkbox"
										onChange={(e: any) =>
											handleFilterChange('travelAgents', e.target.checked)
										}
										className="mx-1"
										ref={register}
										name="travelAgents"
									/>
									<label
										className="text-sm md:text-base text-primary-dark font-medium"
										htmlFor="travelAgents"
									>
										Agents
									</label>
								</div>
								<div
									className={clsx(
										styles.formGroup,
										'flex justify-start items-center mx-1'
									)}
								>
									<input
										type="checkbox"
										onChange={(e: any) =>
											handleFilterChange('aaaRate', e.target.checked)
										}
										className="mx-1"
										ref={register}
										name="aaaRate"
									/>
									<label
										className="text-sm md:text-base text-primary-dark font-medium"
										htmlFor="aaaRate"
									>
										AAA Rate
									</label>
								</div>
							</div>
							<div className="grid grid-cols-3 gap-1 items-center my-2 mx-1">
								<div
									className={clsx(
										styles.formGroup,
										'flex justify-start items-center mx-1'
									)}
								>
									<input
										type="checkbox"
										onChange={(e: any) =>
											handleFilterChange('AARPRate', e.target.checked)
										}
										className="mx-1"
										ref={register}
										name="AARPRate"
									/>
									<label
										className="text-sm md:text-base text-primary-dark font-medium"
										htmlFor="AARPRate"
									>
										AARP Rate
									</label>
								</div>
								<div
									className={clsx(
										styles.formGroup,
										'flex justify-start items-center mx-1'
									)}
								>
									<input
										type="checkbox"
										onChange={(e: any) =>
											handleFilterChange('seniorRate', e.target.checked)
										}
										className="mx-1"
										ref={register}
										name="seniorRate"
									/>
									<label
										className="text-sm md:text-base text-primary-dark font-medium"
										htmlFor="seniorRate"
									>
										Senior Rate
									</label>
								</div>
								<div
									className={clsx(
										styles.formGroup,
										'flex justify-start items-center mx-1'
									)}
								>
									<input
										type="checkbox"
										onChange={(e: any) =>
											handleFilterChange('governmentRates', e.target.checked)
										}
										className="mx-1"
										ref={register}
										name="governmentRates"
									/>
									<label
										className="text-sm md:text-base text-primary-dark font-medium"
										htmlFor="governmentRates"
									>
										Gov.Rates
									</label>
								</div>
							</div>
							<div className="grid grid-cols-3 gap-2 items-center my-2 mx-1">
								<div className="flex flex-col justify-start">
									<label
										className="text-sm md:text-base text-primary-dark font-medium"
										htmlFor="promotionCode"
									>
										Promotion Code
									</label>
									<input
										type="text"
										className="border border-gray-300 w-11/12 py-3"
										ref={register}
										name="promotionCode"
									/>
								</div>
								<div className="flex flex-col justify-start">
									<label
										className="text-sm md:text-base text-primary-dark font-medium"
										htmlFor="groupCode"
									>
										Group Code
									</label>
									<input
										type="text"
										className="border border-gray-300 w-11/12 py-3"
										ref={register}
										name="groupCode"
									/>
								</div>
								<div className="flex flex-col justify-start">
									<label
										className="text-sm md:text-base text-primary-dark font-medium"
										htmlFor="corporateAccount"
									>
										Corp.Account
									</label>
									<input
										type="text"
										className="border border-gray-300 w-11/12 py-3"
										ref={register}
										name="corporateAccount"
									/>
								</div>
							</div>
							<div className="flex justify-end items-center my-t mb-0 mr-2">
								<button
									type="button"
									onClick={() => setShowSpecialRate(false)}
									className="bg-transparent text-gray-dark text-lg font-medium cursor-pointer"
								>
									{t('close')}
								</button>
							</div>
						</div>
					</div>
				</div>

				{
					<button
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
