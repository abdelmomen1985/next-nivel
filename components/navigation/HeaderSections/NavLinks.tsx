import { useContext } from "react";
import useTranslation from "../../../hooks/useTranslation";
import ActiveLink from "../ActiveLink";
import styles from "../navigation.module.scss";
import { useSignout } from "./../../../hooks/useSignout";

import clsx from "clsx";
import { AppContext } from "./../../../context/AppContext";
import LocaleSwitch from "./LocaleSwitch";
const NavLinks = ({
  openNav,
  setOpenNav,
}: {
  openNav: boolean;
  setOpenNav: (open: boolean) => void;
}) => {
  const { isMobile, user, setLoginModal, isTablet } = useContext(AppContext);
  const { locale, t } = useTranslation();
  const { signOutHandler } = useSignout();

  return (
    <>
      <ActiveLink activeClassName={styles.active} href={`/${locale}/`}>
        <a className={styles.navLink}>{t("headerHome")}</a>
      </ActiveLink>
      <ActiveLink activeClassName={styles.active} href={`/${locale}/rooms`}>
        <a className={styles.navLink}>{t("headerRooms")}</a>
      </ActiveLink>

      <ActiveLink activeClassName={styles.active} href={`/${locale}/dining`}>
        <a className={styles.navLink}>{t("headerDining")}</a>
      </ActiveLink>

      <ActiveLink activeClassName={styles.active} href={`/${locale}/meetings`}>
        <a className={styles.navLink}>{t("headerMeetings")}</a>
      </ActiveLink>
      <ActiveLink
        activeClassName={styles.active}
        href={`/${locale}/gallery?spa=1`}
      >
        <a className={styles.navLink}>{t("headerSPA")}</a>
      </ActiveLink>
      <ActiveLink activeClassName={styles.active} href={`/${locale}/gallery`}>
        <a className={styles.navLink}>{t("headerGallery")}</a>
      </ActiveLink>
      <ActiveLink activeClassName={styles.active} href={`/${locale}/location`}>
        <a className={styles.navLink}>{t("headerLocation")}</a>
      </ActiveLink>

      <ActiveLink
        activeClassName={styles.active}
        href={`/${locale}/reservations`}
      >
        <a className={styles.navLink}>{t("reservations")}</a>
      </ActiveLink>

      {isMobile && (
        <>
          {user ? (
            <>
              <ActiveLink
                activeClassName={styles.active}
                href={`/${locale}/profile`}
              >
                <a className={styles.navLink}>{t("headerHome")}</a>
              </ActiveLink>

              <button
                onClick={signOutHandler}
                className={clsx(
                  isMobile || isTablet ? "my-2" : "my-0",
                  "mx-3 font-medium text-primary-dark"
                )}
              >
                {t("signOut")}
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setLoginModal(true);
              }}
              className={clsx(
                isMobile ? "my-2" : "my-0",
                "mx-3 font-medium text-primary-dark"
              )}
            >
              {t("signIn")}
            </button>
          )}
          <LocaleSwitch />
        </>
      )}
    </>
  );
};

export default NavLinks;
