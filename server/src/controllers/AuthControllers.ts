import type { Request, Response } from "express";
import Admin from "../models/Admin.model";
import bcrypt from "bcrypt";
import Token from "../models/Token.model";
import { generate6digitToken } from "../utils/token";
import { transporter } from "../config/nodemailer";
import { checkPassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";
import User from "../models/User.model";

export class AuthController {
	// Metodo Para la Creacion de una Cuenta (POST)
	static createAccount = async (req: Request, res: Response) => {
		try {
			console.log("Creando cuenta con", req.body);

			// Revisamos si la persona existe
			const user_exists = await User.findOne({ where: { Email: req.body.email } });
			console.log("Resultado Busqueda", user_exists);

			// Si la persona no existe, entonces creamos la persona asociada con el nombre y su correo
			if (!user_exists) {
				console.log("Creando nueva Persona");
				const user = new User();
				user.Email = req.body.email;
				user.Name = req.body.name;
				await Promise.allSettled([user.save()]);
			}

			// FIXME Creo que hay un problema con la logica Revisar Entre que el admin es encontrado
			// y luego lo tenemos que buscar denuevo en caso de que no existe
			const user = await User.findOne({ where: { Email: req.body.email } });
			console.log("Resultado de Persona", user.Name, user.Id);

			// Buscamos si existe un admin que contenga el ID de la persona
			const admin_exist = await Admin.findOne({ where: { Person_Id: user.Id } });

			// Si el admin existe entonces no podemos crear un admin con el mismo correo y devolvemos un error
			if (admin_exist) {
				const error = new Error("Este Email ya se encuentra registrado");
				return res.status(409).json({ error: error.message });
			}

			// Si el admin no esta registrado lo debemos registrar
			const admin = new Admin();

			// Hash Password
			const salt = await bcrypt.genSalt(10);
			admin.Password = await bcrypt.hash(req.body.password, salt);
			admin.Person_Id = user.Id;
			await admin.save();

			// Generar token
			const token = new Token();
			token.Token = generate6digitToken();
			token.Admin_Id = admin.Id;

			// Fecha de expiracion para el token
			// FIXME Usar este tipo de fechas puede causar errores
			token.Expires = Date.now() + 600000;

			// Enviar Email
			await transporter.sendMail({
				from: "FZ-XYZ",
				to: user.Email,
				subject: "Confirma tu cuenta",
				text: "Hola",
				html: `<p>Hola: ${user.Name} tu codigo de verificacion es ${token.Token}<p>`,
			});

			await Promise.allSettled([admin.save(), token.save()]);

			res.send("Cuenta creada, revisa tu email para confirmarla");
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: "Hubo un error" });
		}
	};

	// Metodo Para la Confirmacion de una Cuenta (POST)
	static confirmAccount = async (req: Request, res: Response) => {
		try {
			// Extraemos el token
			const { token } = req.body;

			// Buscamos el token
			const tokenExist = await Token.findOne({
				where: { Token: token },
			});

			// Comprobamos que exista
			if (!tokenExist) {
				const error = new Error("Token no valido");
				return res.status(404).json({ error: error.message });
			}

			// Comprobamos que sea valido
			if (tokenExist.Expires < Date.now()) {
				const error = new Error("el Token expiro");
				return res.status(404).json({ error: error.message });
			}

			// Buscamos el usuario asociado al token
			const admin = await Admin.findOne({
				where: { Id: tokenExist.Admin_Id },
			});

			// Confirmamos el usuario
			admin.Confirm = true;

			// Guardamos los cambiso en la base de datos
			// Eliminamos todos los tokens que esten asociados al usuario
			await Promise.allSettled([admin.save(), Token.destroy({ where: { Admin_Id: admin.Id } })]);
			res.send({ message: "Cuenta Confirmada" });
		} catch (error) {
			res.json({ error: error.message });
		}
	};

	// Metodo para iniciar Sesion (POST)
	static login = async (req: Request, res: Response) => {
		try {
			const { email, password } = req.body;

			// Buscamos a la persona
			const user = await User.findOne({ where: { Email: email } });

			// Si la persona no existe
			if (!user) {
				const error = new Error("Usuario no encontrado");
				return res.status(404).json({ error: error.message });
			}

			// Buscamos al usuario
			const admin = await Admin.findOne({ where: { Person_Id: user.Id } });

			// Verificamos que  el usuario no se ha confirmado
			if (!admin.Confirm) {
				// Enviaremos un nuevo token para que el usuario se confirme
				// Creamos un nuevo token
				const token = new Token();
				token.Admin_Id = admin.Id;
				token.Token = generate6digitToken();
				await token.save();

				// Enviamos el nuevo token al correo
				await transporter.sendMail({
					from: "FZ-XYZ",
					to: user.Email,
					subject: "Confirma tu cuenta",
					text: "Hola",
					html: `<p>Hola: ${user.Name} tu nuevo codigo de verificacion es ${token.Token}<p>`,
				});

				const error = new Error(
					"La cuenta no ha sido confirmada, hemos enviado un nuevo email de confirmacion"
				);
				return res.status(401).json({ error: error.message });
			}
			// Verificamos que los passwords coincidan
			const isPasswordCorrect = await checkPassword(password, admin.Password);
			
			if (!isPasswordCorrect) {
				const error = new Error("Password Incorrecto");
				return res.status(401).json({ error: error.message });
			}

			// Generar JSON WEB TOKEN
			console.log("antes");
			const token = generateJWT({ id: admin.Id });
			console.log("despues");
			res.send(token);
		} catch (error) {}
	};

	// Metodo para solicitar nuevamente un codigo de confirmacion (POST)
	static requestConfirmationCode = async (req: Request, res: Response) => {
		try {
			// Extraemos el Email
			const { email } = req.body;

			// Verificamos si el usuario Existe o si esta confirmado
			const user = await User.findOne({ where: { Email: email } });

			// En caso de que no exista un usuario con el correo ingresado
			if (!user) {
				const error = new Error("El Usuario no existe");
				return res.status(409).json({ error: error.message });
			}

			const admin = await Admin.findOne({ where: { Person_Id: user.Id } });

			if (!admin) {
				const error = new Error("El usuario no Existe");
				return res.status(409).json({ error: error.message });
			}

			// En caso de que el usuario ya estuviese confirmado
			if (admin.Confirm) {
				const error = new Error("El Usuario ya esta confirmado");
				return res.status(403).json({ error: error.message });
			}

			// Entonces si esta registrado pero no confirmado generaremos el nuevo token
			// Generamos el nuevo Token
			const token = new Token();
			token.Token = generate6digitToken();
			token.Admin_Id = admin.Id;
			token.Expires = Date.now() + 600000;

			// Enviar Email
			await transporter.sendMail({
				from: "FZ-XYZ",
				to: email,
				subject: "Confirma tu cuenta",
				text: "Hola",
				html: `<p>Hola: ${user.Name} tu codigo de verificacion es ${token.Token}<p>`,
			});

			// Guardamos el token en la base de datos
			await Promise.allSettled([token.save()]);

			// Respuesta al frontend
			res.send("Se envio un nuevo token, revise su correo");
		} catch (error) {
			console.log(error);
			// Error de Manejo
			res.status(500).json({ error: "Hubo un error" });
		}
	};

	// Metodo solicitar token para cambiar contrasena
	// TODO TEST
	static forgotPassword = async (req: Request, res: Response) => {
		try {
			// Extraemos el Email
			const { email } = req.body;


			// Buscamos la persona por email
			const user = await User.findOne({ where: { Email: email } });
			

			// En caso de que no exista un usuario con el correo ingresado
			if (!user) {
	
				const error = new Error("El usuario no esta registrado");
				return res.status(409).json({ error: error.message });
			}

			// Buscamos si existe un usuario relacionado con la persona
			const admin = await Admin.findOne({ where: { Person_Id: user.dataValues.Id } });

			// Si el usuario no existe
			if (!admin) {
	
				const error = new Error("El usuario no esta registrado");
				return res.status(409).json({ error: error.message });
			}

			// Si el usuario existe, generamos el token para cambiar la password
			// Generamos el nuevo Token
			const token = new Token();
			token.Token = generate6digitToken();
			token.Admin_Id = admin.Id;
			token.Expires = Date.now() + 600000;
			
			// Enviar Email
			await transporter.sendMail({
				from: "FZ-XYZ",
				to: email,
				subject: "Confirma tu cuenta",
				text: "Hola",
				html: `
					<p>Hola: ${email} tu codigo para reestablecer tu password es ${token.Token} Ingresa al siguiente link<p>
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

	// Validar un token para cambiar contrasena
	// TODO TEST
	static validateToken = async (req: Request, res: Response) => {
		try {
			// Extraemos Token
			const { token } = req.body;

			// Buscamos si el token existe
			const tokenExist = await Token.findOne({
				where: { Token: token },
			});

			// En caso de no existir
			if (!tokenExist) {
				const error = new Error("Token no valido");
				return res.status(404).json({ error: error.message });
			}

			// Verificamos si el Token esta expirado
			if (tokenExist.Expires < Date.now()) {
				const error = new Error("el Token expiro");
				return res.status(404).json({ error: error.message });
			}

			res.send({ message: "Token Valido, Define tu nuevo password" });
		} catch (error) {
			res.json({ error: error.message });
		}
	};

	// Funcion para cambiar contrasena
	// TODO TEST
	static updatePasswordWithToken = async (req: Request, res: Response) => {
		try {
			// Extraemos Token
			const { token } = req.params;
			console.log(token);

			// Buscamos si el token existe
			const tokenExist = await Token.findOne({
				where: { Token: token },
			});

			// En caso de no existir
			if (!tokenExist) {
				const error = new Error("Token no valido");
				return res.status(404).json({ error: error.message });
			}

			// Verificamos si el Token esta expirado
			if (tokenExist.Expires < Date.now()) {
				const error = new Error("el Token expiro");
				return res.status(404).json({ error: error.message });
			}

			// Buscamos el usuario que corresponde al token entregado
			const admin = await Admin.findOne({ where: { Id: tokenExist.Admin_Id } });

			// Hash Password
			const salt = await bcrypt.genSalt(10);
			admin.Password = await bcrypt.hash(req.body.password, salt);

			// Guardamos el nuevo usuario con el nuevo password y eliminamos el token que el usuario utilizo para cambiar su contrasena
			await Promise.allSettled([admin.save(), Token.destroy({ where: { Admin_Id: admin.Id } })]);
			res.send({ message: "Contrasena cambiada correctamente" });
		} catch (error) {
			res.json({ error: error.message });
		}
	};

	static testClean = async (req: Request, res: Response) => {
		const testuser = await User.findOne({ where: { Email: req.body.email } });
		const testadmin = await Admin.findOne({ where: {Person_Id: testuser.Id}});
		const testtoken = await Token.findOne({ where: {Admin_Id: testadmin.Id}});
		testadmin.destroy();
		testuser.destroy();
		res.json({});
	}

	static testToken = async (req: Request, res: Response) => {
		const testuser = await User.findOne({ where: { Email: req.body.email } });
		const testadmin = await Admin.findOne({ where: {Person_Id: testuser.Id}});
		const testtoken = await Token.findOne({ where: {Admin_Id: testadmin.Id}});
		res.json(testtoken.dataValues.Token);
	}
}
