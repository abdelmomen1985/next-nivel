import React, { useState } from 'react';
import useTranslation from './../../hooks/useTranslation';
import { useEffect } from 'react';
import { RoomType } from '../../types/rooms';

const RoomCard = ({
	room,
	setRoomDetails,
	setOpenModal,
	purpose = 'view',
	pickRoomHandler,
}: {
	room: RoomType;
	setRoomDetails: (room: RoomType) => void;
	setOpenModal: (openModal: boolean) => void;
	purpose?: string;
	pickRoomHandler: (room: RoomType) => void;
}) => {
	const { t, locale } = useTranslation();
	const [src, setSrc] = useState<any>();
	const [basePrice, setBasePrice] = useState<any>(undefined);
	const [packagePrices, setPackagePrices] = useState<any>(undefined);

	useEffect(() => {
		let packages = [];
		if (room?.media?.images) {
			setSrc(room?.media?.images[0]);
		} else {
			setSrc('https://i.imgur.com/bDujVXa.jpg');
		}

		for (let key in room.room_rates) {
			//@ts-ignore
			if (room?.room_rates[key]?.rate.title.en === 'Base Package') {
				//@ts-ignore
				setBasePrice(room?.room_rates[key]!);
			} else {
				//@ts-ignore
				packages.push(room?.room_rates[key]);
			}
			setPackagePrices([...packages]);
		}
	}, [room]);
	return (
		<div
			onClick={(e) => {
				e.stopPropagation();
				setRoomDetails({ ...room });
				setOpenModal(true);
			}}
			className="border border-gray-400 my-5 mx-auto w-11/12 cursor-pointer"
		>
			<img
				src={src}
				onError={() => setSrc('https://i.imgur.com/bDujVXa.jpg')}
				className="w-full"
			/>
			<div className="mt-2 py-2 px-2">
				<h2 className="text-xl my-4 font-semibold text-primary-dark text-center capitalize">
					{room?.title[locale]}
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
						Book from {basePrice?.base_price} EGP
					</button>
				)}
			</div>
		</div>
	);
};

export default RoomCard;
