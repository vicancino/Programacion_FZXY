import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.model";

// TODO Implementar AUTORIZACION JSW
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
	const bearer = req.headers.authorization;

	if (!bearer) {
		const error = new Error("No autorizado");
		return res.status(401).json({ error: error.message });
	}

	// Dividimos el bearer para obtener el json web token
	const token = bearer.split(" ")[1];

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		console.log(decoded);

		if (typeof decoded === "object" && decoded.id) {
			const user = await Admin.findOne({ where: { User_ID: decoded.id } });
			console.log(user);
		}
	} catch (error) {
		res.status(500).json({ error: "Token No valido" });
	}

	next();
};
