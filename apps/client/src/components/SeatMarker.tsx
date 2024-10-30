import type { Seat } from "@apps/shared";
import { type FC, useContext } from "react";
import { SeatContext } from "../contexts/seat/SeatContext";
import { ConferencePopup } from "./ConferencePopup";
import { OccupiedSeatMarker } from "./OccupiedSeatMarker";
import { OfficePopup } from "./OfficePopup";
import { VacantSeatMarker } from "./VacantSeatMarker";

type SeatMarkerProps = {
  seat: Seat;
};

export const SeatMarker: FC<SeatMarkerProps> = ({ seat }) => {
  const { seatState, memberSeatsMap } = useContext(SeatContext);

  if (!seatState.filteredSeatIds?.has(seat.id)) {
    return;
  }

  const Popup =
    seat.category === "conference" ? (
      <ConferencePopup seat={seat} />
    ) : (
      <OfficePopup seat={seat} />
    );

  return memberSeatsMap.seatId[seat.id] ? (
    <OccupiedSeatMarker seat={seat}>{Popup}</OccupiedSeatMarker>
  ) : (
    <VacantSeatMarker seat={seat}>{Popup}</VacantSeatMarker>
  );
};
