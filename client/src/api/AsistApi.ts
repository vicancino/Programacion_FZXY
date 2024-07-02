import API_ASIST from "../lib/AxiosAsist";
import { isAxiosError } from "axios";
import { AsistRegistrationFrom } from "../types";

export async function getUsers() {
	try {
		// URL del endpoint de la API
		const url = "/users";
		// GET del request del fronted
		const { data } = await API_ASIST.get(url);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}
export async function newUser(formData: AsistRegistrationFrom) {
	try {
		// URL del endpoint de la API
		const url = "/new-user";

		// POST del request del fronted
		const { data } = await API_ASIST.post(url, formData);

		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}

export async function registrarAsistencia(formData: AsistRegistrationFrom) {
	try {
		// URL del endpot de la API
		const url = "/register-asist";

		// POST del request del frontend
		const { data } = await API_ASIST.post(url, formData);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}

export async function registrarSalida(email: string) {
	try {
		// Url del endpoint de la API
		const url = "/register-exit";
		const { data } = await API_ASIST.post(url, { email });
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}

export async function getActivos() {
	try {
		// URL del endpot de la API
		const url = "/actives";

		// Get del request del fronted
		const { data } = await API_ASIST.get(url);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}
