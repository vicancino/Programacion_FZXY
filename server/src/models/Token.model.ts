import {
	Table,
	Column,
	Model,
	DataType,
	ForeignKey,
	BelongsTo,
	PrimaryKey,
	AutoIncrement,
	HasOne,
} from "sequelize-typescript";

import Admin from "./Admin.model";

@Table({
	tableName: "Tokens",
})
class Token extends Model {
	// Id del token
	@PrimaryKey
	@AutoIncrement
	@Column({
		type: DataType.INTEGER,
	})
	declare ID: number;

	// Cadena (valor) del Token
	@Column({
		type: DataType.STRING,
	})
	declare Token: string;

	// Id del usuario Asociado al Token -> Tabla Users
	@ForeignKey(() => Admin)
	@Column({
		type: DataType.BIGINT,
	})
	declare Admin_Id: number;

	@BelongsTo(() => Admin)
	declare AdminId: Admin;

	// Tiempo de Expiracion del Token
	@Column({
		type: DataType.BIGINT,
	})
	declare Expires: number;
}

export default Token;
