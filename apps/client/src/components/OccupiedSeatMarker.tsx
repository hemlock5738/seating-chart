import type { FC, ReactNode } from "react";
import { Marker } from "react-leaflet";
import { ColorMarker } from "../leaflet/ColorMarker";
import type { Seat } from "../types/Seat";
import { categoryColor } from "../utils/colors";

type OccupiedSeatMarkerProps = {
  seat: Seat;
  children?: ReactNode;
};

export const OccupiedSeatMarker: FC<OccupiedSeatMarkerProps> = ({
  seat,
  children,
}) => {
  return (
    <Marker
      position={[seat.lat, seat.lng]}
      icon={ColorMarker(categoryColor[seat.category])}
    >
      {children}
    </Marker>
  );
};