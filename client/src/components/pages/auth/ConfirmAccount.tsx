import { Link } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import { ConfirmToken } from "../../../types";
import { useMutation } from "react-query";
import { confirmAccount } from "../../../api/AuthApi";
import { ToastContainer, toast } from "react-toastify";

// TODO CSS
export default function ConfirmAccountView() {
	const { mutate } = useMutation({
		mutationFn: confirmAccount,
		onError: (error: Error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data.message);
		},
	});

	const [token, setToken] = useState<ConfirmToken["token"]>("");

	const handleChange = (token: ConfirmToken["token"]) => {
		setToken(token);
	};

	const handleComplete = (token: ConfirmToken["token"]) => mutate({ token });

	return (
		<>
			<h1>Confirma tu Cuenta</h1>
			<p>
				Ingresa el código que recibiste {""} <span> por e-mail</span>
			</p>
			<form>
				<label>Código de 6 dígitos</label>
				<div>
					<PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
						<PinInputField></PinInputField>
						<PinInputField></PinInputField>
						<PinInputField></PinInputField>
						<PinInputField></PinInputField>
						<PinInputField></PinInputField>
						<PinInputField></PinInputField>
					</PinInput>
				</div>
			</form>

			<nav>
				<Link to="/request-code">Solicitar un nuevo Código</Link>
			</nav>
			<ToastContainer />
		</>
	);
}
