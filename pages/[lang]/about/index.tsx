import { GetServerSideProps } from "next";
import CustomMD from "../../../components/common/CustomMD";
import { getLocalizationProps } from "../../../context/LangContext";
import { getRemoteSchemaUrl } from "../../../data/remoteSchemaUrl";
import useTranslation from "../../../hooks/useTranslation";
import { initializeApollo } from "../../../lib/apolloClient";
import { ABOUT_PAGE_Q } from "../../../query/location";
import { LayoutType } from "../../../types/layout";
import Layout from "./../../../Layouts/Layout";
export default function AboutPage({
  layout,
  about,
}: {
  layout: LayoutType;
  about: any;
}) {
  const { locale } = useTranslation();
  return (
    <Layout layout={layout}>
      <div className="m-8 text-center">
        <h4 className="text-gray-dark text-lg uppercase font-medium my-8">
          {about[`title_${locale}`]}
        </h4>
        <CustomMD
          options={{
            overrides: {
              p: { props: { className: "text-black text-lg mt-1 w-full" } },
            },
          }}
          markdown={about[`content_${locale}`]}
        />
      </div>
    </Layout>
  );
}

export const getAnyProps = async (ctx: any) => {
  const localization = getLocalizationProps(ctx, "common");
  const remoteSchemaUrl = await getRemoteSchemaUrl();
  const client = initializeApollo();
  const resp = await client.query({ query: ABOUT_PAGE_Q });

  return {
    props: {
      localization,
      layout: { ...resp?.data?.layout, remoteSchemaUrl },
      about: { ...resp?.data?.about },
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
