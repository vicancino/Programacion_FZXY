import nodemailer from "nodemailer";

const config = () => {
	return {
		host: "sandbox.smtp.mailtrap.io",
		port: 2525,
		auth: {
			user: "1d7a3baafe3d62",
			pass: "ba878b6a762f7b",
		},
	};
};

export const transporter = nodemailer.createTransport(config());
