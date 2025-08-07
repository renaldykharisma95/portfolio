import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlickCarousel = React.forwardRef(({ settings = {}, children }, ref) => {
  const images = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      // Look for img inside nested structure (div > div > img)
      const findImg = (element) => {
        if (React.isValidElement(element)) {
          if (element.type === "img") {
            return element.props.src;
          }
          if (element.props.children) {
            const children = React.Children.toArray(element.props.children);
            for (const c of children) {
              const found = findImg(c);
              if (found) return found;
            }
          }
        }
        return null;
      };
      return findImg(child);
    }
    return null;
  });
  const defaultSettings = {
    customPaging: function (i) {
      return (
        <div className="slider-container rounded-lg">
          {images && images[i] ? (
            <img
              src={images[i]}
              alt={`thumb-${i + 1}`}
              className="min-w-[120px] h-[80px] object-cover"
            />
          ) : (
            i + 1
          )}
        </div>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb custom-slick-dots",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const mergedSettings = { ...defaultSettings, ...settings };
  return <Slider ref={ref} {...mergedSettings}>{children}</Slider>;
});

export default SlickCarousel;
