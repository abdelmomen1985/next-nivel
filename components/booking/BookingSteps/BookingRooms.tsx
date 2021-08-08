import { useEffect, useState } from 'react';
import useTranslation from './../../../hooks/useTranslation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import styles from '../booking.module.scss';
import { useSpeech } from './../../../hooks/useSpeech';

const BookingRooms = ({
	rooms,
	currentRoom,
	selectedPackages,
	changeRoom,
	moveToPay,
	isPayable,
	currentStep,
}: {
	rooms: any;
	currentRoom: number;
	selectedPackages: any;
	changeRoom: (roomNum: number) => void;
	moveToPay: () => void;
	isPayable: boolean;
	currentStep: number;
}) => {
	const { t, locale } = useTranslation();
	const [totalPrice, setTotalPrice] = useState<number>(0);
	const { speechHandler } = useSpeech();
	useEffect(() => {
		let total = selectedPackages.reduce(
			(prev: any, next: any) => prev + next.base_price,
			0
		);
		setTotalPrice(total);
	}, [selectedPackages]);
	return (
		<div className="bg-white border border-black rounded-md shadow-sm">
			<div className="py-3 mx-auto w-full md:w-10/12 border-0 border-b border-black">
				<h3
					onMouseEnter={() => speechHandler(`Reservation summary`)}
					className="text-base font-semibold"
				>
					Reservation summary
				</h3>
			</div>
			{rooms &&
				rooms.length > 0 &&
				rooms.map((room: any, i: number) => (
					<div
						key={i}
						className={clsx(
							currentRoom === i && currentStep !== 3
								? ' bg-primary-light text-white '
								: ' ',
							'px-2 py-3 mx-auto w-full md:w-10/12 border-0 border-b border-black my-5'
						)}
					>
						<div className="flex justify-between items-center my-2">
							<h3
								onMouseEnter={() => speechHandler(`${t('room')} ${i + 1}`)}
								className="text-lg font-medium capitalize"
							>
								{t('room')} {i + 1}
							</h3>
							<h5
								onMouseEnter={() =>
									speechHandler(`${
										selectedPackages.length > 0 &&
										selectedPackages[i]?.base_price
											? selectedPackages[i]?.base_price
											: 0
									} 
								${t('sar')}`)
								}
								className="text-base font-normal"
							>
								{selectedPackages.length > 0 && selectedPackages[i]?.base_price
									? selectedPackages[i]?.base_price
									: 0}{' '}
								{t('sar')}
							</h5>
						</div>
						{room?.name && (
							<>
								<h5
									onMouseEnter={() => speechHandler(room?.name[locale])}
									className="text-base font-normal my-1"
								>
									{room?.name[locale]}
								</h5>
								<button
									onMouseEnter={() => speechHandler(`Change room`)}
									onClick={() => changeRoom(i)}
									className="bg-transparent underline text-primary-dark font-normal text-lg my-1"
								>
									Change room
								</button>
							</>
						)}
						<div className="flex justify-start items-center my-2">
							<FontAwesomeIcon icon={faUserFriends} className="mx-2 w-4 h-4" />
							<h6
								onMouseEnter={() =>
									speechHandler(
										`${room?.adultsCount} ${
											room?.adultsCount > 1 ? 'adults' : 'adult'
										}`
									)
								}
								className="mx-1"
							>
								{room?.adultsCount} {room?.adultsCount > 1 ? 'adults' : 'adult'}
							</h6>
							{room?.childCount > 0 && (
								<h6
									onMouseEnter={() =>
										speechHandler(`
								${room?.childCount}
									${room?.childCount > 1 ? 'children' : 'child'}
								`)
									}
									className="mx-1"
								>
									{room?.childCount}{' '}
									{room?.childCount > 1 ? 'children' : 'child'}
								</h6>
							)}
						</div>
					</div>
				))}
			<div className="px-2 py-3 mx-auto w-full md:w-10/12 border-0 border-b border-black my-5">
				<div className="flex justify-between items-start my-2">
					<h5
						onMouseEnter={() => speechHandler(`Total room charges`)}
						className="text-base font-normal"
					>
						Total room charges
					</h5>
					<h5
						onMouseEnter={() => speechHandler(`${totalPrice} ${t('sar')}`)}
						className="text-base font-normal"
					>
						{totalPrice} {t('sar')}
					</h5>
				</div>
				<div className="flex justify-between items-start my-2">
					<h5
						onMouseEnter={() => speechHandler(`Total taxes`)}
						className="text-base font-normal"
					>
						Total taxes
					</h5>
					<h5
						onMouseEnter={() => speechHandler(`126 ${t('sar')}`)}
						className="text-base font-normal"
					>
						126 {t('sar')}
					</h5>
				</div>
			</div>
			<div className="px-2 py-3 mx-auto w-full md:w-10/12 border-0 border-b flex justify-between items-start border-black my-5">
				<h5
					onMouseEnter={() => speechHandler(`Total for stay:`)}
					className="text-lg font-medium"
				>
					Total for stay:
				</h5>
				<h5
					onMouseEnter={() => speechHandler(`${totalPrice + 126} ${t('sar')}`)}
					className="text-lg font-medium"
				>
					{totalPrice + 126} {t('sar')}
				</h5>
			</div>
			<button
				onMouseEnter={() => speechHandler('Continue To Payment')}
				disabled={!isPayable || currentStep === 3}
				className={styles.paymentBtn}
				onClick={() => moveToPay()}
			>
				Continue To Payment
			</button>
		</div>
	);
};

export default BookingRooms;
