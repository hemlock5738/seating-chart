import { type FC, useContext } from "react";
import {
  type ControlledLayerProps,
  ImageOverlay,
  type ImageOverlayProps,
  LayerGroup,
  LayersControl,
} from "react-leaflet";
import { SeatContext } from "../contexts/seat/SeatContext";
import { SeatMarker } from "./SeatMarker";

export type FloorProps = {
  floor: number;
  name: ControlledLayerProps["name"];
  url: ImageOverlayProps["url"];
  bounds: ImageOverlayProps["bounds"];
  checked?: ControlledLayerProps["checked"];
};

export const Floor: FC<FloorProps> = ({
  floor,
  name,
  url,
  bounds,
  checked,
}) => {
  const { seatState } = useContext(SeatContext);
  const seats = seatState.seats;

  return (
    <LayersControl.BaseLayer name={name} checked={checked}>
      <LayerGroup>
        <ImageOverlay url={url} bounds={bounds}>
          {seats &&
            Object.keys(seats)
              .filter((seatId) => seats[seatId].floor === floor)
              .map((seatId) => (
                <SeatMarker key={seatId} seat={seats[seatId]} />
              ))}
        </ImageOverlay>
      </LayerGroup>
    </LayersControl.BaseLayer>
  );
};
