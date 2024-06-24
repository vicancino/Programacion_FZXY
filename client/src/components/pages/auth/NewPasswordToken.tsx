import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { Link } from "react-router-dom";
import { ConfirmToken } from "../../../types";
import { useMutation } from "react-query";
import { validateToken } from "../../../api/AuthApi";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
import React from "react";

type NewPasswordTokenProps = {
	token: ConfirmToken["token"];
	setToken: React.Dispatch<React.SetStateAction<string>>;
	setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>;
};

// TODO CSS
export default function NewPasswordToken({ token, setToken, setIsValidToken }: NewPasswordTokenProps) {
	const { mutate } = useMutation({
		mutationFn: validateToken,
		onError: (error: Error) => {
			toast.error(error.message);
		},

		onSuccess: (data) => {
			toast.success(data.message);
			setIsValidToken(true);
		},
	});

	const handleChange = (token: ConfirmToken["token"]) => {
		setToken(token);
	};

	const handleComplete = (token: ConfirmToken["token"]) => {
		mutate({ token });
	};

	const { t } = useTranslation();

	return (
		<>
			<form>
				<div className="text-center text-lg sm:text-xl md:text-2xl mb-6">
					<label>{t('reestablecer_ingresa_codigo')}</label>
				</div>
				<label className="text-xl sm:text-2xl md:text-3xl font-bold block text-center mb-4">{t('codigo6')}</label>
				<div className="flex justify-center space-x-2">
					<PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
						<PinInputField className="border-2 border-gray-300 p-2 w-10 sm:w-12 text-center text-xl sm:text-2xl" />
						<PinInputField className="border-2 border-gray-300 p-2 w-10 sm:w-12 text-center text-xl sm:text-2xl" />
						<PinInputField className="border-2 border-gray-300 p-2 w-10 sm:w-12 text-center text-xl sm:text-2xl" />
						<PinInputField className="border-2 border-gray-300 p-2 w-10 sm:w-12 text-center text-xl sm:text-2xl" />
						<PinInputField className="border-2 border-gray-300 p-2 w-10 sm:w-12 text-center text-xl sm:text-2xl" />
						<PinInputField className="border-2 border-gray-300 p-2 w-10 sm:w-12 text-center text-xl sm:text-2xl" />
					</PinInput>
				</div>
			</form>
			<nav className="mt-6 text-center">
				<Link to="/forgot-password">{t('solicitar_codigo')}</Link>
			</nav>
			<ToastContainer />
		</>
	);
}
