import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({
	tableName: "Bloques",
})
class Bloques extends Model {
	// Id Registro de Asistencia
	@PrimaryKey
	@AutoIncrement
	@Column({
		type: DataType.INTEGER,
	})
	declare Id: number;

	@Column({
		type: DataType.INTEGER,
	})
	declare Dia_Id: number;

	@Column({
		type: DataType.STRING,
	})
	declare Codigo: string;

	@Column({
		type: DataType.STRING,
	})
	declare Horario: string;

	@Column({
		type: DataType.STRING,
	})
	declare Encargado: string;

	@Column({
		type: DataType.STRING,
	})
	declare Razon: string;
}

export default Bloques;
