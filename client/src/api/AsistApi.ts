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

		// GET del request del fronted
		const { data } = await API_ASIST.post(url, formData);
		console.log(data);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}
