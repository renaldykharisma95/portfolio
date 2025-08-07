import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import indonesiaFlag from "../../assets/indonesia.png";
import englishFlag from "../../assets/english.png";

const Navbar = () => {
  const { t, i18n } = useTranslation('common');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // Update URL to include language prefix
    const currentPath = window.location.pathname;
    
    // Remove current language prefix if it exists
    let newPath = currentPath;
    if (currentPath.startsWith('/en') || currentPath.startsWith('/id')) {
      newPath = currentPath.replace(/^\/(en|id)/, '') || '/';
    }
    
    // Add new language prefix for both languages
    const finalPath = `/${lng}${newPath === '/' ? '' : newPath}`;
    
    // Update URL without page reload
    window.history.pushState({}, '', finalPath);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; // Approximate navbar height
      const elementPosition = element.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    // Close mobile menu if open
    setIsMenuOpen(false);
  };

  const menuItems = [
    { key: 'home', sectionId: 'home' },
    { key: 'about', sectionId: 'about' },
    { key: 'projects', sectionId: 'projects' },
    { key: 'contacts', sectionId: 'contacts' }
  ];

  return (
    <div className="h-fit w-full p-4 sm:p-6 fixed top-0 border-b shadow-md bg-white z-50">
      <div className="flex justify-between items-center flex-row">
        <div className="flex-shrink-0">
          <h2 className="text-sm sm:text-base md:text-lg font-medium">
            {t('navbar.name')}
          </h2>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden sm:flex flex-row items-center gap-2 sm:gap-4">
          {menuItems.map((item, idx) => (
            <button 
              key={idx} 
              onClick={() => scrollToSection(item.sectionId)}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              <h2 className="text-xs sm:text-sm md:text-base">{t(`navbar.menu.${item.key}`)}</h2>
            </button>
          ))}
          
          {/* Language Switcher */}
          <div className="flex bg-white border rounded shadow">
            <button
              onClick={() => changeLanguage("en")}
              className={`px-2 py-1 text-xs sm:text-sm ${
                i18n.language === "en" ? "bg-blue-500" : "bg-gray-200"
              }`}
            >
              <img src={englishFlag} alt="English" className="w-4 h-3 object-cover" />
            </button>
            <button
              onClick={() => changeLanguage("id")}
              className={`px-2 py-1 text-xs sm:text-sm ${
                i18n.language === "id" ? "bg-blue-500" : "bg-gray-200"
              }`}
            >
              <img src={indonesiaFlag} alt="Indonesia" className="w-4 h-3 object-cover" />
            </button>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="sm:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
          onClick={toggleMenu}
          aria-label={t('navbar.toggleMenu')}
        >
          <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden mt-4 pb-4 border-t pt-4">
          <div className="flex flex-col space-y-3">
            {/* Language Switcher for Mobile */}
            <div className="flex bg-white border rounded shadow w-fit">
              <button
                onClick={() => changeLanguage("en")}
                className={`px-2 py-1 text-sm ${
                  i18n.language === "en" ? "bg-blue-500" : "bg-gray-200"
                }`}
              >
                <img src={englishFlag} alt="English" className="w-5 h-4 object-cover" />
              </button>
              <button
                onClick={() => changeLanguage("id")}
                className={`px-2 py-1 text-sm ${
                  i18n.language === "id" ? "bg-blue-500" : "bg-gray-200"
                }`}
              >
                <img src={indonesiaFlag} alt="Indonesia" className="w-5 h-4 object-cover" />
              </button>
            </div>
            
            {menuItems.map((item, idx) => (
              <button 
                key={idx} 
                onClick={() => scrollToSection(item.sectionId)}
                className="hover:text-blue-600 transition-colors text-base py-2 text-left w-full"
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
