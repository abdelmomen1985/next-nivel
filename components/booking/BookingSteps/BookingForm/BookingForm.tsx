import {
  faMinusCircle,
  faPlusCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import Multiselect from "multiselect-react-dropdown";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { months } from "../../../../utils/12months";
import { getNextTenYears } from "../../../../utils/getNextTenYears";
import styles from "../../booking.module.scss";
import { useSpeech } from "./../../../../hooks/useSpeech";
import useTranslation from "./../../../../hooks/useTranslation";
import { bookingValidation } from "./bookingValidation";

const years = getNextTenYears();
const BookingForm = ({
  addBooking,
  userData,
  specialRequests,
}: {
  addBooking: (data: any, type: string) => void;
  userData: any;
  specialRequests: string[];
}) => {
  const { t, locale } = useTranslation();
  const { speechHandler } = useSpeech();
  const { register, reset, errors, handleSubmit, setValue } = useForm({
    mode: "onTouched",
    reValidateMode: "onBlur",
    //@ts-ignore
    resolver: yupResolver(bookingValidation),
  });
  const [showGuest, setShowGuest] = useState<boolean>(false);
  const [selectedSpecialReqs, setSelectedSpecialReqs] = useState<string[]>([]);

  useEffect(() => {
    if (!userData) return;
    setValue("cardNo", userData?.cardNo);
    setValue("cardMonth", userData?.cardMonth);
    setValue("cardYear", userData?.cardYear);
    setValue("address", userData?.address);
    setValue("city", userData?.city);
    setValue("country", userData?.country);
    setValue("email", userData?.email);
    setValue("firstName", userData?.firstName);
    setValue("lastName", userData?.lastName);
    setValue("phone", userData?.phone);
    setValue("zip", userData?.zip);
  }, [userData]);
  const bookingFormHandler = (data: any) => {
    // console.log(data);
    addBooking(
      { ...data, special_requests: [...selectedSpecialReqs] },
      "create"
    );
  };
  const updateReservationHandler = (data: any) => {
    addBooking(
      { ...data, special_requests: [...selectedSpecialReqs] },
      "update"
    );
  };
  return (
    <div className="w-full my-5 px-2">
      <h3>{t("allFields")}</h3>
      <form
        onSubmit={handleSubmit(
          userData ? updateReservationHandler : bookingFormHandler
        )}
      >
        <h3
          onMouseEnter={() => speechHandler(t("payment"))}
          className="flex flex-wrap justify-start items-start my-5"
        >
          <img
            src="/images/icons/stroke/credit-card.svg"
            className="mx-2 w-10 h-10"
          />
          <span className="text-lg font-semibold">{t("payment")}</span>
        </h3>
        <hr className="w-full mb-5 mt-2" />
        <div className={clsx(styles.formGroup, "w-full md:w-2/3")}>
          <label className="capitalize" htmlFor="cardNo">
            {t("cardNo")}
          </label>
          <input
            type="number"
            ref={register({
              valueAsNumber: true,
            })}
            name="cardNo"
            style={{
              padding: "8.5px 16px 8.5px 122px",
            }}
          />
        </div>
        {errors.cardNo && (
          <p
            onMouseEnter={() => speechHandler(errors?.cardNo?.message[locale!])}
            className="text-red-600 text-base  font-normal my-1"
          >
            {errors?.cardNo?.message[locale!]}
          </p>
        )}
        <div className="grid grid-cols-2 gap-2 items-center w-full md:w-2/3">
          <div className={clsx(styles.formGroup)}>
            <label
              onMouseEnter={() => speechHandler(t("month"))}
              className="capitalize"
              htmlFor="cardMonth"
            >
              {t("month")}
            </label>
            <select name="cardMonth" ref={register}>
              {months.map((month, i) => (
                <option
                  onMouseEnter={() =>
                    speechHandler(`${i + 1} ${month[locale]}`)
                  }
                  key={i}
                  value={month.en}
                >
                  {i + 1} {month[locale]}
                </option>
              ))}
            </select>
          </div>
          <div className={clsx(styles.formGroup)}>
            <label
              onMouseEnter={() => speechHandler(t("year"))}
              className="capitalize"
              htmlFor="cardYear"
            >
              {t("year")}
            </label>
            <select name="cardYear" ref={register}>
              {years.map((year, i) => (
                <option
                  onMouseEnter={() => speechHandler(year)}
                  key={year}
                  value={year}
                >
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        {errors.cardMonth && (
          <p
            onMouseEnter={() =>
              speechHandler(errors.cardMonth?.message[locale])
            }
            className="text-red-600 text-base  font-normal my-1"
          >
            {errors.cardMonth?.message[locale]}
          </p>
        )}
        {errors.cardYear && (
          <p
            onMouseEnter={() => speechHandler(errors.cardYear?.message[locale])}
            className="text-red-600 text-base  font-normal my-1"
          >
            {errors?.cardYear?.message[locale]}
          </p>
        )}
        <h3
          onMouseEnter={() => speechHandler(t("personalInfo"))}
          className="flex flex-wrap justify-start items-center mt-5 mb-1"
        >
          <FontAwesomeIcon icon={faUser} className="mx-1" />
          <span className="text-lg font-semibold">{t("personalInfo")}</span>
        </h3>
        <hr className="w-full mb-5 mt-1" />
        <div className={clsx(styles.formGroup, "w-full md:w-2/3")}>
          <label
            onMouseEnter={() => speechHandler(t("firstName"))}
            className="capitalize"
            htmlFor="firstName"
          >
            {t("firstName")}
          </label>
          <input type="text" name="firstName" ref={register} />
        </div>
        {errors.firstName && (
          <p
            onMouseEnter={() =>
              speechHandler(errors.firstName?.message[locale])
            }
            className="text-red-600 text-base  font-normal my-1"
          >
            {errors.firstName?.message[locale]}
          </p>
        )}
        <div className={clsx(styles.formGroup, "w-full md:w-2/3")}>
          <label
            onMouseEnter={() => speechHandler(t("lastName"))}
            className="capitalize"
            htmlFor="lastName"
          >
            {t("lastName")}
          </label>
          <input type="text" name="lastName" ref={register} />
        </div>
        {errors.lastName && (
          <p
            onMouseEnter={() => speechHandler(errors.lastName?.message[locale])}
            className="text-red-600 text-base  font-normal my-1"
          >
            {errors.lastName?.message[locale]}
          </p>
        )}
        <div className={clsx(styles.formGroup, "w-full md:w-2/3")}>
          <label
            onMouseEnter={() => speechHandler(t("email"))}
            className="capitalize"
            htmlFor="email"
          >
            {t("email")}
          </label>
          <input type="text" name="email" ref={register} />
        </div>
        {errors.email && (
          <p
            onMouseEnter={() => speechHandler(errors.email?.message[locale])}
            className="text-red-600 text-base  font-normal my-1"
          >
            {errors.email?.message[locale]}
          </p>
        )}
        <div className={clsx(styles.formGroup, "w-full md:w-2/3")}>
          <label
            onMouseEnter={() => speechHandler(t("phone"))}
            className="capitalize"
            htmlFor="phone"
          >
            {t("phone")}
          </label>
          <input type="text" name="phone" ref={register} />
        </div>
        {errors.phone && (
          <p
            onMouseEnter={() => speechHandler(errors.phone?.message[locale])}
            className="text-red-600 text-base  font-normal my-1"
          >
            {errors.phone?.message[locale]}
          </p>
        )}
        <div className={clsx(styles.formGroup, "w-full md:w-2/3")}>
          <label
            onMouseEnter={() => speechHandler(t("country"))}
            className="capitalize"
            htmlFor="country"
          >
            {t("country")}
          </label>
          <input type="text" name="country" ref={register} />
        </div>
        {errors.country && (
          <p
            onMouseEnter={() => speechHandler(errors.country?.message[locale])}
            className="text-red-600 text-base  font-normal my-1"
          >
            {errors.country?.message[locale]}
          </p>
        )}
        <div className={clsx(styles.formGroup, "w-full md:w-2/3")}>
          <label
            onMouseEnter={() => speechHandler(t("address"))}
            className="capitalize"
            htmlFor="address"
          >
            {t("address")}
          </label>
          <input type="text" name="address" ref={register} />
        </div>
        {errors.address && (
          <p
            onMouseEnter={() => speechHandler(errors.address?.message[locale])}
            className="text-red-600 text-base  font-normal my-1"
          >
            {errors.address?.message[locale]}
          </p>
        )}
        <div className={clsx(styles.formGroup, "w-full md:w-2/3")}>
          <label
            onMouseEnter={() => speechHandler(t("address2"))}
            className="capitalize"
            htmlFor="secondAddress"
          >
            {t("address2")}
          </label>
          <input
            type="text"
            name="secondAddress"
            placeholder="Optional"
            ref={register}
          />
        </div>
        {/*
				<div className={clsx(styles.formGroup, 'w-full md:w-2/3')}>
					<label
						onMouseEnter={() => speechHandler(t('zip'))}
						className="capitalize"
						htmlFor="zip"
					>
						{t('zip')}
					</label>
					<input
						type="number"
						name="zip"
						ref={register({
							valueAsNumber: true,
						})}
					/>
				</div>
				{errors.zip && (
					<p
						onMouseEnter={() => speechHandler(errors.zip?.message[locale])}
						className="text-red-600 text-base  font-normal my-1"
					>
						{errors.zip?.message[locale]}
					</p>
        )}
        */}
        <div className={clsx(styles.formGroup, "w-full md:w-2/3")}>
          <label
            onMouseEnter={() => speechHandler(t("city"))}
            className="capitalize"
            htmlFor="city"
          >
            {t("city")}
          </label>
          <input type="text" name="city" ref={register} />
        </div>
        {errors.city && (
          <p
            onMouseEnter={() => speechHandler(errors.city?.message[locale])}
            className="text-red-600 text-base  font-normal my-1"
          >
            {errors.city?.message[locale]}
          </p>
        )}
        <div className={"w-full md:w-2/3"}>
          <label
            onMouseEnter={() => speechHandler(`Special Requests`)}
            className="capitalize"
            htmlFor="city"
          >
            {t("specialRequests")}
          </label>
          <Multiselect
            options={specialRequests}
            selectedValues={selectedSpecialReqs}
            isObject={false}
            closeOnSelect={false}
            closeIcon="circle2"
            onSelect={(selectedList: string[], selectedItem: string) =>
              setSelectedSpecialReqs((prev: string[]) => [
                ...prev,
                selectedItem,
              ])
            }
            placeholder=""
            onRemove={(selectedList: string[], selectedItem: string) =>
              setSelectedSpecialReqs((prev: string[]) =>
                prev.filter((req: string) => req !== selectedItem)
              )
            }
            style={{
              chips: {
                background: "#d4b561",
                whiteSpace: "break-spaces",
              },
              multiselectContainer: {
                color: "#8a6b3e",
              },
            }}
          />
        </div>
        <button
          onMouseEnter={() => speechHandler(t("addGuestNames"))}
          type="button"
          onClick={() => setShowGuest((prev) => !prev)}
          className="text-primary-dark my-5 bg-transparent text-lg font-medium"
        >
          {showGuest ? (
            <FontAwesomeIcon
              icon={faMinusCircle}
              className="text-primary-dark mx-1"
            />
          ) : (
            <FontAwesomeIcon
              icon={faPlusCircle}
              className="text-primary-dark mx-1"
            />
          )}
          {t("addGuestNames")}
        </button>
        {showGuest && (
          <div className="w-full py-5 px-3 mx-auto my-5 bg-gray-200">
            <p onMouseEnter={() => speechHandler(t("addGuestDisc"))}>
              {t("addGuestDisc")}
            </p>
            <div className={clsx(styles.formGroup, "w-full md:w-2/3")}>
              <label
                onMouseEnter={() => speechHandler(t("firstName"))}
                className="capitalize"
                htmlFor="guestFirstName"
              >
                {t("firstName")}
              </label>
              <input
                type="text"
                placeholder="Optional"
                name="guestFirstName"
                ref={register}
              />
            </div>
            <div className={clsx(styles.formGroup, "w-full md:w-2/3")}>
              <label
                onMouseEnter={() => speechHandler(t("lastName"))}
                className="capitalize"
                htmlFor="guestLastName"
              >
                {t("lastName")}
              </label>
              <input
                type="text"
                placeholder="Optional"
                name="guestLastName"
                ref={register}
              />
            </div>
          </div>
        )}
        <div className={"w-full md:w-2/3"}>
          <input
            type="checkbox"
            name="agree"
            value="true"
            ref={register}
            className="text-xl m-2"
          />
          {t("tos")}
        </div>
        <button
          onMouseEnter={() =>
            speechHandler(
              userData ? t("updateReservation") : t("bookReservation")
            )
          }
          className="btn-primary-dark w-full mt-4 md:w-1/2 px-10 py-5  text-white text-lg font-bold block"
          type="submit"
        >
          {userData ? t("updateReservation") : t("bookReservation")}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
