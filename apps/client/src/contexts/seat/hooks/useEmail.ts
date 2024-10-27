import { type Dispatch, useContext, useEffect } from "react";
import { GasContext } from "../../gas/GasContext";
import type { SeatAction } from "../reducers/seatReducer";

export const useEmail = (dispatch: Dispatch<SeatAction>) => {
  const { serverFunctions } = useContext(GasContext);

  useEffect(() => {
    serverFunctions
      .getEmail()
      .then((email) => {
        dispatch({ type: "set", key: "email", value: email });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [serverFunctions, dispatch]);
};
