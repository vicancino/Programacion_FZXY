import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({
	tableName: "Activos",
})
class Activos extends Model {
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
	declare User_Id: number;

	// Hora de entrada de la asistencia
	@Column({
		type: DataType.BIGINT,
	})
	declare HoraEntrada: number;
}

export default Activos;
