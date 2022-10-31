import { useQuery } from "@apollo/client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import useTranslation from "../../hooks/useTranslation";
import { GET_SOCIAL_MEDIA } from "../../query/socialMedia";
import { LayoutType } from "../../types/layout";
import styles from "./navigation.module.scss";
const TheFooter = ({ layout }: { layout: LayoutType }) => {
  const { locale, t } = useTranslation();
  const [socialMediaLinks, setSocialMediaLinks] = useState<any>([]);
  const { data } = useQuery(GET_SOCIAL_MEDIA, {
    onCompleted() {
      setSocialMediaLinks([...data.socialMediaLinks]);
    },
  });
  console.log(layout);

  return (
    <footer className="w-full bg-gray-light px-5 py-10 mt-12 mb-0">
      <div className="flex justify-center">
        <img
          src={layout?.remoteSchemaUrl + layout?.footer_logo_en?.url}
          style={{ maxWidth: "200px" }}
          className="m-1"
        />
      </div>
      <div className="mx-12 my-5 grid grid-col-1 md:grid-cols-3 gap-12 items-start">
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
            {t("importantLinks")}
          </h3>

          <Link href={`/${locale}/about`}>
            <a className="text-gray-dark text-lg font-medium block my-3">
              {t("about")}
            </a>
          </Link>
          <Link href={`/${locale}/contact`}>
            <a className="text-gray-dark text-lg font-medium block my-3">
              {t("contactUs")}
            </a>
          </Link>
          {/* <Link href={`/${locale}/events`}>
            <a className="text-gray-dark text-lg font-medium block my-3">
              {t("events")}
            </a>
          </Link> */}
          <Link href={`/${locale}/location`}>
            <a className="text-gray-dark text-lg font-medium block my-3">
              {t("ourLocation")}
            </a>
          </Link>
          <Link href={`/sitemap.xml`}>
            <a className="text-gray-dark text-lg font-medium block my-3">
              {t("siteMap")}
            </a>
          </Link>
          <Link href={`/${locale}/careers`}>
            <a className="text-gray-dark text-lg font-medium block my-3">
              {t("careers")}
            </a>
          </Link>
          <Link href={`/${locale}/tos`}>
            <a className="text-gray-dark text-lg font-medium block my-3">
              {t("tos")}
            </a>
          </Link>
        </div>
        <div className="ml-0 md:ml-6">
          <h3 className="text-primary-dark text-xl font-semibold capitalize">
            {t("ourSocialMedia")}
          </h3>
          {socialMediaLinks.length > 0 &&
            socialMediaLinks.map((mediaLink: any, key: any) => (
              <a
                className={styles.socialMediaLink}
                href={mediaLink?.url}
                id={key}
              >
                <Image
                  src={layout?.remoteSchemaUrl + mediaLink?.icon?.url}
                  width={"16px"}
                  height={"16px"}
                  className="max-w-[16px]"
                />
                <span className="p-2">{mediaLink[`name_${locale}`]}</span>
              </a>
            ))}
          <div>
            <Image
              src={`https://i.imgur.com/Js4cNHw.png`}
              width={"125px"}
              height={"125px"}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default TheFooter;
