import { type Dispatch, useContext, useEffect } from "react";
import { GasContext } from "../../gas/GasContext";
import type { SeatAction } from "../reducers/seatReducer";

export const useMemberSeats = (dispatch: Dispatch<SeatAction>) => {
  const { serverFunctions } = useContext(GasContext);

  useEffect(() => {
    serverFunctions
      .getMemberSeats()
      .then((memberSeats) => {
        dispatch({
          type: "set",
          key: "memberSeats",
          value: memberSeats,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }, [serverFunctions, dispatch]);
};
