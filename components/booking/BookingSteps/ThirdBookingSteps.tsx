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
import BookingSummary from './BookingSummary';
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

	const addBooking = async (data: any, type: string) => {
		console.log('data', data);
		let special_requests = [...data.special_requests];
		let notes = data?.notes;
		delete data?.special_requests;
		delete data?.notes;

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
				notes,
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
			{filterValues?.roomDetails?.length === 1 && (
				<BookingSummary
					selectedPackage={selectedPackage}
					filterValues={filterValues}
				/>
			)}
			<BookingForm
				specialRequests={specialRequests}
				userData={userData}
				addBooking={addBooking}
			/>
		</section>
	);
};

export default ThirdBookingSteps;
