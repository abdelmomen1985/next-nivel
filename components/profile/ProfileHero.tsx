import React from 'react';
import { useSpeech } from './../../hooks/useSpeech';
import useTranslation from './../../hooks/useTranslation';

const ProfileHero = () => {
	const { speechHandler } = useSpeech();
	const { t, locale } = useTranslation();
	return (
		<section className="bg-gray-light py-10 w-100 flex justify-items-center md:justify-evenly flex-wrap items-center">
			<div>
				<h3
					onMouseEnter={() => speechHandler(t('myAccount'))}
					className="text-primary-dark text-3xl font-bold"
					style={{ filter: 'drop-shadow(0px 4px 4px rgba(0,0,0, 0.25))' }}
				>
					{t('myAccount')}
				</h3>
				<h5
					onMouseEnter={() => speechHandler(t('settings'))}
					className="text-lg text-black text-opacity-50 capitalize py-2 my-2"
				>
					{t('settings')}
				</h5>
			</div>
			<div>
				<h4
					onMouseEnter={() => speechHandler(t('contactUs'))}
					className="flex justify-center items-center my-8"
				>
					<img
						className="mr-2"
						src="/images/icons/envelope.svg"
						style={{ filter: 'sepia(1)' }}
					/>
					<span className="text-xl font-medium capitalize">
						{t('contactUs')}
					</span>
				</h4>
				<h4
					onMouseEnter={() => speechHandler(t('helpCenter'))}
					className="flex justify-center items-center my-8"
				>
					<img
						className="mr-2"
						src="/images/icons/faq.svg"
						style={{ filter: 'sepia(1)' }}
					/>
					<span className="text-xl font-medium capitalize">
						{t('helpCenter')}
					</span>
				</h4>
			</div>
		</section>
	);
};

export default ProfileHero;
