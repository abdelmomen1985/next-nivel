import { GetServerSideProps } from "next";
import CustomMD from "../../../components/common/CustomMD";
import { getLocalizationProps } from "../../../context/LangContext";
import { getRemoteSchemaUrl } from "../../../data/remoteSchemaUrl";
import useTranslation from "../../../hooks/useTranslation";
import { initializeApollo } from "../../../lib/apolloClient";
import { PRIVACY_PAGE_Q } from "../../../query/location";

import { LayoutType } from "../../../types/layout";
import Layout from "./../../../Layouts/Layout";
export default function TOSPage({
  layout,
  privacy,
}: {
  layout: LayoutType;
  privacy: any;
}) {
  const { locale } = useTranslation();
  return (
    <Layout layout={layout}>
      <div className="mx-auto md:mx-5 my-4 text-center">
        <CustomMD
          options={{
            overrides: {
              p: {
                props: {
                  className: "text-base md:text-lg text-center mx-5 my-4 px-5",
                },
              },
              ul: {
                props: {
                  // className: styles.locationDataList,
                },
              },
              a: {
                props: {
                  target: "_blank",
                },
              },
            },
          }}
          markdown={privacy[`content_${locale}`]}
        />
      </div>
    </Layout>
  );
}

export const getAnyProps = async (ctx: any) => {
  const localization = getLocalizationProps(ctx, "common");
  const remoteSchemaUrl = await getRemoteSchemaUrl();
  const client = initializeApollo();
  const resp = await client.query({ query: PRIVACY_PAGE_Q });
  console.log("privacy", resp?.data?.privacy);

  return {
    props: {
      localization,
      privacy: resp?.data?.privacy,
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
