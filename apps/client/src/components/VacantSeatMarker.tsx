import type { Seat } from "@apps/shared";
import type { FC, ReactNode } from "react";
import { CircleMarker } from "react-leaflet";
import { categoryColor, colorHue } from "../utils/colors";

type VacantSeatMarkerProps = {
  seat: Seat;
  children?: ReactNode;
};

export const VacantSeatMarker: FC<VacantSeatMarkerProps> = ({
  seat,
  children,
}) => {
  return (
    <CircleMarker
      center={[seat.lat, seat.lng]}
      radius={10}
      className={colorHue[categoryColor[seat.category]]}
    >
      {children}
    </CircleMarker>
  );
};
