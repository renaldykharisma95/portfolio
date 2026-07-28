import linkedinIcon from "../../assets/linkedin.png";
import whatsappIcon from "../../assets/whatsapp.png";
import emailIcon from "../../assets/email.png";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";

const Contacts = () => {
  const { t, ready } = useTranslation("contact");
  const { theme } = useTheme();
  return (
    <section id="contacts" className={`min-h-screen flex items-center justify-center py-20 px-4 transition-colors duration-300 ${
      theme === "dark"
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
        : "bg-gradient-to-br from-blue-50 to-indigo-100"
    }`}>
      <div className={`w-full max-w-lg rounded-2xl shadow-xl p-10 transform hover:scale-105 transition-transform duration-300 border ${
        theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
      }`}>
        <div className="text-center mb-8">
          <h2 className={`text-4xl font-bold mb-2 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}>
            {ready ? t("title") : "Let's Connect"}
          </h2>
          <p className={`text-sm ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}>
            {ready ? t("subtitle") : "Get in touch with me through these platforms"}
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <a
            href="https://www.linkedin.com/in/muhammad-renaldy-kharisma-aa50b1147/"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-4 p-4 rounded-xl group transition-colors duration-300 ${
              theme === "dark"
                ? "bg-blue-900/30 hover:bg-blue-900/50 text-gray-200"
                : "bg-blue-50 hover:bg-blue-100 text-gray-700"
            }`}
          >
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <img src={linkedinIcon} alt="LinkedIn" className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">LinkedIn</h3>
              <p className="text-blue-600 font-medium text-sm">Muhammad Renaldy Kharisma</p>
            </div>
            <div className="text-blue-600 group-hover:translate-x-1 transition-transform duration-300">
              →
            </div>
          </a>

          <a
            href="https://wa.me/6287823418514"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-4 p-4 rounded-xl group transition-colors duration-300 ${
              theme === "dark"
                ? "bg-green-900/30 hover:bg-green-900/50 text-gray-200"
                : "bg-green-50 hover:bg-green-100 text-gray-700"
            }`}
          >
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <img src={whatsappIcon} alt="WhatsApp" className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">WhatsApp</h3>
              <p className="text-green-600 font-medium text-sm">+62 87823418514</p>
            </div>
            <div className="text-green-600 group-hover:translate-x-1 transition-transform duration-300">
              →
            </div>
          </a>

          <a
            href="mailto:renaldykhrsm8@gmail.com"
            className={`flex items-center gap-4 p-4 rounded-xl group transition-colors duration-300 ${
              theme === "dark"
                ? "bg-red-900/30 hover:bg-red-900/50 text-gray-200"
                : "bg-red-50 hover:bg-red-100 text-gray-700"
            }`}
          >
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
             <img src={emailIcon} alt="Email" className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Email</h3>
              <p className="text-red-600 font-medium text-sm">renaldykhrsm8@gmail.com</p>
            </div>
            <div className="text-red-600 group-hover:translate-x-1 transition-transform duration-300">
              →
            </div>
          </a>
        </div>

        <div className="mt-8 text-center">
          <p className={`text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}>
            {ready ? t("footer") : "Click on any option above to start a conversation"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contacts;