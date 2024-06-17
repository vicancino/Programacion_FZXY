import axios from "axios";

const API_ASIST = axios.create({
	baseURL: import.meta.env.VITE_API_ASIST_URL,
});

export default API_ASIST;
