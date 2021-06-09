import { GetStaticPaths, GetStaticProps } from 'next';
import Link from "next/link";
import { getLocalizationProps } from './../../context/LangContext';
import Layout from "../../Layouts/Layout";
import HeroSection from '../../components/Home/HeroSection';
import StatsSection from '../../components/Home/StatsSection'
import TradeMarkSection from '../../components/Home/TradeMarkSection'
import AmenitiesSection from '../../components/Home/AmenitiesSection'

const HomePage = () => (
  <Layout title="Home Page">
    <HeroSection />
    <StatsSection />
    <TradeMarkSection />
    <AmenitiesSection />
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
