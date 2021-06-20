import React from 'react';
import ActiveLink from './../ActiveLink';
import styles from '../navigation.module.scss';
import useTranslation from './../../../hooks/useTranslation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import LocaleSwitch from './LocaleSwitch';
const TopLevel = () => {
	const { locale, t } = useTranslation();

	return (
		<div className="flex justify-center lg:justify-between items-center my-2 mx-5 px-2">
			<Link href={`/${locale}/`}>
				<img
					src="/images/logo.png"
					className="cursor-pointer"
					style={{ height: '80px' }}
				/>
			</Link>
			<div className="flex justify-center items-center">
				<LocaleSwitch />
				<span>|</span>
				<ActiveLink
					activeClassName={styles.active}
					href={`/${locale}/register`}
				>
					<a className="mx-3 text-lg font-medium text-primary-dark">
						{t('join')}
					</a>
				</ActiveLink>
				<span>|</span>
				<ActiveLink activeClassName={styles.active} href={`/${locale}/login`}>
					<a className="mx-3 text-lg font-medium text-primary-dark">
						{t('signIn')}
					</a>
				</ActiveLink>
				<FontAwesomeIcon
					icon={faUserCircle}
					className="text-primary-light text-lg mt-1"
				/>
			</div>
		</div>
	);
};

export default TopLevel;
