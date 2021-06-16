import React from 'react';
import useTranslation from './../../hooks/useTranslation';

const amenities = [
	{
		image: '/images/icons/outline/room-service.svg',
		title: {
			ar: 'خدمة الغرف',
			en: 'Room Service',
		},
	},
	{
		image: '/images/icons/outline/gym.svg',
		title: {
			ar: 'مركز لياقة بدنية',
			en: 'Fitness center',
		},
	},
	{
		image: '/images/icons/outline/swimming-pool.svg',
		title: {
			ar: 'حمام سباحة',
			en: 'swimming pool',
		},
	},
	{
		image: '/images/icons/outline/restaurant.svg',
		title: {
			ar: 'مطعم بالفندق',
			en: 'On-site restaurant',
		},
	},
	{
		image: '/images/icons/outline/Group.svg',
		title: {
			ar: 'قاعة مؤتمرات',
			en: 'conference room',
		},
	},
	{
		image: '/images/icons/outline/food-cart.svg',
		title: {
			ar: 'خدمات الاستقبال والإرشاد',
			en: 'Concierge',
		},
	},
	{
		image: '/images/icons/outline/meeting.svg',
		title: {
			ar: 'مركز أعمال',
			en: 'Business center',
		},
	},
];
const AmenitiesSection = () => {
	const { t, locale } = useTranslation();

	return (
		<section className="mt-10 mb-5  w-full">
			<h3 className="text-center text-2xl text-black font-semibold mb-5">
				{t('ourAmenities')}
			</h3>
			<div className="grid grid-cols-5 gap-3 items-center">
				{amenities.map((amenity, i) => (
					<div
						key={i}
						className="mx-2 my-2 rounded-md w-11/12 h-full border py-4 px-5 border-gray-400"
					>
						<img src={amenity?.image} className="w-16 my-4 mx-auto" />
						<h5 className="text-primary-light text-center mx-auto mt-2 mb-4 text-lg font-medium capitalize">
							{amenity.title[locale]}
						</h5>
					</div>
				))}
			</div>
		</section>
	);
};

export default AmenitiesSection;
