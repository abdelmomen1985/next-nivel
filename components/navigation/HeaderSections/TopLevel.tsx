import React, { useContext, useState, useEffect, useRef } from 'react';
import ActiveLink from './../ActiveLink';
import styles from '../navigation.module.scss';
import useTranslation from './../../../hooks/useTranslation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBars,
	faUserCircle,
	faTimes,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import LocaleSwitch from './LocaleSwitch';
import clsx from 'clsx';
import { AppContext } from './../../../context/AppContext';
const TopLevel = ({
	setOpenNav,
	openNav,
}: {
	setOpenNav: (open: boolean) => void;
	openNav: boolean;
}) => {
	const { locale, t } = useTranslation();
	const [openUserMenu, setOpenUserMenu] = useState<boolean>(false);
	const { isMobile, isTablet } = useContext(AppContext);
	const userMenuRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		document.addEventListener('click', handleClick);
		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, []);
	const handleClick = (e: any) => {
		if (userMenuRef.current?.contains(e.target)) {
			return;
		}
		setOpenUserMenu(false);
	};
	console.log(isMobile || isTablet);
	// console.log(isTablet);
	return (
		<div className="flex flex-wrap justify-between lg:justify-between items-center my-2 mx-2 md:mx-5 px-1 md:px-2">
			<Link href={`/${locale}/`}>
				<img
					src="/images/logo.png"
					className="cursor-pointer"
					style={{ height: '80px' }}
				/>
			</Link>
			<div className="flex justify-center items-center">
				<div ref={userMenuRef} className="flex justify-center items-center">
					<div
						className={clsx(
							styles.userMenu,
							openUserMenu && isMobile ? 'flex' : 'hidden md:flex'
						)}
					>
						<LocaleSwitch />
						{isMobile || isTablet ? (
							<hr
								className="mx-auto my-2 w-1/2 bg-primary-dark border-transparent"
								style={{ height: '2px' }}
							/>
						) : (
							<span>|</span>
						)}
						<ActiveLink
							activeClassName={styles.active}
							href={`/${locale}/register`}
						>
							<a
								className={clsx(
									isMobile || isTablet ? 'my-2' : 'my-0',
									'mx-3 text-lg font-medium text-primary-dark'
								)}
							>
								{t('join')}
							</a>
						</ActiveLink>
						{isMobile || isTablet ? (
							<hr
								className="mx-auto my-2 w-1/2 bg-primary-dark border-transparent"
								style={{ height: '2px' }}
							/>
						) : (
							<span>|</span>
						)}
						<ActiveLink
							activeClassName={styles.active}
							href={`/${locale}/login`}
						>
							<a
								className={clsx(
									isMobile || isTablet ? 'my-2' : 'my-0',
									'mx-3 text-lg font-medium text-primary-dark'
								)}
							>
								{t('signIn')}
							</a>
						</ActiveLink>
					</div>
					<FontAwesomeIcon
						icon={faUserCircle}
						className="text-primary-light text-lg mt-1 cursor-pointer"
						onClick={() => setOpenUserMenu(true)}
					/>
				</div>
				{(isMobile || isTablet) && (
					<FontAwesomeIcon
						icon={openNav ? faTimes : faBars}
						className="text-primary-dark text-lg mx-1 mt-1 cursor-pointer"
						onClick={(e: any) => {
							e.stopPropagation();
							setOpenNav((prev: boolean) => !prev);
						}}
					/>
				)}
			</div>
		</div>
	);
};

export default TopLevel;
