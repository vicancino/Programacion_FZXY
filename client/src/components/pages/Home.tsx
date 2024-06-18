import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


function Home() {
	// Manage state of login
	const loginstate = useSelector((state: RootState) => state.login.value);
	console.log(loginstate);

	const navigate = useNavigate();

	return (
		<>
			{/*Navbar*/}
			<nav className="bg-gradient-to-b from-cyan-700 to-cyan-900 py-4">
				<div className="max-w-6x1 mx-auto px-0 sm:px-6 lg:px-8">
					<div className="relative flex items-center justify-between h-16">
						<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
							{/* Mobile menu button */}
							<button
								type="button"
								className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
								aria-controls="mobile-menu"
								aria-expanded="false"
							>
								<span className="sr-only">Open main menu</span>
								{/* Icon when menu is closed. */}
								{/* Menu open: "hidden", Menu closed: "block" */}
								<svg
									className="block h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
								{/* Icon when menu is open. */}
								{/* Menu open: "block", Menu closed: "hidden" */}
								<svg
									className="hidden h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>
						<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
							<div className="hidden sm:block sm:ml-6">
								<div className="flex space-x-4">
									{/* Navbar items */}
									<div className="text-white text-2xl font-extrabold px-3 py-2 rounded-md cursor-pointer">
										Logo
									</div>
									<button
										onClick={() => navigate("/contacto")}
										className="text-white hover:bg-cyan-800 px-3 py-2 rounded-md text-lg font-medium cursor-pointer">
										Contacto
									</button>
									<button 
										onClick={() => navigate("/actividades")}
										className="text-white hover:bg-cyan-800 px-3 py-2 rounded-md text-lg font-medium cursor-pointer">
										Actividades
									</button>
									<button className="text-white hover:bg-cyan-800 px-3 py-2 rounded-md text-lg font-medium cursor-pointer">
										Calendario
									</button>
								</div>
							</div>
						</div>
						<div className="ml-auto hidden sm:block">
							<button
								onClick={() => navigate("/login")}
								className="text-white hover:bg-cyan-800 px-3 py-2 rounded-md text-lg font-medium cursor-pointer"
							>
								Login
							</button>
						</div>
					</div>
				</div>

				{/* Mobile menu, toggle classes based on menu state. */}
				<div className="sm:hidden" id="mobile-menu">
					<div className="px-2 pt-2 pb-3 space-y-1">
						{/* Mobile menu items */}
						<div className="text-white hover:bg-cyan-800 block px-3 py-2 rounded-md text-lg font-medium cursor-pointer">
							Home
						</div>
						<button
							onClick={() => navigate("/login")}
							className="text-white hover:bg-cyan-800 block px-3 py-2 rounded-md text-lg font-medium cursor-pointer"
						>
							Login
						</button>
						<button className="text-white hover:bg-cyan-800 block px-3 py-2 rounded-md text-lg font-medium cursor-pointer">
							Contactos
						</button>
						<button className="text-white hover:bg-cyan-800 block px-3 py-2 rounded-md text-lg font-medium cursor-pointer">
							Actividades
						</button>
						<button className="text-white hover:bg-cyan-800 block px-3 py-2 rounded-md text-lg font-medium cursor-pointer">
							Calendario
						</button>
					</div>
				</div>
			</nav>

			{/*GetStarted */}
			<div className="bg-cover bg-center h-200 flex justify-center py-40">
				<div className="text-center bg-white bg-opacity-70 p-4 rounded">
					<h1 className="text-4xl font-extrabold text-cyan-800">Lorem ipsum dolor.</h1>
					<h1 className="text-4xl font-extrabold text-cyan-800">Lorem, ipsum.</h1>
					<h2 className="pt-5">Lorem ipsum dolor sit amet.</h2>
					<div className="flex justify-center">
						<button onClick={() => navigate("/login")} className="mt-4 p-2 text-2xl rounded-lg font-bold text-white bg-cyan-600 hover:bg-cyan-800 max-w-30">Get Started</button>
					</div>
				</div>
			</div>

			{/*Quienes somos-hacemos cards */}
			<div className="flex space-x-20 items-center justify-center">
				<Card sx={{ maxWidth: 345 }}>
					<CardActionArea>
						<CardMedia
							component="img"
							height="140"
							image="/static/images/cards/contemplative-reptile.jpg"
							alt="green iguana"
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="div">
								¿Quienes somos?
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Lizards are a widespread group of squamate reptiles, with over 6,000
								species, ranging across all continents except Antarctica
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
				<Card sx={{ maxWidth: 345 }}>
					<CardActionArea>
						<CardMedia
							component="img"
							height="140"
							image="/static/images/cards/contemplative-reptile.jpg"
							alt="green iguana"
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="div">
								¿Qué hacemos?
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Lizards are a widespread group of squamate reptiles, with over 6,000
								species, ranging across all continents except Antarctica
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			</div>

			{loginstate && <button onClick={() => navigate("/administracion")}>Administrar</button>}
		</>
	);
}
export default Home;