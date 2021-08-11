import Head from "next/head";
import React from "react";
import { getInitialLocale } from "../i18n/getInitialLocale";

const Index: React.FC = () => {
  React.useEffect(() => {
    window?.location?.replace(`/${getInitialLocale()}`);
  });

  return (
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
  );
};

export default Index;
