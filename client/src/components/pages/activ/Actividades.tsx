import React from 'react';
import ActividadCard from './ActividadCard';
import { useNavigate } from "react-router-dom";

const actividades = [
  {
    title: 'Actividad 1',
    description: 'Descripción de la Actividad 1.',
    learnMoreLink: '/actividad/1',
  },
  {
    title: 'Actividad 2',
    description: 'Descripción de la Actividad 2.',
    learnMoreLink: '/actividad/2',
  },
  {
    title: 'Actividad 3',
    description: 'Descripción de la Actividad 3.',
    learnMoreLink: '/actividad/3',
  },
  {
    title: 'Actividad 4',
    description: 'Descripción de la Actividad 4.',
    learnMoreLink: '/actividad/4',
  },
  {
    title: 'Actividad 5',
    description: 'Descripción de la Actividad 5.',
    learnMoreLink: '/actividad/5',
  },
  {
    title: 'Actividad 6',
    description: 'Descripción de la Actividad 6.',
    learnMoreLink: '/actividad/6',
  },
];

const Actividades: React.FC = () => {

  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-cyan-900 to-black h-full min-h-screen content-center items-center place-items-center justify-center p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {actividades.map((actividad, index) => (
          <ActividadCard
            key={index}
            title={actividad.title}
            description={actividad.description}
            learnMoreLink={actividad.learnMoreLink}
          />
        ))}
      </div>

      <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 p-2 text-2xl rounded-lg font-bold text-white bg-gray-600 hover:bg-gray-800"
            >
              Volver al Menú
      </button>
    </div>
  );
};

export default Actividades;
