import React, { Suspense, useEffect, useState } from "react";
import { useActiveBoard } from "../lib/hooks/boards";
import { useDialog } from "../lib/hooks/useDialog";
import Dialog from "@reach/dialog";
import { ReactQueryQueries, TaskFormatted } from "../lib/types";
import dynamic from "next/dynamic";
import { client } from "../lib/helpers";
import toast from "react-hot-toast";
import { queryClient } from "../pages/_app";
import { Icon } from "@iconify/react";
import LoadingSpinner from "./LoadingSpinner";
const DynamicTaskDetails = dynamic(() => import("./TaskDetails"));
const DynamicAddStatus = dynamic(() => import("./AddStatus"));

export default function KanbanApp() {
	const { data: activeBoard } = useActiveBoard();
	const { openDialog, showDialog, closeDialog } = useDialog();
	const [taskSelected, setTaskSelected] = useState<TaskFormatted>();
	const [taskSelectedId, setTaskSelectedId] = useState<number>();
	const [dialogCategory, setDialogCategory] = useState<
		"add_status" | "task_details" | "delete_status"
	>();
	const [statusToDelete, setStatusToDelete] = useState<number>();
	useEffect(() => {
		if (taskSelectedId) {
			const task = activeBoard?.tasks.find(
				(task) => task.id === taskSelectedId
			);
			setTaskSelected(task);
		}
	}, [taskSelectedId, activeBoard]);

	const deleteStatus = async () => {
		try {
			await client(
				`/user/boards/${activeBoard?.id}/statuses/${statusToDelete}`,
				undefined,
				"DELETE"
			);
			queryClient.invalidateQueries([ReactQueryQueries.ACTIVE_BOARD]);
			closeDialog();
		} catch (e) {
			toast.error("Error deleting status");
		}
	};

	return (
		<section
			id="kanban-container"
			className="w-full overflow-x-auto whitespace-nowrap !h-[calc(100%-64px)] p-2"
		>
			<button
				onClick={() => {
					setDialogCategory("add_status");
					openDialog();
				}}
				className="btn btn-outline min-h-fit h-fit py-3 mb-4 hover:bg-primary hover:outline-none hover:border-transparent hover:text-primary-content transition-colors"
			>
				+ Add Column
			</button>

			{/* Display statuses columns */}
			<div className="flex" style={{ height: "inherit" }}>
				{activeBoard?.statuses.map((status) => {
					return (
						<div
							className="column grow-0 shrink-0 !basis-72 bg-base-200 mr-2 pb-1 rounded-t-md "
							key={status.id}
						>
							<div className="column-header flex justify-between  px-2 py-2 bg-neutral  rounded-md">
								<div className="flex items-center">
									<span
										className="w-4 h-4 rounded-full inline-block mr-3"
										style={{ backgroundColor: status.color }}
									></span>
									<h2 className="font-semibold justify-self-start">
										{status.title}
									</h2>
								</div>
								<button
									onClick={() => {
										setDialogCategory("delete_status");
										openDialog();
										setStatusToDelete(status.id);
									}}
									className="btn-ghost text-lg p-1 rounded-md transition-colors hover:bg-error hover:text-primary-content"
								>
									<Icon icon="fe:trash" />
								</button>
							</div>
							<div
								key={status.id}
								className="column-body flex flex-col px-2 "
							>
								{activeBoard?.tasks
									.filter((task) => task.statusId === status.id)
									.map((task) => {
										return (
											<button
												type="button"
												key={task.id}
												className="px-3 py-3 mb-3 bg-neutral rounded-md text-left hover:bg-base-100	transition-colors"
												onClick={() => {
													openDialog();
													setTaskSelected(task);
													setTaskSelectedId(task.id);
													setDialogCategory("task_details");
												}}
											>
												{task.title}
											</button>
										);
									})}
							</div>
						</div>
					);
				})}
				<button
					className="btn btn-ghost min-h-max"
					onClick={() => {
						openDialog();
						setDialogCategory("add_status");
					}}
				>
					+
				</button>
			</div>

			<Dialog
				isOpen={showDialog}
				onDismiss={closeDialog}
				aria-label="Task Details"
				className="!bg-base-100 max-w-md text-left rounded-md relative"
			>
				<Suspense fallback={<div className="w-full h-full flex items-center justify-center"><LoadingSpinner /></div>}>
					{dialogCategory === "task_details" ? (
						<DynamicTaskDetails
							task={taskSelected as TaskFormatted}
							onClose={closeDialog}
						/>
					) : dialogCategory === "add_status" ? (
						<DynamicAddStatus onClose={closeDialog} />
					) : (
						<div className=" prose">
							<h4 className="mb-4">
								Are you sure you want to delete this status and its task?
							</h4>
							<div className="flex justify-end">
								<button className="btn btn-ghost mr-2" onClick={closeDialog}>
									Cancel
								</button>
								<button
									className={`btn btn-error ${status === "loading" && "loading"}`}
									onClick={deleteStatus}
								>
									Delete
								</button>
							</div>
						</div>
					)}
				</Suspense>
			</Dialog>
		</section>
	);
}
