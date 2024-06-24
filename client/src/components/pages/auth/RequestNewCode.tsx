import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RequestConfirmationCodeForm } from "../../../types";
import ErrorMessage from "../../ErrorMessage";
import { useMutation } from "react-query";
import { requestConfirmationCode } from "../../../api/AuthApi";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from 'react-i18next';

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

	const { t } = useTranslation();

	return (
		<>
			<div className="bg-gradient-to-b from-cyan-900 to-black h-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
				<div className="bg-white w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 px-6 py-8 rounded-lg mx-4 sm:mx-10">
					<h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-6">{t('solicitud_codigo')}</h1>
					<p className="text-center text-xl sm:text-2xl mb-6">
						{t('ingresa_email')} <span className="font-bold">{t('un_nuevo_codigo')}</span>
					</p>
					
					<form onSubmit={handleSubmit(handleRequestCode)} noValidate>
						<div className="mt-4">
							<label className="text-xl sm:text-2xl md:text-3xl font-bold" htmlFor="email">Email</label>
							<input
								id="email"
								type="email"
								placeholder={t('email_login')}
								className="border-2 border-gray-300 p-2 w-full mt-2"
								{...register("email", {
									required: t('email_login_obli'),
									pattern: {
										value: /\S+@\S+\.\S+/,
										message: "E-mail no válido",
									},
								})}
							/>
							{errors.email && (
								<div className="flex justify-center font-extrabold text-red-600 text-xl sm:text-2xl mt-2">
									<ErrorMessage>{errors.email.message}</ErrorMessage>
								</div>
							)}
						</div>

						<div className="mt-6 p-2 text-xl sm:text-2xl rounded-lg font-bold text-white flex items-center justify-center bg-cyan-600 hover:bg-cyan-800">
							<input className="min-w-full cursor-pointer" type="submit" value={t('enviar_codigo')} />
						</div>
					</form>

					<nav className="mt-6 text-center">
						<div className="flex justify-center mt-2 font-bold text-gray-500">
							<Link to="/login" className="hover:text-gray-700">{t('tienes_cuenta')}</Link>
						</div>
						<div className="flex justify-center mt-2 font-bold text-gray-500">
							<Link to="/forgot-password" className="hover:text-gray-700">{t('olvidar_contra')}</Link>
						</div>
					</nav>

					<ToastContainer />
				</div>
			</div>

		</>
	);
}
