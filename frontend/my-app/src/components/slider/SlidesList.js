/** Studied from https://betterprogramming.pub/implementing-image-and-text-slider-with-react-js-and-optimizations-7a16af998548 **/
import React, { useContext } from "react";
import Slide from "./Slide";
import { SliderContext } from "./Slider";

export default function SlidesList() {
  const { slideNumber, items } = useContext(SliderContext);

  return (
    <div
      className="slide-list"
      style={{ transform: `translateX(-${slideNumber * 100}%)` }}
    >
      {items.map((slide, index) => (
        <Slide key={index} data={slide} />
      ))}
    </div>
  );
}