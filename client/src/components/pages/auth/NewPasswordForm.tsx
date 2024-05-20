import type { NewPasswordForm } from "../../../types";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../ErrorMessage";

export default function NewPasswordForm() {
	const navigate = useNavigate();

	const initialValues: NewPasswordForm = {
		password: "",
		password_confirmation: "",
	};
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm({ defaultValues: initialValues });

	const handleNewPassword = (formData: NewPasswordForm) => {};

	const password = watch("password");

	return (
		<>
			<form onSubmit={handleSubmit(handleNewPassword)} noValidate>
				<div>
					<label>Password</label>

					<input
						type="password"
						placeholder="Password de Registro"
						{...register("password", {
							required: "El Password es obligatorio",
							minLength: {
								value: 8,
								message: "El Password debe ser mínimo de 8 caracteres",
							},
						})}
					/>
					{errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
				</div>

				<div>
					<label>Repetir Password</label>

					<input
						id="password_confirmation"
						type="password"
						placeholder="Repite Password de Registro"
						{...register("password_confirmation", {
							required: "Repetir Password es obligatorio",
							validate: (value) => value === password || "Los Passwords no son iguales",
						})}
					/>

					{errors.password_confirmation && (
						<ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
					)}
				</div>

				<input type="submit" value="Establecer Password" />
			</form>
		</>
	);
}
