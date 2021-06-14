import React from 'react';
import useTranslation from './../../hooks/useTranslation';

const Dining = () => {
	const { t, locale } = useTranslation();
	return (
		<section className="my-8 w-full py-4 px-5 bg-white">
			<div className="my-4 text-center mx-auto">
				<h2 className="text-primary-dark text-xl my-2 font-semibold">
					{t('diningNdDrinks')}
				</h2>
				<p className="font-normal text-base text-black w-full md:w-2/4 mx-auto text-center">
					{t('diningDesc')}
				</p>
			</div>
			<div
				className={'my-5 w-full'}
				style={{
					backgroundImage: `linear-gradient(to bottom right, rgba(240, 100, 150, 0.2) 60%, rgba(140, 200, 208, 0.3) 40%), url(/images/restaurant.png)`,
					height: '500px',
					backgroundPosition: 'center',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
				}}
			></div>
			<button className="btn-primary-light text-white text-lg font-semibold capitalize mx-auto my-5 block">
				{t('viewDining')}
			</button>
		</section>
	);
};

export default Dining;
