import React from 'react';
import { useSpeech } from './../../hooks/useSpeech';
import useTranslation from './../../hooks/useTranslation';

const GalleryCategory = ({
	setGalleryDetails,
	setOpenModal,
	cat,
	styles,
}: {
	setGalleryDetails: (detail: any) => void;
	setOpenModal: (val: boolean) => void;
	cat: any;
	styles: any;
}) => {
	const { speechHandler } = useSpeech();
	const { t, locale } = useTranslation();
	return (
		<figure
			onClick={() => {
				setGalleryDetails(cat);
				setOpenModal(true);
			}}
			key={cat.id}
			className={styles.categoryContainer}
		>
			<img src={cat.media.images[0].url} alt={cat.title[locale]} />
			<figcaption>
				<h2 onMouseEnter={() => speechHandler(cat.title[locale])}>
					{cat.title[locale]}
				</h2>
				{cat.description && (
					<p onMouseEnter={() => speechHandler(cat.description[locale])}>
						{cat.description[locale]}
					</p>
				)}
			</figcaption>
		</figure>
	);
};

export default GalleryCategory;
