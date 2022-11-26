/** Studied from https://betterprogramming.pub/implementing-image-and-text-slider-with-react-js-and-optimizations-7a16af998548 **/
import React from "react";

export default function SlideImage({ src, alt }) {
  return <img src={src} alt={alt} className="slide-image" />;
}