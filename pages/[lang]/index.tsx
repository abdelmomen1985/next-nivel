import { GetStaticPaths, GetStaticProps } from 'next';
import Link from "next/link";
import Layout from "../../Layouts/Layout";
import { getLocalizationProps } from './../../context/LangContext';

const HomePage = () => (
  <Layout title="Home Page">



  </Layout>
);


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
export default HomePage;
