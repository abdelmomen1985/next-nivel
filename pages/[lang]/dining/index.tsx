import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react'
import Layout from '../../../Layouts/Layout';
import { getLocalizationProps } from '../../../Context/LangContext';

const DiningPage = () => {
  return (
    <Layout>
      Rooms page
    </Layout>
  )
}

export default DiningPage

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