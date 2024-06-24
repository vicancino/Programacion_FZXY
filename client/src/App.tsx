import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import ConfirmAccount from "./components/pages/auth/ConfirmAccount";
import RequestNewCode from "./components/pages/auth/RequestNewCode";
import "react-toastify/dist/ReactToastify.css";
import NewPasswordView from "./components/pages/auth/NewPasswordView";
import ForgotPassword from "./components/pages/auth/ForgotPassoword";
import Asistencia from "./components/pages/asist/Asistencia";
import NuevoUsuario from "./components/pages/asist/NuevoUsuario";
import Administracion from "./components/pages/asist/Administracion";
import Contacto from "./components/pages/cont/Contacto";
import Actividades from "./components/pages/activ/Actividades";
import ActividadDetail from "./components/pages/activ/ActividadDetail";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="*" element={<Navigate replace to="/" />}></Route>
					<Route path="/login" element={<Login />}></Route>
					<Route path="/register" element={<Register />}></Route>
					<Route path="/confirm-account" element={<ConfirmAccount />}></Route>
					<Route path="/request-code" element={<RequestNewCode />}></Route>
					<Route path="/forgot-password" element={<ForgotPassword />}></Route>
					<Route path="/new-password" element={<NewPasswordView />}></Route>

					<Route path="/asistencia" element={<Asistencia />}></Route>
					<Route path="/nuevo-registro-persona" element={<NuevoUsuario />}></Route>
					<Route path="/administracion" element={<Administracion />}></Route>

					<Route path="/contacto" element={<Contacto/>}></Route>
					
					<Route path="/actividades" element={<Actividades/>}></Route>
					<Route path="/actividad/:id" element={<ActividadDetail />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;