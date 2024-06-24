import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import contactoES from './components/translations/es/contacto.json'
import contactoEN from './components/translations/en/contacto.json'
import homeES from './components/translations/es/home.json'
import homeEN from './components/translations/en/home.json'
import asistenciaES from './components/translations/es/asistencia.json'
import asistenciaEN from './components/translations/en/asistencia.json'
import actividadesES from './components/translations/es/actividades.json'
import actividadesEN from './components/translations/en/actividades.json'
import loginES from './components/translations/es/login.json'
import loginEN from './components/translations/en/login.json'
import confirmar_cuentaES from './components/translations/es/confirmar_cuenta.json'
import confirmar_cuentaEN from './components/translations/en/confirmar_cuenta.json'


const resources = {
	en: {
		translation: {
			...homeEN,
			...contactoEN,
			...asistenciaEN,
			...actividadesEN,
			...loginEN,
			...confirmar_cuentaEN
		}	
	},
	es: {
		translation: {
			...homeES,
			...contactoES,
			...asistenciaES,
			...actividadesES,
			...loginES,
			...confirmar_cuentaES
		} 
	}
}

i18n
	.use(initReactI18next)
	.init({
		resources,
		lng: 'es', // Idioma por defecto
		fallbackLng: 'es',
		interpolation: {
			escapeValue: false
		}
	});

export default i18n;

