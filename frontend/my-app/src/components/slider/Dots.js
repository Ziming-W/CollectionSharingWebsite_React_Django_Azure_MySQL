/** Studied from https://betterprogramming.pub/implementing-image-and-text-slider-with-react-js-and-optimizations-7a16af998548 **/
import React, { useContext } from "react";
import { SliderContext } from "./Slider";
import Dot from "./Dot";

export default function Dots() {
  const { slidesCount } = useContext(SliderContext);

  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < slidesCount; i++) {
      dots.push(<Dot key={`dot-${i}`} number={i} />);
    }

    return dots;
  };

  return <div className="dots">{renderDots()}</div>;
}