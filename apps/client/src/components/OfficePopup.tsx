import type { Seat } from "@apps/shared";
import { type FC, useContext } from "react";
import { Popup } from "react-leaflet";
import { GasContext } from "../contexts/gas/GasContext";
import { SeatContext } from "../contexts/seat/SeatContext";

type OfficePopupProps = {
  seat: Seat;
};

export const OfficePopup: FC<OfficePopupProps> = ({ seat }) => {
  const { seatState, memberSeatsMap, seatDispatch } = useContext(SeatContext);
  const { serverFunctions } = useContext(GasContext);
  const { email, members } = seatState;

  const emails = memberSeatsMap.seatId[seat.id];
  const member = emails && members ? members[[...emails][0]] : undefined;

  const handleLeaveSeat = () => {
    if (email === undefined) return;
    seatDispatch({ type: "leaveSeat", email, seatId: seat.id });
    serverFunctions.move("leaveSeat", seat.id).catch(() => {
      seatDispatch({ type: "sitDown", email, seatId: seat.id });
    });
  };

  const handleSitDown = () => {
    if (email === undefined) return;
    seatDispatch({ type: "sitDown", email, seatId: seat.id });
    serverFunctions.move("sitDown", seat.id).catch(() => {
      seatDispatch({ type: "leaveSeat", email, seatId: seat.id });
    });
  };

  return (
    <Popup>
      {member ? (
        <>
          <p>{seat.id}</p>
          <p>{member.name}</p>
          <p>{member.department}</p>
          <p>{member.position}</p>
          {email && memberSeatsMap.seatId[seat.id].includes(email) ? (
            <button type="button" onClick={handleLeaveSeat}>
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
          <button type="button" onClick={handleSitDown}>
            sitDown
          </button>
        </>
      )}
    </Popup>
  );
};
