import { GetServerSideProps } from "next";
import { getLocalizationProps } from "../../../context/LangContext";
import { getRemoteSchemaUrl } from "../../../data/remoteSchemaUrl";
import useTranslation from "../../../hooks/useTranslation";
import { initializeApollo } from "../../../lib/apolloClient";
import { CONTACT_PAGE_Q } from "../../../query/location";

import { LayoutType } from "../../../types/layout";
import Layout from "./../../../Layouts/Layout";
export default function ContactPage({
  layout,
  career,
}: {
  layout: LayoutType;
  career: any;
}) {
  const { t, locale } = useTranslation();
  return (
    <Layout layout={layout}>
      <div className="px-8 py-10 mt-0 mb-5 bg-gray-light">
        <div className="flex flex-wrap  justify-start md:justify-between lg:justify-between items-center lg:items-start mx-3 md:mx-16">
          <div className="mx-0 md:mx-16 lg:mx-auto my-2 lg:my-0">
            <h4 className="text-gray-dark text-lg uppercase font-medium">
              {t("callUs")}
            </h4>
            <h5
              style={{ direction: "ltr" }}
              className="text-black text-lg mt-1 text-left"
            >
              {career.phone}
            </h5>
          </div>

          <div className="mx-0 md:mx-16 lg:mx-auto my-2 lg:my-0">
            <h4 className="text-gray-dark text-lg uppercase font-medium">
              {t("email")}
            </h4>
            <h5
              style={{ direction: "ltr" }}
              className="text-black text-lg mt-1 text-left"
            >
              {career.info_email}
            </h5>
          </div>

          <div className="mx-0 md:mx-16 lg:mx-auto my-2 lg:my-0">
            <h4 className="text-gray-dark text-lg uppercase font-medium">
              {t("careers")}
            </h4>
            <h5
              style={{ direction: "ltr" }}
              className="text-black text-lg mt-1 text-left"
            >
              {career.career_email}
            </h5>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getAnyProps = async (ctx: any) => {
  const localization = getLocalizationProps(ctx, "common");
  const remoteSchemaUrl = await getRemoteSchemaUrl();
  const client = initializeApollo();
  const resp = await client.query({ query: CONTACT_PAGE_Q });

  return {
    props: {
      localization,
      layout: { ...resp?.data?.layout, remoteSchemaUrl },
      career: { ...resp?.data?.career },
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
