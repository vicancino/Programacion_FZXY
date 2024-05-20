import { useTranslation } from "react-i18next";

function Home() {
	const { t } = useTranslation();

	return <div>{t("Home.Nav1") + t("Home.Nav1")}</div>;
}

export default Home;
