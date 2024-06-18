import User from "../models/User.model";

export class AsistController {
	static async getUsers(req, res) {
		try {
			const users = await User.findAll();
			const user_names = users.map((user) => [user.dataValues.Name, user.dataValues.Email]);
			console.log(user_names);
			res.send(user_names);
		} catch (error) {
			console.log(error);
			// Error de Manejo
			res.status(500).json({ error: "Hubo un error" });
		}
	}

	static async newUser(req, res) {
		try {
			console.log(req.body);
			const email = req.body.email;
			const name = req.body.name;
			// Revisamos que el correo entrante no este previamente registrado
			const user_exist = await User.findOne({ where: { Email: email } });
			if (user_exist) {
				const error = new Error("El Email ingresado ya se encuentra registrado");
				return res.status(404).json({ error: error.message });
			}
			res.json({})
		} catch (error) {
			console.log(error);
			// Error de Manejo
			res.status(500).json({ error: "Hubo un error" });
		}
	}
}
