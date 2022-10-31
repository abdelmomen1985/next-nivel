import { GetServerSideProps } from "next";
import CustomMD from "../../../components/common/CustomMD";
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
      {/** 
      <Location coordinates={location.coordinates} />
      */}
      <div className="p-5 ">
        <div className="max-w-full p-0 rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3788.4657708503037!2d42.67224329999999!3d18.280295900000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15fb57b08124c00b%3A0xfae096172423c1b!2zTml2ZWwgSG90ZWwg2YHZhtiv2YIg2KfZhtmK2YHZitmE!5e0!3m2!1sen!2seg!4v1665953402190!5m2!1sen!2seg"
            className="w-full "
            height={"450px"}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
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
              a: {
                props: {
                  target: "_blank",
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
