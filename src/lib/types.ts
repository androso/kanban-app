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
