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
 *     confirm_acount:
 *       type: object
 *       required:
 *         - token
 *       properties:
 *         tokken:
 *           type: number
 *           description: Validation token
 *       example:
 *         token: 123456789
 *     login:
 *       type: object
 *       required:
 *         - password
 *         - email
 *       properties:
 *         password:
 *           type: string
 *           description: insert your password
 *         email:
 *           type: string
 *           description: your email
 *       example:
 *         password: 123123
 *         email: juanperez@gmail.com
 *     request-code:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           description: your email
 *       example:
 *         email: juanperez@gmail.com
 *     forgot-password:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           description: your email
 *       example:
 *         email: juanperez@gmail.com
 *     update_password:
 *       type: object
 *       required:
 *         - name
 *         - password
 *         - password-confirmation
 *       properties:
 *         name:
 *           type: string
 *           description: your name
 *         password:
 *           type: string
 *           description: insert your password
 *         password_confirmation:
 *           type: string
 *           description: repeat your password
 *       example:
 *         name: Juan Perez
 *         password: 123123
 *         password_confirmation: 123123
 */







const routerAuth = Router();

/**
 * @swagger
 * tags:
 *   name: Register a new user
 *   description: Register a new user to the db
 * /auth/create-account:
 *   post:
 *     summary: add a user to the register
 *     tags: [Register a new user]
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
 *               type: string
 *               example: 'Cuenta creada, revisa tu email para confirmarla'
 *       500:
 *         description: Some server error
 *
 */

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

/**
 * @swagger
 * tags:
 *   name: Verify token
 *   description: Verify token
 * /auth/confirm-account:
 *   post:
 *     summary: Confirm an account via Token
 *     tags: [Verify token]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/confirm_acount'
 *     responses:
 *       200:
 *         description: Usuario confirmado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Cuenta Confirmada'
 *       500:
 *         description: Some server error
 *
 */


routerAuth.post(
	"/confirm-account",
	body("token").notEmpty().withMessage("El Token no puede ir vacio"),
	handleInputErros,
	AuthController.confirmAccount
);


/**
 * @swagger
 * tags:
 *   name: Login a user to the website
 *   description: Link the register of a user to the current sesion
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Login a user to the website]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/login'
 *     responses:
 *       200:
 *         description: Usuario registrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/confirm_acount'
 *       500:
 *         description: Some server error
 *
 */
routerAuth.post(
	"/login",
	body("email").isEmail().withMessage("Email no valido"),
	body("password").notEmpty().withMessage("La contrasena no puede estar vacia"),
	handleInputErros,
	AuthController.login
);

/**
 * @swagger
 * tags:
 *   name: Request recuperation code
 *   description: Reset the confirmation token
 * /auth/request-code:
 *   post:
 *     summary: Reset token
 *     tags: [Request recuperation code]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/request-code'
 *     responses:
 *       200:
 *         description: Usuario no registrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: 'Se envio un nuevo token, revise su correo'
 *       500:
 *         description: Some server error
 *
 */

routerAuth.post(
	"/request-code",
	body("email").isEmail().withMessage("E-mail no valido"),
	handleInputErros,
	AuthController.requestConfirmationCode
);

/**
 * @swagger
 * tags:
 *   name: Forgot Password
 *   description: Sends an email to the users mail account to reset the password
 * /auth/forgot-password:
 *   post:
 *     summary: Recover
 *     tags: [Forgot Password]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/forgot-password'
 *     responses:
 *       200:
 *         description: Usuario no registrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: 'Revisa tu email y sigue las instrucciones para reestablecer tu contrasena'
 *       500:
 *         description: Some server error
 *
 */

routerAuth.post(
	"/forgot-password",
	body("email").isEmail().withMessage("E-mail no valido"),
	handleInputErros,
	AuthController.forgotPassword
);

/**
 * @swagger
 * tags:
 *   name: Validate token to reset password
 *   description: Validate the introduced token, matching with the registered one on the db 
 * /auth/validate-token:
 *   post:
 *     summary: Validate token to reset password
 *     tags: [Validate token to reset password]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/confirm_acount'
 *     responses:
 *       200:
 *         description: Usuario no registrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Token Valido, Define tu nuevo password'
 *       500:
 *         description: Some server error
 *
 */


routerAuth.post(
	"/validate-token",
	body("token").notEmpty().withMessage("El Token no puede ir vacio"),
	handleInputErros,
	AuthController.validateToken
);

/**
 * @swagger
 * tags:
 *   name: Update password
 *   description: Update password
 * /auth/update-password/:token:
 *   post:
 *     summary: Update password
 *     tags: [Update password]
 *     parameters:
 *      - token: token
 *        in: query
 *        description: validation token
 *        required: true
 *        schema:
 *         type: integer
 *         example: 123456789
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/update_password'
 *     responses:
 *       200:
 *         description: Usuario no registrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Contrasena cambiada correctamente'
 *       500:
 *         description: Some server error
 *
 */

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

/**
 * @swagger
 * tags:
 *   name: Test API
 *   description: Just an endpoint to test if the testing is working
 * /auth/test:
 *   get:
 *     summary: Test 
 *     tags: [Test API]
 *     responses:
 *       200:
 *         description: .
 *         content:
 *           application/json:
 *             schema:
 *               
 *       500:
 *         description: Some server error
 *
 */

routerAuth.get(
	"/test",
	(req, res) => {res.json({});}
);



/**
 * @swagger
 * tags:
 *   name: Clean Test
 *   description: Mean to delete all the register created for the testing process
 * /auth/test-cleanup:
 *   delete:
 *     summary: clean test
 *     tags: [Clean Test]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: 'juanperez@gmail.com'
 *     responses:
 *       200:
 *         description: .
 *         content:
 *           application/json:
 *             schema:
 *               
 *       500:
 *         description: Some server error
 *
 */
routerAuth.delete(
	"/test-cleanup",
	body("email").isEmail().withMessage("E-mail no valido"),
	AuthController.testClean
);

/**
 * @swagger
 * tags:
 *   name: Get testing tokens
 *   description: This ment to get the required token for the testing process
 * /auth/test-token:
 *   post:
 *     summary: testing token
 *     tags: [Get testing tokens]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: 'juanperez@gmail.com'
 *     responses:
 *       200:
 *         description: .
 *         content:
 *           application/json:
 *             schema:
 *               
 *       500:
 *         description: Some server error
 *
 */

routerAuth.post(
	"/test-token",
	body("email").isEmail().withMessage("E-mail no valido"),
	AuthController.testToken
)

export default routerAuth;
