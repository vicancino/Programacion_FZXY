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
import User from "./User.model";

@Table({
	tableName: "Admins",
})
class Admin extends Model {
	// Token_ID
	@PrimaryKey
	@AutoIncrement
	@Column({
		type: DataType.INTEGER,
	})
	declare Id: number;

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
	})
	declare Person_Id: number;

	@BelongsTo(() => User)
	declare PersonId: User;

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

export default Admin;
