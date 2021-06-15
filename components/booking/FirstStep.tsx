import React, { useState, useEffect } from 'react';
import Filters from './../navigation/HeaderSections/Filters';
import RoomCard from './../Rooms/RoomCard';
import BookingFilters from './BookingFilters';

const FirstStep = ({
	currentShow,
	setModalDetails,
	setOpenModal,
	pickRoomHandler,
}: {
	currentShow: any[];
	setModalDetails: (details: any) => void;
	setOpenModal: (open: boolean) => void;
	pickRoomHandler: (room: any) => void;
}) => {
	return (
		<div className="mx-auto px-3">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{currentShow.map((room, i) => (
					<RoomCard
						purpose="booking"
						key={i}
						room={room}
						setModalDetails={setModalDetails}
						setOpenModal={setOpenModal}
						pickRoomHandler={pickRoomHandler}
					/>
				))}
			</div>
		</div>
	);
};

export default FirstStep;
