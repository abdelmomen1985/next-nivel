import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from '../navigation/navigation.module.scss';
import useTranslation from './../../hooks/useTranslation';
import { useSpeech } from './../../hooks/useSpeech';
import SpecialFilters from '../navigation/HeaderSections/SpecialFilters';
import RoomTypesFilter from './BookingSteps/RoomTypesFilter';

const BookingFilters = ({
	updateFilters,
	filterValues,
	specialRatesCount,
	setSpecialRatesCount,
}: {
	updateFilters: (filters: any) => void;
	filterValues: any;
	specialRatesCount?: number;
	setSpecialRatesCount?: (val: number) => void;
}) => {
	const { t, locale } = useTranslation();
	const { errors, register, reset, handleSubmit, setValue } = useForm();
	const [selectedRoomType, setSelectedRoomType] = useState('all');
	const [checkAccessibility, setCheckAccessibility] = useState(false);
	const { speechHandler } = useSpeech();

	useEffect(() => {
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
	const amenities = [
		{
			en: 'Free WiFi',
			ar: 'إنترنت مجاني',
		},
		{
			en: 'Non-smoking rooms',
			ar: 'غرف لغير المدخنين',
		},
		{
			en: 'On-site restaurant',
			ar: 'مطعم داخل الفندق',
		},
		{
			en: 'Fitness center',
			ar: 'مركز لياقة بدنية',
		},
		{
			en: 'Business center',
			ar: 'مركز لإدارة الأعمال',
		},
	];
	return (
		<>
			<div className="mx-auto px-8 my-5 w-full flex flex-wrap items-start">
				<h3
					onMouseEnter={() => speechHandler(t('stayIncludes'))}
					className="text-black mx-4 text-lg font-medium"
				>
					{t('stayIncludes')}
				</h3>
				<div
					className={`grid grid-cols-2 justify-start md:grid-cols-${
						amenities.length / 2
					} gap-2 `}
				>
					{amenities.map((amenity, i) => (
						<h5
							onMouseEnter={() => speechHandler(amenity[locale])}
							key={i}
							className="flex justify-start items-center text-gray-500 text-base font-normal capitalize"
						>
							<FontAwesomeIcon icon={faCheck} className="mx-1 font-thin" />
							<span>{amenity[locale]}</span>
						</h5>
					))}
				</div>
			</div>
			<form
				onSubmit={handleSubmit(updateFiltersHandler)}
				className="w-full grid grid-cols-2 gap-1 md:flex md:flex-wrap md:justify-start md:items-center my-3 mx-auto px-8"
			>
				<RoomTypesFilter
					setSelectedRoomType={setSelectedRoomType}
					selectedRoomType={selectedRoomType}
				/>
				<SpecialFilters
					specialRatesCount={specialRatesCount}
					handleFilterChange={handleFilterChange}
					register={register}
				/>
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
						onMouseEnter={() => speechHandler(t('accessibleRooms'))}
						className="text-base md:text-base text-primary-dark font-medium capitalize"
						htmlFor="accessibility"
					>
						{t('accessibleRooms')}
					</label>
				</div>
				<button
					onMouseEnter={() => speechHandler(t('update'))}
					type="submit"
					className="btn-primary-light mx-2 py-3 px-8 text-white capitalize text-base md:text-base"
				>
					{t('update')}
				</button>
			</form>
		</>
	);
};

export default BookingFilters;
