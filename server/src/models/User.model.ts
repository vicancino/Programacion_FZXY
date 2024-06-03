import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, Unique } from "sequelize-typescript";

@Table({
	tableName: "Users",
})
class User extends Model {
	// Id de la persona
	@PrimaryKey
	@AutoIncrement
	@Column({
		type: DataType.INTEGER,
	})
	declare Id: number;

	@Unique(true)
	@Column({
		type: DataType.STRING,
	})
	declare Email: string;

	@Column({
		type: DataType.STRING,
	})
	declare Name;
}

export default User;
