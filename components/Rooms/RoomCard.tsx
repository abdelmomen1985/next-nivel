import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import useTranslation from './../../hooks/useTranslation';
import styles from './roomCard.module.scss';
const RoomCard = ({
	room,
	selectRoom,
	purpose = 'view',
	pickRoomHandler,
	remoteUrl,
}: {
	room: any;
	selectRoom: (room: any) => void;
	// setOpenModal: (openModal: boolean) => void;
	purpose?: string;
	pickRoomHandler?: (room: any) => void;
	remoteUrl: string;
}) => {
	const { t, locale } = useTranslation();
	const [src, setSrc] = useState<any>();
	// const [basePrice, setBasePrice] = useState<any>(undefined);
	// const [packagePrices, setPackagePrices] = useState<any>(undefined);

	useEffect(() => {
		// let packages = [];
		if (room?.RelWithStrapiRoom?.images) {
			// console.log(remoteUrl + room?.RelWithStrapiRoom?.images[0]?.url);
			setSrc(remoteUrl + room?.RelWithStrapiRoom?.images[0]?.url);
		} else {
			// console.log(room);
			setSrc('https://i.imgur.com/bDujVXa.jpg');
		}

		// for (let key in room.room_rates) {
		// 	//@ts-ignore
		// 	if (room?.room_rates[key]?.rate.title.en === 'Base Package') {
		// 		//@ts-ignore
		// 		setBasePrice(room?.room_rates[key]!);
		// 	} else {
		// 		//@ts-ignore
		// 		packages.push(room?.room_rates[key]);
		// 	}
		// 	setPackagePrices([...packages]);
		// }
	}, [room]);
	return (
		<div
			onClick={(e) => {
				e.stopPropagation();
				selectRoom({ ...room });
			}}
			className={clsx(
				styles.roomCard,
				'border border-gray-400 my-3 md:my-5 mx-auto w-11/12 cursor-pointer pb-6 md:pb-0'
			)}
		>
			<img
				src={src}
				onError={() => setSrc('https://i.imgur.com/bDujVXa.jpg')}
				className="w-full h-2/3"
			/>
			<div className="mt-1 py-2 px-2">
				<h2 className="text-xl my-4 font-semibold text-primary-dark text-center capitalize">
					{room?.RelWithStrapiRoom?.name[locale]}
				</h2>
				{purpose === 'view' ? (
					<button className="btn-primary-light text-white py-3 text-base md:text-xl font-semibold  px-5 w-11/12 mx-auto block">
						{t('roomDetails')}
					</button>
				) : (
					<button
						onClick={(e) => {
							e.stopPropagation();
							pickRoomHandler(room);
						}}
						className="my-2 btn-primary-light text-white py-3 text-base md:text-xl font-semibold  px-5 w-11/12 mx-auto block"
					>
						{t('bookFrom')} {room?.base_price} {t('sar')}
					</button>
				)}
			</div>
		</div>
	);
};

export default RoomCard;
