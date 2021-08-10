import { useState, useEffect, useRef } from 'react';
import styles from '../navigation.module.scss';
import useTranslation from './../../../hooks/useTranslation';
import { useSpeech } from './../../../hooks/useSpeech';
import clsx from 'clsx';
const SpecialFilters = ({
	specialRatesCount,
	handleFilterChange,
	register,
}: any) => {
	const { t, locale } = useTranslation();
	const { speechHandler } = useSpeech();
	const [showSpecialRate, setShowSpecialRate] = useState(false);

	const specialRateRef = useRef<HTMLDivElement>(null);

	const handleClick = (e: any) => {
		if (specialRateRef?.current?.contains(e.target)) {
			return;
		}
		setShowSpecialRate(false);
	};
	useEffect(() => {
		document.addEventListener('mousedown', handleClick);
		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, []);
	return (
		<div className="mx-2 relative">
			<button
				onMouseEnter={() =>
					speechHandler(`${specialRatesCount} ${t('specialRates')}`)
				}
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
							onMouseEnter={() => speechHandler('Use Points')}
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
							onMouseEnter={() => speechHandler('Agents')}
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
							onMouseEnter={() => speechHandler('AAA Rate')}
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
							onMouseEnter={() => speechHandler('AARP Rate')}
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
							onMouseEnter={() => speechHandler('Senior Rate')}
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
							onMouseEnter={() => speechHandler('Gov. Rates')}
							className="text-sm md:text-base text-primary-dark font-medium"
							htmlFor="governmentRates"
						>
							Gov. Rates
						</label>
					</div>
				</div>
				<div className="grid grid-cols-3 gap-2 items-center my-2 mx-1">
					<div className="flex flex-col justify-start">
						<label
							onMouseEnter={() => speechHandler('Promotion Code')}
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
							onMouseEnter={() => speechHandler('Group Code')}
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
							onMouseEnter={() => speechHandler(`Corp. Account`)}
							className="text-sm md:text-base text-primary-dark font-medium"
							htmlFor="corporateAccount"
						>
							Corp. Account
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
						onMouseEnter={() => speechHandler(t('close'))}
						type="button"
						onClick={() => setShowSpecialRate(false)}
						className="bg-transparent text-gray-dark text-lg font-medium cursor-pointer"
					>
						{t('close')}
					</button>
				</div>
			</div>
		</div>
	);
};

export default SpecialFilters;
