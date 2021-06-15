import React, { useContext } from 'react';
import { AppContext } from './../../context/AppContext';
//@ts-ignore
import { Slide } from 'react-slideshow-image';

const RoomDetails = ({
	modalDetails,
	purpose = 'view',
	pickRoomHandler,
}: {
	modalDetails: any;
	purpose?: string;
	pickRoomHandler: (room: any) => void;
}) => {
	const { isMobile } = useContext(AppContext);

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-start mx-1 my-1">
			<div className="mx-2">
				<Slide
					easing="ease-in"
					transitionDuration={500}
					arrows={isMobile ? false : true}
					autoplay={false}
				>
					{modalDetails?.images.map((img: any, i: number) => (
						<img src={img} key={i} className="w-full h-full" />
					))}
				</Slide>
			</div>
			<div className="mx-2 px-3 py-2 ">
				<p>{modalDetails?.description}</p>
				{purpose === 'view' ? (
					<button className="btn-primary-light my-3 py-5 w-2/4 text-xl font-semibold">
						Check Rates
					</button>
				) : (
					<button
						onClick={(e) => {
							e.stopPropagation();
							pickRoomHandler(modalDetails);
						}}
						className="btn-primary-light my-3 py-5 w-2/4 text-xl font-semibold"
					>
						Book from {modalDetails?.price} EGP
					</button>
				)}
				<hr />
				<div className="my-3 px-2">
					<h5 className="text-black text-xl font-medium">Room Highlights</h5>
					<ul className="my-2 list-disc mx-5">
						{modalDetails?.highlights.map((highlight: string, i: number) => (
							<li key={i}>{highlight}</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default RoomDetails;
