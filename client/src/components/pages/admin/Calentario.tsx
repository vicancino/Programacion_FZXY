import DiaSemana from "./DiaSemana";

export default function Calentario() {
	const lunes = [["Rebe"], ["Hans", "Rebe"], [], ["Parker"]];
	const martes = [["Rebe"], ["Hans", "Rebe"], [], ["Parker"]];
	const miercoles = [["Rebe"], ["Hans", "Rebe"], [], ["Parker"]];
	const jueves = [["Rebe"], ["Hans", "Rebe"], [], ["Parker"]];
	const viernes = [["Rebe"], ["Hans", "Rebe"], [], ["Parker"]];

	return (
		<>
			<div className="text-center text-4xl mb-5 font-bold">Calendario</div>
			<div className="grid grid-cols-5 gap-2  ml-2 mr-2">
				<DiaSemana horario={lunes} dia={"Lunes"}></DiaSemana>
				<DiaSemana horario={lunes} dia={"Martes"}></DiaSemana>
				<DiaSemana horario={lunes} dia={"Miercoles"}></DiaSemana>
				<DiaSemana horario={lunes} dia={"Jueves"}></DiaSemana>
				<DiaSemana horario={lunes} dia={"Viernes"}></DiaSemana>
			</div>
		</>
	);
}
