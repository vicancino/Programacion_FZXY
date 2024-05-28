import axios from "axios";

const API_AUTH = axios.create({
	baseURL: import.meta.env.VITE_API_AUTH_URL,
});

export default API_AUTH;
