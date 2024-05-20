import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { Home_en, Login_en } from "./components/translations/en";
import { Home_es } from "./components/translations/es";

i18n
	// detect user language
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		debug: true,
		fallbackLng: "es",
		lng: "en",
		resources: {
			es: {
				translation: {
					Home: Home_es,
				},
			},
			en: {
				translation: {
					Home: Home_en,
					Login: Login_en,
				},
			},
		},
	});

export default i18n;
