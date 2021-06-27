import { GetStaticPaths, GetStaticProps } from "next";
import AmenitiesSection from "../../components/Home/AmenitiesSection";
import Dining from "../../components/Home/Dining";
import HeroSection from "../../components/Home/HeroSection";
import MeetingsNdEvents from "../../components/Home/MeetingsNdEvents";
import RoomsNdSuits from "../../components/Home/RoomsNdSuits";
import StatsSection from "../../components/Home/StatsSection";
import TradeMarkSection from "../../components/Home/TradeMarkSection";
import { getLocalizationProps } from "../../context/LangContext";
import { getRemoteSchemaUrl } from "../../data/remoteSchemaUrl";
import { initializeApollo } from "../../lib/apolloClient";
import { HOME } from "../../query/home";
import { StrapiHome } from "../../types/strapiHome";
import ExpectSection from "./../../components/Home/ExpectSection";
const HomePage = ({ strapiHome }: { strapiHome: StrapiHome }) => (
  <Layout title="Home Page" strapiHome={strapiHome}>
    <ExpectSection />
    <HeroSection />
    <StatsSection />
    <TradeMarkSection />
    <AmenitiesSection />
    <RoomsNdSuits />
    <Dining />
    <MeetingsNdEvents />
  </Layout>
);

export const getStaticProps: GetStaticProps = async (ctx) => {
  const localization = getLocalizationProps(ctx, "common");
  // GET remote schema url
  const remoteSchemaUrl = getRemoteSchemaUrl();
  const client = initializeApollo();
  const resp = await client.query({ query: HOME });
  console.log({ ...resp?.data, remoteSchemaUrl });
  return {
    props: {
      localization,
      strapiHome: { ...resp?.data, remoteSchemaUrl },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ["ar", "en"].map((lang) => ({ params: { lang } })),
    fallback: false,
  };
};
export default HomePage;
