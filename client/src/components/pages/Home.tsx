import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useNavigate } from "react-router-dom";

function Home() {
	// Manage state of login
	const loginstate = useSelector((state: RootState) => state.login.value);
	console.log(loginstate);

	const navigate = useNavigate();

	return (
		<>
			<div>Home</div>
			<div>
				<button onClick={() => navigate("/login")}>Login</button>
			</div>
			{loginstate && <button onClick={() => navigate("/administracion")}>Administrar</button>}
		</>
	);
}
export default Home;
