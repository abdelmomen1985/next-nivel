import clsx from "clsx";
import CustomMD from "../common/CustomMD";
import { useSpeech } from "./../../hooks/useSpeech";
import useTranslation from "./../../hooks/useTranslation";

const StatsSection = ({ home }: { home: any }) => {
  const { t, locale } = useTranslation();
  const { speechHandler } = useSpeech();
  return (
    <section className="px-8 py-10 mt-0 mb-5 bg-gray-light">
      <div className="flex flex-wrap  justify-start md:justify-between lg:justify-between items-center lg:items-start mx-3 md:mx-16">
        <div className="mx-2">
          <img
            style={{ width: "180px" }}
            src="https://i.imgur.com/Fx9rc4a.png"
            alt=""
          />
        </div>
        <div className="mx-2 lg:mx-auto my-2 lg:my-0">
          <h4
            onMouseEnter={() => speechHandler(t("reviews"))}
            className="text-gray-dark text-lg uppercase font-medium  text-primary-dark"
          >
            {t("reviews")}
          </h4>
          <p
            onMouseEnter={() => speechHandler(t("basedOn"))}
            className="text-primary-dark"
          >
            {t("basedOn")}
          </p>
          <h5>
            <span onMouseEnter={() => speechHandler("4.5")}>4.5</span>
            <span className="mx-1">|</span>
            <span
              onMouseEnter={() => speechHandler(`5 ${t("reviews")}`)}
              className="text-primary-dark"
            >
              5 {t("reviews")}
            </span>
          </h5>
        </div>
        <div className="mx-0 md:mx-16 lg:mx-auto my-2 lg:my-0">
          <h4
            onMouseEnter={() => speechHandler(t("callUs"))}
            className="text-gray-dark text-lg uppercase font-medium"
          >
            {t("callUs")}
          </h4>
          <h5
            style={{ direction: "ltr" }}
            onMouseEnter={() => speechHandler("+966-920012502")}
            className="text-black text-lg mt-1 text-left"
          >
            +966-920012502
          </h5>
          {/** 
          <h5
            style={{ direction: "ltr" }}
            onMouseEnter={() => speechHandler("+966-17-2232008")}
            className="text-black text-lg text-left"
          >
            +966-17-2232008
          </h5>
          <h5
            style={{ direction: "ltr" }}
            onMouseEnter={() => speechHandler("+966-17-2232007")}
            className="text-black text-lg text-left"
          >
            +966-17-2232007
          </h5>
          <h5
            style={{ direction: "ltr" }}
            onMouseEnter={() => speechHandler("+966-17-2232006")}
            className="text-black text-lg text-left"
          >
            +966-17-2232006
          </h5>
          <h5
            style={{ direction: "ltr" }}
            onMouseEnter={() => speechHandler("+966-17-2232005")}
            className="text-black text-lg text-left"
          >
            +966-17-2232005
          </h5>
          */}
        </div>
        <div className="mx-0 lg:mx-auto my-2 w-full md:w-1/2 lg:w-1/4 lg:my-0">
          <h4
            onMouseEnter={() => speechHandler(t("address"))}
            className="text-gray-dark text-lg uppercase font-medium"
          >
            {t("address")}
          </h4>
          <CustomMD
            options={{
              overrides: {
                p: { props: { className: "text-black text-lg mt-1 w-full" } },
              },
            }}
            markdown={home[`address_${locale}`]}
          />
          <h4
            onMouseEnter={() => speechHandler(t("email"))}
            className="text-gray-dark text-lg uppercase font-medium"
          >
            {t("email")}
          </h4>
          <h5
            style={{ direction: "ltr" }}
            onMouseEnter={() => speechHandler("info@nivelhotels.com")}
            className="text-black text-lg text-left"
          >
            info@nivelhotels.com
          </h5>
        </div>
        <div className="mx-0 lg:mx-auto my-2 lg:my-0">
          <h4
            onMouseEnter={() => speechHandler(t("arrivalTime"))}
            className="text-gray-dark text-lg uppercase font-medium"
          >
            {t("arrivalTime")}
          </h4>
          <div className="flex justify-center  items-center mt-1">
            <div
              className={clsx(
                locale === "en" ? "border-r pr-4" : "border-l pl-4",
                "border-gray-400  mx-1"
              )}
            >
              <h3
                onMouseEnter={() => speechHandler(t("checkIn"))}
                className="text-black text-base md:text-lg font-medium"
              >
                {t("checkIn")}
              </h3>
              <h5
                onMouseEnter={() => speechHandler("4:00 PM")}
                className="text-gray-400 text-base md:text-lg font-medium"
              >
                2:00 PM
              </h5>
            </div>
            <div className="mx-1">
              <h3
                onMouseEnter={() => speechHandler(t("checkOut"))}
                className="text-black text-base md:text-lg font-medium"
              >
                {t("checkOut")}
              </h3>
              <h5
                onMouseEnter={() => speechHandler("5:00 PM")}
                className="text-gray-400 text-base md:ext-lg font-medium"
              >
                12:00 PM
              </h5>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
