import React, { useContext } from 'react';
import { useSpeech } from './../../hooks/useSpeech';
import useTranslation from './../../hooks/useTranslation';
//@ts-ignore
import { Slide } from 'react-slideshow-image';
import { AppContext } from './../../context/AppContext';

const GalleryDetails = ({ galleryDetails }: any) => {
	const { speechHandler } = useSpeech();
	const { t, locale } = useTranslation();
	const { isMobile } = useContext(AppContext);
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-5 my-1 items-center">
			<div className="">
				{galleryDetails?.media?.images &&
				galleryDetails?.media?.images?.length > 0 ? (
					<Slide
						easing="ease-in"
						transitionDuration={500}
						arrows={isMobile ? false : true}
						autoplay={false}
					>
						{galleryDetails?.media?.images.map((img: any, i: number) => (
							<img src={img?.url} key={i} className="w-full h-full" />
						))}
					</Slide>
				) : (
					<img src="https://i.imgur.com/bDujVXa.jpg" />
				)}
			</div>
			<div>
				<h3
					onMouseEnter={() => speechHandler(galleryDetails?.title[locale])}
					className="text-primary-dark text-lg font-medium my-2"
				>
					{galleryDetails?.title[locale]}
				</h3>
				<p
					onMouseEnter={() =>
						speechHandler(galleryDetails?.description[locale])
					}
					className="text-black text-base font-normal"
				>
					{galleryDetails?.description[locale]}
				</p>
			</div>
		</div>
	);
};

export default GalleryDetails;
