import React from 'react'
import ActiveLink from '../ActiveLink';
import styles from "./navigation.module.scss";
import useTranslation from '../../../hooks/useTranslation';
const NavLinks = () => {
  const { locale } = useTranslation();
  return (
    <>
      <ActiveLink
        activeClassName={styles.active}
        href={`/${locale}/profile/wishlist`}
      >
        <a>Hello</a>
      </ActiveLink>
    </>
  )
}

export default NavLinks
