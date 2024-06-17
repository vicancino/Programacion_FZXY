import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getUsers } from "../../../api/AsistApi";
import { ReactHTML, useState } from "react";

export default function Entrada() {
	// Informacion de los usuarios registrados
	const { data = [] } = useQuery({
		queryKey: "Users",
		queryFn: getUsers,
	});

	// Lista de usuarios registrados
	const lista_usuarios = data.map((items: [string, string], index: number) => <li key={index}>{items[0]}</li>);

	const usersNames_list = data.map((items: [string, string]) => items[0]);
	const userEmails_list = data.map((items: [string, string]) => items[1]);

	const [users, setUsers] = useState(usersNames_list);
	const [usersE, setUsersE] = useState(userEmails_list);

	// Variable para registrar asistencia de un nuevo usuario
	const [NombreUsuario, setNombreUsuario] = useState("");
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNombreUsuario(e.target.value);
		console.log(NombreUsuario);
		if (NombreUsuario === "") {
			setUsers(usersNames_list);
			return;
		}

		const filteredUsers = usersNames_list.filter((user: string) =>
			user.toLowerCase().includes(NombreUsuario.toLocaleLowerCase())
		);
		setUsers(filteredUsers);

		console.log(users);
	};

	return (
		<>
			<div>Bienvenido al Registro de Asistencia</div>
			<div>Marcar Asistencia</div>
			<div>
				<input type="text" placeholder="Buscar usuarios" value={NombreUsuario} onChange={handleInputChange} />
				<button>Marcar</button>
			</div>
			<div>Lista de Usuarios Presentes</div>
			<div>Lista de Usuarios</div>
			{lista_usuarios}
			<nav>
				<Link to={"/nuevo-registro-usuario"}>Registrar nuevo Usuario</Link>
			</nav>
		</>
	);
}
