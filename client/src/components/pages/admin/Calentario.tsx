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
          agregarEventosAlCalendario(listado);
        }
      }, [listado]);


    function agregarEventosAlCalendario(listado) {

        listado.forEach((evento) => {
            // Obtener día y hora del evento
             
            const idCelda = `celda-${evento.Bloque[0].Dia_Id}-${evento.Bloque[0].Hora_Id}`;
            const celda = document.getElementById(idCelda);

            // Seleccionar la celda correspondiente en el calendario

            // Crear elemento de evento
            if (celda) {
                celda.innerHTML = `
                  <div class="event bg-blue-100 p-1 mb-1 rounded">
                    <p class= "text-xs" ><strong>Encargado:</strong> ${evento.Bloque[0].Encargado}</p>
                    <p class= "text-xs" ><strong>Razón:</strong> ${evento.Bloque[0].Razon}</p>
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
                <div className="border-b py-6 w-[120px] h-[60px] flex items-center justify-center">08:30 - 09:55</div>
                <div className="border-b py-6 w-[120px] h-[60px] flex items-center justify-center">10:15 - 11:25</div>
                <div className="border-b py-6 w-[120px] h-[60px] flex items-center justify-center">11:45 - 12:55</div>
                <div className="border-b py-6 w-[120px] h-[60px] flex items-center justify-center">13:15 - 14:25</div>
                <div className="border-b py-6 w-[120px] h-[60px] flex items-center justify-center">14:00 - 15:10</div>
                <div className="border-b py-6 w-[120px] h-[60px] flex items-center justify-center">15:30 - 16:40</div>
                <div className="border-b py-6 w-[120px] h-[60px] flex items-center justify-center">17:00 - 18:10</div>
                <div className="border-b py-6 w-[120px] h-[60px] flex items-center justify-center">18:30 - 19:40</div>
            </div>
                
            {Array(7).fill(null).map((_, dia) => (
          <div key={dia} className="mx-auto">
            {Array(8).fill(null).map((_, hora) => (
              <div
                key={`${dia}-${hora}`}
                id={`celda-${dia + 1}-${hora}`}
                className="py-6 w-[120px] h-[60px] flex items-center justify-center overflow-hidden"
              >  </div>
            ))}
          </div>
        ))}
        </div>
    </div>
		</>
	);
}
