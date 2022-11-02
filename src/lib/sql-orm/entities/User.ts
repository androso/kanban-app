import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	OneToMany,
} from "typeorm";
import { Board } from "./Board";
import { AppDataSource } from "../dataSource";

@Entity()
export class User {
	@PrimaryGeneratedColumn({ type: "int" })
	id: number;

	@Column({ type: "text" })
	username: string;

	@Column({ type: "text" })
	email: string;

	@Column({ type: "text" })
	password: string;

	@CreateDateColumn()
	created_at: Date;

	/*
	@OneToMany(() => Board, (board) => board.user, { cascade: true })
	boards: Board[];
*/
}
export const UserRepository = AppDataSource.getRepository(User);
