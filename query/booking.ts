import { gql } from '@apollo/client';

export const BOOKING_FRAGMENT = gql`
	fragment BookingFields on bookings {
		check_in
		check_out
		client_data
		reservation_code
		room_rate {
			base_price
			rate {
				title
			}
		}
		id
		StrpRoomBooking {
			id
			name
		}
		visitor_id
		visitor_rating_data
		strp_room_id
	}
`;
export const ADD_BOOKING = gql`
	mutation AddBooking(
		$booking_rate: uuid!
		$check_in: date!
		$check_out: date!
		$client_data: jsonb!
		$strp_room_id: Int!
		$visitor_id: uuid
		$ext_data: jsonb
		$special_requests: jsonb
	) {
		insert_bookings_one(
			object: {
				booking_rate: $booking_rate
				check_in: $check_in
				check_out: $check_out
				client_data: $client_data
				strp_room_id: $strp_room_id
				visitor_id: $visitor_id
				ext_data: $ext_data
				special_requests: $special_requests
			}
		) {
			id
		}
	}
`;

export const UPDATE_BOOKING = gql`
	mutation updateBooking(
		$bookingId: uuid!
		$booking_rate: uuid!
		$check_in: date!
		$check_out: date!
		$client_data: jsonb!
		$strp_room_id: Int!
		$visitor_id: uuid
		$special_requests: jsonb
	) {
		update_bookings_by_pk(
			pk_columns: { id: $bookingId }
			_set: {
				booking_rate: $booking_rate
				check_in: $check_in
				check_out: $check_out
				client_data: $client_data
				strp_room_id: $strp_room_id
				visitor_id: $visitor_id
				special_requests: $special_requests
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

export const GET_SINGLE_BOOKING = gql`
	${BOOKING_FRAGMENT}
	query bookings_by_rsv_code($res_code: Int!) {
		bookings_aggregate(where: { reservation_code: { _eq: $res_code } }) {
			nodes {
				...BookingFields
			}
		}
	}
`;

export const GET_SPECIAL_REQUESTS = gql`
	query specialRequest {
		specialRequest {
			values_ar
			values_en
			id
		}
	}
`;
