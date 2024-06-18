import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ActividadCardProps {
  title: string;
  description: string;
  learnMoreLink: string;
}

const ActividadCard: React.FC<ActividadCardProps> = ({ title, description, learnMoreLink }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-4 w-72">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700 mb-4">{description}</p>
      <button
        onClick={() => navigate(learnMoreLink)}
        className="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded"
      >
        Learn More
      </button>
    </div>
  );
};

export default ActividadCard;
