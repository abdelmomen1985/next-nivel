import React from "react";
import useTranslation from "../../../hooks/useTranslation";
import ChildAlert from "../ChildAlert";
import { useSpeech } from "./../../../hooks/useSpeech";

const SecondBookingStep = ({
  selectedRoom,
  filterValues,
  pickPackageHandler,
}: {
  selectedRoom: any;
  filterValues: any;
  pickPackageHandler: (pack: any) => void;
}) => {
  const { t, locale } = useTranslation();
  const { speechHandler } = useSpeech();
  console.log("selectedRoom", selectedRoom);
  return (
    <section className="w-full mx-auto lg:mx-12">
      <ChildAlert />
      <div className="py-5 flex justify-between items-center mx-5 my-5 border border-gray-200 border-l-0 border-r-0 px-5">
        <h3
          onMouseEnter={() => speechHandler(t("bestAvRate"))}
          className="text-lg md:text-2xl text-black font-normal capitalize"
        >
          {t("bestAvRate")}
        </h3>
        <div>
          <h2
            onMouseEnter={() =>
              speechHandler(
                `${selectedRoom?.basePrice?.base_price} ${t("sar")}`
              )
            }
            className="text-black text-center text-xl font-bold"
          >
            {selectedRoom?.basePrice?.base_price} {t("sar")}
          </h2>
          <button
            onMouseEnter={() => speechHandler(t("book"))}
            onClick={() => pickPackageHandler(selectedRoom?.basePrice)}
            className="my-4 bg-outline-primary-light text-primary-light capitalize text-lg font-medium px-10 py-2 rounded-lg"
          >
            {t("book")}
          </button>
        </div>
      </div>
      <div className="w-full my-8">
        <div className="flex justify-start items-baseline mt-2 my-5 mx-5 px-5">
          <h3
            onMouseEnter={() => speechHandler(t("makeItPackage"))}
            className="mx-1 text-xl font-medium"
          >
            {t("makeItPackage")}
          </h3>
          <hr className="w-2/3" />
        </div>
        {selectedRoom?.packagePrices.length > 0 &&
          selectedRoom?.packagePrices.map((pack: any, index: number) => (
            <div
              key={index}
              className="py-5 flex justify-between items-center mx-5 my-5 border border-gray-200 border-t-0 border-l-0 border-r-0 px-5"
            >
              <h3
                onMouseEnter={() => speechHandler(pack?.rate?.title[locale])}
                className="text-lg md:text-2xl text-black font-normal"
              >
                {pack?.rate?.title[locale]}
              </h3>
              <div>
                <h2
                  onMouseEnter={() =>
                    speechHandler(`${pack.base_price} ${t("sar")}`)
                  }
                  className="text-black text-center text-xl font-bold"
                >
                  {pack.base_price} {t("sar")}
                </h2>
                <button
                  onMouseEnter={() => speechHandler(t("book"))}
                  onClick={() => pickPackageHandler(pack)}
                  className="my-4 bg-outline-primary-light text-primary-light text-lg capitalize font-medium px-10 py-2 rounded-lg"
                >
                  {t("book")}
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default SecondBookingStep;
