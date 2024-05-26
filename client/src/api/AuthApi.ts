import API from "../lib/axios";
import { isAxiosError } from "axios";
import {
	UserRegistrationForm,
	UserLoginForm,
	ConfirmToken,
	RequestConfirmationCodeForm,
	ForgotPasswordForm,
	NewPasswordForm,
} from "../types";

// El endpoint para la API AUTH esta en http:***/api/auth/

export async function createAccount(formData: UserRegistrationForm) {
	try {
		// URL del endpoint de la API
		const url = "/create-account";

		// POST de la Data del Formulario de Registro
		const { data } = await API.post(url, formData);
		console.log(data);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}

export async function loginAccount(formData: UserLoginForm) {
	try {
		// URL del endpoint de la API
		const url = "/login";

		// POST de la Data del Formulario de Login
		const { data } = await API.post(url, formData);

		return data;
	} catch (error) {
		// Manejo del tipo de Error
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}

export async function confirmAccount(token: ConfirmToken) {
	try {
		// URL del endpoint de la API
		const url = "/confirm-account";

		// Data del Token que se quiere verificar
		const { data } = await API.post(url, token);
		return data;
	} catch (error) {
		// Manejo del tipo de Error
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}

export async function requestConfirmationCode(email: RequestConfirmationCodeForm) {
	try {
		const url = "/request-code";
		const { data } = await API.post(url, email);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}

export async function requestNewPassword(email: ForgotPasswordForm) {
	try {
		const url = "/forgot-password";
		const { data } = await API.post(url, email);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}

export async function validateToken(formData: ConfirmToken) {
	try {
		const url = "/validate-token";
		const { data } = await API.post(url, formData);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}

export async function updatePasswordWithToken({ formData, token }: { formData: NewPasswordForm; token: ConfirmToken }) {
	try {
		const url = `/update-password/${token}`;
		const { data } = await API.post(url, formData);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.message) {
			throw new Error(error.response?.data.error);
		}
	}
}
