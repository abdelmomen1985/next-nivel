import React from 'react';
import RoomCard from '../../Rooms/RoomCard';
import ChildAlert from '../ChildAlert';

const FirstBookingStep = ({
	currentShow,
	setRoomDetails,
	setOpenModal,
	pickRoomHandler,
}: {
	currentShow: any[];
	setRoomDetails: (details: any) => void;
	setOpenModal: (open: boolean) => void;
	pickRoomHandler: (room: any, packagePrices: any[], basePrice: any) => void;
}) => {
	return (
		<div className="mx-auto px-3">
			<ChildAlert />

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{currentShow.map((room, i) => (
					<RoomCard
						purpose="booking"
						key={i}
						room={room}
						setRoomDetails={setRoomDetails}
						setOpenModal={setOpenModal}
						pickRoomHandler={pickRoomHandler}
					/>
				))}
			</div>
		</div>
	);
};

export default FirstBookingStep;
