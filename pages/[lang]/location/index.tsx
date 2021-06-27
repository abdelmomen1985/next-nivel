import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { getLocalizationProps } from "../../../context/LangContext";

const LocationPage = () => {
  return <Layout>Rooms page</Layout>;
};

export default LocationPage;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const localization = getLocalizationProps(ctx, "common");
  return {
    props: {
      localization,
    },
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ["en", "ar"].map((lang) => ({ params: { lang } })),
    fallback: false,
  };
};
