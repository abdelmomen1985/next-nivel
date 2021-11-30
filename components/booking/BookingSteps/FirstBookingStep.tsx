import React from 'react';
import RoomCard from '../../Rooms/RoomCard';
import ChildAlert from '../ChildAlert';

const FirstBookingStep = ({
	currentRooms,
	selectRoom,
	pickRoomHandler,
	remoteUrl,
}: {
	currentRooms: any[];
	selectRoom: (room: any) => void;
	pickRoomHandler: (room: any, packagePrices: any[], basePrice: any) => void;
	remoteUrl: string;
}) => {
	return (
		<div className="mx-auto px-3">
			<ChildAlert />

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {currentRooms.map((room, i) => (
                      <>
            {room.RelWithStrapiRoom && (
              <RoomCard
                purpose="booking"
                key={i}
                room={room}
                selectRoom={selectRoom}
                pickRoomHandler={pickRoomHandler}
                remoteUrl={remoteUrl}
              />
            )}
            </>
				))}
			</div>
		</div>
	);
};

export default FirstBookingStep;
