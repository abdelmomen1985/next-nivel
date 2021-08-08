import React from 'react';
import useTranslation from './../../../hooks/useTranslation';
import styles from '../booking.module.scss';
import clsx from 'clsx';
import { useSpeech } from './../../../hooks/useSpeech';
const RoomsSteps = ({
	rooms,
	currentRoom,
	changeRoom,
	moveToPay,
	isPayable,
	currentStep,
}: {
	rooms: any;
	currentRoom: number;
	changeRoom: (roomNum: number) => void;
	moveToPay: () => void;
	isPayable: boolean;
	currentStep: number;
}) => {
	const { t, locale } = useTranslation();
	const { speechHandler } = useSpeech();
	return (
		<>
			<div className="my-1 w-11/12 flex justify-between items-center mx-auto border-o border-t border-b border-black py-6 ">
				<h5 onMouseEnter={() => speechHandler('Update Your Room')}>
					Update Your Room
				</h5>
				<h5
					onMouseEnter={() =>
						speechHandler(
							`${t('room')} ${currentRoom + 1} ${t('of')} ${rooms?.length}`
						)
					}
				>
					{t('room')} {currentRoom + 1} {t('of')} {rooms?.length}
				</h5>
			</div>
			<div className="flex justify-start items-center my-2 flex-wrap">
				{rooms.map((room: any, i: number) => (
					<button
						className={clsx(
							styles.buttonStep,
							i === currentRoom && currentStep !== 3 ? styles.active : ' '
						)}
						key={i}
						disabled={i > currentRoom}
						onClick={() => changeRoom(i)}
						onMouseEnter={() => speechHandler(`${t('room')} ${i + 1}`)}
					>
						{t('room')} {i + 1}
					</button>
				))}
				<button
					className={clsx(
						styles.buttonStep,
						rooms.length - 1 === currentRoom ? styles.active : ' '
					)}
					disabled={!isPayable || currentStep === 3}
					onClick={() => moveToPay()}
					onMouseEnter={() => speechHandler('payment')}
				>
					payment
				</button>
			</div>
		</>
	);
};

export default RoomsSteps;
