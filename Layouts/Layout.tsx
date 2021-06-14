import Head from 'next/head';
import React from 'react';
import useTranslation from '../hooks/useTranslation';
import Header from '../components/navigation/Header';
// import Footer from '../navigation/Footer';
import TheFooter from '../components/navigation/TheFooter';

type LayoutProps = {
	children?: React.ReactNode;
	title?: string;
	withFilters?: boolean | undefined;
};

const Layout = ({
	children,
	title = 'This is the default title',
	withFilters = true,
}: LayoutProps) => {
	const { locale } = useTranslation();
	return (
		// <div>
		<div style={{ direction: locale === 'ar' ? 'rtl' : 'ltr' }}>
			<Head>
				<title>{title}</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Header withFilters={withFilters} />
			{children}

			<TheFooter />
		</div>
	);
};

export default Layout;
