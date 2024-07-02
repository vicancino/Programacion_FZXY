import { Router } from "express";
import { CalendarController } from "../controllers/CalendarController";

const routerCalendar = Router();

routerCalendar.post("/create-block", CalendarController.registarHora);

routerCalendar.post("/eliminate-block", CalendarController.eliminarHora);

routerCalendar.get("/list-blocks", CalendarController.listarHoras);

export default routerCalendar;
