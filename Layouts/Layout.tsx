import Head from "next/head";
import React, { ReactNode } from "react";
import useTranslation from "../hooks/useTranslation";
import Header from '../components/navigation/Header';
// import Footer from '../navigation/Footer';

type LayoutProps = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({
  children,
  title = "This is the default title",
}: LayoutProps) => {
  const { locale } = useTranslation();
  return (
    // <div>
    <div style={{ direction: locale === "ar" ? "rtl" : "ltr" }}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      {children}

      {/* <Footer title={title} /> */}
    </div>
  );
};

export default Layout;
