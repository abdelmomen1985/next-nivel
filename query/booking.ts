import { gql } from '@apollo/client';

export const ADD_BOOKING = gql`
	mutation AddBooking(
		$booking_rate: uuid!
		$check_in: date!
		$check_out: date!
		$client_data: jsonb!
		$strp_room_id: Int!
		$visitor_id: uuid
	) {
		insert_bookings_one(
			object: {
				booking_rate: $booking_rate
				check_in: $check_in
				check_out: $check_out
				client_data: $client_data
				strp_room_id: $strp_room_id
				visitor_id: $visitor_id
			}
		) {
			id
		}
	}
`;

export const RATE_BOOKING = gql`
	mutation RateBooking($id: uuid!, $visitor_rating_data: jsonb!) {
		update_bookings_by_pk(
			pk_columns: { id: $id }
			_set: { visitor_rating_data: $visitor_rating_data }
		) {
			visitor_rating_data
		}
	}
`;
