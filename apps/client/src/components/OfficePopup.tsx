import { type FC, useContext } from "react";
import { Popup } from "react-leaflet";
import { SeatingContext } from "../contexts/seat/SeatContext";
import type { Seat } from "../types/Seat";

type OfficePopupProps = {
  seat: Seat;
};

export const OfficePopup: FC<OfficePopupProps> = ({ seat }) => {
  const { seatingState, seatings, seatingDispatch } =
    useContext(SeatingContext);
  const members = seatingState.members;
  const email = seatingState.email;

  const emails = seatings.bySeatId[seat.id];
  const member = emails ? members[[...emails][0]] : undefined;

  const handleStandup = () => {
    seatingDispatch({ type: "standup", email, seatId: seat.id });
  };

  const handleSitdown = () => {
    seatingDispatch({ type: "sitdown", email, seatId: seat.id });
  };

  return (
    <Popup>
      {member ? (
        <>
          <p>{seat.id}</p>
          <p>{member.name}</p>
          <p>{member.department}</p>
          <p>{member.position}</p>
          {seatings.bySeatId[seat.id].has(email) ? (
            <button type="button" onClick={handleStandup}>
              standUp
            </button>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <p>{seat.id}</p>
          <p>vacant</p>
          <button type="button" onClick={handleSitdown}>
            sitDown
          </button>
        </>
      )}
    </Popup>
  );
};
