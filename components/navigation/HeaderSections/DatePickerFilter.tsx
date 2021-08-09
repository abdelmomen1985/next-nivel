import { useState, useEffect } from 'react';
import styles from '../navigation.module.scss';
import useTranslation from './../../../hooks/useTranslation';
import { today, tomorrow } from '../../../utils/getDates';
import { useSpeech } from './../../../hooks/useSpeech';
import { DateRange } from 'react-date-range';

const DatePickerFilter = ({
	setShowDatePicker,
	currentDateRange,
	showDatePicker,
	datePickerRef,
	setInitialDateRange,
	setCurrentDateRange,
	initalDateRange,
}: any) => {
	const { t, locale } = useTranslation();
	const { speechHandler } = useSpeech();
	const [currentLocale, setCurrentLocale] = useState(
		locale === 'en' ? 'en-GB' : 'ar-EG'
	);

	useEffect(() => {
		locale === 'en' ? setCurrentLocale('en-GB') : setCurrentLocale('ar-EG');
	}, [locale]);
	return (
		<div className={styles.dateContainer}>
			<h3
				className="flex justify-center items-center cursor-pointer"
				onClick={() => setShowDatePicker(true)}
			>
				<span
					onMouseEnter={() =>
						speechHandler(
							currentDateRange?.startDate.toLocaleDateString(currentLocale, {
								day: 'numeric',
							})
						)
					}
					className="mx-1 text-5xl font-bold"
				>
					{currentDateRange?.startDate.toLocaleDateString(currentLocale, {
						day: 'numeric',
					})}
				</span>
				<div>
					<span
						onMouseEnter={() =>
							speechHandler(
								currentDateRange?.startDate.toLocaleDateString(currentLocale, {
									month: 'short',
								})
							)
						}
						className="block text-lg my-0 text-black font-semibold"
					>
						{currentDateRange?.startDate.toLocaleDateString(currentLocale, {
							month: 'short',
						})}
					</span>
					<span
						onMouseEnter={() =>
							speechHandler(
								currentDateRange?.startDate.toLocaleDateString(currentLocale, {
									weekday: 'short',
								})
							)
						}
						className="block text-lg my-0 text-black font-normal"
					>
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
				<span
					onMouseEnter={() =>
						speechHandler(
							currentDateRange?.endDate.toLocaleDateString(currentLocale, {
								day: 'numeric',
							})
						)
					}
					className="mx-1 text-5xl font-bold"
				>
					{currentDateRange?.endDate.toLocaleDateString(currentLocale, {
						day: 'numeric',
					})}
				</span>
				<div>
					<span
						onMouseEnter={() =>
							speechHandler(
								currentDateRange?.endDate.toLocaleDateString(currentLocale, {
									month: 'short',
								})
							)
						}
						className="block text-lg my-0 text-black font-semibold"
					>
						{currentDateRange?.endDate.toLocaleDateString(currentLocale, {
							month: 'short',
						})}
					</span>
					<span
						onMouseEnter={() =>
							speechHandler(
								currentDateRange?.endDate.toLocaleDateString(currentLocale, {
									weekday: 'short',
								})
							)
						}
						className="block text-lg my-0 text-black font-normal"
					>
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
	);
};

export default DatePickerFilter;
