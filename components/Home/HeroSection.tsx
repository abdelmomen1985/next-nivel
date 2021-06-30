import React, { useContext } from "react";
// @ts-ignore
import { Slide } from "react-slideshow-image";
import { AppContext } from "../../context/AppContext";

const sliderImgs = [
  "/images/hero-slider/1.png",
  "/images/hero-slider/2.jpg",
  "/images/hero-slider/3.jpg",
];
const HeroSection = () => {
  const { isMobile } = useContext(AppContext);
  return (
    <section className="p-4">
      <Slide
        easing="ease-in"
        transitionDuration={500}
        arrows={isMobile ? false : true}
        autoplay={false}
      >
        {sliderImgs.map((img, i) => (
          <img
            src={img}
            key={i}
            className="w-full h-full rounded-xl"
            style={{
              maxHeight: "90vh",
            }}
          />
        ))}
      </Slide>
    </section>
  );
};

export default HeroSection;
