import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useTranslation } from "react-i18next";
import { sign_in, sign_out } from "../../state/login/loginSlice";

function Home() {
	const { t } = useTranslation();

	// manage state of login
	const loginstate = useSelector((state: RootState) => state.login.value);

	console.log(loginstate);
	return (
		<>
			<div>{t("Home.Nav1") + t("Home.Nav1")}</div>

			<div></div>
			<div>
				<button>Login</button>
			</div>
			<div>
				<button>Logout</button>
			</div>
		</>
	);
}
export default Home;
