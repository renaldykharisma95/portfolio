import React, { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { expItems, frameworks, programmingLanguages, tools } from "./data";
import { useTheme } from "../../context/ThemeContext";

const About = () => {
  const { t, ready, i18n } = useTranslation("about");
  const { theme } = useTheme();
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const handleLanguageChange = () => forceUpdate({});
    i18n.on("languageChanged", handleLanguageChange);
    return () => i18n.off("languageChanged", handleLanguageChange);
  }, [i18n]);

  const data = useMemo(() => {
    if (!ready || !i18n.hasResourceBundle(i18n.language, "about")) {
      return { workExperience: expItems, programmingLanguages, frameworks, tools };
    }
    try {
      const translatedWorkExp = t("workExperience", { returnObjects: true });
      const translatedProgLangs = t("skills.programmingLanguages", { returnObjects: true });
      const translatedFrameworks = t("skills.frameworks", { returnObjects: true });
      const translatedTools = t("skills.tools", { returnObjects: true });

      return {
        workExperience:
          Array.isArray(translatedWorkExp) && translatedWorkExp.length > 0
            ? translatedWorkExp
            : expItems,
        programmingLanguages:
          Array.isArray(translatedProgLangs) && translatedProgLangs.length > 0
            ? translatedProgLangs
            : programmingLanguages,
        frameworks:
          Array.isArray(translatedFrameworks) && translatedFrameworks.length > 0
            ? translatedFrameworks
            : frameworks,
        tools:
          Array.isArray(translatedTools) && translatedTools.length > 0
            ? translatedTools
            : tools,
      };
    } catch {
      return { workExperience: expItems, programmingLanguages, frameworks, tools };
    }
  }, [t, ready, i18n]);

  const workExpItems = useMemo(() => {
    if (!data.workExperience || !Array.isArray(data.workExperience)) return expItems;
    return data.workExperience.map((item) => {
      const tasks = item.tasks || [];
      const responsibilities = item.responsibilities || "Responsibilities";
      return {
        period: item.title,
        company: item.cardTitle,
        role: item.cardSubtitle,
        responsibilities,
        tasks,
      };
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.workExperience, ready, t]);

  // ── Theme helpers ──────────────────────────────────────────────────────
  const isDark = theme === "dark";

  const cardBase = isDark
    ? "bg-green-900/60 backdrop-blur-sm border-green-800/60"
    : "bg-white/70 backdrop-blur-sm border-emerald-100";

  const sectionBg = isDark
    ? "bg-gradient-to-br from-green-950 via-green-900 to-teal-950"
    : "bg-gradient-to-br from-emerald-50 via-white to-teal-50";

  const headingGrad = isDark
    ? "bg-gradient-to-r from-white via-emerald-300 to-white"
    : "bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900";

  const cardBgClass = isDark
    ? "bg-green-900/70 backdrop-blur-sm border-green-800"
    : "bg-white/60 backdrop-blur-sm border-emerald-100";

  const titleClass = isDark ? "text-white" : "text-gray-800";
  const labelClass = isDark
    ? "text-gray-300 group-hover:text-white"
    : "text-gray-700 group-hover:text-gray-900";

  // ── Skill progress bar (pure CSS, no external lib) ──────────────────
  const SkillBar = ({ item }) => {
    const pct = item.progress * 10;
    return (
      <div className="group">
        <div className="flex justify-between items-center mb-1.5">
          <p className={`text-sm font-medium transition-colors ${labelClass}`}>{item.name}</p>
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${isDark ? "bg-green-800 text-emerald-300" : "bg-emerald-50 text-emerald-700"}`}>
            {item.progress}/10
          </span>
        </div>
        <div className="w-full h-1.5 rounded-full overflow-hidden bg-white/10 border border-white/10">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${pct}%`, backgroundColor: item.color }}
          />
        </div>
      </div>
    );
  };

  // ── Work experience timeline card ─────────────────────────────────────
  const WorkExpCard = ({ item, index }) => {
    const isLast = index === workExpItems.length - 1;

    return (
      <div className="relative flex group">
        {/* Vertical line + dot (always left) */}
        <div className="flex flex-col items-center mr-4 sm:mr-6 flex-shrink-0">
          {/* Dot */}
          <div
            className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex-shrink-0 border-4 mt-1 transition-all duration-300 group-hover:scale-110 z-10 ${
              isDark
                ? "border-green-400 bg-green-900 group-hover:border-emerald-300 group-hover:bg-green-400 shadow-lg shadow-emerald-500/30"
                : "border-emerald-500 bg-white group-hover:border-emerald-600 group-hover:bg-emerald-500 shadow-lg shadow-emerald-200"
            }`}
          />
          {/* Line — extends for all but the last item */}
          {!isLast && (
            <div
              className={`w-0.5 flex-1 min-h-[40px] ${
                isDark ? "bg-green-700/50" : "bg-emerald-200"
              }`}
            />
          )}
        </div>

        {/* Card */}
        <div className={`flex-1 ${isLast ? "" : "mb-8 lg:mb-8"}`}>
          <div
            className={`rounded-xl border p-5 sm:p-6 hover:shadow-lg transition-all duration-300 ${
              isDark
                ? "bg-green-900/60 backdrop-blur-sm border-green-800/60 hover:border-green-600/60 hover:shadow-emerald-900/30"
                : "bg-white/70 backdrop-blur-sm border-emerald-100 hover:border-emerald-200 hover:shadow-emerald-100/50"
            }`}
          >
            {/* Period badge */}
            <span
              className={`inline-flex items-center text-[11px] font-semibold px-3 py-1 rounded-full mb-3 ${
                isDark
                  ? "bg-green-800/80 text-emerald-300 border border-green-700/50"
                  : "bg-emerald-50 text-emerald-700 border border-emerald-100"
              }`}
            >
              <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item.period}
            </span>

            {/* Company */}
            <h3
              className={`text-lg sm:text-xl font-bold mb-1 leading-tight ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {item.company}
            </h3>

            {/* Role */}
            <p className={`text-sm font-medium mb-4 ${isDark ? "text-green-300" : "text-gray-500"}`}>
              {item.role}
            </p>

            {/* Tasks */}
            <div>
              <p
                className={`text-xs font-semibold uppercase tracking-wider mb-2.5 ${
                  isDark ? "text-emerald-400/70" : "text-emerald-600/70"
                }`}
              >
                {item.responsibilities}
              </p>
              <ul className="space-y-2">
                {item.tasks.map((task, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span
                      className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mt-[7px] ${
                        isDark ? "bg-emerald-400" : "bg-emerald-500"
                      }`}
                    />
                    <span className={`text-sm leading-relaxed ${isDark ? "text-green-100/90" : "text-gray-600"}`}>
                      {task}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="about"
      className={`min-h-fit py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${sectionBg}`}
    >
      <div className="max-w-7xl mx-auto">

        {/* ─�� Main title ─────────────────────────────────────────────── */}
        <div className="text-center mb-14">
          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent mb-4 ${headingGrad}`}>
            {t("title")}
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full mx-auto" />
        </div>

        {/* ── Description ────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto mb-16">
          <div
            className={`rounded-2xl p-6 sm:p-8 shadow-lg border text-center transition-colors duration-300 ${cardBase}`}
          >
            <p className={`text-base sm:text-lg leading-relaxed ${isDark ? "text-green-100" : "text-gray-600"}`}>
              {ready
                ? t("description")
                : "I am a Front-End Web Developer from Bandung, Indonesia. I have over five years of experience building web applications with JavaScript frameworks like Next.js, React.js, and Angular."}
            </p>
          </div>
        </div>

        {/* ── Skills grid ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20">

          {/* Programming Languages */}
          <div className={`rounded-2xl p-5 sm:p-6 shadow-md border hover:shadow-lg transition-all duration-300 ${cardBgClass}`}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4.5 h-4.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className={`text-base sm:text-lg font-bold ${titleClass}`}>
                {ready ? t("sections.programmingLanguages") : "Programming Languages"}
              </h2>
            </div>
            <div className="space-y-4">
              {data.programmingLanguages.map((item, i) => (
                <SkillBar key={i} item={item} />
              ))}
            </div>
          </div>

          {/* Frameworks */}
          <div className={`rounded-2xl p-5 sm:p-6 shadow-md border hover:shadow-lg transition-all duration-300 ${cardBgClass}`}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-gradient-to-br from-lime-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4.5 h-4.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <h2 className={`text-base sm:text-lg font-bold ${titleClass}`}>
                {ready ? t("sections.frameworks") : "Frameworks"}
              </h2>
            </div>
            <div className="space-y-4">
              {data.frameworks.map((item, i) => (
                <SkillBar key={i} item={item} />
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className={`rounded-2xl p-5 sm:p-6 shadow-md border hover:shadow-lg transition-all duration-300 ${cardBgClass}`}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4.5 h-4.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className={`text-base sm:text-lg font-bold ${titleClass}`}>
                {ready ? t("sections.tools") : "Tools"}
              </h2>
            </div>
            <div className="space-y-2.5">
              {data.tools.map((item, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg border transition-all duration-200 hover:shadow-sm ${
                    isDark
                      ? "bg-green-800/40 border-green-700/50 hover:bg-green-800/60"
                      : "bg-emerald-50/50 border-emerald-100 hover:bg-white/80"
                  }`}
                >
                  <div className={`text-[13px] font-semibold mb-0.5 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                    {item.label}
                  </div>
                  <div className={`text-xs leading-relaxed ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Work Experience ────────────────────────────────────────── */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent mb-4 ${headingGrad}`}>
              {ready ? t("workExperienceTitle") : "Work Experiences"}
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full mx-auto" />
          </div>

          <div
            className={`rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg border ${cardBase}`}
          >
            {workExpItems.map((item, i) => (
              <WorkExpCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
