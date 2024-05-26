import jwt from "jsonwebtoken";

type UserPayload = {
	id: number;
};

export const generateJWT = (payload: UserPayload) => {
	const data = {
		id: payload.id,
	};

	const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "10m" });
	return token;
};
