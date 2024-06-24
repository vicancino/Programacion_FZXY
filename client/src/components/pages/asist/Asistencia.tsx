import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getUsers } from "../../../api/AsistApi";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


export default function Entrada() {
	const handleButton = () => {};

	const { data } = useQuery({
		queryKey: "Users",
		queryFn: getUsers,
	});

	const navigate = useNavigate();

	//console.log(data);

	/**
	const lista = lista_usuarios.map((item, index) => (
		<li key={index}>
			{item} <button onClick={handleButton}>Eliminar</button>
		</li>
     
	));
    */

	const { t } = useTranslation();

	return (
		<>
			<div className="bg-gradient-to-b from-cyan-900 to-black h-full min-h-screen flex items-center justify-center">
				<div className="bg-white w-full max-w-md px-6 py-8 rounded-lg mx-10">
					<h1 className="text-4xl font-extrabold text-center mb-6">{t('registro')}</h1>

					<div className="text-3xl text-center mb-6">{t('lista')}</div>

					<nav className="text-center flex justify-between mt-6 space-x-4">
						<Link
							to={"/nuevo-registro-persona"}
							className="inline-block p-2 text-2xl rounded-lg font-bold text-white bg-cyan-600 hover:bg-cyan-800"
						>
							{t('registrar')}
						</Link>
						<button
							type="button"
							onClick={() => navigate('/')}
							className="p-2 text-2xl rounded-lg font-bold text-white bg-gray-600 hover:bg-gray-800"
							style={{ minWidth: '200px' }} // Ajusta el ancho mínimo según sea necesario
						>
							{t('volver_menu')}
						</button>
					</nav>

				</div>
			</div>

		</>
	);
}
