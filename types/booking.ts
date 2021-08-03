export type BookingType = {
	check_in: Date;
	reservation_code: number | string;
	room_rate: {
		base_price: number;
		rate: {
			title: {
				en: string;
				ar: string;
			};
		};
	};
	check_out: Date;
	client_data: any;
	id: string;
	strp_room_id: string | number;
	StrpRoomBooking: {
		id: number;
		name: {
			ar: string;
			en: string;
		};
	};
	visitor_id?: string;
	visitor_rating_data?: {
		rating: number;
		comment: string;
	};
};
