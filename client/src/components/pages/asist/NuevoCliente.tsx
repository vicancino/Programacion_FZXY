import { useForm } from "react-hook-form";
import ErrorMessage from "../../ErrorMessage";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { AsistRegistrationFrom } from "../../../types";

export default function NuevoCliente() {
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

				<input type="submit" value="Registrar Persona" />
			</form>
			<nav>
				<Link to={"/asistencia"}>Volver lista Personas</Link>
			</nav>
			<ToastContainer />
		</>
	);
}
