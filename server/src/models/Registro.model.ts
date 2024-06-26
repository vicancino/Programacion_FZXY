import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement } from "sequelize-typescript";
import User from "./User.model";

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
	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
	})
	declare Person_Id: number;

	@BelongsTo(() => User, "Id")
	declare PersonId: User;

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
