import "reflect-metadata";
import { DataSource } from "typeorm";
const DB_PASSWORD = process.env["DB_PASSWORD"];
const DB_USERNAME = process.env["DB_USERNAME"];
import { User } from "./entities/User";
import { Task } from "./entities/Task";
import { Subtask } from "./entities/Subtask";
import { Status } from "./entities/Status";
import { Board } from "./entities/Board";

const DB_HOST = process.env["DB_HOST"];

const AppDataSource = new DataSource({
	type: "postgres",
	host: DB_HOST,
	username: DB_USERNAME,
	password: DB_PASSWORD,
	synchronize: true,
	logging: false,
	entities: [User, Board, Task, Subtask, Status],
	migrations: [],
	subscribers: [],
});

AppDataSource.initialize().then(async () => {
		// create a new status
		// initializeStatuses();
		console.log("database initialized correctly!");
	})
	.catch((err) => {
		console.log("database initialization failed!");
		console.log(err);
	});

export default AppDataSource;