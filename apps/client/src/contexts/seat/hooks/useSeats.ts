import { type Dispatch, useContext, useEffect } from "react";
import { GasContext } from "../../gas/GasContext";
import type { SeatAction } from "../reducers/seatReducer";

export const useSeats = (dispatch: Dispatch<SeatAction>) => {
  const { serverFunctions } = useContext(GasContext);

  useEffect(() => {
    serverFunctions.getSeats().then((seats) => {
      dispatch({ type: "set", key: "seats", value: seats });
    });
  }, [serverFunctions, dispatch]);
};
