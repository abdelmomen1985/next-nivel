import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { getLocalizationProps } from "../../../context/LangContext";
import { getRemoteSchemaUrl } from "../../../data/remoteSchemaUrl";
import { initializeApollo } from "../../../lib/apolloClient";
import { LayoutType } from "../../../types/layout";
import useTranslation from "./../../../hooks/useTranslation";
import Layout from "./../../../Layouts/Layout";
import { MEETING_ROOMS } from "./../../../query/meeting_rooms";
import styles from "./meetings.module.scss";

const eventsData = [
  {
    count: "208",
    unit: {
      ar: "متر مربع",
      en: "SQ. M.",
    },
    title: {
      ar: "من مساجة الحدث الإجمالية",
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
      ar: "من أضخم إعدادات الغرف",
      en: "OF LARGEST ROOM SETUP",
    },
  },
  {
    count: "2",
    unit: {
      ar: "",
      en: "",
    },
    title: {
      ar: "غرف اجتماعات",
      en: "MEETING ROOMS",
    },
  },
  {
    count: "484",
    unit: {
      ar: "",
      en: "",
    },
    title: {
      ar: "غرف ضيوف",
      en: "Guest Rooms",
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
  const { t, locale } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>("conference");
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
        <h3 className="text-3xl font-bold text-primary-dark">
          {t("meetingsNdEvents")}
        </h3>
        <p className="text-xl font-medium text-gray-dark w-full mx-auto md:w-1/2 my-3">
          {t("meetingsDesc")}
        </p>
      </section>
      <hr />
      <section className="my-5 py-10 flex flex-wrap md:items-center items-stretch  justify-center md:justify-between px-10">
        {eventsData.map((event, i) => (
          <div className="md:mx-5 mx-2 my-4 md:my-0 text-center" key={i}>
            <h5>
              <span className="text-primary-dark text-4xl font-bold">
                {event.count}
              </span>{" "}
              <span className="text-black text-base font-medium">
                {event.unit[locale]}
              </span>
            </h5>
            <h4 className="text-black text-lg font-bold">
              {event.title[locale]}
            </h4>
          </div>
        ))}
      </section>
      <section className="my-4 mx-0 w-full bg-gray-200 py-8 px-10 md:px-20  grid  grid-cols-1 md:grid-cols-2 items-start gap-4">
        <div className="flex justify-start items-start mx-auto">
          <img
            src="/images/icons/outline/cocktail.svg"
            className="w-16 h-24 md:w-auto md:h-auto"
          />
          <div className="mx-4">
            <h3 className="text-xl font-semibold text-primary-dark my-2 ">
              {t("hostingEvent")}
            </h3>
            <p className="text-base font-normal text-black w-full">
              {t("hostingEventDisc")}
            </p>
            <button className="my-2 btn-primary-light py-2 md:py-4 px-4 md:px-8 font-medium">
              {t("requestPricing")}
            </button>
          </div>
        </div>
        <div className="flex justify-start items-start mx-auto">
          <img
            src="/images/icons/outline/meeting.svg"
            className="w-16 h-24 md:w-auto md:h-auto"
          />
          <div className="mx-4">
            <h3 className="text-xl font-semibold text-primary-dark my-2 ">
              {t("travelGroup")}
            </h3>
            <p className="text-base font-normal text-black w-full">
              {t("travelGroupDisc")}
            </p>
            <button className="my-2 btn-primary-light py-2 md:py-4 px-4 md:px-8  font-medium">
              {t("bookRoomBlock")}
            </button>
          </div>
        </div>
      </section>
      <section className="my-10 w-full">
        <h2 className="text-2xl font-bold text-primary-dark text-center">
          {t("venues")}
        </h2>
        <div className="border border-t-0 border-l-0 border-r-0 border-gray-400 my-5 py-5 px-5 flex justify-center items-center">
          <button
            onClick={() => {
              setActiveTab("banquet");
            }}
            className={clsx(
              activeTab === "banquet" ? styles.active : "",
              styles.tab,
              "text-base md:text-sm lg:text-lg mx-2 md:mx-3 lg:mx-3"
            )}
          >
            {t("banquet")}
          </button>
          <button
            onClick={() => {
              setActiveTab("conference");
            }}
            className={clsx(
              activeTab === "conference" ? styles.active : "",
              styles.tab,
              "text-base md:text-sm lg:text-lg mx-2 md:mx-3 lg:mx-3"
            )}
          >
            {t("conference")}
          </button>
          <button
            onClick={() => {
              setActiveTab("square");
            }}
            className={clsx(
              activeTab === "square" ? styles.active : "",
              styles.tab,
              "text-base md:text-sm lg:text-lg mx-2 md:mx-3 lg:mx-3"
            )}
          >
            {t("square")}
          </button>
          <button
            onClick={() => {
              setActiveTab("reception");
            }}
            className={clsx(
              activeTab === "reception" ? styles.active : "",
              styles.tab,
              "text-base md:text-sm lg:text-lg mx-2 md:mx-3 lg:mx-3"
            )}
          >
            {t("reception")}
          </button>
          <button
            onClick={() => {
              setActiveTab("class_room");
            }}
            className={clsx(
              activeTab === "class_room" ? styles.active : "",
              styles.tab,
              "text-base md:text-sm lg:text-lg mx-2 md:mx-3 lg:mx-3"
            )}
          >
            {t("class_room")}
          </button>
          <button
            onClick={() => {
              setActiveTab("theatre");
            }}
            className={clsx(
              activeTab === "theatre" ? styles.active : "",
              styles.tab,
              "text-base md:text-sm lg:text-lg mx-2 md:mx-3 lg:mx-3"
            )}
          >
            {t("theatre")}
          </button>
          <button
            onClick={() => {
              setActiveTab("u_shape");
            }}
            className={clsx(
              activeTab === "u_shape" ? styles.active : "",
              styles.tab,
              "text-base md:text-sm lg:text-lg mx-2 md:mx-3 lg:mx-3"
            )}
          >
            {t("u_shape")}
          </button>
        </div>
        <div className="flex flex-wrap justify-center items-start">
          {meetingRooms.map((meeting) => (
            <div key={meeting.id} className={styles.meeting}>
              <h3 className="capitalize">{meeting?.title[locale]}</h3>
              <h5 className="flex justify-center items-center">
                <FontAwesomeIcon icon={faUser} className="mx-1" />
                <span>
                  {meeting?.guests[activeTab]}{" "}
                  {locale === "en" ? "Guests" : "ضيف"}
                </span>
              </h5>
              <h5 className="flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-rulers"
                  viewBox="0 0 16 16"
                >
                  <path d="M1 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h5v-1H2v-1h4v-1H4v-1h2v-1H2v-1h4V9H4V8h2V7H2V6h4V2h1v4h1V4h1v2h1V2h1v4h1V4h1v2h1V2h1v4h1V1a1 1 0 0 0-1-1H1z" />
                </svg>
                <span>
                  {meeting?.space} {t("sqM")}
                </span>
              </h5>
            </div>
          ))}
        </div>
      </section>
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
