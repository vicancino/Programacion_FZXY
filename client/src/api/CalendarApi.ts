import API_Calendar from "../lib/AxiosCalendar";
import { isAxiosError } from "axios";

export async function registrarBloque() {
	try {
		console.log("Query Registro");
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}

export async function eliminarBloque() {
	try {
		console.log("Query Eliminar");
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}

export async function listarBloques() {
	try {
		// URL
		const url = "/list-blocks";
		const { data } = await API_Calendar.get(url);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}

export async function fechaHoy() {
	const hoy = new Date()
	hoy.setHours(hoy.getHours() - 3);
	const diasDeLaSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado','Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
	return {
		hoy: hoy?.toISOString().slice(0, 10)?? '', 
		dia: diasDeLaSemana[hoy.getDay()] ?? '',
		semana: [diasDeLaSemana[hoy.getDay()], diasDeLaSemana[hoy.getDay()+1], diasDeLaSemana[hoy.getDay()+2], diasDeLaSemana[hoy.getDay()+3], diasDeLaSemana[hoy.getDay()+4], diasDeLaSemana[hoy.getDay()+5], diasDeLaSemana[hoy.getDay()+6]] ?? '',
	};
}