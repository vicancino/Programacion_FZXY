import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RequestConfirmationCodeForm } from "../../../types";
import ErrorMessage from "../../ErrorMessage";
import { useMutation } from "react-query";
import { requestConfirmationCode } from "../../../api/AuthApi";
import { ToastContainer, toast } from "react-toastify";

// TODO CSS
export default function RegisterView() {
	const initialValues: RequestConfirmationCodeForm = {
		email: "",
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ defaultValues: initialValues });

	const { mutate } = useMutation({
		mutationFn: requestConfirmationCode,
		onError: (error: Error) => {
			toast.error(error.message, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		},
		onSuccess: (data) => {
			toast.success(data);
			reset();
		},
	});

	const handleRequestCode = (formData: RequestConfirmationCodeForm) => {
		mutate(formData);
	};

	return (
		<>
			<div className="bg-gradient-to-b from-cyan-700 to-cyan-900 h-full min-h-screen flex items-center justify-center">
				<div className="bg-white w-1/3 px-6 py-8 rounded-lg mx-10">
					<h1 className="text-5xl font-extrabold text-center mb-6">Solicitar Código de Confirmación</h1>
					<p className="text-center text-2xl mb-6">
						Coloca tu e-mail para recibir <span className="font-bold">un nuevo código</span>
					</p>
					
					<form onSubmit={handleSubmit(handleRequestCode)} noValidate>
						<div className="mt-4">
							<label className="text-3xl font-bold" htmlFor="email">Email</label>
							<input
								id="email"
								type="email"
								placeholder="Email de Registro"
								className="border-2 border-gray-300 p-2 w-full mt-2"
								{...register("email", {
									required: "El Email de registro es obligatorio",
									pattern: {
										value: /\S+@\S+\.\S+/,
										message: "E-mail no válido",
									},
								})}
							/>
							{errors.email && (
								<div className="flex justify-center font-extrabold text-red-600 text-2xl mt-2">
									<ErrorMessage>{errors.email.message}</ErrorMessage>
								</div>
							)}
						</div>

						<div className="mt-6 p-2 text-2xl rounded-lg font-bold text-white flex items-center justify-center bg-cyan-600 hover:bg-cyan-800">
							<input className="min-w-full cursor-pointer" type="submit" value="Enviar Código" />
						</div>
					</form>

					<nav className="mt-6 text-center">
						<div className="flex justify-center mt-2 font-bold text-gray-500">
							<Link to="/login" className="hover:text-gray-700">¿Ya tienes cuenta? Iniciar Sesión</Link>
						</div>
						<div className="flex justify-center mt-2 font-bold text-gray-500">
							<Link to="/forgot-password" className="hover:text-gray-700">¿Olvidaste tu contraseña? Reestablecer</Link>
						</div>
					</nav>

					<ToastContainer />
				</div>
			</div>

		</>
	);
}
