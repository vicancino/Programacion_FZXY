import nodemailer from "nodemailer";

const config = () => {
	return {
		host: "sandbox.smtp.mailtrap.io",
		port: 2525,
		auth: {
			user: "d5faf97ed696a8",
			pass: "272a755c6f3203",
		},
	};
};

export const transporter = nodemailer.createTransport(config());
