import React, { useEffect, useState } from 'react';
import useTranslation from '../../hooks/useTranslation';
import Steps, { Step } from 'rc-steps';

const BookingStay = ({
	filterValues,
	editStayHandler,
	currentStep,
	selectedRoom,
	setCurrentStep,
	remoteUrl,
}: {
	filterValues: any;
	editStayHandler: () => void;
	currentStep: number;
	selectedRoom: any;
	setCurrentStep: (step: number) => void;
	remoteUrl: string;
}) => {
	const { t, locale } = useTranslation();
	const [childCount, setChildCount] = useState(0);
	const [adultCount, setAdultCount] = useState(0);
	const [nightsCount, setNightsCount] = useState(0);
	const [currentLocale, setCurrentLocale] = useState(
		locale === 'en' ? 'en-GB' : 'ar-EG'
	);
	useEffect(() => {
		setAdultCount(
			filterValues?.roomDetails.reduce(
				(accumulator: any, current: any) => accumulator + current.adultsCount,
				0
			)
		);
		setChildCount(
			filterValues?.roomDetails.reduce(
				(accumulator: any, current: any) => accumulator + current.childCount,
				0
			)
		);
		setNightsCount(
			(filterValues?.currentDateRange?.endDate?.getTime() -
				filterValues?.currentDateRange?.startDate?.getTime()) /
				(1000 * 3600 * 24)
		);
	}, [filterValues]);
	useEffect(() => {
		locale === 'en' ? setCurrentLocale('en-GB') : setCurrentLocale('ar-EG');
	}, [locale]);
	return (
		<div className="mx-auto my-3">
			{selectedRoom && (
				<img
					src={remoteUrl + selectedRoom?.images[0]?.url}
					style={{
						width: '300px',
						height: '250px',
						margin: '10px auto',
					}}
				/>
			)}
			<div className="my-3">
				<img
					style={{
						width: '290px',
						height: '80px',
						margin: '10px auto',
					}}
					src="/images/logo.png"
					className="w-full md:w-auto"
				/>
				{filterValues && (
					<>
						<h3>
							{filterValues?.currentDateRange?.startDate?.toLocaleDateString(
								currentLocale,
								{
									day: 'numeric',
									month: 'short',
								}
							)}{' '}
							-{' '}
							{filterValues?.currentDateRange?.endDate?.toLocaleDateString(
								currentLocale,
								{
									day: 'numeric',
									month: 'short',
									year: 'numeric',
								}
							)}{' '}
							({nightsCount === 0 && t('dayOnly')}
							{nightsCount === 1 && `${nightsCount} ${t('night')}`}
							{nightsCount > 1 && `${nightsCount} ${t('nights')}`})
						</h3>
						<h5>
							<span>
								{filterValues?.roomCount} {t('rooms')}
							</span>
							{adultCount > 0 && (
								<span>
									{t('comma')} {adultCount} {t('adults')}
								</span>
							)}

							{childCount > 0 && (
								<span>
									{t('comma')} {childCount} {t('kids')}
								</span>
							)}
						</h5>
					</>
				)}
				<button
					onClick={editStayHandler}
					className="btn-transparent text-lg underline my-1 text-primary-dark cursor-pointer"
				>
					{t('editStay')}
				</button>
				{currentStep > 1 && filterValues?.roomDetails.length === 1 && (
					<Steps direction="vertical" size="default" current={currentStep - 1}>
						<Step
							title={selectedRoom.name[locale]}
							description={t('changeRoom')}
							onClick={() => setCurrentStep(1)}
							className="cursor-pointer"
						/>
						<Step title={t('selectRate')} description=" " />
						<Step title={t('paymentGuestDetails')} description=" " />
					</Steps>
				)}
			</div>
		</div>
	);
};

export default BookingStay;
