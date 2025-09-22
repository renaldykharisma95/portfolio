import React from "react";
import { useTranslation } from "react-i18next";
import Coding from "../../assets/coding.webp";
import myPDF from "../../assets/CVRenaldyKharisma.pdf";

const Home = () => {
  const { t } = useTranslation("home");

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollToTestimonies = () => {
    const testimoniesSection =
      document.getElementById("testimonies") ||
      document.getElementById("about");
    if (testimoniesSection) {
      testimoniesSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = myPDF;
    link.download = "CVRenaldyKharisma.pdf";
    link.click();
  };

  return (
    <>
      <section
        id="home"
        className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center px-4 py-24 sm:pt-12 sm:pb-12 md:pt-16 md:pb-16 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full opacity-40 sm:opacity-60 blur-2xl sm:blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-tr from-purple-100 to-pink-200 rounded-full opacity-40 sm:opacity-60 blur-2xl sm:blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-yellow-100 to-orange-200 rounded-full opacity-20 sm:opacity-30 blur-2xl sm:blur-3xl"></div>
        </div>

        <div className="max-w-7xl w-full flex flex-col md:flex-row lg:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-6 lg:gap-12 relative z-10">
          {/* Content Section */}
          <div className="flex flex-col gap-4 sm:gap-6 max-w-2xl text-center md:text-left lg:text-left order-2 md:order-1 lg:order-1 animate-fade-in-up">
            {/* Greeting badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full border border-blue-200 text-blue-800 text-xs sm:text-sm font-medium w-fit mx-auto md:mx-0 lg:mx-0 shadow-sm">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>{t("availForWork")}</span>
            </div>

            {/* Main heading with gradient */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent leading-tight px-2 sm:px-0">
              {t("name")}
            </h1>

            {/* Title with accent */}
            <div className="flex flex-col gap-2">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-blue-600 flex items-center gap-3 justify-center md:justify-start lg:justify-start">
                <span className="w-8 sm:w-12 h-0.5 sm:h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full hidden md:block lg:block"></span>
                {t("title")}
              </h2>
            </div>

            {/* Description with better typography */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-xl px-2 sm:px-0">
              {t("description")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6 justify-center md:justify-start lg:justify-start px-2 sm:px-0">
              <button
                onClick={scrollToProjects}
                className="group relative px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden text-sm sm:text-base"
              >
                <span className="relative z-10 flex items-center gap-2 justify-center">
                  <span>{t("viewMyWork")}</span>
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button
                onClick={handleDownload}
                className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 flex items-center gap-2 justify-center text-sm sm:text-base"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span>{t("downloadCV")}</span>
              </button>
            </div>
          </div>

          {/* Image section – ensure full visibility on all viewports */}
          <div className="flex-shrink-0 order-1 md:order-2 lg:order-2 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl animate-fade-in-right">
            <div className="relative group">
              {/* Decorative elements - Adjusted positioning to prevent overflow */}
              <div className="absolute -inset-1 sm:-inset-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl opacity-15 sm:opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-xl"></div>
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-8 h-8 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-60 sm:opacity-80 animate-bounce-slow"></div>
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-6 h-6 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-full opacity-60 sm:opacity-80 animate-pulse"></div>

              {/* Main image container - ensure full visibility */}
              <div className="relative bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-4 shadow-xl sm:shadow-2xl group-hover:shadow-3xl transition-all duration-500 transform group-hover:scale-105 mx-2 sm:mx-0 overflow-visible">
                <div className="relative w-full flex items-center justify-center rounded-lg sm:rounded-xl overflow-visible">
                  <img
                    src={Coding}
                    alt={t("imageAlt")}
                    className="block w-full h-auto object-contain object-center select-none"
                    style={{ maxHeight: '100vh', maxWidth: '100%' }}
                  />
                </div>

                {/* Floating elements - Adjusted positioning and sizes */}
                <div className="absolute top-3 right-3 sm:top-6 sm:right-6 md:top-8 md:right-8 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white shadow-lg animate-float">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" />
                  </svg>
                </div>
                <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 w-5 h-5 sm:w-7 sm:h-7 md:w-9 md:h-9 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg animate-float-delayed">
                  <svg
                    className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 12L11 14L15 10M21 12C21 16.97 16.97 21 12 21S3 16.97 3 12S7.03 3 12 3S21 7.03 21 12Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator - More robust centering */}
        <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 lg:bottom-12 w-full flex justify-center animate-bounce hidden sm:flex">
          <button
            onClick={scrollToTestimonies}
            className="flex flex-col items-center gap-1 sm:gap-2 text-gray-400 hover:text-gray-600 transition-colors duration-300 cursor-pointer group"
          >
            <span className="text-xs sm:text-sm font-medium whitespace-nowrap">Scroll Down</span>
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-y-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out 0.2s both;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite 1.5s;
        }

        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default Home;
