import { Card, CardContent, CardMedia, Typography, Button, Grid} from '@mui/material';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'; // Importa el ícono de hamburguesa
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from '../../../state/store';
import { useState } from 'react';

import logo from '../../../img/logo.jpg';
import hacking from '../../../img/hacking.jpg'
import data_science from '../../../img/data_science.jpg'
import gaming from '../../../img/gaming.jpg'

const Actividades = () => {
  const cards = [
    {
      id: 1,
      title: 'Hacking',
      description: 'Hackathon Principiantes',
      imageUrl: hacking,
    },
    {
      id: 2,
      title: 'Data Science',
      description: 'Aprende sobre Data Science',
      imageUrl: data_science, 
    },
    {
      id: 3,
      title: 'Gaming',
      description: 'Un espacio para jugar',
      imageUrl: gaming,
    },
  ];

  // Manage state of login
	const loginstate = useSelector((state: RootState) => state.login.value);
	console.log(loginstate);

	const navigate = useNavigate();

	const [isOpen, setIsOpen] = useState(false); // Estado para controlar la visibilidad del menú móvil

  // Función para alternar la visibilidad del menú móvil
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gradient-to-b from-cyan-700 to-cyan-950 min-h-screen px-6">
      {/*Navbar*/}
			<nav className="bg-transparent pt-6">
				<div className="w-auto mx-auto px-0 sm:px-6 lg:px-0">
					<div className="relative flex items-center justify-between h-10">
						{/* Logo o título */}
						<div className="flex-shrink-0 hidden sm:block">
							<button onClick={() => navigate("/")} className="hover:opacity-80">
								<img src={logo} alt="Logo" className="w-12 h-12 object-cover rounded-full shadow-lg" />
							</button>
						</div>

						{/* Menú principal para pantallas medianas y grandes */}
						<div className="hidden sm:block sm:ml-6">
							<div className="flex space-x-4">
								<button onClick={() => navigate("/contacto")} className="text-white hover:text-white relative px-3 py-2 rounded-md text-lg font-medium cursor-pointer group">
									Contacto
									<span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
								</button>
								<button onClick={() => navigate("/actividades")} className="text-white hover:text-white relative px-3 py-2 rounded-md text-lg font-medium cursor-pointer group">
									Actividades
									<span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
								</button>
								<button className="text-white hover:text-white relative px-3 py-2 rounded-md text-lg font-medium cursor-pointer group">
									Calendario
									<span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
								</button>
							</div>
						</div>

						{/* Botón de Login para pantallas medianas y grandes */}
						<div className="ml-auto hidden sm:block">
							<button onClick={() => navigate("/login")} className="text-white hover:text-white relative px-3 py-2 rounded-md text-lg font-medium cursor-pointer group">
								Login
								<span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
							</button>
						</div>

						{/* Icono de menú para móviles */}
						<button
							type="button"
							className="absolute inset-y-0 right-0 pr-4 flex items-center justify-center sm:hidden"
							onClick={toggleMenu}
						>
							<FaBars className="h-6 w-6 text-white" />
						</button>
					</div>

					{/* Menú desplegable para móviles */}
					<div className={`sm:hidden ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu">
						<div className="px-2 pt-2 pb-3 space-y-1">
							<button onClick={() => navigate("/login")} className="text-white hover:text-white block px-3 py-2 rounded-md text-lg font-medium cursor-pointer group">
								Login
								<span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
							</button>
							
							<button onClick={() => navigate("/contacto")} className="text-white hover:text-white block px-3 py-2 rounded-md text-lg font-medium cursor-pointer group">
								Contacto
								<span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
							</button>

							<button onClick={() => navigate("/actividades")} className="text-white hover:text-white block px-3 py-2 rounded-md text-lg font-medium cursor-pointer group">
								Actividades
								<span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
							</button>

							<button className="text-white hover:text-white block px-3 py-2 rounded-md text-lg font-medium cursor-pointer group">
								Calendario
								<span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
							</button>

						</div>
					</div>
				</div>
			</nav>

      <h1 className="text-center text-5xl font-bold text-white font-manrope py-8">
        Actividades
      </h1>

      <Grid container spacing={2}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.id}>
            <Card className="mx-auto rounded-lg shadow-lg overflow-hidden">
              <div className="relative w-full h-72">
                <CardMedia
                  component="img"
                  alt={card.title}
                  className="w-full h-full object-cover"
                  image={card.imageUrl}
                  title={card.title}
                />
              </div>
              <CardContent>
                <Typography variant="h5" component="div" className="text-gray-900 font-bold">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="text-gray-700">
                  {card.description}
                </Typography>
              </CardContent>
              <div className="p-2">
                <Button 
                size="small" 
                color="primary" 
                className="bg-blue-500 text-white hover:bg-blue-700"
                component={Link}
                to={`/actividad/${card.id}`}
                >
                  Learn More
                </Button>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Actividades;
