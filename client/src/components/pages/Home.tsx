import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useNavigate } from "react-router-dom";
import { FaInstagram } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa'; // Importa el ícono de hamburguesa

import logo from '../../img/logo.jpg';
import fondo_get_started2 from '../../img/fondo_get_started2.jpg'

function Home() {
	// Manage state of login
	const loginstate = useSelector((state: RootState) => state.login.value);
	console.log(loginstate);

	const navigate = useNavigate();

	const [isHovered, setIsHovered] = useState(false);

	const [isOpen, setIsOpen] = useState(false); // Estado para controlar la visibilidad del menú móvil

  // Función para alternar la visibilidad del menú móvil
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

	return (
		<>
			<div className="relative bg-cover bg-center justify-center" style={{ backgroundImage: `url(${fondo_get_started2})`}}>
				{/*Navbar*/}
				<nav className="bg-transparent py-6">
					<div className="w-auto mx-auto px-0 sm:px-6 lg:px-8">
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

				{/* Get Started */}
				<div className="relative bg-cover bg-center h-200 flex justify-center py-40">
					
					<div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-100"></div>
					<div className="relative text-center bg-opacity-70 p-4 rounded">
						<h1 className="text-5xl font-extrabold bg-gradient-to-r from-fuchsia-600 to-orange-300 bg-clip-text text-transparent font-manrope">Laboratorio de informática</h1>
						<h1 className="text-4xl font-extrabold bg-gradient-to-r from-fuchsia-600 to-orange-300 bg-clip-text text-transparent font-manrope">Universidad Adolfo Ibañez</h1>
						<h2 className="pt-5 text-white font-manrope">Campus Viña del Mar</h2>
						<div className="flex justify-center">
							<button
								onClick={() => navigate("/login")}
								onMouseEnter={() => setIsHovered(true)}
								onMouseLeave={() => setIsHovered(false)}
								className="relative mt-4 p-2 text-2xl rounded-lg font-bold bg-gradient-to-r from-fuchsia-600 to-orange-300 bg-clip-text text-transparent font-manrope overflow-hidden"
							>
								Get Started
								<span
									className={`absolute inset-0 transition-all duration-300 ${isHovered ? 'transform scale-x-100' : 'transform scale-x-0'}`}
									style={{
										borderBottom: '2px solid white',
										borderTop: '2px solid white',
										borderLeft: '2px solid white',
										borderRight: '2px solid white',
										borderRadius: '10px',
										transformOrigin: 'left'
									}}
								></span>
							</button>
						</div>
					</div>
				</div>
			</div>
			
			<div className="bg-black pt-16">
				{/* Quiénes somos */}
				<div className="bg-gradient-to-b from-blue-950 to-sky-900 text-white md:p-12 my-6 md:my-0 mx-6 md:mx-28 flex md:flex-row items-start rounded-2xl">
					<div className="w-full md:w-1/3 flex flex-col justify-start items-start mb-6 md:mb-0">
						<h2 className="text-3xl font-bold bg-gradient-to-r from-fuchsia-600 to-orange-300 bg-clip-text text-transparent font-manrope">¿Quiénes somos?</h2>
					</div>
					<div className="w-full md:w-2/3 pr-0 md:pr-14">
						<p className="text-lg font-manrope font-extralight">
							Somos el laboratorio de informática de la Universidad Adolfo Ibañez en el campus de Viña del Mar. Nuestro objetivo es brindar a los estudiantes las mejores herramientas y recursos para su desarrollo académico y profesional en el ámbito de la tecnología y la informática.
						</p>
					</div>
				</div>

				{/* Qué hacemos */}
				<div className="bg-gradient-to-b from-black to-cyan-950 text-white py-28 px-6 md:px-24 mx-0 md:mx-6 rounded-lg flex flex-col md:flex-row items-start justify-center">
					{/* Imagen a la izquierda */}
					<div className="w-full md:w-1/3 pr-0 md:pr-8 mb-6 md:mb-0">
						<img src="src/img/que_hacemos_img.png" alt="que_hacemos" className="rounded-lg shadow-lg" />
					</div>

					{/* Texto a la derecha */}
					<div className="w-full md:w-2/3">
						<div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-orange-400 bg-clip-text text-transparent mb-8">
							¿Qué hacemos?
						</div>
						<p className="text-lg">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a nulla ac dui interdum congue. Integer ac ex eu arcu dignissim congue non ut tellus. Vivamus nec dolor ac lorem ullamcorper rutrum nec nec lorem. Proin hendrerit felis a elit sagittis, a consectetur orci posuere. Donec non magna eget elit vehicula interdum.
						</p>
						<p className="text-lg mt-4">
							Fusce sed lectus est. Nam gravida urna vitae ultricies mollis. Sed aliquam bibendum est, et laoreet nisl semper eget. Vivamus condimentum libero vitae lorem mollis, a feugiat velit ultrices. Integer ut justo varius, ullamcorper lacus non, sagittis metus. Nullam ut turpis vel quam fringilla eleifend. Vivamus at lacinia magna.
						</p>
					</div>
				</div>

				{/* Footer */}
				<footer className="bg-black text-white py-8 px-4">
					<div className="flex justify-center space-x-6">
						{/* Ícono de Instagram */}
						<a href="https://www.instagram.com/civil_informatica_uai/" target="_blank" rel="noopener noreferrer">
							<FaInstagram className="text-3xl hover:text-gray-400 transition-colors duration-300" />
						</a>
						
						{/* Ícono de ubicación */}
						<a href="https://maps.google.com/?q=Universidad Adolfo Ibáñez - Campus Viña del Mar" target="_blank" rel="noopener noreferrer">
							<FiMapPin className="text-3xl hover:text-gray-400 transition-colors duration-300" />
						</a>
					</div>
					
					{/* Texto de ubicación */}
					<p className="text-center mt-4">Universidad Adolfo Ibáñez, Campus Viña del Mar</p>
				</footer>
			</div>

			{loginstate && <button onClick={() => navigate("/administracion")}>Administrar</button>}
		</>
	);
}
export default Home;