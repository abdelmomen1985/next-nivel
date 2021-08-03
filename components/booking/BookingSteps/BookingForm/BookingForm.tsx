import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

import styles from '../../booking.module.scss';
import { getNextTenYears } from '../../../../utils/getNextTenYears';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faMinusCircle,
	faPlusCircle,
	faUser,
} from '@fortawesome/free-solid-svg-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { bookingValidation } from './bookingValidation';
import useTranslation from './../../../../hooks/useTranslation';
import { months } from '../../../../utils/12months';

const years = getNextTenYears();
const BookingForm = ({
	addBooking,
	userData,
}: {
	addBooking: (data: any, type: string) => void;
	userData: any;
}) => {
	const { t, locale } = useTranslation();
	const { register, reset, errors, handleSubmit, setValue } = useForm({
		mode: 'onTouched',
		reValidateMode: 'onBlur',
		//@ts-ignore
		resolver: yupResolver(bookingValidation),
	});
	const [showGuest, setShowGuest] = useState<boolean>(false);
	useEffect(() => {
		if (!userData) return;
		setValue('cardNo', userData?.cardNo);
		setValue('cardMonth', userData?.cardMonth);
		setValue('cardYear', userData?.cardYear);
		setValue('address', userData?.address);
		setValue('city', userData?.city);
		setValue('country', userData?.country);
		setValue('email', userData?.email);
		setValue('firstName', userData?.firstName);
		setValue('lastName', userData?.lastName);
		setValue('phone', userData?.phone);
		setValue('zip', userData?.zip);
	}, [userData]);
	const bookingFormHandler = (data: any) => {
		// console.log(data);
		addBooking(data, 'create');
	};
	const updateReservationHandler = (data: any) => {
		addBooking(data, 'update');
	};
	return (
		<div className="w-full my-5 px-2">
			<h3>{t('allFields')}</h3>
			<form
				onSubmit={handleSubmit(
					userData ? updateReservationHandler : bookingFormHandler
				)}
			>
				<h3 className="flex flex-wrap justify-start items-start my-5">
					<img
						src="/images/icons/stroke/credit-card.svg"
						className="mx-2 w-10 h-10"
					/>
					<span className="text-lg font-semibold">{t('payment')}</span>
				</h3>
				<hr className="w-full mb-5 mt-2" />
				<div className={clsx(styles.formGroup, 'w-full md:w-2/3')}>
					<label className="capitalize" htmlFor="cardNo">
						{t('cardNo')}
					</label>
					<input
						type="number"
						ref={register({
							valueAsNumber: true,
						})}
						name="cardNo"
						style={{
							padding: '8.5px 16px 8.5px 122px',
						}}
					/>
				</div>
				{errors.cardNo && (
					<p className="text-red-600 text-base  font-normal my-1">
						{errors?.cardNo?.message[locale!]}
					</p>
				)}
				<div className="grid grid-cols-2 gap-2 items-center w-full md:w-2/3">
					<div className={clsx(styles.formGroup)}>
						<label className="capitalize" htmlFor="cardMonth">
							{t('month')}
						</label>
						<select name="cardMonth" ref={register}>
							{months.map((month, i) => (
								<option key={i} value={month.en}>
									{i + 1} {month[locale]}
								</option>
							))}
						</select>
					</div>
					<div className={clsx(styles.formGroup)}>
						<label className="capitalize" htmlFor="cardYear">
							{t('year')}
						</label>
						<select name="cardYear" ref={register}>
							{years.map((year, i) => (
								<option key={year} value={year}>
									{year}
								</option>
							))}
						</select>
					</div>
				</div>
				{errors.cardMonth && (
					<p className="text-red-600 text-base  font-normal my-1">
						{errors.cardMonth?.message[locale]}
					</p>
				)}
				{errors.cardYear && (
					<p className="text-red-600 text-base  font-normal my-1">
						{errors.cardYear?.message[locale]}
					</p>
				)}
				<h3 className="flex flex-wrap justify-start items-center mt-5 mb-1">
					<FontAwesomeIcon icon={faUser} className="mx-1" />
					<span className="text-lg font-semibold">{t('personalInfo')}</span>
				</h3>
				<hr className="w-full mb-5 mt-1" />
				<div className={clsx(styles.formGroup, 'w-full md:w-2/3')}>
					<label className="capitalize" htmlFor="firstName">
						{t('firstName')}
					</label>
					<input type="text" name="firstName" ref={register} />
				</div>
				{errors.firstName && (
					<p className="text-red-600 text-base  font-normal my-1">
						{errors.firstName?.message[locale]}
					</p>
				)}
				<div className={clsx(styles.formGroup, 'w-full md:w-2/3')}>
					<label className="capitalize" htmlFor="lastName">
						{t('lastName')}
					</label>
					<input type="text" name="lastName" ref={register} />
				</div>
				{errors.lastName && (
					<p className="text-red-600 text-base  font-normal my-1">
						{errors.lastName?.message[locale]}
					</p>
				)}
				<div className={clsx(styles.formGroup, 'w-full md:w-2/3')}>
					<label className="capitalize" htmlFor="email">
						{t('email')}
					</label>
					<input type="text" name="email" ref={register} />
				</div>
				{errors.email && (
					<p className="text-red-600 text-base  font-normal my-1">
						{errors.email?.message[locale]}
					</p>
				)}
				<div className={clsx(styles.formGroup, 'w-full md:w-2/3')}>
					<label className="capitalize" htmlFor="phone">
						{t('phone')}
					</label>
					<input type="text" name="phone" ref={register} />
				</div>
				{errors.phone && (
					<p className="text-red-600 text-base  font-normal my-1">
						{errors.phone?.message[locale]}
					</p>
				)}
				<div className={clsx(styles.formGroup, 'w-full md:w-2/3')}>
					<label className="capitalize" htmlFor="country">
						{t('country')}
					</label>
					<input type="text" name="country" ref={register} />
				</div>
				{errors.country && (
					<p className="text-red-600 text-base  font-normal my-1">
						{errors.country?.message[locale]}
					</p>
				)}
				<div className={clsx(styles.formGroup, 'w-full md:w-2/3')}>
					<label className="capitalize" htmlFor="address">
						{t('address')}
					</label>
					<input type="text" name="address" ref={register} />
				</div>
				{errors.address && (
					<p className="text-red-600 text-base  font-normal my-1">
						{errors.address?.message[locale]}
					</p>
				)}
				<div className={clsx(styles.formGroup, 'w-full md:w-2/3')}>
					<label className="capitalize" htmlFor="secondAddress">
						{t('address2')}
					</label>
					<input
						type="text"
						name="secondAddress"
						placeholder="Optional"
						ref={register}
					/>
				</div>
				<div className={clsx(styles.formGroup, 'w-full md:w-2/3')}>
					<label className="capitalize" htmlFor="zip">
						{t('zip')}
					</label>
					<input
						type="number"
						name="zip"
						ref={register({
							valueAsNumber: true,
						})}
					/>
				</div>
				{errors.zip && (
					<p className="text-red-600 text-base  font-normal my-1">
						{errors.zip?.message[locale]}
					</p>
				)}
				<div className={clsx(styles.formGroup, 'w-full md:w-2/3')}>
					<label className="capitalize" htmlFor="city">
						{t('city')}
					</label>
					<input type="text" name="city" ref={register} />
				</div>
				{errors.city && (
					<p className="text-red-600 text-base  font-normal my-1">
						{errors.city?.message[locale]}
					</p>
				)}
				<button
					type="button"
					onClick={() => setShowGuest((prev) => !prev)}
					className="text-primary-dark my-5 bg-transparent text-lg font-medium"
				>
					{showGuest ? (
						<FontAwesomeIcon
							icon={faMinusCircle}
							className="text-primary-dark mx-1"
						/>
					) : (
						<FontAwesomeIcon
							icon={faPlusCircle}
							className="text-primary-dark mx-1"
						/>
					)}
					{t('addGuestNames')}
				</button>
				{showGuest && (
					<div className="w-full py-5 px-3 mx-auto my-5 bg-gray-200">
						<p>{t('addGuestDisc')}</p>
						<div className={clsx(styles.formGroup, 'w-full md:w-2/3')}>
							<label className="capitalize" htmlFor="guestFirstName">
								{t('firstName')}
							</label>
							<input
								type="text"
								placeholder="Optional"
								name="guestFirstName"
								ref={register}
							/>
						</div>
						<div className={clsx(styles.formGroup, 'w-full md:w-2/3')}>
							<label className="capitalize" htmlFor="guestLastName">
								{t('lastName')}
							</label>
							<input
								type="text"
								placeholder="Optional"
								name="guestLastName"
								ref={register}
							/>
						</div>
					</div>
				)}

				<button
					className="btn-primary-dark w-full md:w-1/2 px-10 py-5  text-white text-lg font-bold block"
					type="submit"
				>
					{userData ? t('updateReservation') : t('bookReservation')}
				</button>
			</form>
		</div>
	);
};

export default BookingForm;
