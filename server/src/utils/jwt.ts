import jwt from "jsonwebtoken";

type UserPayload = {
	id: number;
};

export const generateJWT = (payload: UserPayload) => {
	const data = {
		id: payload.id,
	};
	console.log("dentro");
	const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "10m" });
	console.log("token despues");
	return token;
};
