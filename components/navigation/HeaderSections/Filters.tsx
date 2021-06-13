import React, { useState, useRef, useEffect } from "react";
import { useForm } from 'react-hook-form'
import { DateRange } from "react-date-range";
import clsx from 'clsx'
import styles from "../navigation.module.scss";

const today = new Date();
const tomorrow = new Date(today.setDate(today.getDate() + 1));
const singleRoom = {
  adultsCount: 1,
  childCount: 0,
};
const Filters = () => {
  const { handleSubmit, reset, register, errors } = useForm({
    mode: 'onTouched',
    reValidateMode: "onBlur"
  })
  const datePickerRef = useRef<HTMLDivElement>(null);
  const [initalDateRange, setInitialDateRange] = useState([
    {
      startDate: new Date(),
      endDate: tomorrow,
      key: "selection",
    },
  ]);
  const [currentDateRange, setCurrentDateRange] = useState({
    startDate: new Date(),
    endDate: tomorrow,
    key: "selection",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showRooms, setShowRooms] = useState(false);
  const [showSpecialRate, setShowSpecialRate] = useState(false);
  const [roomCount, setRoomCount] = useState(1);
  const [totalGuestCount, setTotalGuestCount] = useState(1);
  const [roomDetails, setRoomDetails] = useState([{ ...singleRoom }]);

  const handleClick = (e: any) => {
    if (datePickerRef.current?.contains(e.target)) {
      return;
    }
    setShowDatePicker(false);
    setShowRooms(false);
    setShowSpecialRate(false);
  };

  const removeRoomHandler = (roomIndex: number) => {
    setRoomDetails((prev) =>
      prev.filter((_room, index) => index !== roomIndex)
    );
  };

  const incrementGuestsHandler = (type: string, roomIndex: number) => {
    let roomDets = [...roomDetails];
    let newRoomDetails = roomDets.map((room, index) => {
      if (index === roomIndex) {
        switch (type) {
          case "kid":
            return { ...room, childCount: room.childCount + 1 };
          case "adult":
            return { ...room, adultsCount: room.adultsCount + 1 };
          default:
            return room;
        }
      } else {
        return room;
      }
    });
    setRoomDetails(newRoomDetails);
  };
  const decrementGuestsHandler = (type: string, roomIndex: number) => {
    let roomDets = [...roomDetails];
    let newRoomDetails = roomDets.map((room, index) => {
      if (index === roomIndex) {
        switch (type) {
          case "kid":
            return { ...room, childCount: room.childCount - 1 };
          case "adult":
            return { ...room, adultsCount: room.adultsCount - 1 };
          default:
            return room;
        }
      } else {
        return room;
      }
    });
    setRoomDetails(newRoomDetails);
  };
  const checkRoomsHandler = (data: any) => {
    console.log('data')
    console.log(data);
  }
  useEffect(() => {
    let roomDets = [...roomDetails];
    let newRoomCount = roomDets.length;
    let newAdultCount = roomDets.reduce(
      (accumulator, current) => accumulator + current.adultsCount,
      0
    );
    let newKidCount = roomDets.reduce(
      (accumulator, current) => accumulator + current.childCount,
      0
    );
    let guestCount = newAdultCount + newKidCount;
    setRoomCount(newRoomCount);
    setTotalGuestCount(guestCount);
  }, [roomDetails]);
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  return (
    <form onSubmit={handleSubmit(checkRoomsHandler)} className="w-full bg-white flex flex-wrap justify-center items-center py-5">
      <div className={styles.dateContainer}>
        <h3 onClick={() => setShowDatePicker(true)}>
          {currentDateRange?.startDate.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </h3>
        <h3 onClick={() => setShowDatePicker(true)}>
          {currentDateRange?.endDate.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </h3>
        {showDatePicker && (
          <div className={styles.datePickerContainer} ref={datePickerRef}>
            <DateRange
              onChange={(item) => {
                setInitialDateRange([item?.selection]);
                setCurrentDateRange({ ...item?.selection });
              }}
              moveRangeOnFirstSelection={false}
              ranges={initalDateRange}
              editableDateInputs={false}
              minDate={new Date()}
              showPreview={false}
              showDateDisplay={false}
            />
          </div>
        )}
      </div>
      <div className="mx-2 relative">
        <button
          onClick={() => setShowRooms(true)}
          className="btn-outline-primary-dark"
          type="button"
        >
          {roomCount} Room, {totalGuestCount} Guests
        </button>
        {showRooms && (
          <div className={styles.datePickerContainer} ref={datePickerRef}>
            <div className="grid grid-cols-3 gap-2 items-center my-3">
              <h5 className="text-lg font-medium">Rooms</h5>
              <h5 className="text-center text-lg font-medium">Adults</h5>
              <h5 className="text-center text-lg font-medium">Kids</h5>
            </div>
            {roomDetails.map((room, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 items-center my-4 border-b pb-3">
                <div className="flex justify-start items-center">
                  {roomDetails.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRoomHandler(i)}
                      className="w-8 h-8 rounded-full border border-gray-400 text-lg ml-2"
                    >
                      &times;
                    </button>
                  )}{" "}
                  <h3 className="text-center text-lg font-medium ml-2">
                    Room {i + 1}
                  </h3>
                </div>
                <div className="flex justify-between items-center mx-3">
                  <button
                    type="button"
                    disabled={room.adultsCount === 1}
                    onClick={() => decrementGuestsHandler("adult", i)}
                    className="w-8 h-8 rounded-full border border-gray-400 text-lg ml-2"
                  >
                    &minus;
                  </button>
                  <h5 className="text-center text-lg font-medium">
                    {room.adultsCount}
                  </h5>
                  <button
                    type="button"
                    onClick={() => incrementGuestsHandler("adult", i)}
                    className="w-8 h-8 rounded-full border border-gray-400 text-lg ml-2"
                  >
                    &#43;
                  </button>
                </div>
                <div className="flex justify-between items-center mx-3">
                  <button
                    type="button"
                    disabled={room.childCount === 0}
                    onClick={() => decrementGuestsHandler("kid", i)}
                    className="w-8 h-8 rounded-full border border-gray-400 text-lg ml-2"
                  >
                    &minus;
                  </button>
                  <h5 className="text-center text-lg font-medium">
                    {room.childCount}
                  </h5>
                  <button
                    type="button"
                    onClick={() => incrementGuestsHandler("kid", i)}
                    className="w-8 h-8 rounded-full border border-gray-400 text-lg ml-2"
                  >
                    &#43;
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setRoomDetails((prev) => [...prev, { ...singleRoom }])
              }
              className="flex justify-start items-center my-4 border-none bg-transparent"
            >
              <i className="w-8 h-8 rounded-full border border-gray-400 text-lg mx-2">
                &#43;
              </i>
              <h3 className="text-center text-lg font-normal">Add a Room</h3>
            </button>

            <div className="flex justify-end items-center my-t mb-0 mr-2">
              <button type="button" onClick={() => setShowRooms(false)} className="bg-transparent text-gray-dark text-lg font-medium cursor-pointer">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="mx-2 relative">
        <button
          onClick={() => setShowSpecialRate(true)}
          className="btn-outline-primary-dark"
          type="button"
        >
          Special Rates
        </button>
        <div className={showSpecialRate ? styles.datePickerContainer : 'hidden'} ref={datePickerRef} >

          <div className="grid grid-cols-3 gap-1 items-center my-2 mx-1">
            <div className={clsx(styles.formGroup, "flex justify-start items-center mx-1")}>
              <input type="checkbox" className="mx-1" ref={register} name="usePoints" />
              <label className="text-lg text-primary-dark font-medium" htmlFor="usePoints">Use Points</label>
            </div>
            <div className={clsx(styles.formGroup, "flex justify-start items-center mx-1")}>
              <input type="checkbox" className="mx-1" ref={register} name="travelAgents" />
              <label className="text-lg text-primary-dark font-medium" htmlFor="travelAgents">Travel Agents</label>
            </div>
            <div className={clsx(styles.formGroup, "flex justify-start items-center mx-1")}>
              <input type="checkbox" className="mx-1" ref={register} name="aaaRate" />
              <label className="text-lg text-primary-dark font-medium" htmlFor="aaaRate">AAA Rate</label>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1 items-center my-2 mx-1">
            <div className={clsx(styles.formGroup, "flex justify-start items-center mx-1")}>
              <input type="checkbox" className="mx-1" ref={register} name="AARPRate" />
              <label className="text-lg text-primary-dark font-medium" htmlFor="AARPRate">AARP Rate</label>
            </div>
            <div className={clsx(styles.formGroup, "flex justify-start items-center mx-1")}>
              <input type="checkbox" className="mx-1" ref={register} name="seniorRate" />
              <label className="text-lg text-primary-dark font-medium" htmlFor="seniorRate">Senior Rate</label>
            </div>
            <div className={clsx(styles.formGroup, "flex justify-start items-center mx-1")}>
              <input type="checkbox" className="mx-1" ref={register} name="governmentRates" />
              <label className="text-lg text-primary-dark font-medium" htmlFor="governmentRates">Government Rates</label>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 items-center my-2 mx-1">
            <div className="flex flex-col justify-start">
              <label className="text-base text-primary-dark font-medium" htmlFor="promotionCode">Promotion Code</label>
              <input type="text" className="border border-gray-300 w-11/12 py-3" ref={register} name="promotionCode" />
            </div>
            <div className="flex flex-col justify-start">
              <label className="text-base text-primary-dark font-medium" htmlFor="groupCode">Group Code</label>
              <input type="text" className="border border-gray-300 w-11/12 py-3" ref={register} name="groupCode" />
            </div>
            <div className="flex flex-col justify-start">
              <label className="text-base text-primary-dark font-medium" htmlFor="corporateAccount">Corporate Account</label>
              <input type="text" className="border border-gray-300 w-11/12 py-3" ref={register} name="corporateAccount" />
            </div>
          </div>
          <div className="flex justify-end items-center my-t mb-0 mr-2">
            <button type="button" onClick={() => setShowSpecialRate(false)} className="bg-transparent text-gray-dark text-lg font-medium cursor-pointer">
              Close
            </button>
          </div>
        </div>
      </div>
      <button type="submit" className="btn-primary-dark mx-2 py-3 px-8 text-white">Check Rooms & Rates</button>
    </form>
  );
};

export default Filters;
