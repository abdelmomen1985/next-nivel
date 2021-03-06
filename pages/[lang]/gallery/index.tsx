import { GetServerSideProps } from "next";
import { useContext, useState } from "react";
//@ts-ignore
import { getLocalizationProps } from "../../../context/LangContext";
import { getRemoteSchemaUrl } from "../../../data/remoteSchemaUrl";
import Layout from "../../../Layouts/Layout";
import { LayoutType } from "../../../types/layout";
import CustomModal from "./../../../components/common/CustomModal/CustomModal";
import GalleryCategory from "./../../../components/Gallery/GalleryCategory";
import GalleryDetails from "./../../../components/Gallery/GalleryDetails";
import { AppContext } from "./../../../context/AppContext";
import useTranslation from "./../../../hooks/useTranslation";
import { initializeApollo } from "./../../../lib/apolloClient";
import { LOAD_GALLERY } from "./../../../query/gallery";
import styles from "./gallery.module.scss";

const GalleryPage = ({
  galleryCats,
  layout,
  query,
}: {
  galleryCats: any;
  layout: LayoutType;
  query: any;
}) => {
  const { t } = useTranslation();
  const { isMobile } = useContext(AppContext);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [galleryDetails, setGalleryDetails] = useState<any>(undefined);
  const galleryToSort = [...galleryCats];

  return (
    <Layout layout={layout}>
      {/* <h3 className="text-center text-black font-semibold text-xl">
        {t("gallery")}
      </h3>
      <h5 className="text-center my-1 text-base font-normal">
        {t("galleryDisc")}
      </h5>
      <hr className="my-10 w-full" /> */}
      {/**
       * SPA WORKAROUND
       * fea5cba7-9ae6-41bd-971f-a6d80e89e056
       */}
      <div className={styles.galleryContainer}>
        {galleryToSort
          ?.sort((a, b) =>
            a.sorter > b.sorter ? 1 : b.sorter > a.sorter ? -1 : 0
          )
          .map((cat: any) => (
            <>
              {query?.spa &&
                cat?.id === "fea5cba7-9ae6-41bd-971f-a6d80e89e056" && (
                  <GalleryCategory
                    cat={cat}
                    setGalleryDetails={setGalleryDetails}
                    setOpenModal={setOpenModal}
                    styles={styles}
                    key={cat?.id}
                  />
                )}
              {!query?.spa && (
                <GalleryCategory
                  cat={cat}
                  setGalleryDetails={setGalleryDetails}
                  setOpenModal={setOpenModal}
                  styles={styles}
                  key={cat?.id}
                />
              )}
            </>
          ))}
      </div>
      <CustomModal
        closeWithin={true}
        wrapperStyle={{ zIndex: "9999" }}
        style={{
          width: "75%",
          overflowY: "auto",
          maxHeight: "95vh",
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
        <GalleryDetails galleryDetails={galleryDetails} />
      </CustomModal>
    </Layout>
  );
};
export default GalleryPage;

const getAnyProps = async (ctx: any) => {
  const { query } = ctx;
  const localization = getLocalizationProps(ctx, "common");
  const client = initializeApollo();
  const resp = await client.query({ query: LOAD_GALLERY });
  const remoteSchemaUrl = await getRemoteSchemaUrl();

  return {
    props: {
      query,
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
