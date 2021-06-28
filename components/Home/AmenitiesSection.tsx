import React from "react";
import { AmenityType } from "../../types/amenities";
import useTranslation from "./../../hooks/useTranslation";

const AmenitiesSection = ({
  amenities,
  defaultUrl,
}: {
  amenities: AmenityType[];
  defaultUrl?: string;
}) => {
  const { t, locale } = useTranslation();

  return (
    <section className="mt-10 mb-5  w-full">
      <h3 className="text-center text-2xl text-black font-semibold mb-5">
        {t("ourAmenities")}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-4 items-center">
        {amenities.map((amenity, i) => (
          <div
            key={i}
            className="flex flex-col justify-between mx-auto md:mx-2 my-2 rounded-md w-11/12 border py-4 px-4 h-full border-gray-400"
          >
            <img
              src={
                amenity?.media.length > 0
                  ? `${defaultUrl}${amenity?.media[0]?.url}`
                  : "https://i.imgur.com/bDujVXa.jpg"
              }
              className="w-16 my-3 mx-auto"
            />
            <h5 className="text-primary-light justify-self-end text-center mx-auto mb-2 text-lg font-medium capitalize">
              {amenity.name[locale]}
            </h5>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AmenitiesSection;
