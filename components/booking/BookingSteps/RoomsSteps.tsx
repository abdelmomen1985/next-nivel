import clsx from "clsx";
import React from "react";
import styles from "../booking.module.scss";
import { useSpeech } from "./../../../hooks/useSpeech";
import useTranslation from "./../../../hooks/useTranslation";
const RoomsSteps = ({
  rooms,
  currentRoom,
  changeRoom,
  moveToPay,
  isPayable,
  currentStep,
}: {
  rooms: any;
  currentRoom: number;
  changeRoom: (roomNum: number) => void;
  moveToPay: () => void;
  isPayable: boolean;
  currentStep: number;
}) => {
  const { t } = useTranslation();
  const { speechHandler } = useSpeech();
  return (
    <>
      <div className="my-1 w-11/12 flex justify-between items-center mx-auto border-o border-t border-b border-black py-6 ">
        <h5 onMouseEnter={() => speechHandler(t("updateUrRoom"))}>
          {t("updateUrRoom")}
        </h5>
        <h5
          onMouseEnter={() =>
            speechHandler(
              `${t("room")} ${currentRoom + 1} ${t("of")} ${rooms?.length}`
            )
          }
        >
          {t("room")} {currentRoom + 1} {t("of")} {rooms?.length}
        </h5>
      </div>
      <div className="flex justify-start items-center my-2 flex-wrap">
        {rooms.map((room: any, i: number) => (
          <button
            className={clsx(
              styles.buttonStep,
              i === currentRoom && currentStep !== 3 ? styles.active : " "
            )}
            key={i}
            disabled={i > currentRoom}
            onClick={() => changeRoom(i)}
            onMouseEnter={() => speechHandler(`${t("room")} ${i + 1}`)}
          >
            {t("room")} {i + 1}
          </button>
        ))}
        <button
          className={clsx(
            styles.buttonStep,
            rooms.length - 1 === currentRoom ? styles.active : " "
          )}
          disabled={!isPayable || currentStep === 3}
          onClick={() => moveToPay()}
          onMouseEnter={() => speechHandler(t("payment"))}
        >
          {t("payment")}
        </button>
      </div>
    </>
  );
};

export default RoomsSteps;
