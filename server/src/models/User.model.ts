import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, Unique, HasOne } from "sequelize-typescript";
import Activos from "./Activos.model";
import Registro from "./Registro.model";

@Table({
	tableName: "Users",
})
class User extends Model {
	// Id de la persona
	@PrimaryKey
	@AutoIncrement
	@Column({
		type: DataType.INTEGER,
	})
	declare Id: number;

	@Unique(true)
	@Column({
		type: DataType.STRING,
	})
	declare Email: string;

	@Column({
		type: DataType.STRING,
	})
	declare Name;

	// Relacion con Activos
	@HasOne(() => Activos, "User_Id")
	declare Activo;

	// Relacion con Activos
	@HasOne(() => Registro, "User_Id")
	declare Registro;
}

export default User;
