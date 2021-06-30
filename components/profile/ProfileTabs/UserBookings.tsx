import React, { useState } from 'react';
import Rating from 'react-rating';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { BookingType } from '../../../types/booking';
import CustomModal from '../../common/CustomModal/CustomModal';
import useTranslation from './../../../hooks/useTranslation';
import { useMutation } from '@apollo/client';
import { RATE_BOOKING } from '../../../query/booking';
import { toast } from 'react-toastify';

const UserBookings = ({
	bookings,
	setBookings,
}: {
	bookings: BookingType[];
	setBookings: (bookings: BookingType[]) => void;
}) => {
	const { locale, t } = useTranslation();
	const [selectedBooking, setSelectedBooking] = useState<BookingType>({});
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [ratingComment, setRatingComment] = useState<string | undefined>(
		undefined
	);
	const [rateBooking, { data }] = useMutation(RATE_BOOKING, {
		onCompleted() {
			let newRating = {
				comment: ratingComment!,
				rating: ratingRate,
			};
			let ratedBookingId = selectedBooking?.id;
			let oldBookings: BookingType[] = [...bookings];
			let newBookings: BookingType[] = oldBookings.map(
				(booking: BookingType) => {
					if (booking?.id === ratedBookingId) {
						return { ...booking, visitor_rating_data: newRating };
					} else {
						return booking;
					}
				}
			);
			setBookings([...newBookings]);
			closeModal();
			const successMessage = {
				en: 'You have Rated your visit successfully',
				ar: 'لقد قمت بتقييم زيارتك بنجاح',
			};
			toast.success(successMessage[locale], {
				rtl: locale === 'ar' ? true : false,
			});
		},
		onError(err) {
			console.log(err);
		},
	});
	const [ratingRate, setRatingRate] = useState<number>(0);
	const closeModal = () => {
		setOpenModal(false);
		setSelectedBooking({});
		setRatingComment(undefined);
		setRatingRate(0);
	};
	const startRatingProcessHandler = (booking: BookingType) => {
		setSelectedBooking(booking);
		setOpenModal(true);
		if (booking.visitor_rating_data) {
			setRatingRate(booking.visitor_rating_data?.rating);
			setRatingComment(booking.visitor_rating_data?.comment);
		}
	};
	const addRateHandler = () => {
		console.log(ratingComment, ratingRate);
		rateBooking({
			variables: {
				id: selectedBooking?.id,
				visitor_rating_data: {
					comment: ratingComment,
					rating: ratingRate,
				},
			},
		});
	};
	return (
		<>
			{bookings.length > 0 ? (
				<Table
					style={{
						width: '100%',
					}}
				>
					<Thead>
						<Tr>
							<Th>Room Name</Th>
							<Th>Check In</Th>
							<Th>Check Out</Th>
							<Th>Price</Th>
							<Th>Package Name</Th>
							<Th>User Rating</Th>
							<Th></Th>
						</Tr>
					</Thead>
					<Tbody>
						{bookings.map((booking: BookingType) => (
							<Tr key={booking.id}>
								<Th>{booking?.StrpRoomBooking?.name[locale]}</Th>
								<Th>{booking?.check_in}</Th>
								<Th>{booking?.check_out}</Th>
								<Th>{booking?.room_rate?.base_price}</Th>
								<Th>{booking?.room_rate?.rate?.title[locale]}</Th>
								{booking?.visitor_rating_data?.rating ? (
									<Th>{booking?.visitor_rating_data?.rating} / 5</Th>
								) : (
									<Th></Th>
								)}
								<Th>
									<button
										onClick={() => startRatingProcessHandler(booking)}
										className="w-10/12 py-3 px-6 mx-auto text-white bg-primary-light text-lg font-medium"
									>
										Rate Now
									</button>
								</Th>
							</Tr>
						))}
					</Tbody>
				</Table>
			) : (
				<div className="mx-auto my-10 px-5 py-5 text-center text-primary-dark text-2xl font-semibold">
					No bookings yet for this user
				</div>
			)}

			<CustomModal
				show={openModal}
				onClose={closeModal}
				title={{ en: 'Rate your visit', ar: 'قيم زيارتك' }}
				closeWithin
			>
				<div className="w-full my-3 px-2 flex flex-col justify-center items-center">
					<Rating
						initialRating={ratingRate}
						onChange={(rate) => setRatingRate(rate)}
						fractions={2}
						emptySymbol="fa fa-star-o fa-2x medium"
						fullSymbol="fa fa-star fa-2x medium"
						direction={locale === 'en' ? 'ltr' : 'rtl'}
						// emptySymbol={
						// 	<img src="assets/images/star-grey.png" className="icon" />
						// }
						// fullSymbol={
						// 	<img src="assets/images/star-yellow.png" className="icon" />
						// }
					/>
					<textarea
						className="p-3 mx-auto my-3 w-full rounded-md border-2 border-gray-400 block"
						rows={5}
						value={ratingComment}
						placeholder="Enter a comment"
						onChange={(e) => setRatingComment(e.target.value)}
					></textarea>

					<button
						disabled={ratingRate === 0}
						onClick={addRateHandler}
						className="btn-primary-light text-white px-6 py-3 block mx-auto my-4 text-xl font-medium"
					>
						Rate your Visit
					</button>
				</div>
			</CustomModal>
		</>
	);
};

export default UserBookings;
