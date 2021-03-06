import clsx from "clsx";
import React from "react";
import CustomMD from "../common/CustomMD";
import useTranslation from "./../../hooks/useTranslation";
import styles from "./home.module.scss";
const TradeMarkSection = ({ home }: { home: any }) => {
  const { locale } = useTranslation();
  return (
    <section
      className={clsx(
        "w-full bg-white text-center mt-5 mb-3",
        styles.tradeMark_section
      )}
    >
      <CustomMD
        options={{
          overrides: {
            h3: {
              component: "h1",
              props: {
                className: "text-primary-dark text-2xl font-semibold mb-2",
              },
            },
            p: {
              props: {
                className:
                  "text-base text-black text-opacity-50 w-full mx-auto px-5 text-center my-2",
              },
            },
          },
        }}
        markdown={home[`description_${locale}`]}
      />
      {/* <h1 className={clsx("text-primary-dark text-2xl font-semibold mb-2")}>NIVELHOTELS. SINCE 1992</h1>
      <h2 className="text-primary-light text-lg font-medium my-2">We provide high quality Accommodations</h2>
      <p className="text-base text-black text-opacity-50 w-full md:w-1/2 mx-auto text-center my-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus deleniti nulla, hic voluptatibus eum voluptatum libero suscipit nemo voluptates cupiditate, ipsum provident facere modi tempora ducimus enim dicta laborum esse aliquam rem assumenda dolores. Commodi, aperiam, blanditiis! Ipsum iure necessitatibus eaque, fuga. Excepturi facilis libero dicta soluta officiis, sint sit voluptatem, vero doloribus nesciunt suscipit dolores veritatis minus quam atque non autem quasi consequatur quae sequi ex, ipsa facere qui ut recusandae. Quod earum cupiditate quaerat assumenda.</p> */}
    </section>
  );
};

export default TradeMarkSection;
