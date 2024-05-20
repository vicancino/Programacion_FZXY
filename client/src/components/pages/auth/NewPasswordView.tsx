import NewPasswordToken from "./NewPasswordToken";
import NewPasswordForm from "./NewPasswordForm";
import { useState } from "react";

export default function NewPasswordView() {
	const [isValidToken, setIsValidToken] = useState(false);

	return (
		<>
			<div>Reestablece tu contrasena</div>
			{!isValidToken ? <NewPasswordToken /> : <NewPasswordForm />}
		</>
	);
}
