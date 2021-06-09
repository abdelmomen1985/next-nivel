import React from 'react'
import ActiveLink from './ActiveLink';
import styles from "./navigation.module.scss";
import useTranslation from '../../hooks/useTranslation';
import TopLevel from './HeaderSections/TopLevel';

const Header = () => {
  const { locale } = useTranslation();
  return (
    <nav>
      <TopLevel />
    </nav>
  )
}

export default Header
