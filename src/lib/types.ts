export interface User {
	username: string;
	id: number;
	email: number;
}

export interface CustomServerResponse {
	message: string;
	status: number;
}
export interface SubtaskForm {
	title: string;
}
export interface NewTaskFormTypes {
	subtasks: SubtaskForm[];
	title: string;
	description: string;
	status: number;
}

export interface BoardFormTypes {
	title: string;
	description: string;
}
export interface Board {
	created_at: string;
	description: string;
	id: number;
	title: string;
}

export type BoardStatus = {
	id: number;
	title: string;
	color: string;
};
export interface BoardFormatted extends Board {
	statuses: BoardStatus[];
}

// SUBTASK RELATED TYPES
export interface SubtaskFormType {
	id: string;
}

// TASK RELATED TYPES
export interface TaskFormTypes {
	title: string;
	description: string;
	statusId: number;
	subtasks: SubtaskFormType[];
}

export enum ReactQueryQueries {
	USER_BOARDS = "userBoards",
	ACTIVE_BOARD = "activeBoard",
}
