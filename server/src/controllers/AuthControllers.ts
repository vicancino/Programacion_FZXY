import type { Request, Response } from "express";
import User from "../models/Users.model";
import bcrypt from "bcrypt";
import Token from "../models/Token.model";
import { generate6digitToken } from "../utils/token";
import { transporter } from "../config/nodemailer";
import { checkPassword } from "../utils/auth";

export class AuthController {
	// Metodo Para la Creacion de una Cuenta (POST)
	static createAccount = async (req: Request, res: Response) => {
		try {
			console.log("Creando cuenta con", req.body);
			const user = new User();
			user.User_Name = req.body.name;
			user.User_Email = req.body.email;
			user.User_Password = req.body.password;

			// Prevenir diplicados
			const email = req.body.email;
			const userExists = await User.findOne({
				where: { User_Email: email },
			});
			if (userExists) {
				const error = new Error("El usuario ya esta registrado");
				return res.status(409).json({ error: error.message });
			}

			// Hash Password
			const salt = await bcrypt.genSalt(10);
			user.User_Password = await bcrypt.hash(req.body.password, salt);

			await user.save();

			// Generar token
			const token = new Token();
			token.Token_Token = generate6digitToken();
			token.Token_UserID = user.User_ID;

			// Usar este tipo de fechas puede causar errores
			token.Token_Expires = Date.now() + 600000;

			// Enviar Email
			await transporter.sendMail({
				from: "FZ-XYZ",
				to: user.User_Email,
				subject: "Confirma tu cuenta",
				text: "Hola",
				html: `<p>Hola: ${user.User_Name} tu codigo de verificacion es ${token.Token_Token}<p>`,
			});

			await Promise.allSettled([user.save(), token.save()]);

			res.send("Cuenta creada, revisa tu email para confirmarla");
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: "Hubo un error" });
		}
	};
	// Metodo Para la Confirmacion de una Cuenta (POST)
	static confirmAccount = async (req: Request, res: Response) => {
		try {
			const { token } = req.body;
			const tokenExist = await Token.findOne({
				where: { Token_Token: token },
			});

			if (!tokenExist) {
				const error = new Error("Token no valido");
				return res.status(404).json({ error: error.message });
			}

			if (tokenExist.Token_Expires < Date.now()) {
				const error = new Error("el Token expiro");
				return res.status(404).json({ error: error.message });
			}

			const user = await User.findOne({
				where: { User_ID: tokenExist.Token_UserID },
			});

			user.User_Confirm = true;

			await Promise.allSettled([user.save(), Token.destroy({ where: { Token_UserID: user.User_ID } })]);
			res.send({ message: "Cuenta Confirmada" });
		} catch (error) {
			res.json({ error: error.message });
		}
	};
	// Metodo para iniciar Sesion (POST)
	static login = async (req: Request, res: Response) => {
		try {
			const { email, password } = req.body;
			const user = await User.findOne({ where: { User_Email: email } });

			// Si el usuario Existe
			if (!user) {
				const error = new Error("Usuario no encontrado");
				return res.status(404).json({ error: error.message });
			}

			// Si el usuario no se ha confirmado
			if (!user.User_Confirm) {
				// Creamos un nuevo token
				const token = new Token();
				token.Token_UserID = user.User_ID;
				token.Token_Token = generate6digitToken();
				await token.save();

				// Enviamos el nuevo token al correo
				await transporter.sendMail({
					from: "FZ-XYZ",
					to: user.User_Email,
					subject: "Confirma tu cuenta",
					text: "Hola",
					html: `<p>Hola: ${user.User_Name} tu nuevo codigo de verificacion es ${token.Token_Token}<p>`,
				});

				const error = new Error(
					"La cuenta no ha sido confirmada, hemos enviado un nuevo email de confirmacion"
				);
				return res.status(401).json({ error: error.message });
			}
			// Si la password coinciden
			const isPasswordCorrect = await checkPassword(password, user.User_Password);
			if (!isPasswordCorrect) {
				const error = new Error("Password Incorrecto");
				return res.status(401).json({ error: error.message });
			}
			res.send("Autenticado");
		} catch (error) {}
	};

	// Metodo para solicitar nuevamente un codigo de confirmacion (POST)
	static requestConfirmationCode = async (req: Request, res: Response) => {
		try {
			// Extraemos el Email
			const { email } = req.body;

			// Verificamos si el usuario Existe o si esta confirmado
			const user = await User.findOne({ where: { User_Email: email } });

			// En caso de que no exista un usuario con el correo ingresado
			if (!user) {
				const error = new Error("El usuario no esta registrado");
				return res.status(409).json({ error: error.message });
			}
			// En caso de que el usuario ya estuviese confirmado
			if (user.User_Confirm) {
				const error = new Error("El Usuario ya esta confirmado");
				return res.status(403).json({ error: error.message });
			}

			// Entonces si esta registrado pero no confirmado generaremos el nuevo token
			// Generamos el nuevo Token
			const token = new Token();
			token.Token_Token = generate6digitToken();
			token.Token_UserID = user.User_ID;
			token.Token_Expires = Date.now() + 60000;

			// Enviar Email
			await transporter.sendMail({
				from: "FZ-XYZ",
				to: email,
				subject: "Confirma tu cuenta",
				text: "Hola",
				html: `<p>Hola: ${email} tu codigo de verificacion es ${token.Token_Token}<p>`,
			});

			// Guardamos el token en la base de datos
			await Promise.allSettled([token.save()]);

			// Respuesta al frontend
			res.send("Se envio un nuevo token, revise su correo");
		} catch (error) {
			// Error de Manejo
			res.status(500).json({ error: "Hubo un error" });
		}
	};

	static forgotPassword = async (req: Request, res: Response) => {
		try {
			// Extraemos el Email
			const { email } = req.body;

			// Buscamos el usuario por email
			const user = await User.findOne({ where: { User_Email: email } });

			// En caso de que no exista un usuario con el correo ingresado
			if (!user) {
				const error = new Error("El usuario no esta registrado");
				return res.status(409).json({ error: error.message });
			}

			// Si el usuario existe, generamos el token para cambiar la password
			// Generamos el nuevo Token
			const token = new Token();
			token.Token_Token = generate6digitToken();
			token.Token_UserID = (await user).User_ID;
			token.Token_Expires = Date.now() + 60000;

			// Enviar Email
			await transporter.sendMail({
				from: "FZ-XYZ",
				to: email,
				subject: "Confirma tu cuenta",
				text: "Hola",
				html: `
					<p>Hola: ${email} tu codigo para reestablecer tu password es ${token.Token_Token} Ingresa al siguiente link<p>
					<a href="${process.env.FRONTEND_URL}/auth/new-password"> Reestablecer contrasena </a>`,
			});

			// Guardamos el token en la base de datos
			await Promise.allSettled([token.save()]);

			// Respuesta al frontend
			res.send("Revisa tu email y sigue las instrucciones para reestablecer tu contrasena");
		} catch (error) {
			// Error de Manejo
			res.status(500).json({ error: "Hubo un error" });
		}
	};

	static validateToken = async (req: Request, res: Response) => {
		try {
			// Extraemos Token
			const { token } = req.body;

			// Buscamos si el token existe
			const tokenExist = await Token.findOne({
				where: { Token_Token: token },
			});

			// En caso de no existir
			if (!tokenExist) {
				const error = new Error("Token no valido");
				return res.status(404).json({ error: error.message });
			}

			// Verificamos si el Token esta expirado
			if (tokenExist.Token_Expires < Date.now()) {
				const error = new Error("el Token expiro");
				return res.status(404).json({ error: error.message });
			}

			res.send({ message: "Token Valido, Define tu nuevo password" });
		} catch (error) {
			res.json({ error: error.message });
		}
	};

	static updatePasswordWithToken = async (req: Request, res: Response) => {
		try {
			// Extraemos Token
			const { token } = req.params;

			// Buscamos si el token existe
			const tokenExist = await Token.findOne({
				where: { Token_Token: token },
			});

			// En caso de no existir
			if (!tokenExist) {
				const error = new Error("Token no valido");
				return res.status(404).json({ error: error.message });
			}

			// Verificamos si el Token esta expirado
			if (tokenExist.Token_Expires < Date.now()) {
				const error = new Error("el Token expiro");
				return res.status(404).json({ error: error.message });
			}

			res.send({ message: "Token Valido, Define tu nuevo password" });
		} catch (error) {
			res.json({ error: error.message });
		}
	};
}
