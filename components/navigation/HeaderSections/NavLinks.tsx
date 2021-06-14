import React from 'react';
import ActiveLink from '../ActiveLink';
import styles from '../navigation.module.scss';
import useTranslation from '../../../hooks/useTranslation';
const NavLinks = () => {
	const { locale, t } = useTranslation();
	return (
		<div className="flex justify-center items-center w-full px-10 py-5  bg-gray-light bg-opacity-50">
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
		</div>
	);
};

export default NavLinks;
