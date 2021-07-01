import clsx from "clsx";
import React, { useContext, useEffect, useRef, useState } from "react";
import { LayoutType } from "../../types/layout";
import AuthModal from "../Auth/AuthModal";
import { AppContext } from "./../../context/AppContext";
import Filters from "./HeaderSections/Filters";
import NavLinks from "./HeaderSections/NavLinks";
import TopLevel from "./HeaderSections/TopLevel";
import styles from "./navigation.module.scss";
const Header = ({
  withFilters = true,
  layout,
}: {
  withFilters?: boolean | undefined;
  layout: LayoutType;
}) => {
  const [isFixed, setIsFixed] = useState(false);
  const [isRegister, setIsRegister] = useState(true);
  const [filtersState, updateFiltersState] = useState(undefined);
  const [openNav, setOpenNav] = useState<boolean>(false);
  const { isMobile, loginModal, setLoginModal } = useContext(AppContext);
  const navMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.addEventListener("scroll", changeNavPosition);

    return () => {
      window.removeEventListener("scroll", changeNavPosition);
    };
  }, []);
  const changeNavPosition = () => {
    if (window.scrollY > 100) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  const handleClick = (e: any) => {
    if (navMenuRef.current?.contains(e.target)) {
      return;
    }
    setOpenNav(false);
  };
  useEffect(() => {
    console.log(loginModal);
  }, [loginModal]);
  return (
    <>
      <header
        className={clsx(
          styles.navBar,
          isFixed ? "sticky bg-white shadow" : "relative"
        )}
        style={{
          zIndex: isFixed ? 999 : "unset",
        }}
        ref={navMenuRef}
      >
        <TopLevel
          setIsRegister={setIsRegister}
          openNav={openNav}
          setOpenNav={setOpenNav}
          layout={layout}
        />
        <nav
          className={clsx(
            styles.navLinks,
            " justify-center items-center w-full px-10 py-3  bg-gray-light bg-opacity-50",
            openNav && isMobile ? "flex" : "hidden md:flex"
          )}
        >
          <NavLinks openNav={openNav} setOpenNav={setOpenNav} />
        </nav>
        {withFilters && <Filters updateFilters={updateFiltersState} />}
      </header>
      {loginModal && <AuthModal isRegister={isRegister} />}
    </>
  );
};

export default Header;
