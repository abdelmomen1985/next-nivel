import { ApolloProvider } from "@apollo/client";
import "rc-steps/assets/index.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "react-slideshow-image/dist/styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppContextProvider from "../context/AppContext";
// import { AppProps } from 'next/app'
import { LanguageProvider } from "../context/LangContext";
import { useApollo } from "../lib/apolloClient";
import "../styles/index.css";

function MyApp(ctx: any) {
  const apolloClient = useApollo(ctx.pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <AppContextProvider>
        <LanguageProvider localization={ctx.pageProps.localization}>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <ctx.Component {...ctx.pageProps} />
        </LanguageProvider>
      </AppContextProvider>
    </ApolloProvider>
  );
}

export default MyApp;
