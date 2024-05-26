import type { ConfirmToken, NewPasswordForm } from "../../../types";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../ErrorMessage";
import { ToastContainer, toast } from "react-toastify";
import { useMutation } from "react-query";
import { updatePasswordWithToken } from "../../../api/AuthApi";

type NewPasswordTokenProps = {
	token: ConfirmToken["token"];
};

export default function NewPasswordForm(token: NewPasswordTokenProps) {
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

	const { mutate } = useMutation({
		mutationFn: updatePasswordWithToken,
		onError: (error: Error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data.message);
		},
	});

	const handleNewPassword = (formData: NewPasswordForm) => {
		const data = {
			formData,
			token,
		};
		mutate(data);
		reset();
		navigate("/login");
	};

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
			<ToastContainer />
		</>
	);
}
