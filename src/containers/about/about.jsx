import React, { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Chrono } from "react-chrono";
import { expItems, frameworks, programmingLanguages, tools } from "./data";
import { Line } from "@rc-component/progress";
import { useTheme } from "../../context/ThemeContext";

const About = () => {
  const { t, ready, i18n } = useTranslation("about");
  const { theme } = useTheme();
  const [, forceUpdate] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Check if device is mobile or tablet
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1280);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // Force re-render when language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      forceUpdate({});
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  // Get translated data with fallback to original data
  const data = useMemo(() => {
    if (!ready || !i18n.hasResourceBundle(i18n.language, "about")) {
      return {
        workExperience: expItems,
        programmingLanguages,
        frameworks,
        tools,
      };
    }

    try {
      const translatedWorkExp = t("workExperience", { returnObjects: true });
      const translatedProgLangs = t("skills.programmingLanguages", {
        returnObjects: true,
      });
      const translatedFrameworks = t("skills.frameworks", {
        returnObjects: true,
      });
      const translatedTools = t("skills.tools", { returnObjects: true });

      const workExpData =
        Array.isArray(translatedWorkExp) && translatedWorkExp.length > 0
          ? translatedWorkExp
          : expItems;
      const progLangData =
        Array.isArray(translatedProgLangs) && translatedProgLangs.length > 0
          ? translatedProgLangs
          : programmingLanguages;
      const frameworkData =
        Array.isArray(translatedFrameworks) && translatedFrameworks.length > 0
          ? translatedFrameworks
          : frameworks;
      const toolsData =
        Array.isArray(translatedTools) && translatedTools.length > 0
          ? translatedTools
          : tools;

      return {
        workExperience: workExpData,
        programmingLanguages: progLangData,
        frameworks: frameworkData,
        tools: toolsData,
      };
    } catch (error) {
      return {
        workExperience: expItems,
        programmingLanguages,
        frameworks,
        tools,
      };
    }
  }, [t, ready, i18n]);

  const chronoItems = useMemo(() => {
    if (!data.workExperience || !Array.isArray(data.workExperience)) {
      return expItems;
    }

    return data.workExperience.map((item) => {
      if (item.tasks && Array.isArray(item.tasks) && item.tasks.length > 0) {
        const responsibilities =
          item.responsibilities ||
          (ready
            ? t("workExperience.0.responsibilities", "Responsibilities:")
            : "Responsibilities:");
        return {
          title: item.title,
          cardTitle: item.cardTitle,
          cardSubtitle: item.cardSubtitle,
          cardDetailedText: [
            `<strong>${responsibilities}</strong>`,
            `<ol type="1">
              ${item.tasks.map((task) => `<li>${task}</li>`).join("")}
            </ol>`,
          ],
        };
      } else if (
        item.cardDetailedText &&
        Array.isArray(item.cardDetailedText)
      ) {
        return {
          title: item.title,
          cardTitle: item.cardTitle,
          cardSubtitle: item.cardSubtitle,
          cardDetailedText: item.cardDetailedText,
        };
      } else {
        const fallbackResponsibilities = ready
          ? t("workExperience.0.responsibilities", "Responsibilities:")
          : "Responsibilities:";
        return {
          title: item.title,
          cardTitle: item.cardTitle,
          cardSubtitle: item.cardSubtitle,
          cardDetailedText: [
            `<strong>${fallbackResponsibilities}</strong>`,
            `<ol type="1">
              <li>No tasks available</li>
            </ol>`,
          ],
        };
      }
    });
  }, [data.workExperience, ready, t]);

  const renderMobileWorkExperience = () => {
    return (
      <div className="space-y-6">
        {chronoItems.map((item, index) => (
          <div
            key={index}
            className={`rounded-xl shadow-lg border p-5 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] relative ${
              theme === "dark"
                ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 text-gray-200"
                : "bg-gradient-to-br from-white to-gray-50 border-gray-100 text-gray-800"
            }`}
          >
            <div className="relative">
              <div className={`inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full mb-3 ${
                theme === "dark" ? "bg-blue-900 text-blue-200" : "bg-blue-100 text-blue-800"
              }`}>
                <svg
                  className="w-3 h-3 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                {item.title}
              </div>
              <h3 className={`text-xl font-bold mb-2 leading-tight ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                {item.cardTitle}
              </h3>
              <p className={`text-sm mb-4 font-medium ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                {item.cardSubtitle}
              </p>
              <div
                className={`text-sm leading-relaxed prose prose-sm max-w-none ${
                  theme === "dark"
                    ? "text-gray-300 [&_strong]:text-white [&_strong]:font-semibold [&_ol]:pl-4 [&_li]:mb-1 [&_li]:text-gray-300"
                    : "text-gray-700 [&_strong]:text-gray-900 [&_strong]:font-semibold [&_ol]:pl-4 [&_li]:mb-1 [&_li]:text-gray-600"
                }`}
                dangerouslySetInnerHTML={{
                  __html: item.cardDetailedText.join(""),
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderTabletWorkExperience = () => {
    return (
      <div className="space-y-6">
        {chronoItems.map((item, index) => (
          <div
            key={index}
            className={`rounded-xl shadow-lg border p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.01] group relative ${
              theme === "dark"
                ? "bg-gradient-to-r from-gray-800 to-gray-900 border-gray-700 text-gray-200"
                : "bg-gradient-to-r from-white to-gray-50 border-gray-100 text-gray-800"
            }`}
          >
            <div className="flex flex-col md:flex-row md:gap-8">
              <div className="md:w-1/3 mb-4 md:mb-0 relative">
                <div className={`inline-flex items-center text-xs font-semibold px-3 py-2 rounded-full mb-3 shadow-sm ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-blue-900 to-indigo-900 text-blue-200"
                    : "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800"
                }`}>
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {item.title}
                </div>
                <h3 className={`text-lg font-bold mb-2 leading-tight ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                  {item.cardTitle}
                </h3>
                <p className={`text-sm font-medium ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>
                  {item.cardSubtitle}
                </p>
              </div>
              <div className="md:w-2/3 relative">
                <div
                  className={`text-sm leading-relaxed prose prose-sm max-w-none ${
                    theme === "dark"
                      ? "text-gray-300 [&_strong]:text-white [&_strong]:font-semibold [&_ol]:pl-4 [&_li]:mb-1.5 [&_li]:text-gray-300 [&_li]:leading-relaxed"
                      : "text-gray-700 [&_strong]:text-gray-900 [&_strong]:font-semibold [&_ol]:pl-4 [&_li]:mb-1.5 [&_li]:text-gray-600 [&_li]:leading-relaxed"
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: item.cardDetailedText.join(""),
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Theme-aware styling for skill sections
  const cardBgClass = theme === "dark"
    ? "bg-gray-800/70 backdrop-blur-sm border-gray-700"
    : "bg-white/60 backdrop-blur-sm border-white/20";
  const titleClass = theme === "dark" ? "text-white" : "text-gray-800";
  const labelClass = theme === "dark" ? "text-gray-300 group-hover:text-white" : "text-gray-700 group-hover:text-gray-900";
  const progressLabelClass = theme === "dark" ? "text-gray-300 bg-gray-700/60" : "text-gray-500 bg-gray-200";

  return (
    <section
      id="about"
      className={`min-h-fit py-16 sm:py-20 md:py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-gray-50 via-white to-blue-50"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Title */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent mb-4 ${
            theme === "dark"
              ? "bg-gradient-to-r from-white via-blue-300 to-white"
              : "bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900"
          }`}>
            {t("title")}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto"></div>
        </div>

        {/* Description */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className={`rounded-2xl p-8 shadow-lg border text-center transition-colors duration-300 ${
            theme === "dark"
              ? "bg-gray-800/70 backdrop-blur-sm border-gray-700 text-gray-200"
              : "bg-white/70 backdrop-blur-sm border-white/20 text-gray-700"
          }`}>
            <p className="text-lg sm:text-xl leading-relaxed">
              {ready
                ? t("description")
                : "I am a Front-End Web Developer from Bandung, Indonesia. I have over five years of experience building web applications with JavaScript frameworks like Next.js, React.js, and Angular. I enjoy creating fast, responsive, and user-friendly websites, and working with teams to deliver great results."}
            </p>
          </div>
        </div>

        {/* Skills and Experience Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Programming Languages */}
          <div className={`rounded-2xl p-6 shadow-lg border hover:shadow-xl transition-all duration-300 ${cardBgClass}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className={`text-xl font-bold ${titleClass}`}>
                {ready
                  ? t("sections.programmingLanguages")
                  : "Programming Languages"}
              </h2>
            </div>
            <div className="space-y-4">
              {data.programmingLanguages.map((item, idx) => (
                <div key={idx} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <p className={`text-sm font-medium transition-colors ${labelClass}`}>
                      {item.name}
                    </p>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${progressLabelClass}`}>
                      {item.progress}/10
                    </span>
                  </div>
                  <div className="w-full rounded-full h-2 overflow-hidden bg-gray-200 dark:bg-gray-700/50">
                    <Line
                      percent={item.progress * 10}
                      strokeWidth={8}
                      strokeColor={item.color}
                      trailColor="transparent"
                      style={{ width: "100%" }}
                      className="transition-all duration-700 ease-out"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Frameworks */}
          <div className={`rounded-2xl p-6 shadow-lg border hover:shadow-xl transition-all duration-300 ${cardBgClass}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <h2 className={`text-xl font-bold ${titleClass}`}>
                {ready ? t("sections.frameworks") : "Frameworks"}
              </h2>
            </div>
            <div className="space-y-4">
              {data.frameworks.map((item, idx) => (
                <div key={idx} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <p className={`text-sm font-medium transition-colors ${labelClass}`}>
                      {item.name}
                    </p>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${progressLabelClass}`}>
                      {item.progress}/10
                    </span>
                  </div>
                  <div className="w-full rounded-full h-2 overflow-hidden bg-gray-200 dark:bg-gray-700/50">
                    <Line
                      percent={item.progress * 10}
                      strokeWidth={8}
                      strokeColor={item.color}
                      trailColor="transparent"
                      style={{ width: "100%" }}
                      className="transition-all duration-700 ease-out"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className={`rounded-2xl p-6 shadow-lg border hover:shadow-xl transition-all duration-300 ${cardBgClass}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className={`text-xl font-bold ${titleClass}`}>
                {ready ? t("sections.tools") : "Tools"}
              </h2>
            </div>
            <div className="space-y-3">
              {data.tools.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border transition-all duration-200 hover:shadow-md ${
                    theme === "dark"
                      ? "bg-gray-700/50 border-gray-600 hover:bg-gray-700/80"
                      : "bg-white/50 border-gray-100 hover:bg-white/80"
                  }`}
                >
                  <div className={`font-semibold text-sm mb-1 ${
                    theme === "dark" ? "text-gray-200" : "text-gray-700"
                  }`}>
                    {item.label}
                  </div>
                  <div className={`text-xs leading-relaxed ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Work Experience Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className={`text-4xl sm:text-5xl font-bold bg-clip-text text-transparent mb-4 ${
              theme === "dark"
                ? "bg-gradient-to-r from-white via-blue-300 to-white"
                : "bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900"
            }`}>
              {ready ? t("workExperienceTitle") : "Work Experiences"}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto"></div>
          </div>

          {/* Conditional rendering based on screen size */}
          {isMobile ? (
            <div className="px-2">{renderMobileWorkExperience()}</div>
          ) : isTablet ? (
            <div className="px-6">{renderTabletWorkExperience()}</div>
          ) : (
            /* Desktop View - Enhanced Chrono Timeline */
            <div className="max-w-6xl mx-auto">
              <div className={`rounded-2xl p-8 shadow-lg border transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-gray-800/50 backdrop-blur-sm border-gray-700"
                  : "bg-white/30 backdrop-blur-sm border-white/20"
              }`}>
                <Chrono
                  key={`chrono-${i18n.language}-${theme}`}
                  items={chronoItems}
                  mode="VERTICAL_ALTERNATING"
                  itemWidth={180}
                  parseDetailsAsHTML={true}
                  enableOutline={true}
                  disableToolbar={true}
                  scrollable={false}
                  theme={{
                    primary: "#3b82f6",
                    secondary: theme === "dark" ? "#374151" : "#e5e7eb",
                    cardBgColor: theme === "dark" ? "#1f2937" : "#ffffff",
                    titleColor: theme === "dark" ? "#d1d5db" : "#1f2937",
                    titleColorActive: "#3b82f6",
                    cardForeColor: theme === "dark" ? "#d1d5db" : "#374151",
                    cardSubtitleColor: theme === "dark" ? "#9ca3af" : "#4b5563",
                    iconBackgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                  }}
                  fontSizes={{
                    cardSubtitle: "0.875rem",
                    cardText: "0.85rem",
                    cardTitle: "1.125rem",
                    title: "0.75rem",
                  }}
                  classNames={{
                    card: `shadow-lg border hover:shadow-xl transition-all duration-300 rounded-xl ${
                      theme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-white"
                    }`,
                    cardTitle: `font-bold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`,
                    cardSubTitle: `font-medium ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`,
                    title: `font-semibold px-3 py-1 rounded-full text-xs ${
                      theme === "dark"
                        ? "bg-blue-900 text-blue-200"
                        : "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800"
                    }`,
                    cardText: `${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    } [&_strong]:text-white ${theme === "dark" ? "font-semibold" : ""} [&_ol]:pl-4 [&_li]:mb-1 ${
                      theme === "dark" ? "[&_li]:text-gray-300" : "[&_li]:text-gray-600"
                    }`,
                    cardDetailsText: `${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
export default About;