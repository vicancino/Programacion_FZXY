import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({
	tableName: "Registro",
})
class Registro extends Model {
	// Id Registro de Asistencia
	@PrimaryKey
	@AutoIncrement
	@Column({
		type: DataType.INTEGER,
	})
	declare Id: number;

	// Id de la persona que marca asistencia
	@Column({
		type: DataType.INTEGER,
	})
	declare User_Id: number;

	// Hora de entrada de la asistencia
	@Column({
		type: DataType.BIGINT,
	})
	declare HoraEntrada: number;

	// Hora de salida de la asistencia
	@Column({
		type: DataType.BIGINT,
	})
	declare HoraSalida: number;
}

export default Registro;
