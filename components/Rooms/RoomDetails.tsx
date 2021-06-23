import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './../../context/AppContext';
//@ts-ignore
import { Slide } from 'react-slideshow-image';
import { RoomType } from '../../types/rooms';
import useTranslation from './../../hooks/useTranslation';

const RoomDetails = ({
	roomDetails,
	purpose = 'view',
	pickRoomHandler,
}: {
	roomDetails: RoomType;
	purpose?: string;
	pickRoomHandler: (
		room: RoomType,
		packagePrices: any[],
		basePrice: any
	) => void;
}) => {
	const { t, locale } = useTranslation();
	const { isMobile } = useContext(AppContext);
	const [basePrice, setBasePrice] = useState<any>(undefined);
	const [packagePrices, setPackagePrices] = useState<any>(undefined);
	useEffect(() => {
		console.log('within', roomDetails);
		let packages = [];
		for (let key in roomDetails?.room_rates) {
			//@ts-ignore
			if (roomDetails?.room_rates[key]?.rate.title.en === 'Base Package') {
				//@ts-ignore
				setBasePrice(roomDetails?.room_rates[key]!);
			} else {
				//@ts-ignore
				packages.push(roomDetails?.room_rates[key]);
			}
			setPackagePrices([...packages]);
		}
	}, [roomDetails]);
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-start mx-1 my-1">
			<div className="mx-2">
				{roomDetails?.media?.room_images &&
				roomDetails?.media?.room_images?.length > 0 ? (
					<Slide
						easing="ease-in"
						transitionDuration={500}
						arrows={isMobile ? false : true}
						autoplay={false}
					>
						{roomDetails?.media.room_images.map((img: any, i: number) => (
							<img src={img?.url} key={i} className="w-full h-full" />
						))}
					</Slide>
				) : (
					<img src="https://i.imgur.com/bDujVXa.jpg" />
				)}
			</div>
			<div className="mx-2 px-3 py-2 ">
				<p>{roomDetails?.description}</p>
				{purpose === 'view' ? (
					<button className="btn-primary-light my-3 py-5 w-2/4 text-xl font-semibold">
						{t('checkRates')}
					</button>
				) : (
					<button
						onClick={(e) => {
							e.stopPropagation();
							pickRoomHandler(roomDetails, packagePrices, basePrice);
						}}
						className="btn-primary-light my-3 py-5 w-2/4 text-xl font-semibold"
					>
						{t('bookFrom')} {basePrice?.base_price} {t('sar')}
					</button>
				)}
				<hr />
				<div className="my-3 px-2">
					<h5 className="text-black text-xl font-medium">
						{t('roomHighlights')}
					</h5>
					{/* <ul className="my-2 list-disc mx-5">
						{roomDetails?.highlights.map((highlight: string, i: number) => (
							<li key={i}>{highlight}</li>
						))}
					</ul> */}
				</div>
			</div>
		</div>
	);
};

export default RoomDetails;
