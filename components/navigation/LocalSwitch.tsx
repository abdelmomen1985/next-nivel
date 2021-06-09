import React from "react";
import { useRouter } from "next/router";
import { locales } from "../../i18n/config";
import useTranslation from "../../hooks/useTranslation";
import styles from "./navigation.module.scss";
import clsx from "clsx";
const LocaleSwitcher: React.FC = () => {
  const router = useRouter();
  const handleLocaleChange = React.useCallback(
    (lang) => {
      const targetLang = lang;
      const regex = new RegExp(`^/(${locales.join("|")})`);
      router.push(
        router.pathname,
        router.asPath.replace(regex, `/${targetLang}`)
      );
    },
    [router]
  );
  const { locale } = useTranslation();
  return (
    <div
      // style={{ display: "inline-block", outline: "none !important" }}
      className="mx-2 inline-block outline-none focus:outline-none"
    >
      {locale === "en" ? (
        <a
          onClick={() => handleLocaleChange("ar")}
          className={clsx(styles.navLink, "cursor-pointer")}
        >
          العربية
        </a>
      ) : (
        <a
          onClick={() => handleLocaleChange("en")}
          className={clsx(styles.navLink, "cursor-pointer")}
        >
          English
        </a>
      )}
      {/* <label className="language-switcher">
        <select onChange={handleLocaleChange} defaultValue={locale}>
          {locales.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
      </label> */}
    </div>
  );
};

export default LocaleSwitcher;
