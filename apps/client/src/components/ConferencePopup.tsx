import type { Seat } from "@apps/shared";
import { type FC, useContext } from "react";
import { Popup } from "react-leaflet";
import { SeatContext } from "../contexts/seat/SeatContext";

type ConferencePopupProps = {
  seat: Seat;
};

export const ConferencePopup: FC<ConferencePopupProps> = ({ seat }) => {
  const { seatState, memberSeatsMap, seatDispatch } = useContext(SeatContext);
  const members = seatState.members;
  const email = seatState.email;

  const handleStandup = () => {
    seatDispatch({ type: "leaveSeat", email, seatId: seat.id });
  };

  const handleSitdown = () => {
    seatDispatch({ type: "sitDown", email, seatId: seat.id });
  };

  return (
    <Popup>
      <p>{seat.id}</p>
      <div>
        {memberSeatsMap.seatId[seat.id].map((email) => {
          const member = members[email];
          return (
            <div key={email}>
              <p>{member?.name}</p>
            </div>
          );
        })}
        {memberSeatsMap.seatId[seat.id].includes(email) ? (
          <button type="button" onClick={handleStandup}>
            leaveSeat
          </button>
        ) : (
          <button type="button" onClick={handleSitdown}>
            sitDown
          </button>
        )}
      </div>
    </Popup>
  );
};
