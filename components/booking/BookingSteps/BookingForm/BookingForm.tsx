import React, { useState } from 'react';
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

const months = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];
const years = getNextTenYears();
const BookingForm = () => {
	const { register, reset, errors, handleSubmit } = useForm({
		mode: 'onTouched',
		reValidateMode: 'onBlur',
		//@ts-ignore
		resolver: yupResolver(bookingValidation),
	});
	const [showGuest, setShowGuest] = useState<boolean>(false);
	const bookingFormHandler = (data: any) => {
		console.log(data);
	};
	return (
		<div className="w-full my-5">
			<h3>All Fields are required</h3>
			<form onSubmit={handleSubmit(bookingFormHandler)}>
				<h3 className="flex flex-wrap justify-start items-start my-5">
					<img
						src="/images/icons/stroke/credit-card.svg"
						className="mx-2 w-10 h-10"
					/>
					<span className="text-lg font-semibold">Payment</span>
				</h3>
				<hr className="w-full mb-5 mt-2" />
				<div className={clsx(styles.formGroup, 'w-full md:w-2/3')}>
					<label htmlFor="cardNo">Card number</label>
					<input
						type="number"
						ref={register({
							valueAsNumber: true,
						})}
						name="cardNo"
					/>
				</div>
				{errors.cardNo && (
					<p className="text-red-600 text-base text-left font-normal my-1">
						{errors.cardNo?.message}
					</p>
				)}
				<div className="grid grid-cols-2 gap-2 items-center w-full md:w-2/3">
					<div className={clsx(styles.formGroup)}>
						<label htmlFor="cardMonth">Month</label>
						<select name="cardMonth" ref={register}>
							{months.map((month, i) => (
								<option key={month} value={month}>
									{i + 1} {month}
								</option>
							))}
						</select>
					</div>
					<div className={clsx(styles.formGroup)}>
						<label htmlFor="cardYear">Year</label>
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
					<p className="text-red-600 text-base text-left font-normal my-1">
						{errors.cardMonth?.message}
					</p>
				)}
				{errors.cardYear && (
					<p className="text-red-600 text-base text-left font-normal my-1">
						{errors.cardYear?.message}
					</p>
				)}
				<h3 className="flex flex-wrap justify-start items-center mt-5 mb-1">
					<FontAwesomeIcon icon={faUser} className="mx-1" />
					<span className="text-lg font-semibold">Personal Information</span>
				</h3>
				<hr className="w-full mb-5 mt-1" />
				<div className={clsx(styles.formGroup, 'w-full md:w-2/3')}>
					<label htmlFor="firstName">First Name</label>
					<input type="text" name="firstName" ref={register} />
				</div>
				{errors.firstName && (
					<p className="text-red-600 text-base text-left font-normal my-1">
						{errors.firstName?.message}
					</p>
				)}
				<div className={clsx(styles.formGroup, 'w-full md:w-2/3')}>
					<label htmlFor="lastName">Last Name</label>
					<input type="text" name="lastName" ref={register} />
				</div>
				{errors.lastName && (
					<p className="text-red-600 text-base text-left font-normal my-1">
						{errors.lastName?.message}
					</p>
				)}
				<div className={clsx(styles.formGroup, 'w-full md:w-2/3')}>
					<label htmlFor="email">Email</label>
					<input type="text" name="email" ref={register} />
				</div>
				{errors.email && (
					<p className="text-red-600 text-base text-left font-normal my-1">
						{errors.email?.message}
					</p>
				)}
				<div className={clsx(styles.formGroup, 'w-full md:w-2/3')}>
					<label htmlFor="phone">Phone</label>
					<input type="text" name="phone" ref={register} />
				</div>
				{errors.phone && (
					<p className="text-red-600 text-base text-left font-normal my-1">
						{errors.phone?.message}
					</p>
				)}
				<div className={clsx(styles.formGroup, 'w-full md:w-2/3')}>
					<label htmlFor="country">Country</label>
					<input type="text" name="country" ref={register} />
				</div>
				{errors.country && (
					<p className="text-red-600 text-base text-left font-normal my-1">
						{errors.country?.message}
					</p>
				)}
				<div className={clsx(styles.formGroup, 'w-full md:w-2/3')}>
					<label htmlFor="address">address</label>
					<input type="text" name="address" ref={register} />
				</div>
				{errors.address && (
					<p className="text-red-600 text-base text-left font-normal my-1">
						{errors.address?.message}
					</p>
				)}
				<div className={clsx(styles.formGroup, 'w-full md:w-2/3')}>
					<label htmlFor="secondAddress">address 2</label>
					<input
						type="text"
						name="secondAddress"
						placeholder="Optional"
						ref={register}
					/>
				</div>
				<div className={clsx(styles.formGroup, 'w-full md:w-2/3')}>
					<label htmlFor="zip">ZIP</label>
					<input type="text" name="zip" ref={register} />
				</div>
				{errors.zip && (
					<p className="text-red-600 text-base text-left font-normal my-1">
						{errors.zip?.message}
					</p>
				)}
				<div className={clsx(styles.formGroup, 'w-full md:w-2/3')}>
					<label htmlFor="city">City</label>
					<input type="text" name="city" ref={register} />
				</div>
				{errors.city && (
					<p className="text-red-600 text-base text-left font-normal my-1">
						{errors.city?.message}
					</p>
				)}
				<button
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
					Add guest names
				</button>
				{showGuest && (
					<div className="w-full py-5 px-3 mx-auto my-5 bg-gray-200">
						<p>
							This reservation is in your name. To allow another guest to check
							in, add their name below.
						</p>
						<div className={clsx(styles.formGroup, 'w-full md:w-2/3')}>
							<label htmlFor="guestFirstName">First Name</label>
							<input
								type="text"
								placeholder="Optional"
								name="guestFirstName"
								ref={register}
							/>
						</div>
						<div className={clsx(styles.formGroup, 'w-full md:w-2/3')}>
							<label htmlFor="guestLastName">Last Name</label>
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
					Book Reservation
				</button>
			</form>
		</div>
	);
};

export default BookingForm;
