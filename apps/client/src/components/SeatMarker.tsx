import { type FC, useContext } from "react";
import { SeatingContext } from "../contexts/seat/SeatContext";
import type { Seat } from "../types/Seat";
import { ConferencePopup } from "./ConferencePopup";
import { OccupiedSeatMarker } from "./OccupiedSeatMarker";
import { OfficePopup } from "./OfficePopup";
import { VacantSeatMarker } from "./VacantSeatMarker";

type SeatMarkerProps = {
  seat: Seat;
};

export const SeatMarker: FC<SeatMarkerProps> = ({ seat }) => {
  const { seatingState, seatings } = useContext(SeatingContext);

  if (!seatingState.filteredSeatIds.has(seat.id)) {
    return;
  }

  const Popup =
    seat.category === "conference" ? (
      <ConferencePopup seat={seat} />
    ) : (
      <OfficePopup seat={seat} />
    );

  return seatings.bySeatId[seat.id] ? (
    <OccupiedSeatMarker seat={seat}>{Popup}</OccupiedSeatMarker>
  ) : (
    <VacantSeatMarker seat={seat}>{Popup}</VacantSeatMarker>
  );
};
