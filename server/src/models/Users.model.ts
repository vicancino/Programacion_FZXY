import {
	Table,
	Column,
	Model,
	DataType,
	AutoIncrement,
	PrimaryKey,
	Default,
	Unique,
	HasMany,
} from "sequelize-typescript";
import Token from "./Token.model";
import { NonAttribute } from "sequelize";

@Table({
	tableName: "Users",
})
class User extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column({
		type: DataType.INTEGER,
	})
	declare User_ID: number;

	@Unique(true)
	@Column({
		type: DataType.STRING,
	})
	declare User_Email: string;

	@Column({
		type: DataType.STRING,
	})
	declare User_Name;

	@Column({
		type: DataType.STRING,
	})
	declare User_Password: string;

	@Default(false)
	@Column({
		type: DataType.BOOLEAN,
	})
	declare User_Confirm: boolean;
}

export default User;
