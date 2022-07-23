import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from "react-google-maps";
const defaultOptions = { scrollwheel: false };
const RegularMap = withScriptjs(
  withGoogleMap((props: any) => (
    <GoogleMap
      defaultZoom={16}
      defaultCenter={props.defaultCenter}
      defaultOptions={defaultOptions}
    >
      <Marker position={props.defaultCenter} />
    </GoogleMap>
  ))
);
type CoordinateType = {
  lat: number;
  lng: number;
};
const Location = ({ coordinates }: { coordinates: CoordinateType }) => {
  // const position = [18.276545815078315, 42.66777995224902];
  return (
    <>
      {process.browser && (
        <RegularMap
          googleMapURL="https://maps.googleapis.com/maps/api/js"
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "500px", margin: "10px" }} />}
          mapElement={
            <div
              style={{
                height: "95%",
                borderRadius: "15px",
              }}
            />
          }
          defaultCenter={{ lat: coordinates?.lat, lng: coordinates?.lng }}
        />
      )}
    </>
  );
};

export default Location;
