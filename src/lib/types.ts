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
export type Board = {
	created_at: string;
	description: string;
	id: number;
	title: string;
};
