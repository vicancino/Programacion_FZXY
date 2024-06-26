import { Router } from "express";
import { AsistController } from "../controllers/AsistControllers";

const routerAsist = Router();

routerAsist.get("/users", AsistController.getUsers);

routerAsist.post("/new-user", AsistController.newUser);

routerAsist.post("/register-asist", AsistController.registerAsist);

routerAsist.post("/register-exit", AsistController.registerExit);

routerAsist.get("/actives", AsistController.getActives);

export default routerAsist;
