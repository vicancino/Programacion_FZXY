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
}
