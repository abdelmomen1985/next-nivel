import { GetServerSideProps } from "next";
import { getLocalizationProps } from "../../../context/LangContext";
import { getRemoteSchemaUrl } from "../../../data/remoteSchemaUrl";
import { initializeApollo } from "../../../lib/apolloClient";
import { LOAD_CONTACT_LAYOUT } from "../../../query/contact";

import { LayoutType } from "../../../types/layout";
import Layout from "./../../../Layouts/Layout";
export default function TOSPage({ layout }: { layout: LayoutType }) {
  return <Layout layout={layout}></Layout>;
}

export const getAnyProps = async (ctx: any) => {
  const localization = getLocalizationProps(ctx, "common");
  const remoteSchemaUrl = await getRemoteSchemaUrl();
  const client = initializeApollo();
  const resp = await client.query({ query: LOAD_CONTACT_LAYOUT });

  return {
    props: {
      localization,
      layout: { ...resp?.data?.layout, remoteSchemaUrl },
    },
  };
};
/*
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ["ar", "en"].map((lang) => ({ params: { lang } })),
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async (ctx) => {
  return await getAnyProps(ctx);
};
*/

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await getAnyProps(ctx);
};
