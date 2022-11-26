/** Studied from https://betterprogramming.pub/implementing-image-and-text-slider-with-react-js-and-optimizations-7a16af998548 **/
import React, { useContext } from "react";
import { SliderContext } from "./Slider";

export default function Dot({ number }) {
  const { goToSlide, slideNumber } = useContext(SliderContext);

  return (
    <div
      className={`dot ${slideNumber === number ? "selected" : ""}`}
      onClick={() => goToSlide(number)}
    />
  );
}