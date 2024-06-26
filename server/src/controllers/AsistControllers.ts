import Activos from "../models/Activos.model";
import User from "../models/User.model";

export class AsistController {
	static async getUsers(req, res) {
		try {
			const users = await User.findAll();
			const user_names = users.map((user) => [user.dataValues.Name, user.dataValues.Email]);
			res.send(user_names);
		} catch (error) {
			console.log(error);
			// Error de Manejo
			res.status(500).json({ error: "Hubo un error" });
		}
	}

	static async newUser(req, res) {
		try {
			const email = req.body.email;
			const name = req.body.name;
			// Revisamos que el correo entrante no este previamente registrado
			const user_exist = await User.findOne({ where: { Email: email } });
			if (user_exist) {
				const error = new Error("El Email ingresado ya se encuentra registrado");
				return res.status(404).json({ error: error.message });
			}

			const new_user = new User();
			new_user.Name = name;
			new_user.Email = email;

			await Promise.allSettled([new_user.save()]);
			res.send("Usuario Registrado Correctamente");
		} catch (error) {
			console.log(error);
			// Error de Manejo
			res.status(500).json({ error: "Hubo un error" });
		}
	}

	static async registerAsist(req, res) {
		try {
			const user_email = req.body.email;

			const user_exist = await User.findOne({ where: { Email: user_email } });

			if (!user_exist) {
				const error = new Error("El Email ingresado no se encuentra registrado");
				return res.status(404).json({ error: error.message });
			}

			const activo_exist = await Activos.findOne({ where: { User_Id: user_exist.Id } });

			if (activo_exist) {
				const error = new Error("El usuario ingresao ya se encuentra presente");
				return res.status(404).json({ error: error.message });
			}

			const new_activo = new Activos();
			new_activo.User_Id = user_exist.Id;
			new_activo.HoraEntrada = Date.now();
			await new_activo.save();
		} catch (error) {
			console.log(error);
			// Error de Manejo
			res.status(500).json({ error: "Hubo un error" });
		}
	}

	static async getActives(req, res) {
		try {
			const actives = await User.findAll({
				attributes: { exclude: ["createdAt", "updatedAt", "Id"] },
				include: [{ model: Activos, attributes: ["HoraEntrada"], required: true }],
			});
			res.send(actives);
		} catch (error) {
			console.log(error);
			// Error de Manejo
			res.status(500).json({ error: "Hubo un error" });
		}
	}
}
