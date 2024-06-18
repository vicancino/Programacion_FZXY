import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const ActividadDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-cyan-700 to-cyan-900 h-full min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Detalles de la Actividad {id}</h1>
        <p className="text-gray-700 mb-4">
          Aquí puedes agregar información detallada sobre la actividad {id}. Puedes usar contenido
          dinámico según el ID de la actividad para mostrar diferentes detalles.
        </p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mt-4 p-2 text-2xl rounded-lg font-bold text-white bg-gray-600 hover:bg-gray-800"
        >
          Volver al Menú
        </button>
      </div>
    </div>
  );
};

export default ActividadDetail;
