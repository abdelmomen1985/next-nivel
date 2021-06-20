import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import useTranslation from './../../hooks/useTranslation';

import styles from '../navigation/navigation.module.scss';

const BookingFilters = ({
	updateFilters,
	filterValues,
}: {
	updateFilters: (filters: any) => void;
	filterValues: any;
}) => {
	const { t, locale } = useTranslation();
	const { errors, register, reset, handleSubmit, setValue } = useForm();
	const [showSpecialRate, setShowSpecialRate] = useState(false);
	const [showRoomTypes, setShowRoomTypes] = useState(false);
	const [selectedRoomType, setSelectedRoomType] = useState('all');
	const [checkAccessibility, setCheckAccessibility] = useState(false);
	const specialRateRef = useRef<HTMLDivElement>(null);
	const roomTypeRef = useRef<HTMLDivElement>(null);
	const handleClick = (e: any) => {
		if (specialRateRef?.current?.contains(e.target)) {
			return;
		}
		if (roomTypeRef?.current?.contains(e.target)) {
			return;
		}
		setShowRoomTypes(false);
		setShowSpecialRate(false);
	};
	useEffect(() => {
		document.addEventListener('mousedown', handleClick);
		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, []);
	useEffect(() => {
		// let loadedDateRange = {
		// 	startDate: new Date(filterValues?.currentDateRange?.startDate),
		// 	endDate: new Date(filterValues?.currentDateRange?.endDate),
		// 	key: filterValues?.currentDateRange?.key,
		// };
		if (filterValues?.selectedRoomType) {
			setSelectedRoomType(filterValues?.selectedRoomType);
		}
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
	const updateFiltersHandler = (data: any) => {
		updateFilters((prev: any) => ({
			...prev,
			...data,
			selectedRoomType,
			accessibility: checkAccessibility,
		}));
	};
	return (
		<>
			<div className="mx-auto px-8 my-5 w-full flex flex-wrap justify-between items-center">
				<h3 className="text-black text-lg font-medium">Your stay includes</h3>
				<h5 className="flex justify-center items-center text-gray-400 text-base font-normal">
					<FontAwesomeIcon icon={faCheck} className="mx-1 font-thin" />
					<span>Free WiFi</span>
				</h5>
				<h5 className="flex justify-center items-center text-gray-400 text-base font-normal">
					<FontAwesomeIcon icon={faCheck} className="mx-1 font-thin" />
					<span>Non-smoking rooms</span>
				</h5>
				<h5 className="flex justify-center items-center text-gray-400 text-base font-normal">
					<FontAwesomeIcon icon={faCheck} className="mx-1 font-thin" />
					<span>On-site restaurant</span>
				</h5>
				<h5 className="flex justify-center items-center text-gray-400 text-base font-normal">
					<FontAwesomeIcon icon={faCheck} className="mx-1 font-thin" />
					<span>Fitness center</span>
				</h5>
				<h5 className="flex justify-center items-center text-gray-400 text-base font-normal">
					<FontAwesomeIcon icon={faCheck} className="mx-1 font-thin" />
					<span>Business center</span>
				</h5>
			</div>
			<form
				onSubmit={handleSubmit(updateFiltersHandler)}
				className="w-full flex flex-wrap justify-start items-center my-3 mx-auto px-8"
			>
				<div className="mx-2 relative">
					<button
						onClick={() => setShowRoomTypes(true)}
						className="btn-outline-primary-dark"
						type="button"
					>
						Room Filters
					</button>
					<div
						className={
							showRoomTypes
								? clsx(
										styles.datePickerContainer,
										'bg-white px-4 py-2 border border-gray-200 shadow-md'
								  )
								: 'hidden'
						}
						ref={roomTypeRef}
					>
						<div className="grid grid-cols-3 gap-1 items-center my-2 mx-1">
							<h5
								onClick={() => setSelectedRoomType('all')}
								className={clsx(
									selectedRoomType === 'all' ? styles.selectedRoom : ' ',
									' capitalize p-5 text-center text-primary-light text-lg font-medium cursor-pointer border border-gray-300'
								)}
							>
								All
							</h5>
							<h5
								onClick={() => setSelectedRoomType('1bed')}
								className={clsx(
									selectedRoomType === '1bed' ? styles.selectedRoom : ' ',
									' capitalize p-5 text-center text-primary-light text-lg font-medium cursor-pointer border border-gray-300'
								)}
							>
								1 bed
							</h5>
							<h5
								onClick={() => setSelectedRoomType('2beds')}
								className={clsx(
									selectedRoomType === '2beds' ? styles.selectedRoom : ' ',
									' capitalize p-5 text-center text-primary-light text-lg font-medium cursor-pointer border border-gray-300'
								)}
							>
								2 beds
							</h5>
							<h5
								onClick={() => setSelectedRoomType('suite')}
								className={clsx(
									selectedRoomType === 'suite' ? styles.selectedRoom : ' ',
									' capitalize p-5 text-center text-primary-light text-lg font-medium cursor-pointer border border-gray-300'
								)}
							>
								suite
							</h5>
						</div>
						<div className="flex justify-end items-center my-t mb-0 mr-2">
							<button
								type="button"
								onClick={() => setShowRoomTypes(false)}
								className="bg-transparent text-gray-dark text-lg font-medium cursor-pointer"
							>
								{t('close')}
							</button>
						</div>
					</div>
				</div>
				<div className="mx-2 relative">
					<button
						onClick={() => setShowSpecialRate(true)}
						className="btn-outline-primary-dark"
						type="button"
					>
						{t('specialRates')}
					</button>
					<div
						className={showSpecialRate ? styles.datePickerContainer : 'hidden'}
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
									className="mx-1"
									ref={register}
									name="usePoints"
								/>
								<label
									className="text-lg text-primary-dark font-medium"
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
									className="mx-1"
									ref={register}
									name="travelAgents"
								/>
								<label
									className="text-lg text-primary-dark font-medium"
									htmlFor="travelAgents"
								>
									Travel Agents
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
									className="mx-1"
									ref={register}
									name="aaaRate"
								/>
								<label
									className="text-lg text-primary-dark font-medium"
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
									className="mx-1"
									ref={register}
									name="AARPRate"
								/>
								<label
									className="text-lg text-primary-dark font-medium"
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
									className="mx-1"
									ref={register}
									name="seniorRate"
								/>
								<label
									className="text-lg text-primary-dark font-medium"
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
									className="mx-1"
									ref={register}
									name="governmentRates"
								/>
								<label
									className="text-lg text-primary-dark font-medium"
									htmlFor="governmentRates"
								>
									Government Rates
								</label>
							</div>
						</div>
						<div className="grid grid-cols-3 gap-2 items-center my-2 mx-1">
							<div className="flex flex-col justify-start">
								<label
									className="text-base text-primary-dark font-medium"
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
									className="text-base text-primary-dark font-medium"
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
									className="text-base text-primary-dark font-medium"
									htmlFor="corporateAccount"
								>
									Corporate Account
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
				<div
					className={clsx(
						styles.formGroup,
						'flex justify-start items-center mx-1'
					)}
				>
					<input
						type="checkbox"
						className="mx-1"
						name="accessibility"
						checked={checkAccessibility}
						onChange={(e) => setCheckAccessibility(e.target.checked)}
					/>
					<label
						className="text-lg text-primary-dark font-medium"
						htmlFor="accessibility"
					>
						Accessible Rooms
					</label>
				</div>
				<button
					type="submit"
					className="btn-primary-light mx-2 py-3 px-8 text-white capitalize"
				>
					{t('update')}
				</button>
			</form>
		</>
	);
};

export default BookingFilters;
