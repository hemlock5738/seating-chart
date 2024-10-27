import type { Seat } from "@apps/shared";
import { type FC, useContext } from "react";
import { Popup } from "react-leaflet";
import { SeatContext } from "../contexts/seat/SeatContext";
import { GasContext } from "../contexts/gas/GasContext";

type ConferencePopupProps = {
  seat: Seat;
};

export const ConferencePopup: FC<ConferencePopupProps> = ({ seat }) => {
  const { seatState, memberSeatsMap, seatDispatch } = useContext(SeatContext);
  const { serverFunctions } = useContext(GasContext);
  const members = seatState.members;
  const email = seatState.email;

  const handleLeaveSeat = () => {
    seatDispatch({ type: "leaveSeat", email, seatId: seat.id });
    serverFunctions.move("leaveSeat", seat.id).catch((e) => {
      seatDispatch({ type: "sitDown", email, seatId: seat.id });
      console.error(e);
    });
  };

  const handleSitDown = () => {
    seatDispatch({ type: "sitDown", email, seatId: seat.id });
    serverFunctions.move("sitDown", seat.id).catch((e) => {
      seatDispatch({ type: "leaveSeat", email, seatId: seat.id });
      console.error(e);
    });
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
          <button type="button" onClick={handleLeaveSeat}>
            leaveSeat
          </button>
        ) : (
          <button type="button" onClick={handleSitDown}>
            sitDown
          </button>
        )}
      </div>
    </Popup>
  );
};
