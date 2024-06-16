import { Router } from "express";
import { AuthController } from "../controllers/AuthControllers";
import { body } from "express-validator";
import { handleInputErros } from "../middleware";
import { param } from "express-validator";


/**
 * @swagger
 * components:
 *   schemas:
 *     create_acount:
 *       type: object
 *       required:
 *         - name
 *         - password
 *         - password_confirmation
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           description: insert your username
 *         password:
 *           type: string
 *           description: insert your password
 *         password_confirmation:
 *           type: string
 *           description: repeat your password
 *         email:
 *           type: string
 *           description: your email
 *       example:
 *         name: Juan Perez
 *         password: 123123
 *         password_confirmation: 123123
 *         email: juanperez@gmail.com
 */



/**
 * @swagger
 * tags:
 *   name: Register a new user
 *   description: Register a new user to the db
 * /router.auth.ts:
 *   post:
 *     summary: add a user to the register
 *     tags: [USER]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/create_acount'
 *     responses:
 *       200:
 *         description: Usuario registrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/create_acount'
 *       500:
 *         description: Some server error
 *
 */



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
