import React from 'react'
// import { AppProps } from 'next/app'
import { LanguageProvider } from '../Context/LangContext'
import AppContextProvider from '../Context/AppContext'
import '../styles/index.css'
import 'react-slideshow-image/dist/styles.css'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
// import "@fortawesome/fontawesome-free/css/all.css"; 


function MyApp(ctx: any) {
  return (
    <AppContextProvider>
      <LanguageProvider localization={ctx.pageProps.localization}>
        <ctx.Component {...ctx.pageProps} />
      </LanguageProvider>
    </AppContextProvider>

  )
}

export default MyApp