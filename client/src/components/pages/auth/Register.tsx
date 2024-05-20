import { useForm } from "react-hook-form";
import { UserRegistrationForm } from "../../../types/index";
import ErrorMessage from "../../ErrorMessage";
import { Link } from "react-router-dom";
import { createAccount } from "../../../api/AuthApi";
import { useMutation } from "react-query";
import { ToastContainer, toast } from "react-toastify";

// TODO CSS
export default function RegisterView() {
	const initialValues: UserRegistrationForm = {
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
	};

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<UserRegistrationForm>({ defaultValues: initialValues });

	const { mutate } = useMutation({
		mutationFn: createAccount,
		onError: (error: Error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data);
			reset();
		},
	});

	const password = watch("password");
	const handleRegister = (formData: UserRegistrationForm) => mutate(formData);

	return (
		<>
			<form onSubmit={handleSubmit(handleRegister)} noValidate>
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

				<div>
					<label>Nombre</label>
					<input
						type="name"
						placeholder="Nombre de Registro"
						{...register("name", {
							required: "El Nombre de usuario es obligatorio",
						})}
					/>
					{errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
				</div>

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
							required: "Repeat Password es obligatorio",
							validate: (value) => value === password || "Los Passwords no son iguales",
						})}
					/>

					{errors.password_confirmation && (
						<ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
					)}
				</div>

				<input type="submit" value="Registrarme" />
			</form>
			<nav>
				<Link to={"/login"}>Ya tienes cuenta? Inicia Sesion</Link>
				<Link to={"/forgot-password"}>Olvidaste tu contrasena? Reestablecela</Link>
			</nav>
			<ToastContainer />
		</>
	);
}
