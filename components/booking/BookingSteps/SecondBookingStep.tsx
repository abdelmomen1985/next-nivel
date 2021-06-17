import React from 'react';
import ChildAlert from '../ChildAlert';
import useTranslation from '../../../hooks/useTranslation';

const SecondBookingStep = ({
	selectedRoom,
	filterValues,
	pickPackageHandler,
}: {
	selectedRoom: any;
	filterValues: any;
	pickPackageHandler: (pack: any) => void;
}) => {
	const { t, locale } = useTranslation();
	return (
		<section className="w-full mx-12">
			<ChildAlert />
			<div className="py-5 flex justify-between items-center mx-5 my-5 border border-gray-200 border-l-0 border-r-0 px-5">
				<h3 className="text-2xl text-black font-normal">Best Available Rate</h3>
				<div>
					<h2 className="text-black text-center text-xl font-bold">
						{selectedRoom?.basePrice?.base_price} {t('egp')}
					</h2>
					<button
						onClick={() => pickPackageHandler(selectedRoom?.basePrice)}
						className="my-4 bg-outline-primary-light text-primary-light text-lg font-medium px-10 py-2 rounded-lg"
					>
						Book
					</button>
				</div>
			</div>
			<div className="w-full my-8">
				<div className="flex justify-start items-baseline mt-2 my-5 mx-5 px-5">
					<h3 className="mx-1 text-xl font-medium">Make it a package deal</h3>
					<hr className="w-2/3" />
				</div>
				{selectedRoom?.packagePrices.map((pack: any, index: number) => (
					<div
						key={index}
						className="py-5 flex justify-between items-center mx-5 my-5 border border-gray-200 border-t-0 border-l-0 border-r-0 px-5"
					>
						<h3 className="text-2xl text-black font-normal">
							{pack?.rate?.title[locale]}
						</h3>
						<div>
							<h2 className="text-black text-center text-xl font-bold">
								{pack.base_price} {t('egp')}
							</h2>
							<button
								onClick={() => pickPackageHandler(pack)}
								className="my-4 bg-outline-primary-light text-primary-light text-lg font-medium px-10 py-2 rounded-lg"
							>
								Book
							</button>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default SecondBookingStep;
