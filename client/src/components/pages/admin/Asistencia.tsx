import { Link } from "react-router-dom";
import { AsistRegistrationFrom } from "../../../types";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../ErrorMessage";
import { ToastContainer } from "react-toastify";
import { useMutation } from "react-query";
import { registrarAsistencia } from "../../../api/AsistApi";

export default function Entrada() {
	// TODO La idea de pedir nombre u correo es hacer un autocompletado, es decir si insertas en nombre que se rellene solo el correo
	// Foro
	const initialValues: AsistRegistrationFrom = {
		name: "",
		email: "",
	};

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<AsistRegistrationFrom>({ defaultValues: initialValues });

	const { mutate } = useMutation({
		mutationFn: registrarAsistencia,
		onError: () => {},
		onSuccess: () => {},
	});

	const handleAsistencia = (formData: AsistRegistrationFrom) => {
		mutate(formData);
	};
	// Listado Usuarios

	return (
		<>
			<div>
				<div className="text-center text-3xl font-bold">Bienvenido al Registro de Asistencia</div>
				<div className="text-center text-2xl font-bold">Marcar Asistencia</div>
				<div className="text-center items-center">
					<div className="flex justify-center">
						<form onSubmit={handleSubmit(handleAsistencia)}>
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
							<div className="mt-3">
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
							<input type="submit" value="Marcar" />
						</form>
					</div>
				</div>

				<nav className="text-center mt-4">
					<Link to={"/nuevo-registro-usuario"}>Registrar nuevo Usuario</Link>
				</nav>

				<div className="text-center text-3xl mt-10 font-bold">Listado de Usuarios Activos</div>
			</div>
			<ToastContainer />
		</>
	);
}
