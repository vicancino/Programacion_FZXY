import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getUsers } from "../../../api/AsistApi";

export default function Entrada() {
	const handleButton = () => {};

	const { data } = useQuery({
		queryKey: "Users",
		queryFn: getUsers,
	});

	//console.log(data);

	/**
	const lista = lista_usuarios.map((item, index) => (
		<li key={index}>
			{item} <button onClick={handleButton}>Eliminar</button>
		</li>
     
	));
    */

	return (
		<>
			<div>Bienvenido al Registro de Asistencia</div>
			<div>Lista de Usuarios Presentes</div>
			<nav>
				<Link to={"/nuevo-registro-persona"}>Registrar nuevo Asistente</Link>
			</nav>
		</>
	);
}
