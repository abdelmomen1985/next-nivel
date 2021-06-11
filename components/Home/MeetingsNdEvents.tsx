import React from "react";
import styles from "./home.module.scss";

const eventsData = [
  {
    count: "208",
    title: "SQ. M. OF TOTAL EVENT SPACE",
  },
  {
    count: "104",
    title: "SQ. M. OF LARGEST ROOM SETUP",
  },
  {
    count: "2",
    title: "MEETING ROOMS",
  },
  {
    count: "484",
    title: "GUEST ROOMS",
  },
];
const MeetingsNdEvents = () => {
  return (
    <section className="mt-5 mb-0 w-full relative ">
      <img src="/images/restaurant.png" className="w-full" />
      <div className={styles.meetingsContainer}>
        <h3>Meetings and Events</h3>
        <div className="grid grid-cols-4 gap-2 my-3 mx-2">
          {eventsData.map((event, i) => (
            <div className="" key={i}>
              <h5>{event.count}</h5>
              <h4>{event.title}</h4>
            </div>
          ))}
        </div>
        <button className="btn-primary-dark text-white text-lg font-semibold capitalize block">
          Meet in style
        </button>
      </div>
    </section>
  );
};

export default MeetingsNdEvents;
