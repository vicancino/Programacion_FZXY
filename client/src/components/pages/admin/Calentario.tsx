import { useForm } from "react-hook-form";
import { BlockRegistrationFrom } from "../../../types";
import { useQuery } from "react-query";
import { listarBloques } from "../../../api/CalendarApi";
import { fechaHoy } from "../../../api/CalendarApi";

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

	const { data: listado} = useQuery({
		queryKey: ["Listado_bloques"],
		queryFn: listarBloques,
	});

	const { data: fecha} = useQuery({
		queryKey: ["Fecha_hoy"],
		queryFn: fechaHoy,
	});

    const hoy = fecha?.hoy??'Fecha no disponible';
    const dia = fecha?.dia??'Día no disponible';
    const semana = fecha?.semana??'Semana no disponible';

    const diasDeLaSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

	console.log(listado);

    const eventos: Block[] = [
        { Codigo: "1", Horario: "2024-07-10 08:00", Encargado: "Juan", Razon: "Reunión de equipo" },
        { Codigo: "2", Horario: "2024-07-11 09:00", Encargado: "Ana", Razon: "Presentación de proyecto" },
        // Agrega más eventos según sea necesario
    ];

    function agregarEventosAlCalendario(eventos: Block[]) {
        eventos.forEach(evento => {
            // Obtener día y hora del evento
            const diaSemana = fechaHora.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
            const hora = fechaHora.getHours();
            const minutos = fechaHora.getMinutes();

            // Seleccionar la celda correspondiente en el calendario
            const celdaCalendario = document.querySelectorAll('.grid-cols-7 > div')[diaSemana];

            // Crear elemento de evento
            const eventoElemento = document.createElement('div');
            eventoElemento.className = 'event';
            eventoElemento.innerHTML = `
                <p><strong>Horario:</strong> ${hora}:${minutos < 10 ? '0' + minutos : minutos}</p>
                <p><strong>Encargado:</strong> ${evento.Encargado}</p>
                <p><strong>Razón:</strong> ${evento.Razon}</p>
            `;

            // Añadir evento al calendario
            celdaCalendario.appendChild(eventoElemento);
        });
    }

	return (
		<>
    <div className="container mx-auto p-4 border mt-6">
    
        <div className="grid grid-cols-8 gap-4 mb-4">
            <div className="text-center font-bold text-cyan-700">{hoy}</div>
            <div className="text-center font-bold text-cyan-700">{semana[0]}</div>
            <div className="text-center font-bold">{semana[1]}</div>
            <div className="text-center font-bold">{semana[2]}</div>
            <div className="text-center font-bold">{semana[3]}</div>
            <div className="text-center font-bold">{semana[4]}</div>
            <div className="text-center font-bold">{semana[5]}</div>
            <div className="text-center font-bold">{semana[6]}</div>
        </div>


        <div className="grid grid-cols-8 gap-4">
     
            <div className="mx-auto">
                <div className="border-b py-5">08:30 - 09:55</div>
                <div className="border-b py-5">10:15 - 11:25</div>
                <div className="border-b py-5">11:45 - 12:55</div>
                <div className="border-b py-5">13:15 - 14:25</div>
                <div className="border-b py-5">14:00 - 15:10</div>
                <div className="border-b py-5">15:30 - 16:40</div>
                <div className="border-b py-5">17:00 - 18:10</div>
                <div className="border-b py-5">18:30 - 19:40</div>
            </div>
                <div className="border-b py-1"></div>
            <div >
                
            </div>
      
            <div >
                
            </div>
            <div >
                
            </div>
            <div >
                
            </div>
            <div >
                
            </div>
            <div >
                
            </div>

            <div >
                
            </div>

        </div>
    </div>
		</>
	);
}
