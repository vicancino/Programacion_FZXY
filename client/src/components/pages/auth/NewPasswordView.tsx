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
			<div className="bg-gradient-to-b from-cyan-700 to-cyan-900 h-full min-h-screen flex items-center justify-center">
				<div className="bg-white w-1/3 px-6 py-8 rounded-lg mx-10">
					<div className="flex justify-center text-5xl font-extrabold mb-6">Restablece tu Contraseña</div>
					{!isValidToken ? (
						<div className="mt-4">
							<NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken} />
						</div>
					) : (
						<div className="mt-4">
							<NewPasswordForm token={token} />
						</div>
					)}
					<ToastContainer />
				</div>
			</div>
		</>
	);
}
