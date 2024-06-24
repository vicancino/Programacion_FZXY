import { Link } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import { ConfirmToken } from "../../../types";
import { useMutation } from "react-query";
import { confirmAccount } from "../../../api/AuthApi";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from 'react-i18next';

// TODO CSS
export default function ConfirmAccountView() {
	const { mutate } = useMutation({
		mutationFn: confirmAccount,
		onError: (error: Error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data.message);
		},
	});

	const [token, setToken] = useState<ConfirmToken["token"]>("");

	const handleChange = (token: ConfirmToken["token"]) => {
		setToken(token);
	};

	const handleComplete = (token: ConfirmToken["token"]) => mutate({ token });

	const { t } = useTranslation();


	return (
		<>
			<div className="bg-gradient-to-b from-cyan-900 to-black h-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
				<div className="bg-white w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 px-6 py-8 rounded-lg mx-4 sm:mx-10">
					<h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-6">{t('confirma_tu_cuenta')}</h1>
					<p className="text-center text-lg sm:text-xl md:text-2xl mb-6">
						{t('ingresa_codigo')} <span className="font-bold">{t('por_email')}</span>
					</p>
					
					<form>
						<label className="text-xl sm:text-2xl md:text-3xl font-bold block text-center mb-4">{t('codigo6')}</label>
						<div className="flex justify-center space-x-2">
							<PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
								<PinInputField className="border-2 border-gray-300 p-2 w-10 sm:w-12 text-center text-xl sm:text-2xl" />
								<PinInputField className="border-2 border-gray-300 p-2 w-10 sm:w-12 text-center text-xl sm:text-2xl" />
								<PinInputField className="border-2 border-gray-300 p-2 w-10 sm:w-12 text-center text-xl sm:text-2xl" />
								<PinInputField className="border-2 border-gray-300 p-2 w-10 sm:w-12 text-center text-xl sm:text-2xl" />
								<PinInputField className="border-2 border-gray-300 p-2 w-10 sm:w-12 text-center text-xl sm:text-2xl" />
								<PinInputField className="border-2 border-gray-300 p-2 w-10 sm:w-12 text-center text-xl sm:text-2xl" />
							</PinInput>
						</div>
					</form>
					
					<nav className="mt-6 text-center">
						<Link to="/auth/request-code" className="text-gray-500 font-bold hover:text-gray-700">
							{t('solicitar_codigo')}
						</Link>
					</nav>

					<ToastContainer />
				</div>
			</div>

		</>
	);
}
