import { useRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import { useSpeech } from './../../../hooks/useSpeech';
import useTranslation from './../../../hooks/useTranslation';
import styles from '../booking.module.scss';
const RoomTypesFilter = ({
	setSelectedRoomType,
	selectedRoomType,
}: {
	setSelectedRoomType: (type: string) => void;
	selectedRoomType: string;
}) => {
	const { speechHandler } = useSpeech();
	const { t, locale } = useTranslation();
	const [showRoomTypes, setShowRoomTypes] = useState(false);
	const roomTypeRef = useRef<HTMLDivElement>(null);
	const handleClick = (e: any) => {
		if (roomTypeRef?.current?.contains(e.target)) {
			return;
		}
		setShowRoomTypes(false);
	};
	useEffect(() => {
		document.addEventListener('mousedown', handleClick);
		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, []);
	return (
		<div className="mx-2 relative">
			<button
				onMouseEnter={() => speechHandler(t('roomFilters'))}
				onClick={() => setShowRoomTypes(true)}
				className="btn-outline-primary-dark text-base md:text-base"
				type="button"
			>
				{t('roomFilters')}
			</button>
			<div
				className={
					showRoomTypes
						? clsx(
								styles.datePickerContainer,
								// styles.roomDetailsContainer,
								'bg-white px-4 py-2 border-gray-200 shadow-xl border-2'
						  )
						: 'hidden'
				}
				ref={roomTypeRef}
			>
				<div className="grid grid-cols-3 gap-1 items-center my-2 mx-1">
					<h5
						onMouseEnter={() => speechHandler(t('all'))}
						onClick={() => setSelectedRoomType('all')}
						className={clsx(
							selectedRoomType === 'all' ? styles.selectedRoom : ' ',
							' capitalize p-5 text-center text-primary-light text-sm md:text-base font-medium cursor-pointer border border-gray-300'
						)}
					>
						{t('all')}
					</h5>
					<h5
						onMouseEnter={() => speechHandler(`1 ${t('bed')}`)}
						onClick={() => setSelectedRoomType('1bed')}
						className={clsx(
							selectedRoomType === '1bed' ? styles.selectedRoom : ' ',
							' capitalize p-5 text-center text-primary-light text-sm md:text-base font-medium cursor-pointer border border-gray-300'
						)}
					>
						1 {t('bed')}
					</h5>
					<h5
						onMouseEnter={() => speechHandler(`2 ${t('beds')}`)}
						onClick={() => setSelectedRoomType('2beds')}
						className={clsx(
							selectedRoomType === '2beds' ? styles.selectedRoom : ' ',
							' capitalize p-5 text-center text-primary-light text-sm md:text-base font-medium cursor-pointer border border-gray-300'
						)}
					>
						2 {t('bed')}
					</h5>
					<h5
						onMouseEnter={() => speechHandler(t('suite'))}
						onClick={() => setSelectedRoomType('suite')}
						className={clsx(
							selectedRoomType === 'suite' ? styles.selectedRoom : ' ',
							' capitalize p-5 text-center text-primary-light text-sm md:text-base font-medium cursor-pointer border border-gray-300'
						)}
					>
						{t('suite')}
					</h5>
				</div>
				<div className="flex justify-end items-center my-t mb-0 mr-2">
					<button
						onMouseEnter={() => speechHandler(t('close'))}
						type="button"
						onClick={() => setShowRoomTypes(false)}
						className="bg-transparent text-gray-dark text-lg font-medium cursor-pointer"
					>
						{t('close')}
					</button>
				</div>
			</div>
		</div>
	);
};

export default RoomTypesFilter;
