import { GetServerSideProps } from "next";
import React, { useContext, useState } from "react";
//@ts-ignore
import { Slide } from "react-slideshow-image";
import { getLocalizationProps } from "../../../context/LangContext";
import { getRemoteSchemaUrl } from "../../../data/remoteSchemaUrl";
import Layout from "../../../Layouts/Layout";
import { LayoutType } from "../../../types/layout";
import CustomModal from "./../../../components/common/CustomModal/CustomModal";
import { AppContext } from "./../../../context/AppContext";
import useTranslation from "./../../../hooks/useTranslation";
import { initializeApollo } from "./../../../lib/apolloClient";
import { LOAD_GALLERY } from "./../../../query/gallery";
import styles from "./gallery.module.scss";

const GalleryPage = ({
  galleryCats,
  layout,
}: {
  galleryCats: any;
  layout: LayoutType;
}) => {
  const { t, locale } = useTranslation();
  const { isMobile } = useContext(AppContext);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [galleryDetails, setGalleryDetails] = useState<any>(undefined);
  return (
    <Layout layout={layout}>
      <h3 className="text-center text-black font-semibold text-xl">
        {t("gallery")}
      </h3>
      <h5 className="text-center my-1 text-base font-normal">
        {t("galleryDisc")}
      </h5>
      <hr className="my-10 w-full" />
      <div className={styles.galleryContainer}>
        {galleryCats.map((cat: any) => (
          <figure
            onClick={() => {
              setGalleryDetails(cat);
              setOpenModal(true);
            }}
            key={cat.id}
            className={styles.categoryContainer}
          >
            <img src={cat.media.images[0].url} alt={cat.title[locale]} />
            <figcaption>
              <h2>{cat.title[locale]}</h2>
              {cat.description && <p>{cat.description[locale]}</p>}
            </figcaption>
          </figure>
        ))}
      </div>
      <CustomModal
        closeWithin={true}
        wrapperStyle={{ zIndex: "9999" }}
        style={{
          width: "80%",
          overflowY: "auto",
          maxHeight: "100%",
          top: isMobile ? 0 : "4rem",
          zIndex: "9999",
        }}
        title={galleryDetails?.title}
        show={openModal && galleryDetails !== undefined}
        onClose={() => {
          setOpenModal(false);
          setGalleryDetails(undefined);
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-5 my-1 items-center">
          <div className="">
            {galleryDetails?.media?.images &&
            galleryDetails?.media?.images?.length > 0 ? (
              <Slide
                easing="ease-in"
                transitionDuration={500}
                arrows={isMobile ? false : true}
                autoplay={false}
              >
                {galleryDetails?.media?.images.map((img: any, i: number) => (
                  <img src={img?.url} key={i} className="w-full h-full" />
                ))}
              </Slide>
            ) : (
              <img src="https://i.imgur.com/bDujVXa.jpg" />
            )}
          </div>
          <div>
            <h3 className="text-primary-dark text-lg font-medium my-2">
              {galleryDetails?.title[locale]}
            </h3>
            <p className="text-black text-base font-normal">
              {galleryDetails?.description[locale]}
            </p>
          </div>
        </div>
      </CustomModal>
    </Layout>
  );
};
export default GalleryPage;

const getAnyProps = async (ctx: any) => {
  const localization = getLocalizationProps(ctx, "common");
  const client = initializeApollo();
  const resp = await client.query({ query: LOAD_GALLERY });
  const remoteSchemaUrl = await getRemoteSchemaUrl();

  return {
    props: {
      localization,
      galleryCats: resp?.data?.gallery,
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
