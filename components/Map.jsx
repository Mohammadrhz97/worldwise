import {
  TileLayer,
  MapContainer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../src/contexts/CitiesContext";
import { useGeolocation } from "../src/hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../src/hooks/useUrlPosition";

function Map() {
  const { cities } = useCities();
  const [position, setPosition] = useState([40, 0]);
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  const [lat, lng] = useUrlPosition();

  useEffect(
    function () {
      if (lat && lng) setPosition([lat, lng]);
    },
    [lat, lng]
  );

  useEffect(
    function () {
      if (geoLocationPosition)
        setPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    },
    [geoLocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition ? (
        <Button type={"position"} onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      ) : null}
      <MapContainer
        center={position}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((cities) => (
          <Marker
            position={[cities.position.lat, cities.position.lng]}
            key={cities.id}
          >
            <Popup>
              <span>{cities.emoji}</span> <span>{cities.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <MapView position={position} />
        <DetectingClick />
      </MapContainer>
    </div>
  );
}

function MapView({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectingClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
