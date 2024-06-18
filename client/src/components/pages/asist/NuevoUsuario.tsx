import { useForm } from "react-hook-form";
import ErrorMessage from "../../ErrorMessage";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { AsistRegistrationFrom } from "../../../types";
import { useMutation } from "react-query";
import { newUser } from "../../../api/AsistApi";

export default function NuevoUsuario() {
	const initialValues: AsistRegistrationFrom = {
		name: "",
		email: "",
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<AsistRegistrationFrom>({ defaultValues: initialValues });

	const { mutate } = useMutation({
		mutationFn: newUser,
		onError: (error: Error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data);
			reset();
		},
	});

	const handleRegister = (formData: AsistRegistrationFrom) => {
		mutate(formData);
	};

	return (
		<>
			<form onSubmit={handleSubmit(handleRegister)} noValidate>
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

				<div>
					<label>Nombre</label>
					<input
						type="name"
						placeholder="Nombre de Registro"
						{...register("name", {
							required: "El Nombre de usuario es obligatorio",
						})}
					/>
					{errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
				</div>

				<input type="submit" value="Registrar Usuario" />
			</form>
			<nav>
				<Link to={"/asistencia"}>Volver al inicio</Link>
			</nav>
			<ToastContainer />
		</>
	);
}
