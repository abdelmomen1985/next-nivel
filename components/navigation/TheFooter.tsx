import {
  faFacebook,
  faSnapchat,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import useTranslation from "../../hooks/useTranslation";
import { LayoutType } from "../../types/layout";
const TheFooter = ({ layout }: { layout: LayoutType }) => {
  const { locale } = useTranslation();
  return (
    <footer className="w-full bg-gray-light px-5 py-10 mt-0 mb-0">
      <div className="flex justify-center">
        <img
          src={layout?.remoteSchemaUrl + layout?.footer_logo_en?.url}
          style={{ maxWidth: "200px" }}
          className="m-1"
        />
      </div>
      <div className="mx-5 my-5 grid grid-col-1 md:grid-cols-3 gap-3 items-start">
        <div>
          <p
            className={clsx(
              locale == "ar" ? "text-right" : "text-left",
              "text-primary-dark my-4 md:my-0 text-base font-normal"
            )}
          >
            {layout[`footer_description_${locale}`]}
          </p>
        </div>
        <div className="mx-2 md:mx-2">
          <h3 className="text-primary-dark text-xl font-semibold capitalize">
            important links
          </h3>
          <Link href="/about">
            <a className="text-gray-dark text-lg font-medium block my-3">
              About
            </a>
          </Link>
          <Link href="/contact">
            <a className="text-gray-dark text-lg font-medium block my-3">
              Contact Us
            </a>
          </Link>
          <Link href="/events">
            <a className="text-gray-dark text-lg font-medium block my-3">
              Events
            </a>
          </Link>
          <Link href="/location">
            <a className="text-gray-dark text-lg font-medium block my-3">
              Our Location
            </a>
          </Link>
        </div>
        <div className="ml-0 md:ml-6">
          <h3 className="text-primary-dark text-xl font-semibold capitalize">
            Our Social Media
          </h3>
          <a className="text-primary-light text-lg font-medium block my-3">
            <FontAwesomeIcon icon={faFacebook} className="" />{" "}
            <span className="p-2">Facebook</span>
          </a>
          <a className="text-primary-light text-lg font-medium block my-3">
            <FontAwesomeIcon icon={faTwitter} className="" />
            <span className="p-2">Twitter</span>
          </a>
          <a className="text-primary-light text-lg font-medium block my-3">
            <FontAwesomeIcon icon={faSnapchat} className="" />
            <span className="p-2">Snapchat</span>
          </a>
          <a className="text-primary-light text-lg font-medium block my-3">
            <FontAwesomeIcon icon={faYoutube} className="" />
            <span className="p-2">Youtube</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default TheFooter;
