import { useLazyQuery } from "@apollo/client";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSideProps } from "next";
import { useContext, useState } from "react";
import RoomDetails from "../../../components/Rooms/RoomDetails";
import { getLocalizationProps } from "../../../context/LangContext";
import { getRemoteSchemaUrl } from "../../../data/remoteSchemaUrl";
import { LOAD_ROOMS_BY_RATES, ROOM_AMENITIES } from "../../../query/rooms";
import { LayoutType } from "../../../types/layout";
import { RoomType } from "../../../types/rooms";
import CustomModal from "./../../../components/common/CustomModal/CustomModal";
import RoomCard from "./../../../components/Rooms/RoomCard";
import { AppContext } from "./../../../context/AppContext";
import { useSpeech } from "./../../../hooks/useSpeech";
import useTranslation from "./../../../hooks/useTranslation";
import Layout from "./../../../Layouts/Layout";
import { initializeApollo } from "./../../../lib/apolloClient";
import styles from "./rooms.module.scss";

const RoomsPage = ({
  roomsData,
  layout,
}: {
  roomsData: RoomType[];
  layout: LayoutType;
}) => {
  const { t } = useTranslation();
  const { isMobile, isTablet } = useContext(AppContext);
  const [currentRooms] = useState<any[]>([...roomsData]);

  const [roomDetails, setRoomDetails] = useState<any>(undefined);
  const [openModal, setOpenModal] = useState(false);
  const [roomAmenitiesState, setRoomAmenitiesState] = useState<any[]>([]);
  const [fetchRoomAmenities, { data: roomAmenitiesData }] = useLazyQuery(
    ROOM_AMENITIES,
    {
      fetchPolicy: "no-cache",
      onCompleted() {
        console.log(roomAmenitiesData, "roomAmenitiesData");
        setRoomAmenitiesState([...roomAmenitiesData.roomAmenities]);
      },
      onError(err) {
        console.log(err);
      },
    }
  );
  const selectRoomHandler = (room: any) => {
    setRoomDetails({ ...room });
    setRoomAmenitiesState([]);

    fetchRoomAmenities({
      variables: {
        room_id: room?.RelWithStrapiRoom?.id,
      },
    });
    setOpenModal(true);
  };
  const { speechHandler } = useSpeech();
  return (
    <Layout layout={layout}>
      <h2
        onMouseEnter={() => speechHandler(t("roomsNdSuites"))}
        className="text-lg md:text-xl lg:text-4xl font-bold mt-10 mb-10 text-primary-dark text-center"
      >
        {t("roomsNdSuites")}
      </h2>

      <div className="mt-10 mb-5">
        <div className={styles.alert}>
          <FontAwesomeIcon icon={faCheckCircle} className="mx-1" />
          <p
            onMouseEnter={() => speechHandler(t("roomsDesc"))}
            className="mx-1 text-base font-semibold"
          >
            {t("roomsDesc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentRooms
            .sort((a, b) =>
              a.RelWithStrapiRoom?.sorte > b.RelWithStrapiRoom?.sorter
                ? 1
                : b.RelWithStrapiRoom?.sorter > a.RelWithStrapiRoom?.sorter
                ? -1
                : 0
            )
            .map((room, i) => (
              <>
                {room.RelWithStrapiRoom && (
                  <>
                    <RoomCard
                      purpose="view"
                      key={i}
                      room={room}
                      selectRoom={selectRoomHandler}
                      remoteUrl={layout?.remoteSchemaUrl}
                    />
                  </>
                )}
              </>
            ))}
        </div>
      </div>

      <CustomModal
        closeWithin={true}
        wrapperStyle={{ zIndex: "9999", overflowY: "hidden" }}
        style={{
          width: "80%",
          overflowY: "hidden",
          maxHeight: "100%",
          top: isMobile || isTablet ? "0rem" : "3rem",
          zIndex: "9999",
        }}
        title={roomDetails?.RelWithStrapiRoom?.name}
        show={openModal && roomDetails !== undefined}
        onClose={() => {
          setOpenModal(false);
          setRoomDetails(undefined);
        }}
      >
        <RoomDetails
          roomDetails={roomDetails}
          roomAmenities={roomAmenitiesState}
          remoteUrl={layout?.remoteSchemaUrl}
        />
      </CustomModal>
      <div className="mt-4">
        <br />
      </div>
    </Layout>
  );
};

export default RoomsPage;

export const getAnyProps = async (ctx: any) => {
  const localization = getLocalizationProps(ctx, "common");
  const remoteSchemaUrl = await getRemoteSchemaUrl();
  const client = initializeApollo();
  const resp = await client.query({ query: LOAD_ROOMS_BY_RATES });

  return {
    props: {
      localization,
      roomsData: resp?.data?.room_rates,
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
