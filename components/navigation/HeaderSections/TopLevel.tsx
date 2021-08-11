import {
  faBars,
  faTimes,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { LayoutType } from "../../../types/layout";
import styles from "../navigation.module.scss";
import { AppContext } from "./../../../context/AppContext";
import useTranslation from "./../../../hooks/useTranslation";
import ActiveLink from "./../ActiveLink";
import LocaleSwitch from "./LocaleSwitch";

const EditStay = () => {
  const { t, locale } = useTranslation();
  const router = useRouter();
  const { register, reset, errors, handleSubmit } = useForm({
    mode: "onTouched",
  });
  const editStayHandler = (data: any) => {
    console.log(data);
    router.push({
      pathname: `/${locale}/booking`,
      query: { res_code: data?.res_code },
    });
  };
  return (
    <form
      className="flex justify-center items-center my-2"
      onSubmit={handleSubmit(editStayHandler)}
    >
      <input
        placeholder="Enter your reservation code"
        className={clsx(
          "rounded px-2 py-1 ",
          errors?.res_code ? styles.errorInput : " "
        )}
        name="res_code"
        ref={register({
          required: true,
        })}
      />
      <button className="rounded px-2 py-1  bg-primary-light text-white">
        Edit
      </button>
    </form>
  );
};

const TopLevel = ({
  setOpenNav,
  openNav,
  layout,
  setIsRegister,
}: {
  setOpenNav: (open: boolean) => void;
  openNav: boolean;
  layout: LayoutType;
  setIsRegister: (isReg: boolean) => void;
}) => {
  const { locale, t } = useTranslation();
  const [openUserMenu, setOpenUserMenu] = useState<boolean>(false);
  const [editStay, setEditStay] = useState<boolean>(false);
  const { isMobile, isTablet, setLoginModal, user, setUser } =
    useContext(AppContext);
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
    setEditStay(false);
  };
  const signOutHandler = async () => {
    const response = await fetch("/api/sessions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 204) setUser(undefined);
  };
  // console.log(isTablet);
  return (
    <div className="flex flex-wrap justify-between lg:justify-between items-center my-2 mx-2 md:mx-5 px-1 md:px-2">
      <Link href={`/${locale}/`}>
        <img
          src={layout?.remoteSchemaUrl + layout?.top_logo_en?.url}
          className="cursor-pointer"
          style={{ height: "80px" }}
        />
      </Link>
      <div className="flex justify-center items-center">
        <div
          ref={userMenuRef}
          className="flex justify-center items-center relative"
        >
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
              <span>{/*|*/}</span>
            )}
            {!user ? (
              <>
                {/*
							<button
								onClick={() => {
									setIsRegister(true);
									setLoginModal(true);
								}}
								className={clsx(
									isMobile || isTablet ? 'my-2' : 'my-0',
									'mx-3 font-medium text-primary-dark'
								)}
							>
								{t('join')}
							</button>
                */}
              </>
            ) : (
              <ActiveLink
                href={`/${locale}/profile`}
                activeClassName={styles.active}
              >
                <a
                  className={clsx(
                    isMobile || isTablet ? "my-2" : "my-0",
                    "mx-3 font-medium text-primary-dark"
                  )}
                >
                  {user?.name}
                </a>
              </ActiveLink>
            )}
            {/* </ActiveLink> */}
            {isMobile ? (
              <hr
                className="mx-auto my-2 w-1/2 bg-primary-dark border-transparent"
                style={{ height: "2px" }}
              />
            ) : (
              <span>|</span>
            )}
            {user ? (
              <button
                onClick={signOutHandler}
                className={clsx(
                  isMobile || isTablet ? "my-2" : "my-0",
                  "mx-3 font-medium text-primary-dark"
                )}
              >
                {t("signOut")}
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsRegister(false);
                  setLoginModal(true);
                }}
                className={clsx(
                  isMobile || isTablet ? "my-2" : "my-0",
                  "mx-3 font-medium text-primary-dark"
                )}
              >
                {t("signIn")}
              </button>
            )}

            {!user && isMobile && (
              <>
                <hr
                  className="mx-auto my-2 w-1/2 bg-primary-dark border-transparent"
                  style={{ height: "2px" }}
                />
                <button className="" onClick={() => setEditStay(true)}>
                  Edit Stay
                </button>
                {editStay && <EditStay />}
              </>
            )}
          </div>
          <button
            onClick={() => setOpenUserMenu(true)}
            className="bg-transparent border-none mx-1 cursor-pointer"
          >
            {user && user.media && user?.media?.profile_img ? (
              <img
                src={user?.media?.profile_img?.secure_url}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faUserCircle}
                className="text-primary-light text-3xl "
              />
            )}
          </button>
          {!isMobile && openUserMenu && (
            <div className={styles.dropDownMenu}>
              <button className="" onClick={() => setEditStay(true)}>
                Edit Stay
              </button>
              {editStay && <EditStay />}
            </div>
          )}
        </div>
        {isMobile && (
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
