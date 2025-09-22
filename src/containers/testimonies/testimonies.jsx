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
    <section
      id="testimonies"
      className="min-h-fit bg-gray-50 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto text-center mb-8 sm:mb-12 lg:mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          {ready ? t("sectionTitle", "What People Say") : "What People Say"}
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
          {ready
            ? t(
                "sectionDescription",
                "Here's what my colleagues and collaborators have to say about working with me"
              )
            : "Here's what my colleagues and collaborators have to say about working with me"}
        </p>
      </div>

      {/* Testimonials Carousel */}
      <div className="max-w-7xl mx-auto">
        <StandardCarousel
          settings={{
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 6000,
            adaptiveHeight: false,
            arrows: true,
            centerMode: false,
            focusOnSelect: true,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  arrows: false,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  arrows: false,
                  centerMode: true,
                  centerPadding: "40px",
                },
              },
              {
                breakpoint: 640,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  arrows: false,
                  centerMode: false,
                  centerPadding: "0px",
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

            const maxLength = 180;
            const isExpanded = expandedItems[index] || false;
            const shouldTruncate = testimonialText.length > maxLength;
            const displayText = isExpanded
              ? testimonialText
              : testimonialText.slice(0, maxLength);

            return (
              <div key={index} className="px-3 sm:px-4">
                <Card className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full min-h-[320px] sm:min-h-[340px] lg:min-h-[360px] flex flex-col mx-auto max-w-sm">
                  {/* Card Content */}
                  <div className="p-4 sm:p-5 lg:p-6 flex flex-col h-full">
                    {/* Header Section */}
                    <div className="flex items-start gap-3 sm:gap-4 mb-4">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                          <img
                            src={userIcon}
                            alt={ready ? t("ui.userIconAlt") : "User Icon"}
                            className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full object-cover"
                          />
                        </div>
                      </div>

                      {/* User Info */}
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-sm sm:text-base lg:text-lg text-gray-900 line-clamp-1">
                          {firstName} {lastName}
                        </h3>
                        <p className="text-xs sm:text-sm text-blue-600 font-medium line-clamp-1 mt-1">
                          {jobTitle}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500 line-clamp-1">
                          {company}
                        </p>
                      </div>
                    </div>

                    {/* Testimonial Text */}
                    <div className="flex-grow">
                      <div className="relative">
                        {/* Quote Icon */}
                        <div className="absolute -top-2 -left-1 text-2xl sm:text-3xl text-blue-200 font-serif">
                          "
                        </div>

                        <blockquote className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed pl-4 italic">
                          {displayText}
                          {shouldTruncate && !isExpanded && "..."}
                          {shouldTruncate && (
                            <button
                              className="text-blue-600 hover:text-blue-800 ml-1 font-medium underline transition-colors"
                              onClick={() => toggleReadMore(index)}
                            >
                              {isExpanded
                                ? ready
                                  ? t("ui.readLess")
                                  : "read less"
                                : ready
                                ? t("ui.readMore")
                                : "read more"}
                            </button>
                          )}
                        </blockquote>

                        {/* Closing Quote */}
                        <div className="text-right text-2xl sm:text-3xl text-blue-200 font-serif -mt-2">
                          "
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-400 text-right">
                        {format(new Date(creationDate), "MMMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </StandardCarousel>
      </div>

      {/* Custom Styles for Carousel */}
      <style jsx global>{`
        .slick-dots {
          bottom: -40px !important;
        }

        .slick-dots li button:before {
          color: #3b82f6 !important;
          font-size: 12px !important;
          opacity: 0.5 !important;
        }

        .slick-dots li.slick-active button:before {
          opacity: 1 !important;
          color: #1d4ed8 !important;
        }

        .slick-arrow {
          z-index: 1;
        }

        .slick-prev {
          left: -25px !important;
        }

        .slick-next {
          right: -25px !important;
        }

        .slick-prev:before,
        .slick-next:before {
          color: #3b82f6 !important;
          font-size: 20px !important;
        }

        @media (max-width: 768px) {
          .slick-center .testimonial-card {
            transform: scale(1.05);
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonies;
