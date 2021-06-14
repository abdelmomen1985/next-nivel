import React from 'react';
import ActiveLink from './../ActiveLink';
import styles from '../navigation.module.scss';
import useTranslation from './../../../hooks/useTranslation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const TopLevel = () => {
	const { locale, t } = useTranslation();

	return (
		<div className="flex justify-center lg:justify-between items-center mx-5 py-3 my-2 px-2">
			<Link href={`/${locale}/`}>
				<img src="/images/logo.png" className="cursor-pointer" />
			</Link>
			<div className="flex justify-center items-center">
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
