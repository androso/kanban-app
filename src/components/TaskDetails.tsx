import { Icon } from "@iconify/react";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
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
	isNew: boolean;
	completed: boolean;
}
export default function TaskDetails({ task }: { task: TaskFormatted }) {
	const { data: activeBoard } = useActiveBoard();
	const [newSubtasks, setNewSubtasks] = useState<NewSubtaskType[]>();
	const changeStatus = async (e: ChangeEvent<HTMLSelectElement>) => {
		console.log(e.currentTarget.selectedOptions[0].value);
	};
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
				className={`text-xl font-bold text-primary-content mb-4 bg-transparent w-full input focus:outline-none `}
				defaultValue={task?.title}
				onChange={async (e) => {
					const newTitle = e.currentTarget.value;
					await saveField("title", newTitle);
				}}
			/>
			<input
				className={`text-lg mb-3 bg-transparent w-full input focus:outline-none`}
				defaultValue={task?.description}
			/>
			<p className="text-primary-content font-semibold mb-2">
				Subtasks ({task?.subtasks.filter((subtask) => subtask.completed).length}{" "}
				of {task?.subtasks.length})
			</p>
			<ul>
				{task?.subtasks.map((subTask) => {
					return <Subtask key={subTask.id} data={subTask} />;
				})}
				{newSubtasks?.map((subtask) => {
					return (
						<Subtask
							key={subtask.key}
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
					onChange={(e) => changeStatus(e)}
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
	newSubtasks,
}: {
	data: SubtaskFormatted | NewSubtaskType;
	setNewSubtasks?: Dispatch<SetStateAction<NewSubtaskType[] | undefined>>;
	newSubtasks?: NewSubtaskType[];
}) {
	const [checked, setChecked] = useState(data?.completed ?? false);
	const [editMode, setEditMode] = useState(data?.isNew ?? false);
	const saveData = async () => {
		// Save data to database
	};
	const checkSubtask = async () => {
		// if ((data as NewSubtaskType)?.isNew && setNewSubtasks && newSubtasks) {
		// 	const updatedSubtasks = newSubtasks.map((subtask) => {
		// 		if (subtask.key === data.key) {
		// 			return {
		// 				...subtask,
		// 				completed: !subtask.completed,
		// 			};
		// 		}
		// 		return subtask;
		// 	});
		// 	setNewSubtasks(updatedSubtasks);
		// }
	};
	const deleteSubtask = async () => {
		if ((data as NewSubtaskType)?.isNew && setNewSubtasks) {
			// Remove from state
			setNewSubtasks(
				(prev) =>
					prev?.filter(
						(subtask) => subtask.key !== (data as NewSubtaskType).key
					) ?? []
			);
		} else {
			// send DELETE request to API
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
				onChange={(e) => {
					setChecked(e.target.checked);
					checkSubtask();
				}}
				className="checkbox checkbox-primary mr-2"
			/>
			<input
				className={`bg-transparent w-full focus:outline-none ${
					editMode && "border-b-2"
				} `}
				defaultValue={data.title}
				disabled={!editMode}
				onClick={(e) => e.stopPropagation()}
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
						// TODO: Save subtask modified in the server
						setEditMode(false);
						saveData();
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
