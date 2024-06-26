import { Router } from "express";
import { AsistController } from "../controllers/AsistControllers";

const routerAsist = Router();

routerAsist.get("/users", AsistController.getUsers);

routerAsist.post("/new-user", AsistController.newUser);

routerAsist.post("/register-asist", AsistController.registerAsist);

export default routerAsist;
