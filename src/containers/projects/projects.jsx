import SlickCarousel from "../../components/carousel/SlickCarousel";
import { datas } from "./data";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import eyeIcon from "../../assets/eye.svg";

const Projects = () => {
  const { t, ready, i18n } = useTranslation("project");
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

  // Get translated project data with fallback to original data
  const getTranslatedProjects = () => {
    if (!ready || !i18n.hasResourceBundle(i18n.language, "project")) {
      return datas;
    }

    try {
      const translatedProjects = t("projects", { returnObjects: true });
      
      if (Array.isArray(translatedProjects) && translatedProjects.length === datas.length) {
        return datas.map((item, index) => ({
          ...item,
          description: translatedProjects[index]?.description || item.description
        }));
      }
      
      return datas;
    } catch (error) {
      return datas;
    }
  };

  const projectsData = getTranslatedProjects();

  const handleEyeClick = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  const renderProjectItem = (item, idx, withArrows = false) => (
    <div
      key={idx}
      className={`flex flex-col items-center justify-center group relative px-2 sm:px-4 mb-6 md:mb-0`}
    >
      <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto">
        <img
          src={item.image}
          alt={`Project ${idx + 1}`}
          className="w-full h-auto object-contain rounded-lg shadow-lg"
        />
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer rounded-lg"
          style={{ 
            background: "rgba(0,0,0,0.4)",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
          onClick={() => handleEyeClick(item)}
        >
          <img
            src={eyeIcon}
            alt="View details"
            className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white filter invert z-10"
          />
        </div>
        {withArrows && (
          <>
            <button
              type="button"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                if (sliderRef.current) {
                  sliderRef.current.slickPrev();
                }
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                if (sliderRef.current) {
                  sliderRef.current.slickNext();
                }
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <section id="projects" className="min-h-screen bg-gray-100 w-full flex flex-col items-center justify-center py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 pb-32">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center pb-4 sm:pb-6 lg:pb-8">
        {ready ? t("title") : "Projects"}
      </h1>
      <div
        className={`w-full my-10 ${
          isMobileOrPortrait
            ? "max-w-sm mx-auto"
            : "max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl"
        }`}
      >
        {isMobileOrPortrait ? (
          <div className="flex flex-col items-center justify-center space-y-6">
            {projectsData.map((item, idx) => renderProjectItem(item, idx))}
          </div>
        ) : (
          <SlickCarousel
            ref={sliderRef}
            settings={{
              arrows: false,
            }}
          >
            {projectsData.map((item, idx) => renderProjectItem(item, idx, true))}
          </SlickCarousel>
        )}
      </div>
      {showModal && selectedProject && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-md lg:max-w-2xl xl:max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">
                {ready ? t("projectDetails") : "Project Details"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-xl sm:text-2xl flex-shrink-0 ml-4"
              >
                ×
              </button>
            </div>
            <div className="mb-4">
              <img
                src={selectedProject.image}
                alt="Project"
                className="w-full h-32 sm:h-40 lg:h-48 xl:h-56 object-contain rounded-lg"
              />
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
              {selectedProject.description}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
