import { GetServerSideProps } from "next";

import AmenitiesSection from "../../components/Home/AmenitiesSection";
import Dining from "../../components/Home/Dining";
import HeroSection from "../../components/Home/HeroSection";
import MeetingsNdEvents from "../../components/Home/MeetingsNdEvents";
import RoomsNdSuits from "../../components/Home/RoomsNdSuits";
import StatsSection from "../../components/Home/StatsSection";
import TradeMarkSection from "../../components/Home/TradeMarkSection";
import { getLocalizationProps } from "../../context/LangContext";
import { getRemoteSchemaUrl } from "../../data/remoteSchemaUrl";
import useTranslation from "../../hooks/useTranslation";
import { initializeApollo } from "../../lib/apolloClient";
import { HOME_PAGE } from "../../query/home";
import { AmenityType } from "../../types/amenities";
import { HomeSectionType } from "../../types/HomeSection";
import { LayoutType } from "../../types/layout";
import { StrpRoomType } from "../../types/strpRoom";
import ExpectSection from "./../../components/Home/ExpectSection";
import { useSpeech } from "./../../hooks/useSpeech";
import Layout from "./../../Layouts/Layout";
import styles from "./home.module.scss";

const HomePage = ({
  home,
  layout,
  amenities,
  homeSections,
  rooms,
  remoteSchemaUrl,
}: {
  home: any;
  layout: LayoutType;
  amenities: AmenityType[];
  homeSections: HomeSectionType[];
  rooms: StrpRoomType[];
  remoteSchemaUrl: string;
}) => {
  const { locale } = useTranslation();
  const { speechHandler } = useSpeech();
  return (
    <Layout title="Home Page" layout={layout}>
      <ExpectSection home={home} />
      <HeroSection />
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/12vUP1tXD1g"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <StatsSection home={home} />
      <TradeMarkSection home={home} />
      <AmenitiesSection
        defaultUrl={layout?.remoteSchemaUrl}
        amenities={amenities}
      />
      <RoomsNdSuits rooms={rooms} remoteSchemaUrl={remoteSchemaUrl} />
      <Dining />
      <MeetingsNdEvents />
      {homeSections.length > 0 &&
        homeSections.map((homeSection, i) => (
          <div key={i} className={styles.homeSectionContainer}>
            <div className={styles.homeSection}>
              <img
                src={layout?.remoteSchemaUrl + homeSection?.media?.url}
                className="w-full"
                alt={homeSection?.name[locale]}
              />
              <div className="mx-5 md:mx-10">
                <h3
                  onMouseEnter={() => speechHandler(homeSection?.name[locale])}
                  className="text-primary-dark text-2xl font-semibold my-2"
                >
                  {homeSection?.name[locale]}
                </h3>
                <p
                  onClick={() =>
                    speechHandler(homeSection[`description_${locale}`])
                  }
                  className="text-black text-base font-normal my-2"
                >
                  {homeSection[`description_${locale}`]}
                </p>
              </div>
            </div>
          </div>
        ))}
    </Layout>
  );
};
export default HomePage;

// const getAnyProps = async (ctx: any) => {
// 	const localization = getLocalizationProps(ctx, 'common');
// 	// GET remote schema url
// 	const remoteSchemaUrl = await getRemoteSchemaUrl();
// 	const client = initializeApollo();
// 	const resp = await client.query({ query: HOME_PAGE });

// 	return {
// 		props: {
// 			localization,
// 			home: resp?.data.homepage,
// 			layout: { ...resp?.data.layout, remoteSchemaUrl },
// 			amenities: resp?.data?.amenities,
// 			homeSections: resp?.data?.homepage?.home_sections,
// 			rooms: resp?.data?.strpRooms,
// 			remoteSchemaUrl: remoteSchemaUrl,
// 		},
// 	};
// };
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
  const localization = getLocalizationProps(ctx, "common");
  // GET remote schema url
  const remoteSchemaUrl = await getRemoteSchemaUrl();
  const client = initializeApollo();
  const resp = await client.query({ query: HOME_PAGE });

  return {
    props: {
      localization,
      home: resp?.data.homepage,
      layout: { ...resp?.data.layout, remoteSchemaUrl },
      amenities: resp?.data?.amenities,
      homeSections: resp?.data?.homepage?.home_sections,
      rooms: resp?.data?.strpRooms,
      remoteSchemaUrl: remoteSchemaUrl,
    },
  };
  //return await getAnyProps(ctx);
};
