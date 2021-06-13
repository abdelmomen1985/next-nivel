import React, { useState, useEffect } from "react";
import styles from "./navigation.module.scss";
import TopLevel from "./HeaderSections/TopLevel";
import NavLinks from "./HeaderSections/NavLinks";
import clsx from "clsx";
import Filters from "./HeaderSections/Filters";
const Header = () => {
  const [isFixed, setIsFixed] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", changeNavPosition);

    return () => {
      window.removeEventListener("scroll", changeNavPosition);
    };
  }, []);
  const changeNavPosition = () => {
    // if (window.scrollY > 50) {
    //   setIsFixed(true);
    // } else {
    //   setIsFixed(false);
    // }
  };
  return (
    <nav
      className={clsx(styles.navBar, isFixed ? "fixed bg-white" : "relative")}
    >
      <TopLevel />
      <NavLinks />
      <Filters />
    </nav>
  );
};

export default Header;
