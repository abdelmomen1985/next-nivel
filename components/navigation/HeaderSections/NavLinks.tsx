import React, { useContext, useEffect, useRef } from 'react';
import ActiveLink from '../ActiveLink';
import clsx from 'clsx';
import styles from '../navigation.module.scss';
import useTranslation from '../../../hooks/useTranslation';
import { AppContext } from './../../../context/AppContext';
const NavLinks = ({
	openNav,
	setOpenNav,
}: {
	openNav: boolean;
	setOpenNav: (open: boolean) => void;
}) => {
	const { locale, t } = useTranslation();

	return (
		<>
			<ActiveLink activeClassName={styles.active} href={`/${locale}/`}>
				<a className={styles.navLink}>{t('headerHome')}</a>
			</ActiveLink>
			<ActiveLink activeClassName={styles.active} href={`/${locale}/rooms`}>
				<a className={styles.navLink}>{t('headerRooms')}</a>
			</ActiveLink>
			<ActiveLink activeClassName={styles.active} href={`/${locale}/gallery`}>
				<a className={styles.navLink}>{t('headerGallery')}</a>
			</ActiveLink>
			<ActiveLink activeClassName={styles.active} href={`/${locale}/location`}>
				<a className={styles.navLink}>{t('headerLocation')}</a>
			</ActiveLink>
			<ActiveLink activeClassName={styles.active} href={`/${locale}/dining`}>
				<a className={styles.navLink}>{t('headerDining')}</a>
			</ActiveLink>
			<ActiveLink activeClassName={styles.active} href={`/${locale}/meetings`}>
				<a className={styles.navLink}>{t('headerMeetings')}</a>
			</ActiveLink>
		</>
	);
};

export default NavLinks;
