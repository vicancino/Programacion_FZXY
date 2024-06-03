import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement } from "sequelize-typescript";
import User from "./User.model";
import { Col } from "sequelize/lib/utils";

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

	@BelongsTo(() => User)
	declare PersonId: User;

	// Hora de entrada de la asistencia
	@Column({
		type: DataType.INTEGER,
	})
	declare HoraEntrada: string;

	// Hora de salida de la asistencia
	@Column({
		type: DataType.INTEGER,
	})
	declare HoraSalida: string;

	// Flag para saber si la persona esta presente
	@Column({
		type: DataType.BOOLEAN,
	})
	declare Estado: boolean;
}

export default Registro;
