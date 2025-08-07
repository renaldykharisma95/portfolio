import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./i18n";

import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import i18n from "i18next";

// A wrapper to extract language from URL and update i18n
const LanguageWrapper = () => {
  const { lng } = useParams();

  // set language if different
  if (i18n.language !== lng) {
    i18n.changeLanguage(lng);
  }

  return <App />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      {/* Redirect root to /en by default */}
      <Route path="/" element={<Navigate to="/en" replace />} />

      {/* Match /en or /id routes and pass to App */}
      <Route path="/:lng/*" element={<LanguageWrapper />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
