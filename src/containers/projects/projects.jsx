import SlickCarousel from "../../components/carousel/SlickCarousel";
import { datas } from "./data";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";
import eyeIcon from "../../assets/eye.svg";

const Projects = () => {
  const { t, ready, i18n } = useTranslation("project");
  const { theme } = useTheme();
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isMobileOrPortrait, setIsMobileOrPortrait] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    const checkScreenSize = () => {
      const isPortrait = window.innerHeight > window.innerWidth;
      const isMobile = window.innerWidth < 768;
      setIsMobileOrPortrait(isPortrait || isMobile);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    window.addEventListener("orientationchange", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
      window.removeEventListener("orientationchange", checkScreenSize);
    };
  }, []);

  const getTranslatedProjects = () => {
    const currentLanguage = i18n.language || 'en';

    return datas.map((item) => ({
      ...item,
      description: typeof item.description === 'object'
        ? (item.description[currentLanguage] || item.description.en || item.description.id)
        : item.description
    }));
  };

  const projectsData = getTranslatedProjects();

  const customPaging = (i) => (
    <div className="w-20 h-14 cursor-pointer group">
      <div className={`w-full h-full rounded-lg overflow-hidden border-2 group-hover:border-blue-500 transition-all duration-300 shadow-md hover:shadow-lg ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}>
        <img
          src={projectsData[i]?.image}
          alt={`Project ${i + 1} thumbnail`}
          className="w-full h-full object-cover transition-all duration-300"
        />
      </div>
    </div>
  );

  const handleEyeClick = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  const renderProjectItem = (item, idx, withArrows = false) => (
    <div key={idx} className={`group relative px-2 sm:px-4 mb-8 md:mb-0`}>
      <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto">
        <div className={`relative overflow-hidden rounded-2xl shadow-2xl p-4 sm:p-6 hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}>
          {/* Project Image */}
          <div className="relative overflow-hidden rounded-xl mb-4">
            <img
              src={item.image}
              alt={`Project ${idx + 1}`}
              className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer flex items-center justify-center rounded-xl"
              onClick={() => handleEyeClick(item)}
            >
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="bg-white/90 backdrop-blur-md rounded-full p-5 border-2 border-white shadow-2xl hover:bg-white hover:scale-110 transition-all duration-300">
                  <img
                    src={eyeIcon}
                    alt="View details"
                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 filter invert-0 opacity-80"
                    style={{ filter: 'brightness(0) saturate(100%) invert(15%) sepia(13%) saturate(1137%) hue-rotate(193deg) brightness(95%) contrast(89%)' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Project Info */}
          <div className="space-y-2">
            <h3 className={`text-lg sm:text-xl font-bold truncate ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}>
              {item.title || `Project ${idx + 1}`}
            </h3>
            <p className={`text-sm line-clamp-3 leading-relaxed ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}>
              {item.description.substring(0, 120)}...
            </p>
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => handleEyeClick(item)}
                className={`inline-flex items-center gap-2 font-medium text-sm transition-colors duration-200 ${
                  theme === "dark" ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"
                }`}
              >
                <span>View Details</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {withArrows && (
          <>
            <button
              type="button"
              className={`absolute left-2 top-1/2 -translate-y-1/2 z-30 rounded-full p-3 shadow-lg transition-all duration-200 backdrop-blur-sm border ${
                theme === "dark"
                  ? "bg-gray-800/90 hover:bg-gray-700 text-gray-200 hover:text-white border-gray-700"
                  : "bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 border-gray-200"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (sliderRef.current) {
                  sliderRef.current.slickPrev();
                }
              }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              type="button"
              className={`absolute right-2 top-1/2 -translate-y-1/2 z-30 rounded-full p-3 shadow-lg transition-all duration-200 backdrop-blur-sm border ${
                theme === "dark"
                  ? "bg-gray-800/90 hover:bg-gray-700 text-gray-200 hover:text-white border-gray-700"
                  : "bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 border-gray-200"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (sliderRef.current) {
                  sliderRef.current.slickNext();
                }
              }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <section
      id="projects"
      className={`min-h-screen w-full flex flex-col items-center justify-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-gray-50 via-white to-blue-50"
      }`}
    >
      <style>{`
        .custom-dots {
          position: relative !important;
          bottom: auto !important;
          margin-top: 40px !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          list-style: none !important;
          padding: 0 !important;
          gap: 30px !important;
          flex-wrap: nowrap !important;
        }

        .custom-dots li {
          margin: 0 !important;
          padding: 0 !important;
          display: inline-block !important;
          position: relative !important;
          flex-shrink: 0 !important;
          width: auto !important;
        }

        .custom-dots li.slick-active > div > div {
          border-color: #3b82f6 !important;
          transform: scale(1.1) !important;
        }

        .custom-dots li button {
          display: none !important;
        }

        .custom-dots li.slick-active img {
          opacity: 1 !important;
        }
      `}</style>
      {/* Header Section */}
      <div className="text-center mb-16 max-w-4xl">
        <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent mb-4 ${
          theme === "dark"
            ? "bg-gradient-to-r from-white via-blue-300 to-white"
            : "bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900"
        }`}>
          {ready ? t("title") : "Projects"}
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-6"></div>
        <p className={`text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}>
          {ready
            ? t("subtitle")
            : "Explore my featured projects showcasing innovative solutions and modern web development."}
        </p>
      </div>

      {/* Projects Container */}
      <div
        className={`w-full ${
          isMobileOrPortrait
            ? "max-w-lg mx-auto"
            : "max-w-md sm:max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-7xl"
        }`}
      >
        {isMobileOrPortrait ? (
          <div className="space-y-8">
            {projectsData.map((item, idx) => renderProjectItem(item, idx))}
          </div>
        ) : (
          <SlickCarousel
            ref={sliderRef}
            settings={{
              arrows: false,
              dots: true,
              customPaging: customPaging,
              dotsClass: "slick-dots custom-dots",
              infinite: true,
              speed: 500,
              slidesToShow: 1,
              slidesToScroll: 1,
              responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    customPaging: customPaging,
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                  }
                }
              ]
            }}
          >
            {projectsData.map((item, idx) => renderProjectItem(item, idx, true))}
          </SlickCarousel>
        )}
      </div>

      {/* Enhanced Modal */}
      {showModal && selectedProject && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className={`rounded-2xl w-full max-w-sm sm:max-w-md lg:max-w-4xl xl:max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`flex justify-between items-center p-6 border-b ${
              theme === "dark"
                ? "bg-gradient-to-r from-gray-900 to-gray-800 border-gray-700"
                : "bg-gradient-to-r from-blue-50 to-indigo-50 border-gray-100"
            }`}>
              <div>
                <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}>
                  {selectedProject.title}
                </h2>
              </div>
              <button
                onClick={closeModal}
                className={`text-2xl sm:text-3xl flex-shrink-0 ml-4 w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-200 ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-white hover:bg-gray-700"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                }`}
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Section */}
                <div className="space-y-4">
                  <div className="relative overflow-hidden rounded-xl shadow-lg">
                    <img
                      src={selectedProject.image}
                      alt="Project"
                      className={`w-full h-64 sm:h-80 lg:h-96 object-contain ${
                        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
                      }`}
                    />
                  </div>
                </div>

                {/* Description Section */}
                <div className="space-y-6">
                  <div>
                    <h3 className={`text-lg font-semibold mb-3 flex items-center gap-2 ${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    }`}>
                      <svg
                        className={`w-5 h-5 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Project Overview
                    </h3>
                    <p className={`leading-relaxed text-justify ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}>
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Frontend Stack Section */}
                  <div>
                    <h3 className={`text-lg font-semibold mb-3 flex items-center gap-2 ${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    }`}>
                      <svg
                        className={`w-5 h-5 ${theme === "dark" ? "text-green-400" : "text-green-600"}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>
                      Frontend Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.frontendStack &&
                        selectedProject.frontendStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className={`px-3 py-1.5 border rounded-full text-sm font-medium transition-all duration-200 hover:shadow-sm ${
                              theme === "dark"
                                ? "bg-gradient-to-r from-blue-900 to-indigo-900 text-blue-200 border-blue-700"
                                : "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 border-blue-200"
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;