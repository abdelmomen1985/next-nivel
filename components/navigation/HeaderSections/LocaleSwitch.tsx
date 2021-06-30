import React from "react";
import { useRouter } from "next/router";
import { locales } from "../../../i18n/config";
import useTranslation from "../../../hooks/useTranslation";
const LocaleSwitch: React.FC = () => {
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
      className="mx-3 inline-block outline-none focus:outline-none"
    >
      {locale === "en" ? (
        <a
          onClick={() => handleLocaleChange("ar")}
          className="cursor-pointer text-primary-dark font-semibold mx-1"
        >
          العربية
        </a>
      ) : (
        <a
          onClick={() => handleLocaleChange("en")}
          className="cursor-pointer text-primary-dark font-semibold mx-1"
        >
          English
        </a>
      )}
    </div>
  );
};

export default LocaleSwitch;
