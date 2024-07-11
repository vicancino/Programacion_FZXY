import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AdminLayout() {
	const navigate = useNavigate();
	return (
		<>
			<div className="flex h-screen w-screen">
				<div className="bg-cyan-700 p-2 w-[300px] text-center">
					<div className="font-bold text-2xl text-gray-200">Sidebar</div>
					<div className="mt-2 font-bold text-xl text-gray-200 hover:bg-slate-600 rounded-lg">
						<button onClick={() => navigate("/")}>Home</button>
					</div>
					<div className="mt-2 font-bold text-xl text-gray-200 hover:bg-slate-600 rounded-lg">
						<button onClick={() => navigate("/asistencia")}>Asistencia</button>
					</div>
					<div className="mt-2 font-bold text-xl text-gray-200 hover:bg-slate-600 rounded-lg">
						<button onClick={() => navigate("/register")}>Nuevo Usuario</button>
					</div>
					<div className="mt-2 font-bold text-xl text-gray-200 hover:bg-slate-600 rounded-lg">
						<button onClick={() => navigate("/calendario")}>Calendario</button>
					</div>
				</div>
				<div className="flex-1">
					<Outlet />
				</div>
			</div>
		</>
	);
}

export default AdminLayout;
