import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getUsers } from "../../../api/AsistApi";
import { ReactHTML, useEffect, useState } from "react";

export default function Entrada() {
	// Informacion de los usuarios registrados
	const { data = [] } = useQuery({
		queryKey: "Users",
		queryFn: getUsers,
	});

	// Lista de usuarios registrados

	const users_Names = data.map((items: [string, string]) => items[0]);
	const user_Emails = data.map((items: [string, string]) => items[1]);

	// Input
	// User
	const [findUser, setfindUser] = useState("");

	// Email
	const [findEmail, setfindEmail] = useState("");

	// Bottones Listas
	// Usuarios
	const handleNameList = (name: string) => {
		setfindUser(name);
		const matching_users = data.filter((items: [string, string]) =>
			items[0].toLocaleLowerCase().includes(name.toLocaleLowerCase())
		);
		const matching_emails = matching_users.map((items: [string, string]) => items[1]);
		// Seleccionamos el primero
		setfindEmail(matching_emails[0]);
	};

	// Emails
	const handleEmailList = (email: string) => {
		setfindEmail(email);
		const matching_users = data.filter((items: [string, string]) =>
			items[1].toLocaleLowerCase().includes(email.toLocaleLowerCase())
		);
		const matching_emails = matching_users.map((items: [string, string]) => items[0]);
		// Seleccionamos el primero
		setfindUser(matching_emails[0]);
	};

	// Generacion lista filtrada
	// Logica Usuarios
	const filtered_name_list = users_Names.filter((user: string) =>
		user.toLocaleLowerCase().includes(findUser.toLocaleLowerCase())
	);

	// Logica Email
	const filtered_email_list = user_Emails.filter((email: string) =>
		email.toLocaleLowerCase().includes(findEmail.toLocaleLowerCase())
	);

	// Vista
	// Usuarios
	const button_names_list = filtered_name_list.map((item: string, index: number) => (
		<li key={index}>
			<button onClick={() => handleNameList(item)}>{item}</button>
		</li>
	));
	// Emails
	const button_emails_list = filtered_email_list.map((item: string, index: number) => (
		<li key={index}>
			<button onClick={() => handleEmailList(item)}>{item}</button>
		</li>
	));

	return (
		<>
			<div>Bienvenido al Registro de Asistencia</div>
			<div>Marcar Asistencia</div>
			<div>
				<input
					type="text"
					value={findUser}
					onChange={(e) => setfindUser(e.target.value)}
					placeholder="Ingresar Nombre"
				/>

				{button_names_list}
			</div>
			<div>
				<input
					type="text"
					value={findEmail}
					onChange={(e) => setfindEmail(e.target.value)}
					placeholder="Ingresar Correo"
				/>
				<button>Marcar</button>
				{button_emails_list}
			</div>

			<nav>
				<Link to={"/nuevo-registro-usuario"}>Registrar nuevo Usuario</Link>
			</nav>
		</>
	);
}
