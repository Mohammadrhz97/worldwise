import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const navigate = useNavigate();
  const [params, setParam] = useSearchParams();
  const lat = params.get("lat");
  const lng = params.get("lng");
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      positions: {lat} {lng}
    </div>
  );
}

export default Map;
