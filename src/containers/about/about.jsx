import React, { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Chrono } from "react-chrono";
import { expItems, frameworks, programmingLanguages, tools } from "./data";
import { Line } from "@rc-component/progress";

const About = () => {
  const { t, ready, i18n } = useTranslation("about");
  const [, forceUpdate] = useState({});

  // Force re-render when language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      forceUpdate({});
    };

    i18n.on('languageChanged', handleLanguageChange);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  // Get translated data with fallback to original data - memoized to prevent unnecessary recalculations
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

      // Check if translation actually returned an array, not just the key string
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

  // Transform work experience data for Chrono component - memoized to update when data or language changes
  const chronoItems = useMemo(() => {
    if (!data.workExperience || !Array.isArray(data.workExperience)) {
      return expItems;
    }

    return data.workExperience.map((item) => {
      // Check if this is translated data by looking for the 'tasks' property
      if (item.tasks && Array.isArray(item.tasks) && item.tasks.length > 0) {
        // This is translated data - use tasks array
        const responsibilities = item.responsibilities || (ready ? t("workExperience.0.responsibilities", "Responsibilities:") : "Responsibilities:");
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
        // This is original data - use as is
        return {
          title: item.title,
          cardTitle: item.cardTitle,
          cardSubtitle: item.cardSubtitle,
          cardDetailedText: item.cardDetailedText,
        };
      } else {
        // Fallback
        const fallbackResponsibilities = ready ? t("workExperience.0.responsibilities", "Responsibilities:") : "Responsibilities:";
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

  return (
    <section id="about" className="min-h-fit bg-white flex items-center justify-center pt-16 sm:pt-20 md:pt-16 px-4 sm:px-6 lg:px-8">
      {/* Temporary language switcher for testing */}

      <div className="max-w-7xl w-full flex flex-col lg:flex-row justify-between gap-8 lg:gap-12">
        <div className="flex flex-col gap-4 w-full lg:max-w-xl">
          <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-center lg:text-left pb-3 sm:pb-5">
            {ready ? t("title") : "About Me"}
          </h1>
          <div className="text-sm sm:text-base md:text-base lg:text-lg leading-relaxed">
            <p>
              {ready
                ? t("description")
                : "I am a Front-End Web Developer from Bandung, Indonesia. I have over five years of experience building web applications with JavaScript frameworks like Next.js, React.js, and Angular. I enjoy creating fast, responsive, and user-friendly websites, and working with teams to deliver great results."}
            </p>
          </div>
          <div className="py-4 sm:py-6 md:py-4 flex flex-col gap-8 sm:gap-10 md:gap-6 lg:gap-12">
            <div>
              <div>
                <h2 className="text-lg sm:text-xl md:text-lg lg:text-2xl font-semibold">
                  {ready
                    ? t("sections.programmingLanguages")
                    : "Programming Languages"}
                </h2>
                <hr className="mt-2 sm:mt-3 border-t border-gray-950" />
              </div>
              <div className="flex flex-col gap-3 sm:gap-4 md:gap-3 pt-2">
                {data.programmingLanguages.map((item, idx) => (
                  <div key={idx}>
                    <p className="pb-1 sm:pb-2 md:pb-1 text-xs sm:text-sm md:text-sm lg:text-base">
                      {item.name}
                    </p>
                    <Line
                      percent={item.progress * 10}
                      strokeWidth={2}
                      strokeColor={item.color}
                      style={{ width: "100%" }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div>
                <h2 className="text-lg sm:text-xl md:text-lg lg:text-2xl font-semibold">
                  {ready ? t("sections.frameworks") : "Frameworks"}
                </h2>
                <hr className="mt-2 sm:mt-3 border-t border-gray-950" />
              </div>
              <div className="flex flex-col gap-3 sm:gap-4 md:gap-3 pt-2">
                {data.frameworks.map((item, idx) => (
                  <div key={idx}>
                    <p className="pb-1 sm:pb-2 md:pb-1 text-xs sm:text-sm md:text-sm lg:text-base">
                      {item.name}
                    </p>
                    <Line
                      percent={item.progress * 10}
                      strokeWidth={2}
                      strokeColor={item.color}
                      style={{ width: "100%" }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div>
                <h2 className="text-lg sm:text-xl md:text-lg lg:text-2xl font-semibold">
                  {ready ? t("sections.tools") : "Tools"}
                </h2>
                <hr className="mt-2 sm:mt-3 border-t border-gray-950" />
              </div>
              <div className="flex flex-col gap-2 sm:gap-3 md:gap-2 pt-2">
                {data.tools.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between text-xs sm:text-sm md:text-sm lg:text-base"
                  >
                    <span className="font-medium text-gray-700 w-1/3 truncate pr-2">
                      {item.label}
                    </span>
                    <span className="text-gray-500 flex-shrink-0">:</span>
                    <span className="w-2/3 text-left pl-2 truncate">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-auto lg:flex-shrink-0 mt-8 lg:mt-0">
          <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-center pb-3 sm:pb-5">
            {ready ? t("workExperienceTitle") : "Work Experiences"}
          </h1>
          <div className="overflow-x-auto">
            {/* Note: Console warnings about unknown props are from react-chrono library's internal styled-components */}
            <Chrono
              key={`chrono-${i18n.language}`}
              items={chronoItems}
              mode="VERTICAL_ALTERNATING"
              itemWidth={120}
              parseDetailsAsHTML={true}
              enableOutline={true}
              disableToolbar={true}
              theme={{
                primary: "#3b82f6",
                secondary: "#e5e7eb",
                cardBgColor: "#ffffff",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
