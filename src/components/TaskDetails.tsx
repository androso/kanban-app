import { Icon } from "@iconify/react";
import { Dispatch, SetStateAction, useState } from "react";
import { useActiveBoardId } from "../lib/context/activeBoardId";
import { client } from "../lib/helpers";
import { useActiveBoard } from "../lib/hooks/boards";
import {
	ReactQueryQueries,
	SubtaskFormatted,
	SubtaskFormType,
	TaskFormatted,
} from "../lib/types";
import { queryClient } from "../pages/_app";

interface NewSubtaskType extends SubtaskFormType {
	key: number;
	taskId: number;
	isNew: boolean;
	completed: boolean;
}
export default function TaskDetails({ task }: { task: TaskFormatted }) {
	const { data: activeBoard } = useActiveBoard();
	const [newSubtasks, setNewSubtasks] = useState<NewSubtaskType[]>();

	const saveField = async (field: string, value: string) => {
		try {
			await client(`/user/boards/${activeBoard?.id}/tasks/${task.id}`, {
				body: JSON.stringify({ [field]: value }),
				method: "PATCH",
			});
			queryClient.invalidateQueries([ReactQueryQueries.ACTIVE_BOARD]);
		} catch (error) {
			console.error("Unable to update task.");
		}
	};

	return (
		<form>
			<input
				className={`text-xl font-bold text-primary-content mb-4 bg-transparent w-full  focus:outline-none `}
				defaultValue={task?.title}
				onChange={async (e) => {
					const newTitle = e.currentTarget.value;
					await saveField("title", newTitle);
				}}
			/>
			<input
				className={`text-lg mb-3 bg-transparent w-full focus:outline-none`}
				defaultValue={task?.description}
				onChange={async (e) => {
					const newDescription = e.currentTarget.value;
					await saveField("description", newDescription);
				}}
			/>
			<p className="text-primary-content font-semibold mb-2">
				Subtasks ({task?.subtasks.filter((subtask) => subtask.completed).length}{" "}
				of {task?.subtasks.length})
			</p>
			<ul>
				{task?.subtasks.map((subTask) => {
					return <Subtask type="fromDB" key={subTask.id} data={subTask} />;
				})}
				{newSubtasks?.map((subtask) => {
					return (
						<Subtask
							key={subtask.key}
							type="new"
							data={subtask}
							setNewSubtasks={setNewSubtasks}
						/>
					);
				})}
				<button
					type="button"
					className="btn btn-outline w-full"
					onClick={() =>
						setNewSubtasks((prev) => [
							...(prev ?? []),
							{
								title: "",
								key: !newSubtasks ? 0 : newSubtasks.length,
								isNew: true,
								completed: false,
								taskId: task.id,
							},
						])
					}
				>
					+ Add Subtask
				</button>
			</ul>
			<div className="form-control mb-4">
				<label className="label">
					<span className="label-text text-primary-content font-semibold">
						Current Status
					</span>
				</label>
				<select
					defaultValue={
						activeBoard?.statuses.find((status) => status.id === task?.statusId)
							?.id
					}
					className={`select select-bordered w-full`}
					onChange={(e) => saveField("statusId", e.currentTarget.value)}
				>
					{activeBoard?.statuses.map((status) => {
						return (
							<option key={status.id} value={status.id}>
								{status.title}
							</option>
						);
					})}
				</select>
			</div>
		</form>
	);
}
function Subtask({
	data,
	setNewSubtasks,
	type,
}: {
	data: SubtaskFormatted | NewSubtaskType;
	type: "fromDB" | "new";
	setNewSubtasks?: Dispatch<SetStateAction<NewSubtaskType[] | undefined>>;
}) {
	const [checked, setChecked] = useState(data.completed);
	const [title, setTitle] = useState(data.title);
	const [editMode, setEditMode] = useState(type === "new");
	const { activeBoardId } = useActiveBoardId();

	const saveSubtask = async (
		field: "completed" | "title",
		value: string | boolean
	) => {
		// Save data to database
		if (type === "fromDB") {
			const subtask = data as SubtaskFormatted;
			try {
				await client(
					`/user/boards/${activeBoardId}/tasks/${subtask.taskId}/subtasks/${subtask.id}`,
					{
						body: JSON.stringify({ [field]: value }),
						method: "PATCH",
					}
				);
				if (field === "completed") {
					setChecked(value as boolean);
				}
				queryClient.invalidateQueries([ReactQueryQueries.ACTIVE_BOARD]);
			} catch (e) {
				console.error(e);
			}
		} else if (type === "new" && setNewSubtasks) {
			const newSubtask = data as NewSubtaskType;
			try {
				await client(
					`/user/boards/${activeBoardId}/tasks/${newSubtask.taskId}/subtasks`,
					{
						body: JSON.stringify({ [field]: value }),
						method: "POST",
					}
				);
				setChecked(false);

				queryClient
					.invalidateQueries([ReactQueryQueries.ACTIVE_BOARD])
					.then(() => {
						setNewSubtasks((oldSubtasks) =>
							oldSubtasks?.filter((subtask) => subtask.key !== newSubtask.key)
						);
					});
			} catch (e) {
				console.error(e);
			}
		}
	};
	const deleteSubtask = async () => {
		if (type === "new" && setNewSubtasks) {
			// Remove from state
			setNewSubtasks(
				(prev) =>
					prev?.filter(
						(subtask) => subtask.key !== (data as NewSubtaskType).key
					) ?? []
			);
		} else {
			// send DELETE request to API
			const subtask = data as SubtaskFormatted;
			try {
				await client(
					`/user/boards/${activeBoardId}/tasks/${data.taskId}/subtasks/${subtask.id}`,
					undefined,
					"DELETE"
				);
				queryClient.invalidateQueries([ReactQueryQueries.ACTIVE_BOARD]);
			} catch (e) {
				console.error(e);
			}
		}
	};

	return (
		<li
			className={`bg-base-300 px-4 py-5 rounded-md flex justify-left mb-2 ${
				checked ? "line-through" : "text-primary-content"
			}`}
		>
			<input
				type="checkbox"
				checked={checked}
				onChange={async (e) => {
					await saveSubtask("completed", !checked);
				}}
				disabled={type === "new"}
				className="checkbox checkbox-primary mr-2"
			/>
			<input
				className={`bg-transparent w-full focus:outline-none ${
					editMode && "border-b-2"
				} `}
				disabled={!editMode}
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			{!editMode ? (
				<button
					className="btn-ghost p-1 rounded-md"
					type="button"
					onClick={() => setEditMode(true)}
				>
					<Icon icon="icon-park-outline:pencil" />
				</button>
			) : (
				<button
					className="btn-ghost p-1 rounded-md"
					type="button"
					onClick={() => {
						saveSubtask("title", title);
						setEditMode(false);
					}}
				>
					<Icon icon="fa-regular:save" />
				</button>
			)}
			<button
				className="btn-ghost p-1 rounded-md hover:bg-error transition-colors "
				type="button"
				onClick={deleteSubtask}
			>
				<Icon icon="fe:trash" />
			</button>
		</li>
	);
}
