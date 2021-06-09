import React from 'react'
import ActiveLink from '../ActiveLink';
import styles from "../navigation.module.scss";
import useTranslation from '../../../hooks/useTranslation';
const NavLinks = () => {
  const { locale } = useTranslation();
  return (
    <div className="flex justify-center items-center w-full px-10 py-5  bg-gray-light bg-opacity-50">
      <ActiveLink
        activeClassName={styles.active}
        href={`/${locale}/`}
      >
        <a className={styles.navLink}>Home</a>
      </ActiveLink>
      <ActiveLink
        activeClassName={styles.active}
        href={`/${locale}/rooms`}
      >
        <a className={styles.navLink}>Rooms</a>
      </ActiveLink>
      <ActiveLink
        activeClassName={styles.active}
        href={`/${locale}/gallery`}
      >
        <a className={styles.navLink}>Gallery</a>
      </ActiveLink>
      <ActiveLink
        activeClassName={styles.active}
        href={`/${locale}/location`}
      >
        <a className={styles.navLink}>Location</a>
      </ActiveLink>
      <ActiveLink
        activeClassName={styles.active}
        href={`/${locale}/dining`}
      >
        <a className={styles.navLink}>Dining</a>
      </ActiveLink>
      <ActiveLink
        activeClassName={styles.active}
        href={`/${locale}/meetings`}
      >
        <a className={styles.navLink}>Meetings</a>
      </ActiveLink>
    </div>
  )
}

export default NavLinks
