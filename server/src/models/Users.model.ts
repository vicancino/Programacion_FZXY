import {
	Table,
	Column,
	Model,
	DataType,
	Default,
	ForeignKey,
	BelongsTo,
	PrimaryKey,
	AutoIncrement,
} from "sequelize-typescript";
import Person from "./Person.model";

@Table({
	tableName: "Users",
})
class User extends Model {
	// Token_ID
	@PrimaryKey
	@AutoIncrement
	@Column({
		type: DataType.INTEGER,
	})
	declare Id: number;

	@ForeignKey(() => Person)
	@Column({
		type: DataType.INTEGER,
	})
	declare Person_Id: number;

	@BelongsTo(() => Person)
	declare PersonId: Person;

	@Column({
		type: DataType.STRING,
	})
	declare Password: string;

	@Default(false)
	@Column({
		type: DataType.BOOLEAN,
	})
	declare Confirm: boolean;
}

export default User;
