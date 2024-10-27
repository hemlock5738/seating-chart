import L from "leaflet";
import { LayersControl, MapContainer, ZoomControl } from "react-leaflet";
import f1 from "../assets/1.svg";
import f2 from "../assets/2.svg";
import f3 from "../assets/3.svg";
import { Floor, type FloorProps } from "./Floor";
import "leaflet/dist/leaflet.css";

const bounds: L.LatLngBoundsExpression = [
  [0, 0],
  [1000, 1000],
];
const center: L.LatLngExpression = [500, 500];

const floors: Omit<FloorProps, "bounds">[] = [
  {
    floor: 1,
    name: "f1",
    url: f1,
    checked: true,
  },
  {
    floor: 2,
    name: "f2",
    url: f2,
  },
  {
    floor: 3,
    name: "f3",
    url: f3,
  },
];

const LeafletMap = () => (
  <MapContainer
    center={center}
    zoom={0.1}
    zoomControl={false}
    zoomDelta={0.5}
    zoomSnap={0.1}
    crs={L.CRS.Simple}
    style={{ height: "100vh" }}
  >
    <ZoomControl position="bottomright" />
    <LayersControl collapsed={false}>
      {floors.map(({ floor, name, url, checked }) => (
        <Floor
          key={floor}
          floor={floor}
          name={name}
          url={url}
          bounds={bounds}
          checked={checked}
        />
      ))}
    </LayersControl>
  </MapContainer>
);

export { LeafletMap };
