import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../navigation/navigation.module.scss";
import useTranslation from "./../../hooks/useTranslation";

const BookingFilters = ({
  updateFilters,
  filterValues,
  specialRatesCount,
  setSpecialRatesCount,
}: {
  updateFilters: (filters: any) => void;
  filterValues: any;
  specialRatesCount?: number;
  setSpecialRatesCount?: (val: number) => void;
}) => {
  const { t, locale } = useTranslation();
  const { errors, register, reset, handleSubmit, setValue } = useForm();
  const [showSpecialRate, setShowSpecialRate] = useState(false);
  const [showRoomTypes, setShowRoomTypes] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState("all");
  const [checkAccessibility, setCheckAccessibility] = useState(false);
  const specialRateRef = useRef<HTMLDivElement>(null);
  const roomTypeRef = useRef<HTMLDivElement>(null);
  const handleClick = (e: any) => {
    if (specialRateRef?.current?.contains(e.target)) {
      return;
    }
    if (roomTypeRef?.current?.contains(e.target)) {
      return;
    }
    setShowRoomTypes(false);
    setShowSpecialRate(false);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  useEffect(() => {
    if (filterValues?.selectedRoomType) {
      setSelectedRoomType(filterValues?.selectedRoomType);
    }
    setValue("AARPRate", filterValues?.AARPRate);
    setValue("aaaRate", filterValues?.aaaRate);
    setValue("governmentRates", filterValues?.governmentRates);
    setValue("seniorRate", filterValues?.seniorRate);
    setValue("travelAgents", filterValues?.travelAgents);
    setValue("usePoints", filterValues?.usePoints);
    setValue("corporateAccount", filterValues?.corporateAccount);
    setValue("groupCode", filterValues?.groupCode);
    setValue("promotionCode", filterValues?.promotionCode);
  }, [filterValues]);
  const updateFiltersHandler = (data: any) => {
    updateFilters((prev: any) => ({
      ...prev,
      ...data,
      selectedRoomType,
      accessibility: checkAccessibility,
    }));
  };
  const handleFilterChange = (label: any, value: boolean) => {
    if (value) {
      setSpecialRatesCount!((prev) => prev + 1);
    } else {
      setSpecialRatesCount!((prev) => prev - 1);
    }
    let newFilters = {};
    newFilters[label] = value;
    updateFilters((prev: any) => ({ ...prev, ...newFilters }));
  };
  const amenities = [
    {
      en: "Free WiFi",
      ar: "واي فاي مجاني",
    },
    {
      en: "Non-smoking rooms",
      ar: "غرف لغير المدخنين",
    },
    {
      en: "On-site restaurant",
      ar: "مطعم داخل الفندق",
    },
    {
      en: "Fitness center",
      ar: "مركز لياقة بدنية",
    },
    {
      en: "Business center",
      ar: "مركز لإدارة الأعمال",
    },
  ];
  return (
    <>
      <div className="mx-auto px-8 my-5 w-full flex flex-wrap items-center">
        <h3 className="text-black mx-4 text-lg font-medium">
          {t("stayIncludes")}
        </h3>
        <div
          className={`grid grid-cols-2 justify-start md:grid-cols-${
            amenities.length / 2
          } gap-2 `}
        >
          {amenities.map((amenity, i) => (
            <h5
              key={i}
              className="flex justify-start items-center text-gray-500 text-base font-normal"
            >
              <FontAwesomeIcon icon={faCheck} className="mx-1 font-thin" />
              <span>{amenity[locale]}</span>
            </h5>
          ))}
        </div>
      </div>
      <form
        onSubmit={handleSubmit(updateFiltersHandler)}
        className="w-full grid grid-cols-2 gap-1 md:flex md:flex-wrap md:justify-start md:items-center my-3 mx-auto px-8"
      >
        <div className="mx-2 relative">
          <button
            onClick={() => setShowRoomTypes(true)}
            className="btn-outline-primary-dark text-base md:text-base"
            type="button"
          >
            {t("roomFilters")}
          </button>
          <div
            className={
              showRoomTypes
                ? clsx(
                    styles.datePickerContainer,
                    // styles.roomDetailsContainer,
                    "bg-white px-4 py-2 border-gray-200 shadow-xl border-2"
                  )
                : "hidden"
            }
            ref={roomTypeRef}
          >
            <div className="grid grid-cols-3 gap-1 items-center my-2 mx-1">
              <h5
                onClick={() => setSelectedRoomType("all")}
                className={clsx(
                  selectedRoomType === "all" ? styles.selectedRoom : " ",
                  " capitalize p-5 text-center text-primary-light text-sm md:text-base font-medium cursor-pointer border border-gray-300"
                )}
              >
                {t("all")}
              </h5>
              <h5
                onClick={() => setSelectedRoomType("1bed")}
                className={clsx(
                  selectedRoomType === "1bed" ? styles.selectedRoom : " ",
                  " capitalize p-5 text-center text-primary-light text-sm md:text-base font-medium cursor-pointer border border-gray-300"
                )}
              >
                1 {t("bed")}
              </h5>
              <h5
                onClick={() => setSelectedRoomType("2beds")}
                className={clsx(
                  selectedRoomType === "2beds" ? styles.selectedRoom : " ",
                  " capitalize p-5 text-center text-primary-light text-sm md:text-base font-medium cursor-pointer border border-gray-300"
                )}
              >
                2 {t("bed")}
              </h5>
              <h5
                onClick={() => setSelectedRoomType("suite")}
                className={clsx(
                  selectedRoomType === "suite" ? styles.selectedRoom : " ",
                  " capitalize p-5 text-center text-primary-light text-sm md:text-base font-medium cursor-pointer border border-gray-300"
                )}
              >
                {t("suite")}
              </h5>
            </div>
            <div className="flex justify-end items-center my-t mb-0 mr-2">
              <button
                type="button"
                onClick={() => setShowRoomTypes(false)}
                className="bg-transparent text-gray-dark text-lg font-medium cursor-pointer"
              >
                {t("close")}
              </button>
            </div>
          </div>
        </div>
        <div className="mx-2 relative">
          <button
            onClick={() => setShowSpecialRate(true)}
            className="btn-outline-primary-dark text-base md:text-base"
            type="button"
          >
            {specialRatesCount! > 0 && (
              <span className={styles.notification}>{specialRatesCount}</span>
            )}
            {t("specialRates")}
          </button>
          <div
            className={clsx(
              showSpecialRate ? styles.datePickerContainer : "hidden",
              styles.specialRatesBookingContainer,
              "shadow-xl border-2"
            )}
            ref={specialRateRef}
          >
            <div className="grid grid-cols-3 gap-1 items-center my-2 mx-1">
              <div
                className={clsx(
                  styles.formGroup,
                  "flex justify-start items-center mx-1"
                )}
              >
                <input
                  type="checkbox"
                  onChange={(e: any) =>
                    handleFilterChange("usePoints", e.target.checked)
                  }
                  className="mx-1"
                  ref={register}
                  name="usePoints"
                />
                <label
                  className="text-sm md:text-base text-primary-dark font-medium"
                  htmlFor="usePoints"
                >
                  Use Points
                </label>
              </div>
              <div
                className={clsx(
                  styles.formGroup,
                  "flex justify-start items-center mx-1"
                )}
              >
                <input
                  type="checkbox"
                  onChange={(e: any) =>
                    handleFilterChange("travelAgents", e.target.checked)
                  }
                  className="mx-1"
                  ref={register}
                  name="travelAgents"
                />
                <label
                  className="text-sm md:text-base text-primary-dark font-medium"
                  htmlFor="travelAgents"
                >
                  Agents
                </label>
              </div>
              <div
                className={clsx(
                  styles.formGroup,
                  "flex justify-start items-center mx-1"
                )}
              >
                <input
                  type="checkbox"
                  onChange={(e: any) =>
                    handleFilterChange("aaaRate", e.target.checked)
                  }
                  className="mx-1"
                  ref={register}
                  name="aaaRate"
                />
                <label
                  className="text-sm md:text-base text-primary-dark font-medium"
                  htmlFor="aaaRate"
                >
                  AAA Rate
                </label>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1 items-center my-2 mx-1">
              <div
                className={clsx(
                  styles.formGroup,
                  "flex justify-start items-center mx-1"
                )}
              >
                <input
                  type="checkbox"
                  onChange={(e: any) =>
                    handleFilterChange("AARPRate", e.target.checked)
                  }
                  className="mx-1"
                  ref={register}
                  name="AARPRate"
                />
                <label
                  className="text-sm md:text-base text-primary-dark font-medium"
                  htmlFor="AARPRate"
                >
                  AARP Rate
                </label>
              </div>
              <div
                className={clsx(
                  styles.formGroup,
                  "flex justify-start items-center mx-1"
                )}
              >
                <input
                  type="checkbox"
                  onChange={(e: any) =>
                    handleFilterChange("seniorRate", e.target.checked)
                  }
                  className="mx-1"
                  ref={register}
                  name="seniorRate"
                />
                <label
                  className="text-sm md:text-base text-primary-dark font-medium"
                  htmlFor="seniorRate"
                >
                  Senior Rate
                </label>
              </div>
              <div
                className={clsx(
                  styles.formGroup,
                  "flex justify-start items-center mx-1"
                )}
              >
                <input
                  type="checkbox"
                  onChange={(e: any) =>
                    handleFilterChange("governmentRates", e.target.checked)
                  }
                  className="mx-1"
                  ref={register}
                  name="governmentRates"
                />
                <label
                  className="text-sm md:text-base text-primary-dark font-medium"
                  htmlFor="governmentRates"
                >
                  Gov.Rates
                </label>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 items-center my-2 mx-1">
              <div className="flex flex-col justify-start">
                <label
                  className="text-base text-primary-dark font-medium"
                  htmlFor="promotionCode"
                >
                  Promotion Code
                </label>
                <input
                  type="text"
                  className="border border-gray-300 w-11/12 py-3"
                  ref={register}
                  name="promotionCode"
                />
              </div>
              <div className="flex flex-col justify-start">
                <label
                  className="text-base text-primary-dark font-medium"
                  htmlFor="groupCode"
                >
                  Group Code
                </label>
                <input
                  type="text"
                  className="border border-gray-300 w-11/12 py-3"
                  ref={register}
                  name="groupCode"
                />
              </div>
              <div className="flex flex-col justify-start">
                <label
                  className="text-base text-primary-dark font-medium"
                  htmlFor="corporateAccount"
                >
                  Corp.Account
                </label>
                <input
                  type="text"
                  className="border border-gray-300 w-11/12 py-3"
                  ref={register}
                  name="corporateAccount"
                />
              </div>
            </div>
            <div className="flex justify-end items-center my-t mb-0 mr-2">
              <button
                type="button"
                onClick={() => setShowSpecialRate(false)}
                className="bg-transparent text-gray-dark text-lg font-medium cursor-pointer"
              >
                {t("close")}
              </button>
            </div>
          </div>
        </div>
        <div
          className={clsx(
            styles.formGroup,
            "flex justify-start items-center mx-1"
          )}
        >
          <input
            type="checkbox"
            className="mx-1"
            name="accessibility"
            checked={checkAccessibility}
            onChange={(e) => setCheckAccessibility(e.target.checked)}
          />
          <label
            className="text-base md:text-base text-primary-dark font-medium "
            htmlFor="accessibility"
          >
            {t("accessibleRooms")}
          </label>
        </div>
        <button
          type="submit"
          className="btn-primary-light mx-2 py-3 px-8 text-white capitalize text-base md:text-base"
        >
          {t("update")}
        </button>
      </form>
    </>
  );
};

export default BookingFilters;
