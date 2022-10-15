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
	tasks: TaskFormatted[];
}

// SUBTASK RELATED TYPES
export interface SubtaskFormType {
	title: string;
}
export interface SubtaskFormatted {
	id: number;
	taskId: number;
	title: string;
	completed: boolean;
}
// TASK RELATED TYPES
export interface TaskFormTypes {
	title: string;
	description: string;
	statusId: number;
	subtasks: SubtaskFormType[];
}

export interface TaskFormatted {
	id: number;
	title: string;
	description: string;
	boardId: number;
	statusId: number;
	subtasks: SubtaskFormatted[];
}

export enum ReactQueryQueries {
	USER_BOARDS = "userBoards",
	ACTIVE_BOARD = "activeBoard",
}
