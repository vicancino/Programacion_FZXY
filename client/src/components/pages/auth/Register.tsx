import { useForm } from "react-hook-form";
import { UserRegistrationForm } from "../../../types/index";
import ErrorMessage from "../../ErrorMessage";
import { Link } from "react-router-dom";
import { createAccount } from "../../../api/AuthApi";
import { useMutation } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from 'react-i18next';

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

	const { t } = useTranslation();

	return (
		<>
			<div className="bg-gradient-to-b from-cyan-900 to-black h-full min-h-screen flex items-center justify-center">
				<div className="bg-white w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 px-6 py-8 rounded-lg mx-4 sm:mx-10">
					<form onSubmit={handleSubmit(handleRegister)} noValidate>
						<div className="flex justify-center text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">{t('registrate')}</div>
						
						{/* Email Field */}
						<div className="mt-4">
							<label className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold" htmlFor="email">Email</label>
							<input
								id="email"
								type="email"
								placeholder={t('email_registro')}
								className="border-2 border-gray-300 p-2 w-full mt-2"
								{...register("email", {
									required: t('email_obli'),
									pattern: {
										value: /\S+@\S+\.\S+/,
										message: t('email_no_valido'),
									},
								})}
							/>
							{errors.email && (
								<div className="flex justify-center font-extrabold text-red-600 text-sm sm:text-lg md:text-xl lg:text-2xl mt-2">
									<ErrorMessage>{errors.email.message}</ErrorMessage>
								</div>
							)}
						</div>

						{/* Name Field */}
						<div className="mt-4">
							<label className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold" htmlFor="name">{t('name')}</label>
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
								<div className="flex justify-center font-extrabold text-red-600 text-sm sm:text-lg md:text-xl lg:text-2xl mt-2">
									<ErrorMessage>{errors.name.message}</ErrorMessage>
								</div>
							)}
						</div>

						{/* Password Field */}
						<div className="mt-4">
							<label className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold" htmlFor="password">{t('contra')}</label>
							<input
								id="password"
								type="password"
								placeholder={t('contra_registro')}
								className="border-2 border-gray-300 p-2 w-full mt-2"
								{...register("password", {
									required: t('contra_obli'),
									minLength: {
										value: 8,
										message: t('contra_largo'),
									},
								})}
							/>
							{errors.password && (
								<div className="flex justify-center font-extrabold text-red-600 text-sm sm:text-lg md:text-xl lg:text-2xl mt-2">
									<ErrorMessage>{errors.password.message}</ErrorMessage>
								</div>
							)}
						</div>

						{/* Password Confirmation Field */}
						<div className="mt-4">
							<label className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold" htmlFor="password_confirmation">{t('contra_registro')}</label>
							<input
								id="password_confirmation"
								type="password"
								placeholder={t('repetir_contra_registro')}
								className="border-2 border-gray-300 p-2 w-full mt-2"
								{...register("password_confirmation", {
									required: t('contra_obli'),
									validate: (value) => value === watch('password') || t('contra_iguales'),
								})}
							/>
							{errors.password_confirmation && (
								<div className="flex justify-center font-extrabold text-red-600 text-sm sm:text-lg md:text-xl lg:text-2xl mt-2">
									<ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
								</div>
							)}
						</div>

						{/* Register Button */}
						<div className="mt-6 p-2 text-xl sm:text-2xl rounded-lg font-bold text-white flex items-center justify-center bg-cyan-600 hover:bg-cyan-800">
							<input className="w-full cursor-pointer" type="submit" value={t('sign_up')} />
						</div>
					</form>

					{/* Navigation Links */}
					<nav className="mt-4">
						<div className="flex justify-start mt-2 font-bold text-gray-500">
							<Link to="/login">{t('tienes_cuenta')}</Link>
						</div>
						<div className="flex justify-start mt-2 font-bold text-gray-500">
							<Link to="/forgot-password">{t('olvidar_contra')}</Link>
						</div>
					</nav>

					<ToastContainer />
				</div>
			</div>

		</>
	);
}
