import React, { useState, useEffect } from 'react'
import ActiveLink from './ActiveLink';
import styles from "./navigation.module.scss";
import useTranslation from '../../hooks/useTranslation';
import TopLevel from './HeaderSections/TopLevel';
import NavLinks from './HeaderSections/NavLinks';
import clsx from 'clsx'
const Header = () => {
  const { locale } = useTranslation();
  const [isFixed, setIsFixed] = useState(false)
  useEffect(() => {
    window.addEventListener('scroll', changeNavPosition)

    return () => {
      window.removeEventListener('scroll', changeNavPosition)
    }
  }, []);
  const changeNavPosition = () => {
    console.log(screenY)
    if (window.scrollY > 50) {
      setIsFixed(true);
    } else {
      setIsFixed(false)
    }
  }
  return (
    <nav className={clsx(styles.navBar, isFixed ? 'fixed bg-white' : 'relative')}>
      <TopLevel />
      <NavLinks />
    </nav>
  )
}

export default Header
