import NewPasswordToken from "./NewPasswordToken";
import NewPasswordForm from "./NewPasswordForm";
import { useState } from "react";
import { ConfirmToken } from "../../../types";
import { ToastContainer } from "react-toastify";

// TODO CSS
export default function NewPasswordView() {
	const [token, setToken] = useState<ConfirmToken["token"]>("");

	const [isValidToken, setIsValidToken] = useState(false);

	return (
		<>
			<div>Reestablece tu contrasena</div>
			{!isValidToken ? (
				<NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken} />
			) : (
				<NewPasswordForm token={token} />
			)}
			<ToastContainer />
		</>
	);
}
