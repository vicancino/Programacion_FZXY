import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

// Variables de entorno
dotenv.config();

// Url Database
const db = new Sequelize(process.env.DATABASE_URL!, {
	models: [__dirname + "/../models/**.*.ts"],
	logging: false,
});

export default db;
