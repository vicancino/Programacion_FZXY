import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ForgotPasswordForm } from "../../../types";
import ErrorMessage from "../../ErrorMessage";
import { useMutation } from "react-query";
import { requestNewPassword } from "../../../api/AuthApi";
import { ToastContainer, toast } from "react-toastify";

// TODO CSS
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
			<div className="bg-gradient-to-b from-cyan-700 to-cyan-900 h-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
				<div className="bg-white w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 px-6 py-8 rounded-lg mx-4 sm:mx-10">
					<form onSubmit={handleSubmit(handleForgotPassword)} noValidate>
						<div className="flex justify-center text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">Olvidé mi Contraseña</div>
						
						{/* Email Field */}
						<div className="mt-4">
							<label className="text-xl sm:text-2xl md:text-3xl font-bold" htmlFor="email">Email</label>
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
								<div className="flex justify-center font-extrabold text-red-600 text-xl sm:text-2xl md:text-2xl mt-2">
									<ErrorMessage>{errors.email.message}</ErrorMessage>
								</div>
							)}
						</div>

						{/* Submit Button */}
						<div className="mt-6 p-2 text-xl sm:text-2xl md:text-2xl rounded-lg font-bold text-white flex items-center justify-center bg-cyan-600 hover:bg-cyan-800">
							<input className="min-w-full cursor-pointer" type="submit" value="Enviar Instrucciones" />
						</div>
					</form>

					{/* Navigation Links */}
					<nav className="mt-6 text-center">
						<div className="flex justify-center mt-2 font-bold text-gray-500">
							<Link to="/login" className="hover:text-gray-700">¿Ya tienes cuenta? Iniciar Sesión</Link>
						</div>
						<div className="flex justify-center mt-2 font-bold text-gray-500">
							<Link to="/register" className="hover:text-gray-700">¿No tienes cuenta? Crea una</Link>
						</div>
					</nav>

					<ToastContainer />
				</div>
			</div>
		</>
	);
}
