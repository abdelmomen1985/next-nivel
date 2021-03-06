import { GetServerSideProps } from "next";
import { useContext, useState } from "react";
import CustomMD from "../../../components/common/CustomMD";
import { getLocalizationProps } from "../../../context/LangContext";
import { getRemoteSchemaUrl } from "../../../data/remoteSchemaUrl";
import { initializeApollo } from "../../../lib/apolloClient";
import { LOAD_RESTAURANTS } from "../../../query/restaurants";
import { LayoutType } from "../../../types/layout";
import { RestaurantType } from "../../../types/restaurant";
import CustomModal from "./../../../components/common/CustomModal/CustomModal";
import { AppContext } from "./../../../context/AppContext";
import { useSpeech } from "./../../../hooks/useSpeech";
import useTranslation from "./../../../hooks/useTranslation";
import Layout from "./../../../Layouts/Layout";
import styles from "./dining.module.scss";

const DiningPage = ({
  layout,
  restaurants,
}: {
  layout: LayoutType;
  restaurants: RestaurantType[];
}) => {
  const { isMobile } = useContext(AppContext);
  const { t, locale } = useTranslation();
  const { speechHandler } = useSpeech();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [restDetails, setRestDetails] = useState<undefined | RestaurantType>(
    undefined
  );
  return (
    <Layout layout={layout}>
      <img
        src="/images/restaurant.jpg"
        className="w-full h-full"
        style={{
          maxHeight: "50vh",
        }}
      />
      <h3
        onMouseEnter={() => speechHandler(t("diningNdDrinks"))}
        className="my-5 py-5 mx-auto text-center text-primary-dark text-3xl font-bold"
      >
        {t("diningNdDrinks")}
      </h3>
      <hr className="w-full my-4" />
      {restaurants.map((resturant, i) => (
        <div key={i} className={styles.resturantContainer}>
          <div className={styles.resturant}>
            <img
              src={layout?.remoteSchemaUrl + resturant?.media[0]?.url}
              className="w-full"
            />
            <div className="mx-5 md:mx-10">
              <h3
                onMouseEnter={() => speechHandler(resturant?.name[locale])}
                className="text-primary-dark text-2xl font-semibold my-2"
              >
                {resturant?.name[locale]}
              </h3>
              <p
                onMouseEnter={() =>
                  speechHandler(resturant[`description_${locale}`]!)
                }
                className="text-black text-base font-normal my-2"
              >
                {resturant[`description_${locale}`]}
              </p>
              <button
                onMouseEnter={() => speechHandler(t("details"))}
                onClick={() => {
                  setRestDetails(resturant);
                  setOpenModal(true);
                }}
                className="btn-primary-light text-white px-10 py-5 rounded-sm block my-3 text-lg font-semibold"
              >
                {t("details")}
              </button>
            </div>
          </div>
        </div>
      ))}

      <CustomModal
        closeWithin={true}
        wrapperStyle={{ zIndex: "9999" }}
        style={{
          width: "80%",
          overflowY: "auto",
          maxHeight: "100%",
          top: isMobile ? 0 : "2rem",
          zIndex: "9999",
        }}
        title={restDetails?.name}
        show={openModal && restDetails !== undefined}
        onClose={() => {
          setOpenModal(false);
          setRestDetails(undefined);
        }}
      >
        <div className="w-full my-3 flex justify-center items-center px-5 mx-3">
          <img
            src={layout?.remoteSchemaUrl + restDetails?.media[0]?.url}
            className="w-2/4 h-2/5"
          />
          <div className="mx-10">
            <h3
              onMouseEnter={() => speechHandler(t("workingHrs"))}
              className="my-3 text-xl font-semibold text-primary-dark capitalize"
            >
              {t("workingHrs")}
            </h3>
            <div>
              {restDetails && (
                <CustomMD
                  options={{
                    overrides: {
                      li: {
                        props: {
                          className: "my-3",
                        },
                      },
                    },
                  }}
                  markdown={restDetails[`working_hrs_${locale}`]}
                />
              )}
            </div>
          </div>
        </div>
      </CustomModal>
    </Layout>
  );
};

export default DiningPage;

export const getAnyProps = async (ctx: any) => {
  const localization = getLocalizationProps(ctx, "common");
  const remoteSchemaUrl = await getRemoteSchemaUrl();
  const client = initializeApollo();
  const resp = await client.query({ query: LOAD_RESTAURANTS });
  console.log(resp?.data);
  return {
    props: {
      localization,
      restaurants: resp?.data?.restaurants,
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
