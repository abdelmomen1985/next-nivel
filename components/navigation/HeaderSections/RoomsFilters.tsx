import { useState, useEffect, Fragment } from 'react';
import styles from '../navigation.module.scss';
import useTranslation from './../../../hooks/useTranslation';
import { useSpeech } from './../../../hooks/useSpeech';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';

const singleRoom = {
	// id: uuidv4(),
	adultsCount: 1,
	childCount: 0,
	childrenAges: [],
};

const ChildAgeInput = ({ ageIndex, room, changeChildAgeHandler }: any) => (
	<input
		type="text"
		className="border rounded-sm shadow-none mx-1"
		value={room?.childrenAges[ageIndex] ? room?.childrenAges[ageIndex] : ''}
		onChange={(e) => changeChildAgeHandler(e.target.value, room.id, ageIndex)}
	/>
);
const RoomsFilters = ({
	roomCount,
	totalGuestCount,
	setShowRooms,
	showRooms,
	datePickerRef,
	roomDetails,
	setRoomDetails,
}: any) => {
	const { t, locale } = useTranslation();
	const { speechHandler } = useSpeech();

	const SingleRoomFilter = ({ room, i }: any) => (
		<Fragment>
			<div className="grid grid-cols-3 gap-2 items-center my-4">
				<div className="flex justify-start items-center">
					{roomDetails.length > 1 && (
						<button
							type="button"
							onClick={() => removeRoomHandler(i)}
							className="w-8 h-8 rounded-full border border-gray-400 text-2xl mx-2"
						>
							&times;
						</button>
					)}{' '}
					<h3
						onMouseEnter={() => speechHandler(`${t('room')} ${i + 1}`)}
						className="text-center text-lg font-medium mx-2"
					>
						{t('room')} {i + 1}
					</h3>
				</div>
				<div className="flex justify-between items-center mx-3">
					<button
						type="button"
						disabled={room.adultsCount === 1}
						onClick={() => decrementGuestsHandler('adult', i)}
						className="w-8 h-8 rounded-full border border-gray-400 text-lg mx-1"
					>
						&minus;
					</button>
					<h5
						onMouseEnter={() => speechHandler(room.adultsCount)}
						className="text-center text-lg font-medium mx-1"
					>
						{room.adultsCount}
					</h5>
					<button
						type="button"
						disabled={room.adultsCount + room.childCount === 5}
						onClick={() => incrementGuestsHandler('adult', i)}
						className="w-8 h-8 rounded-full border border-gray-400 text-lg mx-1"
					>
						&#43;
					</button>
				</div>
				<div className="flex justify-between items-center mx-3">
					<button
						type="button"
						disabled={room.childCount === 0}
						onClick={() => decrementGuestsHandler('kid', i)}
						className="w-8 h-8 rounded-full border border-gray-400 text-lg mx-1"
					>
						&minus;
					</button>
					<h5 className="text-center text-lg font-medium mx-1">
						{room.childCount}
					</h5>
					<button
						type="button"
						disabled={room.adultsCount + room.childCount === 5}
						onClick={() => incrementGuestsHandler('kid', i)}
						className="w-8 h-8 rounded-full border border-gray-400 text-lg mx-1"
					>
						&#43;
					</button>
				</div>
			</div>
			{room.childCount > 0 && (
				<div className="grid grid-cols-4 gap-4 items-center my-2 border-b pb-3 flex-wrap">
					{Array(room.childCount)
						.fill(null)
						.map((child: any, ageIndex: number) => (
							<ChildAgeInput
								key={uuidv4()}
								room={room}
								ageIndex={ageIndex}
								changeChildAgeHandler={changeChildAgeHandler}
							/>
						))}
				</div>
			)}
		</Fragment>
	);
	const removeRoomHandler = (roomIndex: number) => {
		setRoomDetails((prev: any[]) =>
			prev.filter((_room: any, index: number) => index !== roomIndex)
		);
	};
	const incrementGuestsHandler = (type: string, roomIndex: number) => {
		let roomDets = [...roomDetails];
		let newRoomDetails = roomDets.map((room, index) => {
			if (index === roomIndex) {
				switch (type) {
					case 'kid':
						return { ...room, childCount: room.childCount + 1 };
					case 'adult':
						return { ...room, adultsCount: room.adultsCount + 1 };
					default:
						return room;
				}
			} else {
				return room;
			}
		});
		setRoomDetails(newRoomDetails);
	};
	const decrementGuestsHandler = (type: string, roomIndex: number) => {
		let roomDets = [...roomDetails];
		let newRoomDetails = roomDets.map((room, index) => {
			if (index === roomIndex) {
				switch (type) {
					case 'kid':
						return { ...room, childCount: room.childCount - 1 };
					case 'adult':
						return { ...room, adultsCount: room.adultsCount - 1 };
					default:
						return room;
				}
			} else {
				return room;
			}
		});
		setRoomDetails(newRoomDetails);
	};
	const changeChildAgeHandler = (
		age: number | string,
		roomId: string,
		ageIndex: number
	) => {
		console.log('age', age, roomId, ageIndex);
		let roomDets = [...roomDetails];
		// roomDets[roomIndex].childrenAges[ageIndex] = age;
		let newRoomDetails = roomDetails.map((room: any) => {
			if (room.id === roomId) {
				room.childrenAges[ageIndex] = age;
			}
			return { ...room };
		});
		console.log(newRoomDetails);
		setRoomDetails([...newRoomDetails]);
	};
	return (
		<div className="mx-2 relative">
			<button
				onMouseEnter={() =>
					speechHandler(
						`${roomCount} ${t('rooms')}, ${totalGuestCount} ${t('guests')}`
					)
				}
				onClick={() => setShowRooms(true)}
				className="btn-outline-primary-dark text-xs md:text-base my-4 md:my-0"
				type="button"
			>
				{roomCount} {t('rooms')}, {totalGuestCount} {t('guests')}
			</button>
			{showRooms && (
				<div
					className={clsx(
						styles.datePickerContainer,
						styles.roomDetailsContainer,
						'shadow-xl border-2'
					)}
					ref={datePickerRef}
				>
					<div className="grid grid-cols-3 gap-2 items-center my-3">
						<h5
							onMouseEnter={() => speechHandler(t('rooms'))}
							className="text-lg font-medium"
						>
							{t('rooms')}
						</h5>
						<h5
							onMouseEnter={() => speechHandler(t('adults'))}
							className="text-center text-lg font-medium"
						>
							{t('adults')}
						</h5>
						<h5
							onMouseEnter={() => speechHandler(t('kids'))}
							className="text-center text-lg font-medium"
						>
							{t('kids')}
						</h5>
					</div>
					{roomDetails.map((room: any, i: number) => (
						<SingleRoomFilter key={room.id} room={room} i={i} />
					))}
					<button
						onMouseEnter={() => speechHandler(t('addRoom'))}
						type="button"
						onClick={() =>
							setRoomDetails((prev: any[]) => [
								...prev,
								{ ...singleRoom, id: uuidv4() },
							])
						}
						className="flex justify-start items-center my-4 border-none bg-transparent"
					>
						<i className="w-8 h-8 rounded-full border border-gray-400 text-2xl mx-2">
							&#43;
						</i>
						<h3 className="text-center text-lg font-normal">{t('addRoom')}</h3>
					</button>

					<div className="flex justify-end items-center my-t mb-0 mr-2">
						<button
							onMouseEnter={() => speechHandler(t('close'))}
							type="button"
							onClick={() => setShowRooms(false)}
							className="bg-transparent text-gray-dark text-lg font-medium cursor-pointer"
						>
							{t('close')}
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default RoomsFilters;
