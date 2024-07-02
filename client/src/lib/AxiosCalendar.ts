import axios from "axios";

const API_CALENDAR = axios.create({
	baseURL: import.meta.env.VITE_API_CALENDAR_URL,
});

export default API_CALENDAR;
