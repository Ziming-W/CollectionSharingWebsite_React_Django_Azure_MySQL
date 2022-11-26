/** Studied from https://betterprogramming.pub/implementing-image-and-text-slider-with-react-js-and-optimizations-7a16af998548 **/
import React from "react";
import SlideTitle from "./SlideTitle";
import SlideImage from "./SlideImage";

export default function Slide({ data: { url, title } }) {
  return (
    <div className="slide">
      <SlideImage src={url} alt={title} />
      <SlideTitle title={title} />
    </div>
  );
}