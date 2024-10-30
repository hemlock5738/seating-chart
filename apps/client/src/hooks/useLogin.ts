import { useContext, useEffect, useRef } from "react";
import { GasContext } from "../contexts/gas/GasContext";
import { SeatContext } from "../contexts/seat/SeatContext";

export const useLogin = () => {
  const { googleScriptFunctions, serverFunctions } = useContext(GasContext);
  const { seatState, seatDispatch } = useContext(SeatContext);
  const ref = useRef(false);
  const { email, members, memberSeats, seats } = seatState;

  useEffect(() => {
    if (ref.current) return;
    if (email && members && memberSeats && seats) {
      ref.current = true;

      googleScriptFunctions.url.getLocation((location) => {
        const { seatId } = location.parameter;
        googleScriptFunctions.history.replace({}, {}, undefined);
        if (seatId === undefined) return;
        const seated = memberSeats.some(
          (memberSeat) =>
            memberSeat.email === email && memberSeat.seatId === seatId,
        );
        if (seated) {
          seatDispatch({ type: "leaveSeat", email, seatId });
          serverFunctions.move("leaveSeat", seatId).catch(() => {
            seatDispatch({ type: "sitDown", email, seatId });
          });
        } else {
          seatDispatch({ type: "sitDown", email, seatId });
          serverFunctions.move("sitDown", seatId).catch(() => {
            seatDispatch({ type: "leaveSeat", email, seatId });
          });
        }
      });
    }
  }, [
    email,
    members,
    memberSeats,
    seats,
    googleScriptFunctions,
    serverFunctions,
    seatDispatch,
  ]);
};
