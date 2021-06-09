
import { useContext } from "react";
import { LanguageContext } from "../Context/LangContext";

function useTranslation() {
  const { localization } = useContext(LanguageContext);

  function t(key: string) {
    // console.log("t localization", localization);
    if (!localization.translations[key]) {
      // console.log(
      //   `Translation '${key}' for locale '${localization.locale}' not found.`
      // );
      return key;
    }
    return localization.translations[key] || "";
  }

  return {
    t,
    locale: localization.locale,
  };
}
export default useTranslation;