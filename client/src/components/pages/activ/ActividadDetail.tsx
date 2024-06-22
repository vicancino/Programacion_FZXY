import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import hacking from '../../../img/hacking.jpg'
import data_science from '../../../img/data_science.jpg'
import gaming from '../../../img/gaming.jpg'

const actividadData = {
  1: { title: 'Hacking', description: 'Hackathon Principiantes', imageUrl: hacking },
  2: { title: 'Data Scince', description: 'Aprende sobre data science', imageUrl: data_science },
  3: { title: 'Gaming', description: 'Un espacio para jugar', imageUrl: gaming },
};

const ActividadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const activity = actividadData[id];

  if (!activity) {
    return <div>Activity not found</div>;
  }

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${activity.imageUrl})` }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative p-4 sm:p-8 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-5xl font-bold text-white font-manrope pb-4">
          {activity.title}
        </h1>
        <p className="mt-4 text-xl text-white">{activity.description}</p>
        <div className="mt-4">
          <Button
            size="small"
            color="primary"
            className="bg-blue-500 text-white hover:bg-blue-700"
            onClick={() => navigate('/actividades')}
          >
            Volver a Actividades
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActividadDetail