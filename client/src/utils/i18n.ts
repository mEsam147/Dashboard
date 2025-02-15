import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

const i18nextOptions = {
  fallbackLng: "en",
  detection: {
    order: [
      "cookie",
      "localStorage",
      "sessionStorage",
      "navigator",
      "htmlTag",
      "path",
      "subdomain",
    ],
    caches: ["localStorage", "cookie"],
  },
  backend: {
    loadPath: "/locale/{{lng}}/{{ns}}.json",
  },
  interpolation: {
    escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  },
};

i18n
  .use(LanguageDetector)
  .use(HttpApi)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(i18nextOptions);