import type { ConfirmToken, NewPasswordForm } from "../../../types";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../ErrorMessage";
import { ToastContainer, toast } from "react-toastify";
import { useMutation } from "react-query";
import { updatePasswordWithToken } from "../../../api/AuthApi";
import { useTranslation } from 'react-i18next';

type NewPasswordTokenProps = {
	token: ConfirmToken["token"];
};

// TODO CSS
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

	const { t } = useTranslation();

	return (
		<>
			<div className="bg-gradient-to-b from-cyan-900 to-black h-full min-h-screen flex items-center justify-center">
				<div className="bg-white w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 px-6 py-8 rounded-lg mx-4 sm:mx-10">
					<form onSubmit={handleSubmit(handleNewPassword)} noValidate>
						<div className="flex justify-center text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
							{t('establecer_contraseña')}
						</div>
						
						{/* Password Field */}
						<div className="mt-4">
							<label className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold" htmlFor="password">
								{t('contra')}
							</label>
							<input
								id="password"
								type="password"
								placeholder={t('contra_place')}
								className="border-2 border-gray-300 p-2 w-full mt-2"
								{...register("password", {
									required: t('contra_obli'),
									minLength: {
										value: 8,
										message: t('contra_largo'),
									},
								})}
								aria-invalid={errors.password ? "true" : "false"}
								aria-describedby="password-error"
							/>
							{errors.password && (
								<div id="password-error" className="flex justify-center font-extrabold text-red-600 text-sm sm:text-lg md:text-xl lg:text-2xl mt-2">
									{errors.password.message}
								</div>
							)}
						</div>

						{/* Password Confirmation Field */}
						<div className="mt-4">
							<label className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold" htmlFor="password_confirmation">
								{t('repetir_contra')}
							</label>
							<input
								id="password_confirmation"
								type="password"
								placeholder={t('repetir_contra_registro')}
								className="border-2 border-gray-300 p-2 w-full mt-2"
								{...register("password_confirmation", {
									required: t('contra_obli'),
									validate: (value) => value === watch('password') || t('contra_iguales'),
								})}
								aria-invalid={errors.password_confirmation ? "true" : "false"}
								aria-describedby="password-confirmation-error"
							/>
							{errors.password_confirmation && (
								<div id="password-confirmation-error" className="flex justify-center font-extrabold text-red-600 text-sm sm:text-lg md:text-xl lg:text-2xl mt-2">
									{errors.password_confirmation.message}
								</div>
							)}
						</div>

						{/* Submit Button */}
						<div className="mt-6 p-2 text-xl sm:text-2xl rounded-lg font-bold text-white flex items-center justify-center bg-cyan-600 hover:bg-cyan-800">
							<input className="w-full cursor-pointer" type="submit" value={t('establecer_contraseña')} />
						</div>
					</form>

					<ToastContainer />
				</div>
    	</div>
		</>
	);
}
