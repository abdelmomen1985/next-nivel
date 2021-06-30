import React from 'react';
// import { AppProps } from 'next/app'
import { LanguageProvider } from '../context/LangContext';
import AppContextProvider from '../context/AppContext';
import '../styles/index.css';
import 'react-slideshow-image/dist/styles.css';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import 'rc-steps/assets/index.css';
import { useApollo } from '../lib/apolloClient';
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import "@fortawesome/fontawesome-free/css/all.css";

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
