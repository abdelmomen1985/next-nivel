import { GetStaticPaths, GetStaticProps } from "next";
import React, { useState } from "react";
import Layout from "../../../Layouts/Layout";
import { getLocalizationProps } from "../../../context/LangContext";
import clsx from "clsx";
import styles from "./rooms.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import CustomModal from "./../../../components/common/CustomModal/CustomModal";
//@ts-ignore
import { Slide } from "react-slideshow-image";
import { useContext } from "react";
import { AppContext } from "./../../../context/AppContext";
const rooms = [
  {
    images: [
      "/images/rooms/1.png",
      "/images/rooms/2.png",
      "/images/rooms/3.png",
    ],
    title: "King Guest Room City View",
    description:
      " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    highlights: [
      "Sleeps 2",
      "Dining table",
      "Mini refrigerator",
      "Hand-held shower",
      "Sofa bed",
      "300 thread count sheets",
    ],
  },
  {
    images: [
      "/images/rooms/2.png",
      "/images/rooms/3.png",
      "/images/rooms/1.png",
    ],
    title: "King Room Nile view",
    description:
      " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    highlights: [
      "Sleeps 2",
      "Dining table",
      "Mini refrigerator",
      "Hand-held shower",
      "Sofa bed",
      "300 thread count sheets",
    ],
  },
  {
    images: [
      "/images/rooms/3.png",
      "/images/rooms/1.png",
      "/images/rooms/2.png",
    ],
    title: "twin guest room city view",
    description:
      " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    highlights: [
      "Sleeps 3",
      "Dining table",
      "Mini refrigerator",
      "Hand-held shower",
      "Sofa bed",
      "300 thread count sheets",
    ],
  },
  {
    images: [
      "/images/rooms/2.png",
      "/images/rooms/3.png",
      "/images/rooms/1.png",
    ],
    title: "Twin Guest Room Nile view",
    description:
      " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    highlights: [
      "Sleeps 3",
      "Dining table",
      "Mini refrigerator",
      "Hand-held shower",
      "Sofa bed",
      "300 thread count sheets",
    ],
  },
  {
    images: [
      "/images/rooms/3.png",
      "/images/rooms/1.png",
      "/images/rooms/2.png",
    ],
    title: "Triple guest room city view",
    description:
      " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    highlights: [
      "Sleeps 3",
      "Dining table",
      "Mini refrigerator",
      "Hand-held shower",
      "Sofa bed",
      "300 thread count sheets",
    ],
  },
  {
    images: [
      "/images/rooms/1.png",
      "/images/rooms/2.png",
      "/images/rooms/3.png",
    ],
    title: "Triple Guest Room Nile View",
    description:
      " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    highlights: [
      "Sleeps 3",
      "Dining table",
      "Mini refrigerator",
      "Hand-held shower",
      "Sofa bed",
      "300 thread count sheets",
    ],
  },
] as any[];
const suites = [
  {
    images: [
      "/images/rooms/1.png",
      "/images/rooms/2.png",
      "/images/rooms/3.png",
    ],
    title: "King one bedroom suite pyramids view",
    description:
      "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    highlights: [
      "Sleeps 4",
      "Dining table",
      "Mini refrigerator",
      "Hand-held shower",
      "Sofa bed",
      "300 thread count sheets",
    ],
  },
  {
    images: [
      "/images/rooms/2.png",
      "/images/rooms/3.png",
      "/images/rooms/1.png",
    ],
    title: "two bedroom suite pyramids view",
    description:
      " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    highlights: [
      "Sleeps 4",
      "Dining table",
      "Mini refrigerator",
      "Hand-held shower",
      "Sofa bed",
      "300 thread count sheets",
    ],
  },
  {
    images: [
      "/images/rooms/1.png",
      "/images/rooms/2.png",
      "/images/rooms/3.png",
    ],
    title: "King one bedroom suite city view",
    description:
      "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    highlights: [
      "Sleeps 4",
      "Dining table",
      "Mini refrigerator",
      "Hand-held shower",
      "Sofa bed",
      "300 thread count sheets",
    ],
  },
  {
    images: [
      "/images/rooms/2.png",
      "/images/rooms/3.png",
      "/images/rooms/1.png",
    ],
    title: "two bedroom suite city view",
    description:
      " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    highlights: [
      "Sleeps 4",
      "Dining table",
      "Mini refrigerator",
      "Hand-held shower",
      "Sofa bed",
      "300 thread count sheets",
    ],
  },
] as any[];
const accessible = [
  {
    images: [
      "/images/rooms/1.png",
      "/images/rooms/2.png",
      "/images/rooms/3.png",
    ],
    title: "Accessible bedroom suite pyramids view",
    description:
      "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    highlights: [
      "Sleeps 5",
      "Dining table",
      "Mini refrigerator",
      "Hand-held shower",
      "Sofa bed",
      "300 thread count sheets",
    ],
  },
  {
    images: [
      "/images/rooms/2.png",
      "/images/rooms/3.png",
      "/images/rooms/1.png",
    ],
    title: "Accessible two bedroom suite pyramids view",
    description:
      " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    highlights: [
      "Sleeps 5",
      "Dining table",
      "Mini refrigerator",
      "Hand-held shower",
      "Sofa bed",
      "300 thread count sheets",
    ],
  },
  {
    images: [
      "/images/rooms/1.png",
      "/images/rooms/2.png",
      "/images/rooms/3.png",
    ],
    title: "Accessible bedroom suite city view",
    description:
      "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    highlights: [
      "Sleeps 5",
      "Dining table",
      "Mini refrigerator",
      "Hand-held shower",
      "Sofa bed",
      "300 thread count sheets",
    ],
  },
  {
    images: [
      "/images/rooms/2.png",
      "/images/rooms/3.png",
      "/images/rooms/1.png",
    ],
    title: "Accessible two bedroom suite city view",
    description:
      " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    highlights: [
      "Sleeps 5",
      "Dining table",
      "Mini refrigerator",
      "Hand-held shower",
      "Sofa bed",
      "300 thread count sheets",
    ],
  },
] as any[];

