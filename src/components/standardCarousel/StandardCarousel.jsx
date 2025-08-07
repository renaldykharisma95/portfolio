import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const StandardCarousel = ({ settings = {}, children }) => {
  const defaultSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    ...settings,
  };
  return <Slider {...defaultSettings}>{children}</Slider>;
};

export default StandardCarousel;
