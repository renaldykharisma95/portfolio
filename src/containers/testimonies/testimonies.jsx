import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import Card from "../../components/Card/Card";
import userIcon from "../../assets/user.webp";
import { format } from "date-fns";
import StandardCarousel from "../../components/standardCarousel/StandardCarousel";
import recommendationData from "./recommendation.json";

const Testimonies = () => {
  const { t, ready } = useTranslation("testimonies");
  const [expandedItems, setExpandedItems] = useState({});

  const toggleReadMore = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getTestimonialData = () => {
    if (!ready) return recommendationData;

    const translatedData = t("recommendations", { returnObjects: true });

    if (Array.isArray(translatedData) && translatedData.length > 0) {
      return translatedData;
    }

    return recommendationData;
  };

  const data = getTestimonialData();

  return (
    <section className="min-h-fit bg-gray-100 py-4 sm:py-6 lg:py-8 px-2 sm:px-4">
      <StandardCarousel
        settings={{
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 4,
          slidesToScroll: 4,
          autoplay: true,
          autoplaySpeed: 8000,
          adaptiveHeight: true,
          arrows: false,
          center: true,
          responsive: [
            {
              breakpoint: 1280,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              },
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 640,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
        }}
      >
        {data.map((item, index) => {
          // Handle both original JSON format and translated format
          const testimonialText = item.text || item["Text"];
          const firstName = item.firstName || item["First Name"];
          const lastName = item.lastName || item["Last Name"];
          const jobTitle = item.jobTitle || item["Job Title"];
          const company = item.company || item["Company"];
          const creationDate = item.creationDate || item["Creation Date"];

          const maxLength = 150;
          const isExpanded = expandedItems[index] || false;
          const shouldTruncate = testimonialText.length > maxLength;
          const displayText = isExpanded
            ? testimonialText
            : testimonialText.slice(0, maxLength);

          return (
            <div key={index} className="px-1 sm:px-2 w-full">
              <Card className="p-3 sm:p-4 lg:p-6 w-full h-[240px] sm:h-[260px] lg:h-[300px] xl:h-[320px] flex flex-col shadow-lg border border-gray-200 mx-auto max-w-sm">
                {/* Card Header with fixed height */}
                <div className="h-[60px] sm:h-[70px] lg:h-[80px] flex flex-row gap-2 sm:gap-3 lg:gap-4 items-center mb-2">
                  <img
                    src={userIcon}
                    alt={ready ? t("ui.userIconAlt") : "User Icon"}
                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-xs sm:text-sm lg:text-base xl:text-lg leading-tight truncate">
                      {firstName + " " + lastName}
                    </h3>
                    <p className="text-[10px] sm:text-xs lg:text-sm text-gray-600 truncate">
                      {jobTitle}
                    </p>
                    <p className="text-[10px] sm:text-xs lg:text-sm text-gray-600 pt-1 truncate">
                      {company}
                    </p>
                  </div>
                </div>
                <hr className="w-full border-gray-200 mb-2" />
                <div className="flex-grow overflow-hidden">
                  <p className="text-[10px] sm:text-xs lg:text-sm leading-relaxed text-gray-700 line-clamp-3 sm:line-clamp-4">
                    "{displayText}
                    {shouldTruncate && !isExpanded && "..."}
                    {shouldTruncate && (
                      <span
                        className="text-blue-500 cursor-pointer ml-1 hover:underline font-medium"
                        onClick={() => toggleReadMore(index)}
                      >
                        {isExpanded
                          ? ready
                            ? t("ui.readLess")
                            : " read less"
                          : ready
                          ? t("ui.readMore")
                          : " read more"}
                      </span>
                    )}
                    "
                  </p>
                </div>
                <div className="pt-1 sm:pt-2">
                  <p className="text-[8px] sm:text-[10px] lg:text-xs text-gray-500 truncate">
                    {format(new Date(creationDate), "PPP")}
                  </p>
                </div>
              </Card>
            </div>
          );
        })}
      </StandardCarousel>
    </section>
  );
};

export default Testimonies;
