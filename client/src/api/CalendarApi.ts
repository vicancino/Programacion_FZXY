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
