import React, { useEffect, useState } from 'react';

const BookingStay = ({
	filterValues,
	editStayHandler,
	currentStep,
}: {
	filterValues: any;
	editStayHandler: () => void;
	currentStep: number;
}) => {
	const [childCount, setChildCount] = useState(0);
	const [adultCount, setAdultCount] = useState(0);
	const [nightsCount, setNightsCount] = useState(0);
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
	return (
		<div className="mx-auto">
			<img
				src="/images/hero-slider/1.png"
				style={{
					width: '300px',
					height: '250px',
					margin: '10px auto',
				}}
			/>
			<div className="my-3">
				<img
					style={{
						width: '290px',
						height: '80px',
						margin: '10px auto',
					}}
					src="/images/logo.png"
				/>
				{filterValues && (
					<>
						<h3>
							{filterValues?.currentDateRange?.startDate?.toLocaleDateString(
								'en-GB',
								{
									day: 'numeric',
									month: 'short',
								}
							)}{' '}
							-{' '}
							{filterValues?.currentDateRange?.endDate?.toLocaleDateString(
								'en-GB',
								{
									day: 'numeric',
									month: 'short',
									year: 'numeric',
								}
							)}{' '}
							{nightsCount === 0 && 'Day only'}
							{nightsCount === 1 && `${nightsCount} night `}
							{nightsCount > 1 && `${nightsCount} nights`}
						</h3>
						<h5>
							<span>{filterValues?.roomCount} Rooms</span>
							{adultCount > 0 && <span>, {adultCount} Adult</span>}

							{childCount > 0 && <span>, {childCount} Children</span>}
						</h5>
					</>
				)}
				<button
					onClick={editStayHandler}
					className="btn-transparent text-lg underline my-1 text-primary-dark cursor-pointer"
				>
					Edit Stay
				</button>
			</div>
		</div>
	);
};

export default BookingStay;
