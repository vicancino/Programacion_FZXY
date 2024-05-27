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

import User from "./Users.model";

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
	@ForeignKey(() => User)
	@Column({
		type: DataType.BIGINT,
	})
	declare User_Id: number;

	@BelongsTo(() => User)
	declare UserId: User;

	// Tiempo de Expiracion del Token
	@Column({
		type: DataType.BIGINT,
	})
	declare Expires: number;
}

export default Token;
