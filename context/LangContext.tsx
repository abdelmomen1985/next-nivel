import React from 'react';
import { useRouter } from 'next/router';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { isLocale, Localization, Locale } from '../i18n/types';
import defaultStrings from '../i18n/Locales/en';
import locales from '../i18n/Locales';

/**
 * Language Context
 */

interface ContextProps {
  readonly localization: Localization;
  readonly setLocale: (localization: Localization) => void;
}

export const LanguageContext = React.createContext<ContextProps>({
  localization: {
    locale: 'en', // default lang
    translations: defaultStrings.common, // default translations TODO: what to do here?
    namespace: 'common', // default namespace TODO: could we null this? 'common' might be misleading
  },
  setLocale: () => null,
});

/**
 * Language Context: Provider
 */

export const LanguageProvider: React.FC<{ localization: Localization }> = ({
  localization,
  children,
}) => {
  const [localizationState, setLocalizationState] = React.useState({
    locale: localization?.locale,
    translations: localization?.translations,
    namespace: localization?.namespace,
  });
  const [getStoredLocale, setStoredLocale] = useLocalStorage('locale');
  const { query } = useRouter();

  React.useEffect(() => {
    if (localizationState.locale !== getStoredLocale) {
      setStoredLocale(localizationState.locale);
    }
  }, [localizationState]);

  React.useEffect(() => {
    if (isLocale('' + query.lang) && localization?.locale !== query.lang) {
      console.log('in if changing');
      setLocalizationState({
        locale: localization?.locale,
        translations: localization?.translations,
        namespace: localization?.namespace,
      });
    }
  }, [query.lang, localizationState]);

  return (
    <LanguageContext.Provider
      value={{ localization, setLocale: setLocalizationState }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const getLocalizationProps = (ctx: any, namespace: string) => {
  console.log('getLocalizationProps', ctx.params?.lang);
  const lang: Locale = (ctx.params?.lang as Locale) || 'ar';
  const locale: any = locales[lang];
  const strings: any = locale[namespace];
  const translations = {
    common: locales[lang].common,
    ...strings,
  };
  return {
    locale: ctx?.params?.lang || 'en',
    translations,
    namespace,
  };
};
