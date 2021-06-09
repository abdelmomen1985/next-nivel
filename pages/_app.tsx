import React from 'react'
// import { AppProps } from 'next/app'
import { LanguageProvider } from '../context/LangContext'
import AppContextProvider from '../context/AppContext'
import '../styles/index.css'
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