const RoomsPage = () => {
  const [currentShow, setCurrentShow] = useState<any[]>([...rooms]);
  const [activeTab, setActiveTab] = useState(1);
  const [modalDetails, setModalDetails] = useState<any>(undefined);
  const [openModal, setOpenModal] = useState(false);
  const { isMobile } = useContext(AppContext);
  return (
    <Layout>
      <h2 className="text-4xl font-bold mt-10 mb-10 text-primary-dark text-center">
        Rooms and Suites
      </h2>
      <div className="border border-t-2 border-l-0 border-r-0 border-gray-400 my-5 py-5 px-5 flex justify-center items-center">
        <button
          onClick={() => {
            setActiveTab(1);
            setCurrentShow([...rooms]);
          }}
          className={clsx(activeTab === 1 ? styles.active : "", styles.tab)}
        >
          guest rooms
        </button>
        <button
          onClick={() => {
            setActiveTab(2);
            setCurrentShow([...suites]);
          }}
          className={clsx(activeTab === 2 ? styles.active : "", styles.tab)}
        >
          suites
        </button>
        <button
          onClick={() => {
            setActiveTab(3);
            setCurrentShow([...accessible]);
          }}
          className={clsx(activeTab === 3 ? styles.active : "", styles.tab)}
        >
          Accessible
        </button>
      </div>
      <div className="mt-10 mb-5">
        <div className={styles.alert}>
          <FontAwesomeIcon icon={faCheckCircle} className="mx-1" />
          <p className="mx-1 text-base font-semibold">
            We're showing tonight's availability. Select your dates for updated
            results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentShow.map((room, i) => (
            <div
              key={i}
              onClick={() => {
                setModalDetails({ ...room });
                setOpenModal(true);
              }}
              className="border border-gray-400 my-5 mx-auto w-11/12 cursor-pointer"
            >
              <img src={room.images[0]} className="w-full" />
              <div className="mt-2 py-2 px-2">
                <h2 className="text-xl my-4 font-semibold text-primary-dark text-center capitalize">
                  {room.title}
                </h2>
                <button className="btn-primary-dark text-white py-3 text-xl font-semibold  px-5 w-11/12 mx-auto block">
                  Room Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CustomModal
        closeWithin={true}
        wrapperStyle={{ zIndex: "9999" }}
        style={{
          width: "80%",
          overflowY: "auto",
          maxHeight: "100%",
          top: 0,
          zIndex: "9999",
        }}
        title={modalDetails?.title}
        show={openModal && modalDetails !== undefined}
        onClose={() => {
          setOpenModal(false);
          setModalDetails(undefined);
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-start mx-1 my-1">
          <div className="mx-2">
            <Slide
              easing="ease-in"
              transitionDuration={500}
              arrows={isMobile ? false : true}
              autoplay={false}
            >
              {modalDetails?.images.map((img: any, i: number) => (
                <img src={img} key={i} className="w-full h-full" />
              ))}
            </Slide>
          </div>
          <div className="mx-2 px-3 py-2 ">
            <p>{modalDetails?.description}</p>
            <button className="btn-primary-dark my-3 py-5 w-2/4 text-xl font-semibold">
              Check Rates
            </button>
            <hr />
            <div className="my-3 px-2">
              <h5 className="text-black text-xl font-medium">
                Room Highlights
              </h5>
              <ul className="my-2 list-disc mx-5">
                {modalDetails?.highlights.map(
                  (highlight: string, i: number) => (
                    <li key={i}>{highlight}</li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </CustomModal>
    </Layout>
  );
};

export default RoomsPage;

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
