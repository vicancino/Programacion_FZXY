import { Link } from "react-router-dom";
import { AsistRegistrationFrom } from "../../../types";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../ErrorMessage";
import { ToastContainer, toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getActivos, registrarAsistencia, registrarSalida } from "../../../api/AsistApi";

interface Activo {
	Email: string;
	Name: string;
	Activo: {
		HoraEntrada: string;
	};
}

export default function Entrada() {
	const queryClient = useQueryClient();
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
		reset,
	} = useForm<AsistRegistrationFrom>({ defaultValues: initialValues });

	const { mutate: mutateEntrada } = useMutation({
		mutationFn: registrarAsistencia,
		onError: (error: Error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data);
			// Actualizamos el listado de clientes
			queryClient.invalidateQueries("Listado");
			reset();
		},
	});

	// Marcar Entrada usuario
	const handleAsistencia = (formData: AsistRegistrationFrom) => {
		mutateEntrada(formData);
	};

	// Listado Usuarios
	const { data = [] } = useQuery<Activo[]>({
		queryKey: ["Listado"],
		queryFn: getActivos,
	});

	const { mutate: mutateSalida } = useMutation({
		mutationFn: registrarSalida,
		onError: (error: Error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data.message);
			// Actualizamos el listado de clientes
			queryClient.invalidateQueries("Listado");
		},
	});

	// Marcar Salida Usuario
	const handleSalida = (email: string) => {
		mutateSalida(email);
	};

	const user_list = data.map((item: Activo, index: number) => (
		<li key={index}>
			Nombre: {item.Name} Email: {item.Email} Hora Entrada:{" "}
			{new Date(parseInt(item.Activo.HoraEntrada)).toLocaleTimeString()}
			<button
				className="ml-4"
				onClick={() => {
					handleSalida(item.Email);
				}}
			>
				Marcar salida
			</button>
		</li>
	));

	return (
		<>
  <div className="flex flex-col items-center">
    <div className="text-center text-3xl font-bold py-5">Bienvenido al Registro de Asistencia</div>
    <div className="text-center text-2xl font-bold py-5">Marcar Asistencia</div>
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(handleAsistencia)} className="w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
          <input
            type="text"
            placeholder="Nombre de Registro"
            {...register("name", {
              required: "El Nombre de usuario es obligatorio",
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
        </div>
        <div className="flex items-center justify-between">
          <input
            type="submit"
            value="Marcar"
            className="bg-cyan-700 hover:bg-cyan-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          />
        </div>
      </form>
    </div>
    <nav className="text-center mt-4">
      <Link to={"/nuevo-registro-usuario"} className="text-cyan-700 hover:text-cyan-900">Registrar nuevo Usuario</Link>
    </nav>
    <div className="text-center text-3xl mt-10 font-bold">Listado de Usuarios Activos</div>
    <div className="text-center">
		<ul className="list-disc list-inside">
			{user_list.map((user, index) => (
			<li key={index} className="text-gray-700 text-sm py-1">{user}</li>
			))}
		</ul>
    </div>
  </div>
  <ToastContainer />
</>

	);
}
