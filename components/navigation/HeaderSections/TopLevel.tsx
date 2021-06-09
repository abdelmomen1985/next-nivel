import React from 'react'
import ActiveLink from './../ActiveLink';
import styles from "../navigation.module.scss";
import useTranslation from './../../../hooks/useTranslation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const TopLevel = () => {
  const { locale } = useTranslation();

  return (
    <div className="flex justify-center lg:justify-between items-center mx-5 py-3 my-2 px-2">
      <img src="/images/logo.png" className="" />
      <div className="flex justify-center items-center">
        <ActiveLink activeClassName={styles.active}
          href={`/${locale}/register`}
        >
          <a className="mx-3 text-lg font-medium">Join Nivel</a>
        </ActiveLink>
        <span>|</span>
        <ActiveLink activeClassName={styles.active}
          href={`/${locale}/login`}
        >
          <a className="mx-3 text-lg font-medium">Sign In</a>
        </ActiveLink>
        <FontAwesomeIcon icon={faUserCircle} className="" />
      </div>
    </div>
  )
}

export default TopLevel
