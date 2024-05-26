import { useForm } from "react-hook-form";
import { UserLoginForm } from "../../../types/index";
import ErrorMessage from "../../ErrorMessage";
import { Link } from "react-router-dom";
import { loginAccount } from "../../../api/AuthApi";
import { useMutation } from "react-query";
import { ToastContainer, toast } from "react-toastify";

// TODO CSS
function Login() {
	const initialValues: UserLoginForm = {
		email: "",
		password: "",
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserLoginForm>({ defaultValues: initialValues });

	const { mutate } = useMutation({
		mutationFn: loginAccount,
		onError: (error: Error) => {
			toast.error(error.message);
		},
		onSuccess: () => {
			toast.success("Iniciando Sesion");
		},
	});

	const handleLogin = (formData: UserLoginForm) => {
		mutate(formData);
	};

	return (
		<>
			<form onSubmit={handleSubmit(handleLogin)}>
				<div>
					<label>Email</label>

					<input
						id="email"
						type="email"
						placeholder="Email de Registro"
						{...register("email", {
							required: "El Email es obligatorio",
							pattern: {
								value: /\S+@\S+\.\S+/,
								message: "E-mail no válido",
							},
						})}
					/>
					{errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
				</div>

				<div>
					<label>Password</label>

					<input
						type="password"
						placeholder="Password de Registro"
						{...register("password", {
							required: "El Password es obligatorio",
						})}
					/>
					{errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
				</div>

				<input type="submit" value="Iniciar Sesión" />
			</form>
			<nav>
				<Link to={"/register"}>No tienes cuenta? Registrate </Link>
				<Link to={"/forgot-password"}>Olvidaste tu contrasena? Reestablecela</Link>
			</nav>
			<ToastContainer />
		</>
	);
}

export default Login;
