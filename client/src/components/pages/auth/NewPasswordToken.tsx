import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { Link } from "react-router-dom";

export default function NewPasswordToken() {
	const handleChange = (token: string) => {};
	const handleComplete = (token: string) => {};

	return (
		<>
			<form>
				<div>
					<label>Ingresa el codigo reecibido en tu correo para reestablecer tu contrasena</label>
				</div>
				<label>Código de 6 dígitos</label>
				<div>
					<PinInput value={""} onChange={handleChange} onComplete={handleComplete}>
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
		</>
	);
}
