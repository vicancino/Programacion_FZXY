import { useNavigate } from "react-router-dom";

export default function Administracion() {
	const navigate = useNavigate();

	return (
		<>
			<div>Administracion</div>
			<div>
				<button
					onClick={() => {
						navigate("/asistencia");
					}}
				>
					Registrar Asistencia
				</button>
			</div>
		</>
	);
}
