import React from 'react';
import clsx from 'clsx';
import useTranslation from './../../hooks/useTranslation';

const StatsSection = () => {
	const { t, locale } = useTranslation();
	return (
		<section className="px-16 py-10 mt-0 mb-5 bg-gray-light">
			<div className="flex flex-wrap justify-between items-start mx-16">
				<div className="mx-auto">
					<h4 className="text-gray-dark text-lg uppercase font-medium u text-primary-dark">
						{t('reviews')}
					</h4>
					<p className="text-primary-dark">Based on 1,500 reviews</p>
					<h5>
						<span>4.5</span>
						<span className="mx-1">|</span>
						<span className="text-primary-dark">5 {t('reviews')}</span>
					</h5>
				</div>
				<div className="mx-auto">
					<h4 className="text-gray-dark text-lg uppercase font-medium">
						{t('callUs')}
					</h4>
					<h5 className="text-black text-lg mt-1">+966 12 556 7000</h5>
				</div>
				<div className="mx-auto">
					<h4 className="text-gray-dark text-lg uppercase font-medium">
						{t('address')}
					</h4>
					<p className="text-black text-lg mt-1 w-full md:w-1/2">
						Jabal Omar Ibrahim Al Khalil Makkah, 21955, Saudi Arabia
					</p>
				</div>
				<div className="mx-auto">
					<h4 className="text-gray-dark text-lg uppercase font-medium">
						{t('arrivalTime')}
					</h4>
					<div className="flex flex-wrap justify-center items-center mt-1">
						<div
							className={clsx(
								locale === 'en' ? 'border-r pr-4' : 'border-l pl-4',
								'border-gray-400  mx-1'
							)}
						>
							<h3 className="text-black text-lg font-medium">{t('checkIn')}</h3>
							<h5 className="text-gray-400 text-lg font-medium">4:00 PM</h5>
						</div>
						<div className="mx-1">
							<h3 className="text-black text-lg font-medium">
								{t('checkOut')}
							</h3>
							<h5 className="text-gray-400 text-lg font-medium">5:00 PM</h5>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default StatsSection;
