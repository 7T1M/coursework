//import HeatMap from "../../../components/HeatMap";
import { GoogleApiWrapper, Map, HeatMap } from "google-maps-react";
import { useEffect } from "react";
import adminServices from "../../../services/admin";
import { useDispatch, useSelector } from "react-redux";
import { selectRoute } from "../../../redux/sideNavSlice";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
const gradient = [
  "rgba(0, 255, 255, 0)",
  "rgba(0, 255, 255, 1)",
  "rgba(0, 191, 255, 1)",
  "rgba(0, 127, 255, 1)",
  "rgba(0, 63, 255, 1)",
  "rgba(0, 0, 255, 1)",
  "rgba(0, 0, 223, 1)",
  "rgba(0, 0, 191, 1)",
  "rgba(0, 0, 159, 1)",
  "rgba(0, 0, 127, 1)",
  "rgba(63, 0, 91, 1)",
  "rgba(127, 0, 63, 1)",
  "rgba(191, 0, 31, 1)",
  "rgba(255, 0, 0, 1)",
];

function MapPage(props) {
  const dispatch = useAppDispatch();
  const auth = useSelector((state) => state.app.authToken);
  const logger = useAppSelector((state) => state.app.logger);
  const [coordinates, setCoordinates] = useState([]);
  useEffect(() => {
    dispatch(selectRoute("heatmap"));
    logger.userChangePage("heatmap");

    getClaims();
  }, []);
  function getClaims() {
    adminServices.getClaims(auth).then((res) => {
      getCoordinates(res.data.data);
    });
  }

  function getCoordinates(data) {
    const tempData = [];
    for (const item in data) {
      tempData.push({ lat: data[item].latitude, lng: data[item].longitude });
    }
    setCoordinates(tempData);
  }
  return (
    <div>
      {coordinates.length ? (
        <Map
          style={{ width: "98%" }}
          initialCenter={{ lat: 48.0034393, lng: 37.8087777 }}
          google={props.google}
          zoom={13}
        >
          <HeatMap
            gradient={gradient}
            opacity={0.3}
            positions={coordinates}
            radius={20}
          />
        </Map>
      ) : (
        <div>загрузка...</div>
      )}
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB3VYEDnfBnnINsqVkQ16VeLl0C4JOx6Dc",
  language: "ru",
  libraries: ["places", "visualization"],
  region: "Russia",
})(MapPage);
