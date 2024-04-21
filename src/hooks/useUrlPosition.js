import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [params] = useSearchParams();
  const lat = params.get("lat");
  const lng = params.get("lng");
  return [lat, lng];
}
