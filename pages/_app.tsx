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
// import "@fortawesome/fontawesome-free/css/all.css";

function MyApp(ctx: any) {
	const apolloClient = useApollo(ctx.pageProps.initialApolloState);
	return (
		<ApolloProvider client={apolloClient}>
			<AppContextProvider>
				<LanguageProvider localization={ctx.pageProps.localization}>
					<ctx.Component {...ctx.pageProps} />
				</LanguageProvider>
			</AppContextProvider>
		</ApolloProvider>
	);
}

export default MyApp;
