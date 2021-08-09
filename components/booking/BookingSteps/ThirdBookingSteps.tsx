import React, { useState, useContext } from 'react';
import { useEffect } from 'react';
import useTranslation from './../../../hooks/useTranslation';
import BookingForm from './BookingForm/BookingForm';
import { cleanObjects } from './../../../utils/cleanObjects';
import { AppContext } from './../../../context/AppContext';
import { useMutation } from '@apollo/client';
import { ADD_BOOKING, UPDATE_BOOKING } from './../../../query/booking';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useSpeech } from './../../../hooks/useSpeech';
const ThirdBookingSteps = ({
	selectedRoom,
	filterValues,
	selectedPackage,
	userData,
	bookingId,
	selectedRooms,
	selectedPackages,
	specialRequests,
}: {
	selectedRoom: any;
	filterValues: any;
	selectedPackage: any;
	userData: any;
	bookingId?: string;
	selectedRooms: any;
	selectedPackages: any;
	specialRequests: string[];
}) => {
	const { t, locale } = useTranslation();
	const router = useRouter();
	const { user } = useContext(AppContext);
	const [totalPrice, setTotalPrice] = useState<number>(0);
	const [nightsCount, setNightsCount] = useState<number>(0);
	const [totalTax, setTotalTax] = useState<number>(0);
	const [showPriceDetails, setShowPriceDetails] = useState(false);
	const { speechHandler } = useSpeech();
	const [newBooking] = useMutation(ADD_BOOKING, {
		onCompleted() {
			const successMessage = {
				en: 'you have booked your visit successfully',
				ar: 'تم حجز زيارتك القادمة بنجاح',
			};
			toast.success(successMessage[locale], {
				rtl: locale === 'ar' ? true : false,
			});
			sessionStorage.removeItem('filterValues');
			router.push(`/${locale}/profile`);
		},
		onError(err) {
			toast.error(err?.message, {
				rtl: locale === 'ar' ? true : false,
			});
		},
	});
	const [updateBooking] = useMutation(UPDATE_BOOKING, {
		onCompleted() {
			const successMessage = {
				en: 'you have updated your visit successfully',
				ar: 'تم تعديل حجز زيارتك القادمة بنجاح',
			};
			toast.success(successMessage[locale], {
				rtl: locale === 'ar' ? true : false,
			});
		},
		onError(err) {
			toast.error(err?.message, {
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
	const addBooking = async (data: any, type: string) => {
		console.log('data', data);
		let special_requests = [...data.special_requests];
		delete data?.special_requests;
		let cleanData = await cleanObjects(data);
		console.log(special_requests);
		if (filterValues.roomDetails.length === 1) {
			console.log(special_requests.length);
			let bookingQueryVars = {
				booking_rate: selectedPackage?.id,
				check_in: filterValues?.currentDateRange?.startDate,
				check_out: filterValues?.currentDateRange?.endDate,
				ext_data: {
					adults_count: filterValues?.roomDetails[0].adultsCount,
					child_count: filterValues?.roomDetails[0].childCount,
					child_ages: filterValues?.roomDetails[0].childrenAges,
				},
				client_data: { ...cleanData },
				strp_room_id: selectedRoom?.id,
				visitor_id: user?.id,
				special_requests: special_requests.length > 0 ? special_requests : null,
			};
			console.log(bookingQueryVars);
			if (type === 'update') {
				updateBooking({
					variables: { ...bookingQueryVars, bookingId },
				});
				return;
			}
			if (type === 'create') {
				newBooking({
					variables: { ...bookingQueryVars },
				});
			}
		} else if (filterValues.roomDetails.length > 1) {
			selectedRooms.forEach((room: any, i: number) => {
				let bookingQueryVars = {
					booking_rate: selectedPackages[i]?.id,
					check_in: filterValues?.currentDateRange?.startDate,
					check_out: filterValues?.currentDateRange?.endDate,
					client_data: { ...cleanData },
					strp_room_id: room?.id,
					visitor_id: user?.id,
					ext_data: {
						adults_count: room.adultsCount,
						child_count: room.childCount,
						child_ages: room.childrenAges,
					},
					special_requests:
						special_requests.length > 0 ? special_requests : null,
				};
				newBooking({
					variables: { ...bookingQueryVars },
				});
			});
		}
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
					<h2 onMouseEnter={() => speechHandler(t('total4Stay'))}>
						{t('total4Stay')}
					</h2>
					<h2 onMouseEnter={() => speechHandler(`${totalPrice} ${t('sar')}`)}>
						{totalPrice} {t('sar')}
					</h2>
				</div>
				<div className="my-2 text-lg font-medium text-black">
					<button
						onMouseEnter={() =>
							speechHandler(
								showPriceDetails ? t('showPriceDetails') : t('hidePriceDetails')
							)
						}
						onClick={() => setShowPriceDetails((prev) => !prev)}
						className="underline bg-transparent text-primary-light capitalize text-lg font-normal"
					>
						{showPriceDetails ? t('showPriceDetails') : t('hidePriceDetails')}
					</button>

					{showPriceDetails && (
						<>
							<hr className="w-full mt-5 my-2" />
							<h5
								onMouseEnter={() =>
									speechHandler(selectedPackage?.rate?.title[locale])
								}
								className="text-gray-300 text-lg font-normal my-2"
							>
								{selectedPackage?.rate?.title[locale]}
							</h5>
							<div className="flex justify-between items-center text-gray-300 text-base font-normal">
								<h3
									onMouseEnter={() =>
										speechHandler(`${selectedPackage?.base_price} ${t(
											'sar'
										)} ${t('perNight')} * 
									${nightsCount} ${t('nights')}`)
									}
								>
									{selectedPackage?.base_price} {t('sar')} {t('perNight')} *{' '}
									{nightsCount} {t('nights')}
								</h3>
								<h3
									onMouseEnter={() =>
										speechHandler(`${(
											selectedPackage?.base_price * nightsCount
										).toFixed(2)} 
									${t('sar')}`)
									}
								>
									{(selectedPackage?.base_price * nightsCount).toFixed(2)}{' '}
									{t('sar')}
								</h3>
							</div>
						</>
					)}
				</div>
				<div className="flex justify-between items-center my-2 text-lg font-medium text-black">
					<h2 onMouseEnter={() => speechHandler(t('totalRoomCharge'))}>
						{t('totalRoomCharge')}
					</h2>
					<h2
						onMouseEnter={() =>
							speechHandler(
								`${(selectedPackage?.base_price * nightsCount).toFixed(2)} ${t(
									'sar'
								)}`
							)
						}
					>
						{(selectedPackage?.base_price * nightsCount).toFixed(2)} {t('sar')}
					</h2>
				</div>
				{showPriceDetails && (
					<div className=" text-gray-300 text-base font-normal">
						<h3
							onMouseEnter={() =>
								speechHandler(`15.75 % ${t('perRoom')}
							${t('comma')} ${t('perNight')}`)
							}
						>
							15.75 % {t('perRoom')}
							{t('comma')} {t('perNight')}
						</h3>
						<h3
							onMouseEnter={() =>
								speechHandler(`5.00 % ${t('perRoom')}
							${t('comma')} ${t('perNight')}`)
							}
						>
							5.00 % {t('perRoom')}
							{t('comma')} {t('perNight')}
						</h3>
					</div>
				)}
				<div className="flex justify-between items-center my-2 text-lg font-medium text-black">
					<h2 onMouseEnter={() => speechHandler(t('totalTaxes'))}>
						{t('totalTaxes')}
					</h2>
					<h2 onMouseEnter={() => speechHandler(`${totalTax} ${t('sar')}`)}>
						{totalTax} {t('sar')}
					</h2>
				</div>
				{showPriceDetails && (
					<>
						<hr className="w-full mt-5 my-2" />
						<div className="flex justify-end items-center font-semibold">
							<h2
								onMouseEnter={() => speechHandler(t('total4Stay'))}
								className="mx-1"
							>
								{t('total4Stay')}:
							</h2>
							<h2
								onMouseEnter={() => speechHandler(`${totalPrice} ${t('sar')}`)}
							>
								{totalPrice} {t('sar')}
							</h2>
						</div>
					</>
				)}
			</div>
			<BookingForm
				specialRequests={specialRequests}
				userData={userData}
				addBooking={addBooking}
			/>
		</section>
	);
};

export default ThirdBookingSteps;
