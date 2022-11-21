import { useMutation } from "@apollo/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";
import { toast } from "react-toastify";
import { AppContext } from "./../../../context/AppContext";
import { useSpeech } from "./../../../hooks/useSpeech";
import useTranslation from "./../../../hooks/useTranslation";
import { ADD_BOOKING, UPDATE_BOOKING } from "./../../../query/booking";
import { cleanObjects } from "./../../../utils/cleanObjects";
import BookingForm from "./BookingForm/BookingForm";
import BookingSummary from "./BookingSummary";
const ThirdBookingSteps = ({
  selectedRoom,
  filterValues,
  selectedPackage,
  userData,
  bookingId,
  selectedRooms,
  selectedPackages,
  specialRequests,
}: {
  selectedRoom: any;
  filterValues: any;
  selectedPackage: any;
  userData: any;
  bookingId?: string;
  selectedRooms: any;
  selectedPackages: any;
  specialRequests: string[];
}) => {
  const { t, locale } = useTranslation();
  const router = useRouter();
  const { user } = useContext(AppContext);

  const { speechHandler } = useSpeech();
  const [newBooking] = useMutation(ADD_BOOKING, {
    onCompleted() {
      const successMessage = {
        en: "you have booked your visit successfully",
        ar: "تم حجز زيارتك القادمة بنجاح",
      };
      toast.success(successMessage[locale], {
        rtl: locale === "ar" ? true : false,
      });
      sessionStorage.removeItem("filterValues");
      router.push(`/${locale}/profile`);
    },
    onError(err) {
      toast.error(err?.message, {
        rtl: locale === "ar" ? true : false,
      });
    },
  });
  const [updateBooking] = useMutation(UPDATE_BOOKING, {
    onCompleted() {
      const successMessage = {
        en: "you have updated your visit successfully",
        ar: "تم تعديل حجز زيارتك القادمة بنجاح",
      };
      toast.success(successMessage[locale], {
        rtl: locale === "ar" ? true : false,
      });
    },
    onError(err) {
      toast.error(err?.message, {
        rtl: locale === "ar" ? true : false,
      });
    },
  });

  type BookingData = {
    customer: {
      name: string;
      phone: string;
      country: string;
      city: string;
    };
    room: {
      name: string;
    };
    stay: {
      check_in: string;
      check_out: string;
      package_price: number;
      special_requests: string[] | null;
    };
  };
  const emailTemplate = ({ customer, room }: BookingData) => `
A new booking have been made through https://www.nivelhotels.com/ website with this details

Customer Details
Customer Name: ${customer.name}
Customer Phone: ${customer.phone}

Booking Details 
Room: ${room.name}
  `;

  const addBooking = async (data: any, type: string) => {
    console.log("data", data);
    let special_requests = [...data.special_requests];
    let notes = data?.notes;
    delete data?.special_requests;
    delete data?.notes;

    let cleanData = await cleanObjects(data);
    console.log(special_requests);
    console.log("selected package", selectedPackage);
    if (filterValues.roomDetails.length === 1) {
      let bookingQueryVars = {
        booking_rate: selectedPackage?.id,
        check_in: filterValues?.currentDateRange?.startDate,
        check_out: filterValues?.currentDateRange?.endDate,
        ext_data: {
          adults_count: filterValues?.roomDetails[0].adultsCount,
          child_count: filterValues?.roomDetails[0].childCount,
          child_ages: filterValues?.roomDetails[0].childrenAges,
        },
        client_data: { ...cleanData },
        strp_room_id: selectedRoom?.id,
        visitor_id: user?.id,
        special_requests: special_requests.length > 0 ? special_requests : null,
        notes,
      };
      console.log(bookingQueryVars);
      console.log("room", selectedRoom);
      if (type === "update") {
        updateBooking({
          variables: { ...bookingQueryVars, bookingId },
        });
        return;
      }
      if (type === "create") {
        const email = emailTemplate({
          customer: {
            name: cleanData.firstName + " " + cleanData.lastName,
            phone: cleanData.phone,
            country: cleanData.country,
            city: cleanData.city,
          },
          room: {
            name: selectedRoom.name.en,
          },
          stay: {
            check_in: bookingQueryVars.check_in,
            check_out: bookingQueryVars.check_out,
            special_requests: bookingQueryVars.special_requests,
            package_price: selectedPackage.base_price,
          },
        });
        await axios.post(
          `https://api.mailersend.com/v1/email`,
          {
            from: {
              email: "info@nivelhotels.com",
            },
            to: [
              {
                email: "marketing@nivelhotels.com",
              },
              {
                email: "abdelmomen1985@gmail.com",
              },
            ],
            subject: "New Booking",
            text: email,
            html: email,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZWQ1NTI4ZjBkMjliMGQ4ZTAyZTViMTliNjk2MjZkZGYzYjM5M2YxMTgxYjQzNDA2Nzc2MTNhZTFmZDU3OWIwZDY5Nzk1NjMxYjgwNjlmYjQiLCJpYXQiOjE2Njg3MTEyNTMuMTg3OTMzLCJuYmYiOjE2Njg3MTEyNTMuMTg3OTM2LCJleHAiOjQ4MjQzODQ4NTMuMTgzODMxLCJzdWIiOiI0NjI2NiIsInNjb3BlcyI6WyJlbWFpbF9mdWxsIiwiZG9tYWluc19mdWxsIiwiYWN0aXZpdHlfZnVsbCIsImFuYWx5dGljc19mdWxsIiwidG9rZW5zX2Z1bGwiLCJ3ZWJob29rc19mdWxsIiwidGVtcGxhdGVzX2Z1bGwiLCJzdXBwcmVzc2lvbnNfZnVsbCIsInNtc19mdWxsIiwiZW1haWxfdmVyaWZpY2F0aW9uX2Z1bGwiXX0.VkC84l3h56tK63t9OmFRg5EipheVUpoHPduU6m-WW-ELfIidAAkGXLsznSSIsTE4uhNKrDktcGpHEAuK0beBB2F_bAt097RCLM07-9esj5SQHD1PhRsfB9psViAeC3xfCw9cP1JxKgZInLyjxKLgHonLpvG7ynewHsPPZK1mt4oHDnJOqok8JF_XA8crhheNqzCuzbvLPIw53yeq92qqNP2Om7o5wzA4gTt8dSuW_iuqHmnO_UuysE8egf7b1urhTzdbx0aewib_hbDb4UJP_iUzLS61ArRrbjVLdt_u1IlI1wtFNwq0TaR8DCQHrYuky5fn6OTrfQgB6QS-hG8p7GjzEcPWTdAwqYrDR0fSpelMxvCEFC4DO8YgePJh9LNYQwt_z4865FSEIa3TGlKo2ruHSyqync_-q4twormm77k0RMLdaWXWXySplh4g62erXOURpK7_BPNgJOfW7PeMAzpNlSmti_zcmBR8xAmwoV0zsXZt6FYx6kMXiZfJFRSI11i4rlKMgg5M54W8cEpmKcJhsfEVgNT1aufI0IsRxyuAPA7xMGo-mYuCw3tUsHdsRmn7BzpFJ_FZLJPgBp8R06qfN95tAU4F1A36eMYvqLZEUd5jV3a64x8Zgmhm6ohNlu5MXJOVzTpIc_L7tpVgeesXAoo6cmVTGBN1QZ7BHNo",
            },
          }
        );
        newBooking({
          variables: { ...bookingQueryVars },
        });
      }
    } else if (filterValues.roomDetails.length > 1) {
      selectedRooms.forEach((room: any, i: number) => {
        let bookingQueryVars = {
          booking_rate: selectedPackages[i]?.id,
          check_in: filterValues?.currentDateRange?.startDate,
          check_out: filterValues?.currentDateRange?.endDate,
          client_data: { ...cleanData },
          strp_room_id: room?.id,
          visitor_id: user?.id,
          ext_data: {
            adults_count: room.adultsCount,
            child_count: room.childCount,
            child_ages: room.childrenAges,
          },
          special_requests:
            special_requests.length > 0 ? special_requests : null,
        };
        newBooking({
          variables: { ...bookingQueryVars },
        });
      });
    }
  };

  return (
    <section className="mx-auto md:mx-8 w-full my-2">
      {filterValues?.roomDetails?.length === 1 && (
        <BookingSummary
          selectedPackage={selectedPackage}
          filterValues={filterValues}
        />
      )}
      <BookingForm
        specialRequests={specialRequests}
        userData={userData}
        addBooking={addBooking}
      />
    </section>
  );
};

export default ThirdBookingSteps;
