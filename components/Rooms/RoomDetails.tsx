import React, { useContext } from "react";
//@ts-ignore
import { Slide } from "react-slideshow-image";
import CustomMD from "../common/CustomMD";
import { AppContext } from "./../../context/AppContext";
import { useSpeech } from "./../../hooks/useSpeech";
import useTranslation from "./../../hooks/useTranslation";

const RoomDetails = ({
  roomDetails,
  roomAmenities,
  remoteUrl,
}: {
  roomDetails: any;
  purpose?: string;
  roomAmenities: any[];
  remoteUrl: string;
}) => {
  const { t, locale } = useTranslation();
  const { speechHandler } = useSpeech();
  const { isMobile } = useContext(AppContext);
  // const [basePrice, setBasePrice] = useState<any>(undefined);
  // const [packagePrices, setPackagePrices] = useState<any>(undefined);
  // useEffect(() => {
  // 	console.log('within', roomDetails);
  // 	let packages = [];
  // 	// for (let key in roomDetails?.room_rates) {
  // 	// 	//@ts-ignore
  // 	// 	if (roomDetails?.room_rates[key]?.rate.title.en === 'Base Package') {
  // 	// 		//@ts-ignore
  // 	// 		setBasePrice(roomDetails?.room_rates[key]!);
  // 	// 	} else {
  // 	// 		//@ts-ignore
  // 	// 		packages.push(roomDetails?.room_rates[key]);
  // 	// 	}
  // 	// 	setPackagePrices([...packages]);
  // 	// }
  // }, [roomDetails]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-start mx-1 my-1">
      <div className="mx-2">
        {roomDetails?.RelWithStrapiRoom?.images &&
        roomDetails?.RelWithStrapiRoom?.images?.length > 0 ? (
          <Slide
            easing="ease-in"
            transitionDuration={500}
            arrows={isMobile ? false : true}
            autoplay={false}
          >
            {roomDetails?.RelWithStrapiRoom?.images.map(
              (img: any, i: number) => (
                <img
                  src={remoteUrl + img?.url}
                  key={i}
                  className="w-full h-full"
                />
              )
            )}
          </Slide>
        ) : (
          <img src="https://i.imgur.com/bDujVXa.jpg" />
        )}
      </div>
      <div className="mx-1 py-2 ">
        <CustomMD
          markdown={roomDetails?.RelWithStrapiRoom[`description_${locale}`]}
        />

        <div className="h-full my-1 px-1">
          <h5
            onMouseEnter={() => speechHandler(t("roomHighlights"))}
            className="text-primary-dark text-center my-1 text-xl font-medium"
          >
            {t("roomHighlights")}
          </h5>
          <hr />
          <ul
            className="list-disc mx-5 grid grid-cols-2"
            style={{
              height: "50vh",
              overflowY: "auto",
            }}
          >
            {roomAmenities.length > 0 &&
              roomAmenities.map((amenity: any, i: number) => (
                <li key={i} className="flex items-start my-3 mx-1">
                  <img
                    src={remoteUrl + amenity?.amenitiy?.media[0]?.url}
                    style={{
                      width: "35px",
                      height: "35px",
                      margin: "0 5px",
                      padding: "5px",
                      borderRadius: "10px",
                      background:
                        "linear-gradient(rgba(29, 38, 113, 0.8), rgba(195, 55, 100, 0.8)), url('https://bit.ly/2rlzaXi')",
                    }}
                  />
                  <span
                    onMouseEnter={() =>
                      speechHandler(`
                    ${amenity?.amenitiy?.name[locale]} 
										${amenity?.count && <span>{amenity?.count} </span>}
										${amenity?.unit && amenity?.unit}
                    `)
                    }
                    className="mx-2 text-sm"
                  >
                    {amenity?.amenitiy?.name[locale]}{" "}
                    {amenity?.count && <span>{amenity?.count} &times;</span>}
                    {amenity?.unit && amenity?.unit}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
