import React, { useState, useContext } from 'react';
import { useEffect } from 'react';
import useTranslation from './../../../hooks/useTranslation';
import BookingForm from './BookingForm/BookingForm';
import { cleanObjects } from './../../../utils/cleanObjects';
import { AppContext } from './../../../context/AppContext';
import { useMutation } from '@apollo/client';
import { ADD_BOOKING } from './../../../query/booking';
import { toast } from 'react-toastify';

const ThirdBookingSteps = ({
	selectedRoom,
	filterValues,
	selectedPackage,
}: {
	selectedRoom: any;
	filterValues: any;
	selectedPackage: any;
}) => {
	const { t, locale } = useTranslation();
	const { user } = useContext(AppContext);
	const [totalPrice, setTotalPrice] = useState<number>(0);
	const [nightsCount, setNightsCount] = useState<number>(0);
	const [totalTax, setTotalTax] = useState<number>(0);
	const [showPriceDetails, setShowPriceDetails] = useState(false);
	const [newBooking] = useMutation(ADD_BOOKING, {
		onCompleted() {
			const successMessage = {
				en: 'you have booked your visit successfully',
				ar: 'تم حجز زيارتك القادمة بنجاح',
			};
			toast.success(successMessage[locale], {
				rtl: locale === 'ar' ? true : false,
			});
		},
		onError(err) {
			toast.success(err?.message, {
				rtl: locale === 'ar' ? true : false,
			});
		},
	});
	let tax = 15.75;
	let vat = 5.0;
	useEffect(() => {
		const calcTotal = async () => {
			// Todo get Taxes rates from context
			let nightCount =
				(filterValues?.currentDateRange?.endDate?.getTime() -
					filterValues?.currentDateRange?.startDate?.getTime()) /
				(1000 * 3600 * 24);
			setNightsCount(nightCount);
			if (nightCount === 0) {
				nightCount = 1;
			}
			console.log('nightCount', nightCount);

			let selectedPrice = +selectedPackage?.base_price * nightCount;
			console.log('selectedPrice', selectedPrice);

			let priceWTax = selectedPrice * (tax / 100) * nightCount;
			console.log('priceWTax', priceWTax);

			let priceWVat = selectedPrice * (vat / 100) * nightCount;
			console.log('priceWVat', priceWVat);

			let totalTaxVal = priceWTax + priceWVat;
			let totalPriceValue = selectedPrice + totalTaxVal;
			setTotalPrice(+totalPriceValue.toFixed(2));
			setTotalTax(+totalTaxVal.toFixed(2));
		};
		calcTotal();
	}, [selectedPackage, filterValues]);

	const addBooking = async (data: any) => {
		let cleanData = await cleanObjects(data);
		let bookingQueryVars = {
			booking_rate: selectedPackage?.id,
			check_in: filterValues?.currentDateRange?.startDate,
			check_out: filterValues?.currentDateRange?.endDate,
			client_data: { ...cleanData },
			strp_room_id: selectedRoom?.id,
			visitor_id: user?.id,
		};
		console.log(bookingQueryVars);
		newBooking({
			variables: { ...bookingQueryVars },
		});
	};

	return (
		<section className="mx-auto md:mx-8 w-full my-2">
			<div
				className="py-6 bg-outline-primary-light border-2 px-4"
				style={{
					borderLeftColor: 'transparent',
					borderRightColor: 'transparent',
				}}
			>
				<div className="flex justify-between items-center my-2 text-xl font-bold text-primary-dark">
					<h2>{t('total4Stay')}</h2>
					<h2>
						{totalPrice} {t('sar')}
					</h2>
				</div>
				<div className="my-2 text-lg font-medium text-black">
					<button
						onClick={() => setShowPriceDetails((prev) => !prev)}
						className="underline bg-transparent text-primary-light capitalize text-lg font-normal"
					>
						{showPriceDetails ? t('showPriceDetails') : t('hidePriceDetails')}
					</button>

					{showPriceDetails && (
						<>
							<hr className="w-full mt-5 my-2" />
							<h5 className="text-gray-300 text-lg font-normal my-2">
								{selectedPackage?.rate?.title[locale]}
							</h5>
							<div className="flex justify-between items-center text-gray-300 text-base font-normal">
								<h3>
									{selectedPackage?.base_price} {t('sar')} {t('perNight')} *{' '}
									{nightsCount} {t('nights')}
								</h3>
								<h3>
									{(selectedPackage?.base_price * nightsCount).toFixed(2)}{' '}
									{t('sar')}
								</h3>
							</div>
						</>
					)}
				</div>
				<div className="flex justify-between items-center my-2 text-lg font-medium text-black">
					<h2>{t('totalRoomCharge')}</h2>
					<h2>
						{(selectedPackage?.base_price * nightsCount).toFixed(2)} {t('sar')}
					</h2>
				</div>
				{showPriceDetails && (
					<div className=" text-gray-300 text-base font-normal">
						<h3>
							15.75 % {t('perRoom')}
							{t('comma')} {t('perNight')}
						</h3>
						<h3>
							5.00 % {t('perRoom')}
							{t('comma')} {t('perNight')}
						</h3>
					</div>
				)}
				<div className="flex justify-between items-center my-2 text-lg font-medium text-black">
					<h2>{t('totalTaxes')}</h2>
					<h2>
						{totalTax} {t('sar')}
					</h2>
				</div>
				{showPriceDetails && (
					<>
						<hr className="w-full mt-5 my-2" />
						<div className="flex justify-end items-center font-semibold">
							<h2 className="mx-1">{t('total4Stay')}:</h2>
							<h2>
								{totalPrice} {t('sar')}
							</h2>
						</div>
					</>
				)}
			</div>
			<BookingForm addBooking={addBooking} />
		</section>
	);
};

export default ThirdBookingSteps;
