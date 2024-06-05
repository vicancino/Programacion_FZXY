import { useForm } from "react-hook-form";
import { UserLoginForm } from "../../../types/index";
import ErrorMessage from "../../ErrorMessage";
import { Link } from "react-router-dom";
import { loginAccount } from "../../../api/AuthApi";
import { useMutation } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { sign_in } from "../../../state/login/loginSlice";
import { useNavigate } from "react-router-dom";

// TODO CSS
function Login() {
	// Valores iniciales del formulario login
	const initialValues: UserLoginForm = {
		email: "",
		password: "",
	};

	// Hook de React-Hook-Form para el manejo del Formulario de Login
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserLoginForm>({ defaultValues: initialValues });

	// Hook de React-Query para el manejo de la petición de Login
	// Para iniciar sesion debemos manejar el estado del login, para esto usamos el dispatch de sign in
	const dispatch = useDispatch();

	// navegate para el manejo de las rutas
	const navigate = useNavigate();

	const { mutate } = useMutation({
		mutationFn: loginAccount,
		onError: (error: Error) => {
			console.log(error.message);
			toast.error(error.message);
		},
		onSuccess: () => {
			toast.success("Iniciando Sesion");
			dispatch(sign_in());
			navigate("/");
		},
	});

	// Función para el manejo del submit del formulario de Login
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
				<Link to={"/"}> Inicio</Link>
			</nav>
			<ToastContainer />
		</>
	);
}

export default Login;
