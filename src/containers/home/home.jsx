import React from "react";
import { useTranslation } from "react-i18next";
import Coding from "../../assets/coding.webp";

const Home = () => {
  const { t } = useTranslation('home');

  return (
    <>
      <section id="home" className="min-h-screen bg-white flex items-center justify-center px-4 py-8 sm:py-12 md:py-8 lg:py-0">
        <div className="max-w-7xl w-full flex flex-col md:flex-row lg:flex-row items-center justify-between gap-8 md:gap-6 lg:gap-12">
          <div className="flex flex-col gap-4 max-w-xl text-center md:text-left lg:text-left order-2 md:order-1 lg:order-1">
            <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
              {t('name')}
            </h1>
            <h2 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-semibold text-blue-600">
              {t('title')}
            </h2>
            <h3 className="text-sm sm:text-base md:text-base lg:text-lg text-gray-700 leading-relaxed">
              {t('description')}
            </h3>
          </div>
          <div className="flex-shrink-0 order-1 md:order-2 lg:order-2 w-full max-w-sm sm:max-w-md md:max-w-sm lg:max-w-lg xl:max-w-xl">
            <img 
              src={Coding} 
              alt={t('imageAlt')} 
              className="w-full h-auto object-contain rounded-lg shadow-lg md:shadow-lg lg:shadow-none" 
            />
          </div>
        </div>
      </section>
      <div className="h-16 sm:h-18 lg:h-20"></div>
    </>
  );
};

export default Home;
