import type { Request, Response } from "express";
import Dias from "../models/Dias.model";
import Bloque from "../models/Bloques.model";

export class CalendarController {
	static async registarHora(req: Request, res: Response) {
		try {
			const nombre_dia = req.body.Nombre_Dia.toLowerCase();

			const dia_exists = await Dias.findOne({ where: { Nombre_Dia: nombre_dia } });

			if (dia_exists === null) {
				const new_dia = new Dias();
				new_dia.Nombre_Dia = nombre_dia;
				await new_dia.save();
			}

			const dia = await Dias.findOne({ where: { Nombre_Dia: nombre_dia } });

			const new_bloque = new Bloque();

			new_bloque.Dia_Id = dia.Id;
			new_bloque.Horario = req.body.Horario;
			new_bloque.Razon = req.body.Razon;
			new_bloque.Codigo = req.body.Codigo;
			new_bloque.Encargado = req.body.Encargado;

			await new_bloque.save();
			res.send("Nuevo bloque guardado correctamente");
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: "Hubo un error" });
		}
	}

	// FIXME Agregar try catch
	static async eliminarHora(req: Request, res: Response) {
		const dia_exists = await Dias.findOne({ where: { Nombre_Dia: req.body.Nombre_Dia.toLowerCase() } });

		if (dia_exists === null) {
			const error = new Error("El dia proporcionado no tienen ningun bloque asignado");
			return res.status(409).json({ error: error.message });
		}

		const bloque_eliminar = await Bloque.findOne({
			where: {
				Dia_Id: dia_exists.Id,
				Codigo: req.body.Codigo,
				Encargado: req.body.Encargado,
				Razon: req.body.Razon,
			},
		});

		if (!bloque_eliminar) {
			const error = new Error("El bloque designado no existe");
			return res.status(409).json({ error: error.message });
		}

		await Bloque.destroy({
			where: {
				Dia_Id: dia_exists.Id,
				Codigo: req.body.Codigo,
				Encargado: req.body.Encargado,
				Razon: req.body.Razon,
			},
		});

		res.send("Bloque eliminado correctamente");
	}

	static async listarHoras(req: Request, res: Response) {
		try {
			const list_bloques = await Dias.findAll({
				attributes: { exclude: ["createdAt", "updatedAt", "Id"] },
				include: [{ model: Bloque, attributes: ["Codigo", "Horario", "Encargado", "Razon"], required: true }],
			});
			res.send(list_bloques);
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: "Hubo un error" });
		}
	}
}
