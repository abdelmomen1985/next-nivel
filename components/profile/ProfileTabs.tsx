import React from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faUserCircle as farUserCircle,
	faCreditCard as farCreditCard,
} from '@fortawesome/free-regular-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import styles from './profile.module.scss';
const ProfileTabs = ({
	children,
	currentTap,
	setCurrentTap,
}: {
	children: React.ReactNode;
	currentTap: number;
	setCurrentTap: (arg: number) => void;
}) => {
	return (
		<section className="w-full">
			<div className="mt-16 mb-10 mx-auto w-4/5 bg-outline-primary-light">
				<div className="w-full bg-primary-light text-white flex justify-evenly items-center px-10 py-4">
					<button
						onClick={() => setCurrentTap(1)}
						className={clsx(
							currentTap === 1 ? 'text-opacity-100' : 'text-opacity-50',
							currentTap === 1 ? styles.activeTab : ' ',
							' text-center bg-transparent border-none outline-none focus:outline-none cursor-pointer text-white text-lg'
						)}
					>
						<FontAwesomeIcon
							icon={farUserCircle}
							className="block mx-auto my-1"
						/>
						<span className="capitalize">Account Settings</span>
					</button>
					<button
						onClick={() => setCurrentTap(2)}
						className={clsx(
							currentTap === 2 ? 'text-opacity-100' : 'text-opacity-50',
							currentTap === 2 ? styles.activeTab : ' ',
							' text-center bg-transparent border-none outline-none focus:outline-none cursor-pointer text-white text-lg'
						)}
					>
						<FontAwesomeIcon
							icon={farUserCircle}
							className="block mx-auto my-1"
						/>
						<span className="capitalize">User Bookings</span>
					</button>
					<button
						onClick={() => setCurrentTap(3)}
						className={clsx(
							currentTap === 3 ? 'text-opacity-100' : 'text-opacity-50',
							currentTap === 3 ? styles.activeTab : ' ',
							' text-center bg-transparent border-none outline-none focus:outline-none cursor-pointer text-white text-lg'
						)}
					>
						<img
							src="/images/icons/user-card.svg"
							className="block mx-auto my-1"
						/>
						<span className="capitalize">Personal Info</span>
					</button>
				</div>
				<div className="w-100 h-full" style={{ backgroundColor: '#FBFCFD' }}>
					<div className="mx-auto py-16">{children}</div>
				</div>
			</div>
		</section>
	);
};

export default ProfileTabs;
