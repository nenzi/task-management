import {
  Table,
  Column,
  Model,
  Default,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import User from "./Users";

export enum TaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

@Table({ timestamps: true, tableName: "tasks" })
export class Task extends Model {
  @Column
  fullName: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  title: string;

  @Column(DataType.STRING)
  description: string;

  @Default(TaskStatus.PENDING)
  @Column
  status: TaskStatus;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId!: number;

  @BelongsTo(() => User, { onDelete: "CASCADE" })
  user!: User;
}
export default Task;
