import { TileLayer, MapContainer, Marker, Popup } from "react-leaflet";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

import { useState } from "react";
import { useCities } from "../src/contexts/CitiesContext";

function Map() {
  const navigate = useNavigate();
  const [params, setParam] = useSearchParams();
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([
    38.727881642324164, -9.140900099907554,
  ]);

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <MapContainer
        center={mapPosition}
        zoom={13}
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
              <span>{cities.emoji} </span> <span>{cities.cityName}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
