import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";
import indonesiaFlag from "../../assets/indonesia.png";
import englishFlag from "../../assets/english.png";
import MoonIcon from "../../assets/moon.svg";
import SunIcon from "../../assets/sun.svg";

const Navbar = () => {
  const { t, i18n } = useTranslation('common');
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    const currentPath = window.location.pathname;
    let newPath = currentPath;
    if (currentPath.startsWith('/en') || currentPath.startsWith('/id')) {
      newPath = currentPath.replace(/^\/(en|id)/, '') || '/';
    }
    const finalPath = `/${lng}${newPath === '/' ? '' : newPath}`;
    window.history.pushState({}, '', finalPath);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
    setIsMenuOpen(false);
  };

  const menuItems = [
    { key: 'home', sectionId: 'home' },
    { key: 'about', sectionId: 'about' },
    { key: 'projects', sectionId: 'projects' },
    { key: 'contacts', sectionId: 'contacts' }
  ];

  return (
    <div className={`h-fit w-full p-4 sm:p-6 fixed top-0 border-b transition-colors duration-300 z-50 ${
      theme === "dark"
        ? "bg-gray-900 border-gray-700"
        : "bg-white border-gray-200"
    }`}>
      <div className="flex justify-between items-center flex-row">
        <div className="flex-shrink-0">
          <h2 className={`text-sm sm:text-base md:text-lg font-medium ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            {t('navbar.name')}
          </h2>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex flex-row items-center gap-2 sm:gap-4">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSection(item.sectionId)}
              className={`hover:text-blue-500 transition-colors cursor-pointer ${
                theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-blue-600"
              }`}
            >
              <h2 className="text-xs sm:text-sm md:text-base">{t(`navbar.menu.${item.key}`)}</h2>
            </button>
          ))}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-300 ${
              theme === "dark"
                ? "bg-gray-700 hover:bg-gray-600 text-blue-300"
                : "bg-gray-100 hover:bg-gray-200 text-yellow-500"
            }`}
            aria-label={theme === "dark" ? t('navbar.switchToLightMode') : t('navbar.switchToDarkMode')}
          >
            {theme === "dark" ? (
              <img src={MoonIcon} alt="moon" className="w-6 h-6 object-contain text-blue-300" />
            ) : (
              <img src={SunIcon} alt="sun" className="w-6 h-6 object-contain text-yellow-500" />
            )}
          </button>

          {/* Language Switcher */}
          <div className={`flex border rounded shadow ${
            theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}>
            <button
              onClick={() => changeLanguage("en")}
              className={`px-2 py-1 text-xs sm:text-sm ${
                i18n.language === "en" ? "bg-blue-500" : (theme === "dark" ? "bg-gray-700" : "bg-gray-200")
              }`}
            >
              <img src={englishFlag} alt="English" className="w-4 h-3 object-cover" />
            </button>
            <button
              onClick={() => changeLanguage("id")}
              className={`px-2 py-1 text-xs sm:text-sm ${
                i18n.language === "id" ? "bg-blue-500" : (theme === "dark" ? "bg-gray-700" : "bg-gray-200")
              }`}
            >
              <img src={indonesiaFlag} alt="Indonesia" className="w-4 h-3 object-cover" />
            </button>
          </div>
        </div>

        {/* Mobile Buttons Area */}
        <div className="sm:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-300 ${
              theme === "dark"
                ? "bg-gray-700 hover:bg-gray-600 text-blue-300"
                : "bg-gray-100 hover:bg-gray-200 text-yellow-500"
            }`}
            aria-label={theme === "dark" ? t('navbar.switchToLightMode') : t('navbar.switchToDarkMode')}
          >
            {theme === "dark" ? (
              <img src={MoonIcon} alt="moon" className="w-6 h-6 object-contain text-blue-300" />
            ) : (
              <img src={SunIcon} alt="sun" className="w-6 h-6 object-contain text-yellow-500" />
            )}
          </button>

          <button
            className="flex flex-col justify-center items-center w-8 h-8 space-y-1"
            onClick={toggleMenu}
            aria-label={t('navbar.toggleMenu')}
          >
            <span className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''} ${
              theme === "dark" ? "bg-white" : "bg-black"
            }`}></span>
            <span className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''} ${
              theme === "dark" ? "bg-white" : "bg-black"
            }`}></span>
            <span className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''} ${
              theme === "dark" ? "bg-white" : "bg-black"
            }`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden mt-4 pb-4 pt-4">
          <div className="flex flex-col space-y-3">
            {menuItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => scrollToSection(item.sectionId)}
                className={`py-2 text-left font-medium ${
                  theme === "dark"
                    ? "text-white bg-gray-800 hover:bg-gray-700"
                    : "text-gray-900 bg-white hover:bg-gray-50"
                } transition-colors rounded-lg`}
              >
                {t(`navbar.menu.${item.key}`)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;