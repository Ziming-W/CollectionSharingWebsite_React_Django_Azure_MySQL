/** Studied from https://betterprogramming.pub/implementing-image-and-text-slider-with-react-js-and-optimizations-7a16af998548 **/
import React, { useContext } from "react";
import { SliderContext } from "./Slider";
import "../../styles/styles.scss";

export default function Arrows() {
  const { changeSlide } = useContext(SliderContext);

  return (
    <div className="arrows">
      <div className="arrow left" onClick={() => changeSlide(-1)} />
      <div className="arrow right" onClick={() => changeSlide(1)} />
    </div>
  );
}