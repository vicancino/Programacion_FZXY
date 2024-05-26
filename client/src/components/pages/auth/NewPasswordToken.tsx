import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { Link } from "react-router-dom";
import { ConfirmToken } from "../../../types";
import { useMutation } from "react-query";
import { validateToken } from "../../../api/AuthApi";
import { ToastContainer, toast } from "react-toastify";
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

	return (
		<>
			<form>
				<div>
					<label>Ingresa el codigo reecibido en tu correo para reestablecer tu contrasena</label>
				</div>
				<label>Código de 6 dígitos</label>
				<div>
					<PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
						<PinInputField />
						<PinInputField />
						<PinInputField />
						<PinInputField />
						<PinInputField />
						<PinInputField />
					</PinInput>
				</div>
			</form>
			<nav>
				<Link to="/forgot-password">Solicitar un nuevo Código</Link>
			</nav>
			<ToastContainer />
		</>
	);
}
