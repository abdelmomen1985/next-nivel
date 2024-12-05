import "rc-steps/assets/index.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "react-slideshow-image/dist/styles.css";
import "react-toastify/dist/ReactToastify.css";
// import { AppProps } from 'next/app'
import { useApollo } from "../lib/apolloClient";
import "../styles/index.css";

function MyApp(ctx: any) {
  const apolloClient = useApollo(ctx.pageProps.initialApolloState);
  return (
    /*
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
    */
    <div>Under Maintenance </div>
  );
}

export default MyApp;
