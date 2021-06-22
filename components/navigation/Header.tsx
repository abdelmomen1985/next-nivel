import React, { useState, useEffect, useContext, useRef } from 'react';
import styles from './navigation.module.scss';
import TopLevel from './HeaderSections/TopLevel';
import NavLinks from './HeaderSections/NavLinks';
import clsx from 'clsx';
import Filters from './HeaderSections/Filters';
import { AppContext } from './../../context/AppContext';
const Header = ({
	withFilters = true,
}: {
	withFilters?: boolean | undefined;
}) => {
	const [isFixed, setIsFixed] = useState(false);
	const [filtersState, updateFiltersState] = useState(undefined);
	const [openNav, setOpenNav] = useState<boolean>(false);
	useEffect(() => {
		window.addEventListener('scroll', changeNavPosition);

		return () => {
			window.removeEventListener('scroll', changeNavPosition);
		};
	}, []);
	const changeNavPosition = () => {
		if (window.scrollY > 50) {
			setIsFixed(true);
		} else {
			setIsFixed(false);
		}
	};
	const { isMobile, isTablet } = useContext(AppContext);
	const navMenuRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		document.addEventListener('click', handleClick);
		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, []);
	const handleClick = (e: any) => {
		if (navMenuRef.current?.contains(e.target)) {
			return;
		}
		setOpenNav(false);
	};
	return (
		<nav
			className={clsx(
				styles.navBar,
				isFixed ? 'fixed bg-white shadow' : 'relative'
			)}
			ref={navMenuRef}
		>
			<TopLevel openNav={openNav} setOpenNav={setOpenNav} />
			<div
				className={clsx(
					styles.navLinks,
					' justify-center items-center w-full px-10 py-3  bg-gray-light bg-opacity-50',
					openNav && isMobile ? 'flex' : 'hidden md:flex'
				)}
			>
				<NavLinks openNav={openNav} setOpenNav={setOpenNav} />
			</div>
			{withFilters && <Filters updateFilters={updateFiltersState} />}
		</nav>
	);
};

export default Header;
