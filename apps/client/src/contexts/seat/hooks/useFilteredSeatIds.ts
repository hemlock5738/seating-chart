import type { Seats } from "@apps/shared";
import { type Dispatch, useEffect } from "react";
import type { SeatAction } from "../reducers/seatReducer";

export const useFilteredSeatIds = (
  dispatch: Dispatch<SeatAction>,
  seats: Seats,
) => {
  useEffect(() => {
    dispatch({
      type: "set",
      key: "filteredSeatIds",
      value: new Set(Object.values(seats).map((seat) => seat.id)),
    });
  }, [dispatch, seats]);
};
