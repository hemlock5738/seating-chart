import type { Members } from "@apps/shared";
import { type Dispatch, useContext, useEffect } from "react";
import { GasContext } from "../../gas/GasContext";
import type { SeatAction } from "../reducers/seatReducer";

export const useMembers = (dispatch: Dispatch<SeatAction>) => {
  const { serverFunctions } = useContext(GasContext);

  useEffect(() => {
    serverFunctions
      .getMembers()
      .then((members) => {
        dispatch({ type: "set", key: "members", value: members as Members });
      })
      .catch((e) => {
        console.error(e);
      });
  }, [serverFunctions, dispatch]);
};
