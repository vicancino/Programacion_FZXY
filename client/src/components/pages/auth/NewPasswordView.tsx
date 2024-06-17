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
			<div className="bg-gradient-to-b from-cyan-700 to-cyan-900 h-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
				<div className="bg-white w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 px-6 py-8 rounded-lg mx-4 sm:mx-10">
					<div className="flex justify-center text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">Restablece tu Contraseña</div>
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
