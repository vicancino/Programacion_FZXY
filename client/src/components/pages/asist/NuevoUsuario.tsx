import { useForm } from "react-hook-form";
import ErrorMessage from "../../ErrorMessage";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { AsistRegistrationFrom } from "../../../types";
import { useTranslation } from 'react-i18next';

export default function NuevoUsuario() {
	const initialValues: AsistRegistrationFrom = {
		name: "",
		email: "",
	};

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<AsistRegistrationFrom>();

	const handleRegister = (formData: AsistRegistrationFrom) => {};

	const { t } = useTranslation();

	return (
		<>
			<div className="bg-gradient-to-b from-cyan-900 to-black h-full min-h-screen flex items-center justify-center">
				<div className="bg-white w-full max-w-md px-6 py-8 rounded-lg mx-10">
					<h1 className="text-5xl font-extrabold text-center mb-6">{t('registro_nuevo')}</h1>

					<form onSubmit={handleSubmit(handleRegister)} noValidate className="mb-6">
						{/* Email */}
						<div className="mt-4">
							<label className="text-3xl font-bold" htmlFor="email">Email</label>
							<input
								id="email"
								type="email"
								placeholder={t('email_registro')}
								className="border-2 border-gray-300 p-2 w-full mt-2"
								{...register("email", {
									required: t('email_obli'),
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

						{/* Nombre */}
						<div className="mt-4">
							<label className="text-3xl font-bold" htmlFor="name">{t('name')}</label>
							<input
								id="name"
								type="text"
								placeholder={t('nombre_registro')}
								className="border-2 border-gray-300 p-2 w-full mt-2"
								{...register("name", {
									required: t('nombre_obli'),
								})}
							/>
							{errors.name && (
								<div className="flex justify-center font-extrabold text-red-600 text-2xl mt-2">
									<ErrorMessage>{errors.name.message}</ErrorMessage>
								</div>
							)}
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							className="block w-full p-2 text-2xl rounded-lg font-bold text-white bg-cyan-600 hover:bg-cyan-800 mt-6"
						>
							{t('registrar')}
						</button>
					</form>

					{/* Navigation */}
					<nav className="text-center mb-6">
						<Link
							to={"/asistencia"}
							className="inline-block p-2 text-2xl rounded-lg font-bold text-white bg-gray-600 hover:bg-gray-800"
						>
							{t('volver')}
						</Link>
					</nav>

					<ToastContainer />
				</div>
			</div>

		</>
	);
}
