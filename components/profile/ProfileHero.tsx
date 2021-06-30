import React from 'react';

const ProfileHero = () => {
	return (
		<section className="bg-gray-light py-10 w-100 flex justify-items-center md:justify-evenly flex-wrap items-center">
			<div>
				<h3
					className="text-primary-dark text-3xl font-bold"
					style={{ filter: 'drop-shadow(0px 4px 4px rgba(0,0,0, 0.25))' }}
				>
					My Account
				</h3>
				<h5 className="text-lg text-black text-opacity-50 capitalize py-2 my-2">
					Settings
				</h5>
			</div>
			<div>
				<h4 className="flex justify-center items-center my-8">
					<img
						className="mr-2"
						src="/images/icons/envelope.svg"
						style={{ filter: 'sepia(1)' }}
					/>
					<span className="text-xl font-medium capitalize">Contact us</span>
				</h4>
				<h4 className="flex justify-center items-center my-8">
					<img
						className="mr-2"
						src="/images/icons/faq.svg"
						style={{ filter: 'sepia(1)' }}
					/>
					<span className="text-xl font-medium capitalize">help center</span>
				</h4>
			</div>
		</section>
	);
};

export default ProfileHero;
