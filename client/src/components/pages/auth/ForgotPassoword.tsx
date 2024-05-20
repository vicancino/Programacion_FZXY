import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ForgotPasswordForm } from "../../../types";
import ErrorMessage from "../../ErrorMessage";
import { useMutation } from "react-query";
import { requestNewPassword } from "../../../api/AuthApi";
import { ToastContainer, toast } from "react-toastify";

export default function ForgotPassword() {
	const initialValues: ForgotPasswordForm = {
		email: "",
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ defaultValues: initialValues });

	const { mutate } = useMutation({
		mutationFn: requestNewPassword,
		onError: (error: Error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data);
			reset();
		},
	});

	const handleForgotPassword = (formData: ForgotPasswordForm) => {
		mutate(formData);
	};

	return (
		<>
			<form onSubmit={handleSubmit(handleForgotPassword)} noValidate>
				<div>
					<label htmlFor="email">Email</label>
					<input
						id="email"
						type="email"
						placeholder="Email de Registro"
						{...register("email", {
							required: "El Email de registro es obligatorio",
							pattern: {
								value: /\S+@\S+\.\S+/,
								message: "E-mail no válido",
							},
						})}
					/>
					{errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
				</div>

				<input type="submit" value="Enviar Instrucciones" />
			</form>

			<nav>
				<Link to="/login">¿Ya tienes cuenta? Iniciar Sesión</Link>

				<Link to="/register">¿No tienes cuenta? Crea una</Link>
			</nav>
			<ToastContainer />
		</>
	);
}
