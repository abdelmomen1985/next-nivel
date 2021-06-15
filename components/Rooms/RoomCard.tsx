import React from 'react';

const RoomCard = ({
	room,
	setModalDetails,
	setOpenModal,
	purpose = 'view',
	pickRoomHandler,
}: {
	room: any;
	setModalDetails: (room: any) => void;
	setOpenModal: (openModal: boolean) => void;
	purpose?: string;
	pickRoomHandler: (room: any) => void;
}) => {
	return (
		<div
			onClick={(e) => {
				e.stopPropagation();
				setModalDetails({ ...room });
				setOpenModal(true);
			}}
			className="border border-gray-400 my-5 mx-auto w-11/12 cursor-pointer"
		>
			<img src={room?.images[0]} className="w-full" />
			<div className="mt-2 py-2 px-2">
				<h2 className="text-xl my-4 font-semibold text-primary-dark text-center capitalize">
					{room?.title}
				</h2>
				{purpose === 'view' ? (
					<button className="btn-primary-light text-white py-3 text-xl font-semibold  px-5 w-11/12 mx-auto block">
						Room Details
					</button>
				) : (
					<button
						onClick={(e) => {
							e.stopPropagation();
							pickRoomHandler(room);
						}}
						className="btn-primary-light text-white py-3 text-xl font-semibold  px-5 w-11/12 mx-auto block"
					>
						Book from {room?.price} EGP
					</button>
				)}
			</div>
		</div>
	);
};

export default RoomCard;
