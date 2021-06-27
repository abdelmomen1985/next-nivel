import {
  faBars,
  faTimes,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import { LayoutType } from "../../../types/layout";
import styles from "../navigation.module.scss";
import { AppContext } from "./../../../context/AppContext";
import useTranslation from "./../../../hooks/useTranslation";
import ActiveLink from "./../ActiveLink";
import LocaleSwitch from "./LocaleSwitch";
const TopLevel = ({
  setOpenNav,
  openNav,
  layout,
}: {
  setOpenNav: (open: boolean) => void;
  openNav: boolean;
  layout: LayoutType;
}) => {
  const { locale, t } = useTranslation();
  const [openUserMenu, setOpenUserMenu] = useState<boolean>(false);
  const { isMobile, isTablet } = useContext(AppContext);
  const userMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  const handleClick = (e: any) => {
    if (userMenuRef.current?.contains(e.target)) {
      return;
    }
    setOpenUserMenu(false);
  };

  // console.log(isTablet);
  return (
    <div className="flex flex-wrap justify-between lg:justify-between items-center my-2 mx-2 md:mx-5 px-1 md:px-2">
      <Link href={`/${locale}/`}>
        <img
          src={layout.remoteSchemaUrl + layout.top_logo_en.url}
          className="cursor-pointer"
          style={{ height: "80px" }}
        />
      </Link>
      <div className="flex justify-center items-center">
        <div ref={userMenuRef} className="flex justify-center items-center">
          <div
            className={clsx(
              styles.userMenu,
              openUserMenu && isMobile ? "flex" : "hidden md:flex"
            )}
          >
            <LocaleSwitch />
            {isMobile ? (
              <hr
                className="mx-auto my-2 w-1/2 bg-primary-dark border-transparent"
                style={{ height: "2px" }}
              />
            ) : (
              <span>|</span>
            )}
            <ActiveLink
              activeClassName={styles.active}
              href={`/${locale}/register`}
            >
              <a
                className={clsx(
                  isMobile || isTablet ? "my-2" : "my-0",
                  "mx-3 font-medium text-primary-dark"
                )}
              >
                {t("join")}
              </a>
            </ActiveLink>
            {isMobile ? (
              <hr
                className="mx-auto my-2 w-1/2 bg-primary-dark border-transparent"
                style={{ height: "2px" }}
              />
            ) : (
              <span>|</span>
            )}
            <ActiveLink
              activeClassName={styles.active}
              href={`/${locale}/login`}
            >
              <a
                className={clsx(
                  isMobile || isTablet ? "my-2" : "my-0",
                  "mx-3 font-medium text-primary-dark"
                )}
              >
                {t("signIn")}
              </a>
            </ActiveLink>
          </div>
          <FontAwesomeIcon
            icon={faUserCircle}
            className="text-primary-light text-3xl mx-1 mt-1 cursor-pointer"
            onClick={() => setOpenUserMenu(true)}
          />
        </div>
        {(isMobile || isTablet) && (
          <FontAwesomeIcon
            icon={openNav ? faTimes : faBars}
            className="text-primary-dark text-3xl mx-1 mt-1 cursor-pointer"
            onClick={(e: any) => {
              e.stopPropagation();
              setOpenNav((prev: boolean) => !prev);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TopLevel;
