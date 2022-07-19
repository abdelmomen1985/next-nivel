import Link from "next/link";
import { StrpRoomType } from "../../types/strpRoom";
import { useSpeech } from "./../../hooks/useSpeech";
import useTranslation from "./../../hooks/useTranslation";
import styles from "./home.module.scss";

const RoomsNdSuits = ({
  rooms,
  remoteSchemaUrl,
}: {
  rooms: StrpRoomType[];
  remoteSchemaUrl: string;
}) => {
  const { t, locale } = useTranslation();
  const { speechHandler } = useSpeech();
  const roomsToSort = [...rooms];

  return (
    <section className="bg-gray-light md:px-10 py-5 px-5 md:py-10 my-4">
      <h3
        onMouseEnter={() => speechHandler(t("roomsNdSuites"))}
        className="my-3 text-center text-primary-dark text-xl font-bold"
      >
        {t("roomsNdSuites")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
        {roomsToSort
          ?.sort((a, b) =>
            a.sorter > b.sorter ? 1 : b.sorter > a.sorter ? -1 : 0
          )
          ?.map((room, i) => (
            <div
              className={styles.roomCard}
              key={i}
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.1) 60%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0.8) 100%), url(${remoteSchemaUrl}${room.images[0].url})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                width: "90%",
                height: "300px",
              }}
            >
              <h3
                style={{
                  position: "absolute",
                  bottom: "2rem",
                  left: 0,
                  right: 0,
                  margin: "0 auto",
                  textAlign: "center",
                  color: "#fff",
                  fontSize: "1.4rem",
                  fontWeight: 600,
                }}
                onMouseEnter={() => speechHandler(room.name[locale])}
              >
                {room.name[locale]}
              </h3>
            </div>
          ))}
      </div>
      <Link href={`/${locale}/rooms`}>
        <a
          onMouseEnter={() => speechHandler(t("viewRooms"))}
          className="btn-primary-light text-white text-lg w-10/12 lg:w-1/5 text-center font-semibold capitalize mx-auto my-5 block"
        >
          {t("viewRooms")}
        </a>
      </Link>
    </section>
  );
};

export default RoomsNdSuits;
