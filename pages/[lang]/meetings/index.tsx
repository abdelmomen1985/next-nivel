import { GetServerSideProps } from "next";
import React from "react";
import EventsVenues from "../../../components/Events/EventsVenues";
import { getLocalizationProps } from "../../../context/LangContext";
import { getRemoteSchemaUrl } from "../../../data/remoteSchemaUrl";
import { initializeApollo } from "../../../lib/apolloClient";
import { LayoutType } from "../../../types/layout";
import EventData from "./../../../components/Events/EventData";
import EventsFeatures from "./../../../components/Events/EventsFeatures";
import { useSpeech } from "./../../../hooks/useSpeech";
import useTranslation from "./../../../hooks/useTranslation";
import Layout from "./../../../Layouts/Layout";
import { MEETING_ROOMS } from "./../../../query/meeting_rooms";
import styles from "./meetings.module.scss";

const eventsData = [
  {
    count: "266",
    unit: {
      ar: "متر مربع",
      en: "SQ. M.",
    },
    title: {
      ar: "من المساحة الإجمالية",
      en: "OF TOTAL EVENT SPACE",
    },
  },
  {
    count: "104",
    unit: {
      ar: "متر مربع",
      en: "SQ. M.",
    },
    title: {
      ar: "من اضخم الإعدادات ",
      en: "OF LARGEST ROOM SETUP",
    },
  },
  {
    count: "3",
    unit: {
      ar: "",
      en: "",
    },
    title: {
      ar: "غرف اجتماعات",
      en: "MEETING ROOMS",
    },
  },
];
const MeetingsPage = ({
  meetingRooms,
  layout,
}: {
  meetingRooms: any[];
  layout: LayoutType;
}) => {
  const { t } = useTranslation();
  const { speechHandler } = useSpeech();
  return (
    <Layout layout={layout}>
      <section className="w-full">
        <img
          src="/images/meeting.jpg"
          className="w-full"
          style={{
            maxHeight: "90vh",
          }}
        />
      </section>
      <section className="my-5 w-full text-center">
        <h3
          onMouseEnter={() => speechHandler(t("meetingsNdEvents"))}
          className="text-3xl font-bold text-primary-dark"
        >
          {t("meetingsNdEvents")}
        </h3>
        <p
          onMouseEnter={() => speechHandler(t("meetingsDesc"))}
          className="text-xl font-medium text-gray-dark w-full mx-auto md:w-1/2 my-3"
        >
          {t("meetingsDesc")}
        </p>
      </section>
      <hr />
      <section className="my-5 py-10 flex flex-wrap md:items-center items-stretch  justify-center md:justify-between px-10">
        {eventsData.map((event, i) => (
          <EventData key={i} event={event} />
        ))}
      </section>
      <EventsFeatures />
      <EventsVenues meetingRooms={meetingRooms} styles={styles} />
    </Layout>
  );
};

export default MeetingsPage;

export const getAnyProps = async (ctx: any) => {
  const localization = getLocalizationProps(ctx, "common");
  const remoteSchemaUrl = await getRemoteSchemaUrl();
  const client = initializeApollo();
  const resp = await client.query({ query: MEETING_ROOMS });

  return {
    props: {
      localization,
      meetingRooms: resp?.data?.meeting_rooms,
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
