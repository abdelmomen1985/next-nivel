import React from 'react';
import useTranslation from './../../hooks/useTranslation';
import Link from 'next/link';
const RoomsNdSuits = () => {
	const roomsNdSuits = [
		{
			img: '/images/rooms/1.png',
			title: {
				ar: 'غرفة ضيوف',
				en: 'Guest Room',
			},
		},
		{
			img: '/images/rooms/2.png',
			title: {
				ar: 'جناح',
				en: 'Suites',
			},
		},
		{
			img: '/images/rooms/3.png',
			title: {
				ar: 'غرف سهل الوصول لها',
				en: 'Accessible',
			},
		},
	];
	const { t, locale } = useTranslation();
	return (
		<section className="bg-gray-light px-10 py-10 my-4">
			<h3 className="my-3 text-center text-primary-dark text-xl font-bold">
				{t('roomsNdSuites')}
			</h3>
			<div className="grid grid-cols-3 gap-2 items-center">
				{roomsNdSuits.map((room, i) => (
					<div
						className="relative"
						key={i}
						style={{
							backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.1) 60%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0.8) 100%), url(${room.img})`,
							backgroundPosition: 'center',
							backgroundSize: 'cover',
							width: '90%',
							height: '300px',
						}}
					>
						<h3
							style={{
								position: 'absolute',
								bottom: '2rem',
								left: 0,
								right: 0,
								margin: '0 auto',
								textAlign: 'center',
								color: '#fff',
								fontSize: '1.4rem',
								fontWeight: 600,
							}}
						>
							{room.title[locale]}
						</h3>
					</div>
				))}
			</div>
			<Link href={`/${locale}/rooms`}>
				<a className="btn-primary-light text-white text-lg w-10/12 md:w-1/5 text-center font-semibold capitalize mx-auto my-5 block">
					{t('viewRooms')}
				</a>
			</Link>
		</section>
	);
};

export default RoomsNdSuits;
