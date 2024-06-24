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
import { useTranslation } from 'react-i18next';

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
		console.log("Presionado");
		mutate(formData);
	};

	const { t } = useTranslation();

	return (
		<>
			<div className="bg-gradient-to-b from-cyan-900 to-black h-full min-h-screen flex items-center justify-center ">
				<div className="bg-white w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 px-2 py-8 rounded-lg mx-4 ">
					<form onSubmit={handleSubmit(handleLogin)}>
						<div className="flex justify-center text-3xl sm:text-4xl md:text-5xl font-extrabold">{t('bienvenido')}</div>
						<div className="mt-4">
							<label className="text-xl sm:text-2xl md:text-3xl font-bold">E-mail</label>
							<div>
								<input
									id="email"
									type="email"
									placeholder={t('email_login')}
									className="border-2 border-gray-300 p-2 w-full"
									{...register("email", {
										required: t('email_login_obli'),
										pattern: {
											value: /\S+@\S+\.\S+/,
											message: "E-mail no valido",
										},
									})}
								/>
								<div className="flex justify-center font-extrabold text-red-600 text-lg sm:text-xl md:text-2xl">
									{errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
								</div>
							</div>
						</div>

						<div className="mt-4">
							<label className="text-xl sm:text-2xl md:text-3xl font-bold">{t('contra')}</label>
							<div>
								<input
									type="password"
									placeholder={t('contra_place')}
									className="border-2 border-gray-300 p-2 w-full"
									{...register("password", {
										required: t('contra_obli'),
									})}
								/>
								<div className="flex justify-center font-extrabold text-red-600 text-lg sm:text-xl md:text-2xl">
									{errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
								</div>
							</div>
							<div className="flex justify-end mt-2 font-bold text-gray-500">
								<Link to={"/forgot-password"}>{t('olvidar_contra')}</Link>
							</div>
						</div>
						<div className="mt-4 p-2 text-xl sm:text-2xl rounded-lg font-bold text-white flex items-center justify-center bg-cyan-600 hover:bg-cyan-800">
							<input className="w-full" type="submit" value={t('login')}/>
						</div>
					</form>
					<nav>
						<div className="flex justify-start mt-2 font-bold text-gray-500">
							<Link to={"/register"}>{t('registrarse_login')}</Link>
						</div>
						<div className="flex justify-center">
							<div className="mt-4 p-2 text-xl sm:text-2xl rounded-lg font-bold text-white bg-gray-600 hover:bg-gray-800 max-w-30">
								<Link to={"/"}>
									<button>{t('volver_menu')}</button>
								</Link>
							</div>
						</div>
					</nav>

					<ToastContainer />
				</div>
			</div>

		</>
	);
}

export default Login;
