import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Rating from "react-rating";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { toast } from "react-toastify";
import { RATE_BOOKING } from "../../../query/booking";
import { BookingType } from "../../../types/booking";
import CustomModal from "../../common/CustomModal/CustomModal";
import { useSpeech } from "./../../../hooks/useSpeech";
import useTranslation from "./../../../hooks/useTranslation";

const UserBookings = ({
  bookings,
  setBookings,
}: {
  bookings: BookingType[];
  setBookings: (bookings: BookingType[]) => void;
}) => {
  const router = useRouter();
  const { locale, t } = useTranslation();
  const [selectedBooking, setSelectedBooking] = useState<BookingType>({});
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [ratingComment, setRatingComment] = useState<string | undefined>(
    undefined
  );
  const { speechHandler } = useSpeech();
  const [rateBooking, { data }] = useMutation(RATE_BOOKING, {
    onCompleted() {
      let newRating = {
        comment: ratingComment!,
        rating: ratingRate,
      };
      let ratedBookingId = selectedBooking?.id;
      let oldBookings: BookingType[] = [...bookings];
      let newBookings: BookingType[] = oldBookings.map(
        (booking: BookingType) => {
          if (booking?.id === ratedBookingId) {
            return { ...booking, visitor_rating_data: newRating };
          } else {
            return booking;
          }
        }
      );
      setBookings([...newBookings]);
      closeModal();
      const successMessage = {
        en: "You have Rated your visit successfully",
        ar: "لقد قمت بتقييم زيارتك بنجاح",
      };
      toast.success(successMessage[locale], {
        rtl: locale === "ar" ? true : false,
      });
    },
    onError(err) {
      console.log(err);
    },
  });
  const [ratingRate, setRatingRate] = useState<number>(0);
  const closeModal = () => {
    setOpenModal(false);
    setSelectedBooking({});
    setRatingComment(undefined);
    setRatingRate(0);
  };
  const startRatingProcessHandler = (booking: BookingType) => {
    setSelectedBooking(booking);
    setOpenModal(true);
    if (booking.visitor_rating_data) {
      setRatingRate(booking.visitor_rating_data?.rating);
      setRatingComment(booking.visitor_rating_data?.comment);
    }
  };
  const addRateHandler = () => {
    console.log(ratingComment, ratingRate);
    rateBooking({
      variables: {
        id: selectedBooking?.id,
        visitor_rating_data: {
          comment: ratingComment,
          rating: ratingRate,
        },
      },
    });
  };
  const editBookingHandler = (booking: BookingType) => {
    console.log(booking.reservation_code);
    router.push({
      pathname: `/${locale}/booking`,
      query: {
        res_code: booking?.reservation_code,
      },
    });
  };
  return (
    <>
      {bookings.length > 0 ? (
        <Table
          style={{
            width: "100%",
          }}
        >
          <Thead>
            <Tr>
              <Th onMouseEnter={() => speechHandler("Room Name")}>
                {t("roomName")}
              </Th>
              <Th onMouseEnter={() => speechHandler(t("checkIn"))}>
                {t("checkIn")}
              </Th>
              <Th onMouseEnter={() => speechHandler(t("checkOut"))}>
                {t("checkOut")}
              </Th>
              <Th onMouseEnter={() => speechHandler(t("price"))}>
                {t("price")}
              </Th>
              {/* <Th>reservation code</Th> */}
              <Th onMouseEnter={() => speechHandler(t("pkgName"))}>
                {t("pkgName")}
              </Th>
              <Th onMouseEnter={() => speechHandler(t("userRating"))}>
                {t("userRating")}
              </Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {bookings.map((booking: BookingType) => (
              <Tr key={booking.id}>
                <Td
                  onMouseEnter={() =>
                    speechHandler(booking?.StrpRoomBooking?.name[locale])
                  }
                >
                  <div
                    style={{
                      background: "#ded5be",
                      padding: ".3em",
                      margin: ".3em",
                    }}
                  >
                    {booking?.StrpRoomBooking?.name[locale]}
                  </div>
                </Td>
                <Td
                  onMouseEnter={() => speechHandler(String(booking?.check_in))}
                >
                  {booking?.check_in}
                </Td>
                <Td
                  onMouseEnter={() => speechHandler(String(booking?.check_out))}
                >
                  {booking?.check_out}
                </Td>
                <Td
                  onMouseEnter={() =>
                    speechHandler(String(booking?.room_rate?.base_price))
                  }
                >
                  {booking?.room_rate?.base_price}
                </Td>
                {/* <Td>{booking?.reservation_code}</Td> */}
                <Td
                  onMouseEnter={() =>
                    speechHandler(booking?.room_rate?.rate?.title[locale])
                  }
                >
                  {booking?.room_rate?.rate?.title[locale]}
                </Td>
                {booking?.visitor_rating_data?.rating ? (
                  <Td
                    onMouseEnter={() =>
                      speechHandler(
                        `${booking?.visitor_rating_data?.rating} / 5`
                      )
                    }
                  >
                    {booking?.visitor_rating_data?.rating} / 5
                  </Td>
                ) : (
                  <Td></Td>
                )}
                <Td>
                  <button
                    onMouseEnter={() => speechHandler(t("rateNow"))}
                    onClick={() => startRatingProcessHandler(booking)}
                    className="w-10/12 py-3 px-6 mx-auto text-white bg-primary-light text-lg font-medium"
                  >
                    {t("rateNow")}
                  </button>
                </Td>
                <Td>
                  <button
                    onMouseEnter={() => speechHandler(t("editStay"))}
                    onClick={() => editBookingHandler(booking)}
                    className="w-10/12 py-3 px-6 mx-auto text-primary-light bg-outline-primary-light text-lg font-medium"
                  >
                    {t("editStay")}
                  </button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <div
          onMouseEnter={() => speechHandler(t("noBookingsYet"))}
          className="mx-auto my-10 px-5 py-5 text-center text-primary-dark text-2xl font-semibold"
        >
          {t("noBookingsYet")}
        </div>
      )}

      <CustomModal
        show={openModal}
        onClose={closeModal}
        title={{ en: "Rate your visit", ar: "قيم زيارتك" }}
        closeWithin
      >
        <div className="w-full my-3 px-2 flex flex-col justify-center items-center">
          <Rating
            initialRating={ratingRate}
            onChange={(rate) => setRatingRate(rate)}
            fractions={2}
            emptySymbol="fa fa-star-o fa-2x medium"
            fullSymbol="fa fa-star fa-2x medium"
            direction={locale === "en" ? "ltr" : "rtl"}
            // emptySymbol={
            // 	<img src="assets/images/star-grey.png" className="icon" />
            // }
            // fullSymbol={
            // 	<img src="assets/images/star-yellow.png" className="icon" />
            // }
          />
          <textarea
            className="p-3 mx-auto my-3 w-full rounded-md border-2 border-gray-400 block"
            rows={5}
            value={ratingComment}
            placeholder="Enter a comment"
            onChange={(e) => setRatingComment(e.target.value)}
          ></textarea>

          <button
            onMouseEnter={() => speechHandler(t("rateUrVisit"))}
            disabled={ratingRate === 0}
            onClick={addRateHandler}
            className="btn-primary-light text-white px-6 py-3 block mx-auto my-4 text-xl font-medium"
          >
            {t("rateUrVisit")}
          </button>
        </div>
      </CustomModal>
    </>
  );
};

export default UserBookings;
