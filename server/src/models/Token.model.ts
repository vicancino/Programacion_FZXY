import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement } from "sequelize-typescript";

import User from "./Users.model";

@Table({
	tableName: "Tokens",
})
class Token extends Model {
	// Token_ID
	@PrimaryKey
	@AutoIncrement
	@Column({
		type: DataType.INTEGER,
	})
	declare Token_ID: number;

	// Token_Token
	@Column({
		type: DataType.STRING,
	})
	declare Token_Token: string;

	// Token_UserID
	@ForeignKey(() => User)
	@Column({
		type: DataType.BIGINT,
	})
	declare Token_UserID: number;

	@BelongsTo(() => User)
	declare User_ID: User;

	// Token_Expires esto puede causar problemas dependiendo de la zona horaria
	@Column({
		type: DataType.BIGINT,
	})
	declare Token_Expires: number;
}

export default Token;
