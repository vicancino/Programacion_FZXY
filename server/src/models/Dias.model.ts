import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasMany } from "sequelize-typescript";
import Bloques from "./Bloques.model";

@Table({
	tableName: "Dias",
})
class Dias extends Model {
	// Id Registro de Asistencia
	@PrimaryKey
	@AutoIncrement
	@Column({
		type: DataType.INTEGER,
	})
	declare Id: number;

	@Column({
		type: DataType.STRING,
	})
	declare Nombre_Dia: string;

	@HasMany(() => Bloques, "Dia_Id")
	declare Bloque;
}

export default Dias;
