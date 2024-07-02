import { useForm } from "react-hook-form";
import { BlockRegistrationFrom } from "../../../types";
import { useQuery } from "react-query";
import { listarBloques } from "../../../api/CalendarApi";

interface Day {
	Nombre_Dia: String;
	Bloque: [
		{
			Codigo: String;
			Horario: String;
			Encargado: String;
			Razon: String;
		}
	];
}

interface Block {
	Codigo: String;
	Horario: String;
	Encargado: String;
	Razon: String;
}

export default function Calentario() {
	const formCrearBloque = useForm<BlockRegistrationFrom>();

	const { data } = useQuery({
		queryKey: ["Listado_bloques"],
		queryFn: listarBloques,
	});

	console.log(data);

	return (
		<>
			<div className="text-center text-4xl mb-5 font-bold">Calendario</div>
			<div className="grid grid-cols-5 gap-2  ml-2 mr-2"></div>
			<div>Lunes</div>
		</>
	);
}
