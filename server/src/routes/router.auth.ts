import { Router } from "express";
import { AuthController } from "../controllers/AuthControllers";
import { body } from "express-validator";
import { handleInputErros } from "../middleware";
import { param } from "express-validator";

const routerAuth = Router();

routerAuth.post(
	"/create-account",
	body("name").notEmpty().withMessage("El nombre no puede ir vacio"),
	body("password").isLength({ min: 8 }).withMessage("El password es muy corto, minimo 8 caracteres"),
	body("password_confirmation").custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error("Los Password no son iguales");
		}
		return true;
	}),
	body("email").isEmail().withMessage("Correo no valido"),
	handleInputErros,
	AuthController.createAccount
);

routerAuth.post(
	"/confirm-account",
	body("token").notEmpty().withMessage("El Token no puede ir vacio"),
	handleInputErros,
	AuthController.confirmAccount
);

routerAuth.post(
	"/login",
	body("email").isEmail().withMessage("Email no valido"),
	body("password").notEmpty().withMessage("La contrasena no puede estar vacia"),
	handleInputErros,
	AuthController.login
);

routerAuth.post(
	"/request-code",
	body("email").isEmail().withMessage("E-mail no valido"),
	handleInputErros,
	AuthController.requestConfirmationCode
);

routerAuth.post(
	"/forgot-password",
	body("email").isEmail().withMessage("E-mail no valido"),
	handleInputErros,
	AuthController.forgotPassword
);

routerAuth.post(
	"/validate-token",
	body("token").notEmpty().withMessage("El Token no puede ir vacio"),
	handleInputErros,
	AuthController.validateToken
);

routerAuth.post(
	"/update-password/:token",
	param("token").isNumeric().withMessage("Token no valido"),
	body("name").notEmpty().withMessage("El nombre no puede ir vacio"),
	body("password").isLength({ min: 8 }).withMessage("El password es muy corto, minimo 8 caracteres"),
	body("password_confirmation").custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error("Los Password no son iguales");
		}
		return true;
	}),
	handleInputErros,
	AuthController.updatePasswordWithToken
);

export default routerAuth;
