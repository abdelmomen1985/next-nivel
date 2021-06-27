import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import useTranslation from "./../../hooks/useTranslation";
import CustomModal from "./../common/CustomModal/CustomModal";

const ExpectSection = () => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <>
      <section className="w-full px-5 text-center py-5 bg-secondary-light text-black flex justify-center items-center">
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          className="text-primary-dark"
        />
        <h3 className="mx-1 text-xl font-semibold">{t("what2Expect")}</h3>
        <button
          onClick={() => setOpenModal(true)}
          className="bg-transparent underline text-primary-dark text-lg font-medium mx-1 capitalize"
        >
          {t("readMore")}
        </button>
        <CustomModal
          show={openModal}
          onClose={() => setOpenModal(false)}
          closeWithin
          title={{
            ar: "رسالة الفندق",
            en: "Hotel Message",
          }}
          style={{
            top: "5rem",
            zIndex: "9999",
          }}
        >
          <div className="text-center my-3">
            <h3 className="font-semibold my-4 text-lg">
              What To Expect During Your Visit
            </h3>
            <p className="text-base font-normal my-3">
              We are committed to providing a safe, enjoyable experience from
              check-in to check-out. Learn more at Hilton.com/CleanStay. Face
              coverings may be required. Please contact the hotel for more
              information.
            </p>
            <p className="text-base font-normal my-3">
              <span className="font-medium">Available:</span>
              <span>
                {" "}
                Business Center, Concierge, Fitness Center, Room Service, Valet
                Parking.
              </span>
            </p>
            <p className="text-base font-normal my-3">
              Available but with{" "}
              <span className="font-medium">modified service:</span> Breakfast.{" "}
            </p>
            <p className="text-base font-normal my-3">
              Temporarily
              <span className="font-medium">not available:</span>
              Airport Shuttle, Complimentary Evening Social, Executive Lounge,
              Golf, On-site Restaurant(s), Pool, Spa.\
            </p>
          </div>
        </CustomModal>
      </section>
    </>
  );
};

export default ExpectSection;
