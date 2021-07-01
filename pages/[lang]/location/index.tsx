import { GetServerSideProps } from "next";
import React from "react";
import CustomMD from "../../../components/common/CustomMD";
import Location from "../../../components/location/Location";
import { getLocalizationProps } from "../../../context/LangContext";
import { getRemoteSchemaUrl } from "../../../data/remoteSchemaUrl";
import Layout from "../../../Layouts/Layout";
import { LayoutType } from "../../../types/layout";
import useTranslation from "./../../../hooks/useTranslation";
import { initializeApollo } from "./../../../lib/apolloClient";
import { LOCATION } from "./../../../query/location";
import styles from "./location.module.scss";

const LocationPage = ({
  location,
  layout,
}: {
  location: any;
  layout: LayoutType;
}) => {
  const { locale } = useTranslation();
  return (
    <Layout layout={layout}>
      <Location coordinates={location.coordinates} />
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
                  className: styles.locationDataList,
                },
              },
            },
          }}
          markdown={location[`description_${locale}`]}
        />
      </div>
    </Layout>
  );
};
export default LocationPage;

export const getAnyProps = async (ctx: any) => {
  const localization = getLocalizationProps(ctx, "common");
  const remoteSchemaUrl = await getRemoteSchemaUrl();
  const client = initializeApollo();
  const resp = await client.query({ query: LOCATION });
  console.log(resp?.data);
  return {
    props: {
      localization,
      location: resp?.data?.location,
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
