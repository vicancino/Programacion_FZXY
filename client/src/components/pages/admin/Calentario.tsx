import { useForm } from "react-hook-form";
import { BlockRegistrationFrom } from "../../../types";
import { useQuery } from "react-query";
import { listarBloques } from "../../../api/CalendarApi";
import { fechaHoy } from "../../../api/CalendarApi";
import { useEffect } from "react";

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
    Dia_Id: number;
    Hora_Id: number;
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

	useEffect(() => {
        if (listado) {
          agregarEventosAlCalendario(eventos);
        }
      }, [listado]);

    const eventos: Block[] = [
        { Codigo: "1", Horario: "08:45 - 09:55", Encargado: "Juan", Razon: "Reunión de equipo", Dia_Id: 1, Hora_Id: 1 },
        { Codigo: "2", Horario: "10:15 - 11:25", Encargado: "Ana", Razon: "Presentación de proyecto", Dia_Id: 2, Hora_Id:2 },
        // Agrega más eventos según sea necesario
    ];
      

    function agregarEventosAlCalendario(eventos: Block[]) {

        eventos.forEach((evento) => {
            // Obtener día y hora del evento
            const diaSemana = evento.Dia_Id;
            const hora = evento.Horario;
            const horaDia = evento.Hora_Id;

            const idCelda = `celda-${diaSemana}-${horaDia}`;
            const celda = document.getElementById(idCelda);

            // Seleccionar la celda correspondiente en el calendario

            // Crear elemento de evento
            if (celda) {
                celda.innerHTML = `
                  <div class="event bg-blue-100 p-2 mb-1 rounded">
                    <p><strong>Encargado:</strong> ${evento.Encargado}</p>
                    <p><strong>Razón:</strong> ${evento.Razon}</p>
                  </div>
                `;
              }

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
                
            {Array(7).fill(null).map((_, dia) => (
          <div key={dia} className="mx-auto">
            {Array(8).fill(null).map((_, hora) => (
              <div
                key={`${dia}-${hora}`}
                id={`celda-${dia + 1}-${hora}`}
                className="py-5"
              ></div>
            ))}
          </div>
        ))}
        </div>
    </div>
		</>
	);
}
