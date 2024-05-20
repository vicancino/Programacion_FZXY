import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RequestConfirmationCodeForm } from "../../../types";
import ErrorMessage from "../../ErrorMessage";
import { useMutation } from "react-query";
import { requestConfirmationCode } from "../../../api/AuthApi";
import { ToastContainer, toast } from "react-toastify";

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
			<h1>Solicitar Código de Confirmación</h1>
			<p>
				Coloca tu e-mail para recibir {""}
				<span> un nuevo código</span>
			</p>

			<form onSubmit={handleSubmit(handleRequestCode)} noValidate>
				<div>
					<label htmlFor="email">Email</label>
					<input
						id="email"
						type="email"
						placeholder="Email de Registro"
						{...register("email", {
							required: "El Email de registro es obligatorio",
							pattern: {
								value: /\S+@\S+\.\S+/,
								message: "E-mail no válido",
							},
						})}
					/>
					{errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
				</div>

				<input type="submit" value="Enviar Código" />
			</form>

			<nav>
				<Link to="/login">¿Ya tienes cuenta? Iniciar Sesión</Link>
				<Link to="/forgot-password">¿Olvidaste tu contraseña? Reestablecer</Link>
			</nav>
			<ToastContainer></ToastContainer>
		</>
	);
}
