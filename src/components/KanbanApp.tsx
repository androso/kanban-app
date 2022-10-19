import React, { useEffect, useState } from "react";
import { useActiveBoard } from "../lib/hooks/boards";
import { DndContext, useDroppable, useDraggable } from "@dnd-kit/core";
import { useDialog } from "../lib/hooks/useDialog";
import Dialog from "@reach/dialog";
import { TaskFormatted } from "../lib/types";
import TaskDetails from "./TaskDetails";

function DroppableColumn({
	children,
	columnId,
}: {
	children: React.ReactNode;
	columnId: number;
}) {
	const { isOver, setNodeRef } = useDroppable({ id: columnId });
	return (
		<div
			ref={setNodeRef}
			className={`column-body flex flex-col px-2 ${
				isOver && "bg-green-800"
			}  min-h-[94%] pt-4`}
		>
			{children}
		</div>
	);
}

function DragabbleItem({
	children,
	itemId,
}: {
	children: React.ReactNode;
	itemId: number;
}) {
	const { attributes, isDragging, listeners, setNodeRef, transform } =
		useDraggable({
			id: itemId,
		});
	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
		  }
		: undefined;

	return (
		<button
			className={`px-3 py-3 mb-3 bg-neutral rounded-md text-left ${
				isDragging && "z-50 bg-gray-600 shadow-2xl"
			}`}
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
		>
			{children}
		</button>
	);
}

export default function KanbanApp() {
	const { data: activeBoard } = useActiveBoard();
	const { openDialog, showDialog, closeDialog } = useDialog();
	const [taskSelected, setTaskSelected] = useState<TaskFormatted>();
	const [taskSelectedId, setTaskSelectedId] = useState<number>();
	useEffect(() => {
		if (taskSelectedId) {
			const task = activeBoard?.tasks.find(
				(task) => task.id === taskSelectedId
			);
			setTaskSelected(task);
		}
	}, [taskSelectedId, activeBoard]);

	return (
		<section
			id="kanban-container"
			className="w-full overflow-x-auto whitespace-nowrap !h-[calc(100%-64px)] p-2"
		>
			<button className="btn btn-outline min-h-fit h-fit py-3 mb-4 hover:bg-primary hover:outline-none hover:border-transparent hover:text-primary-content transition-colors">
				+ Add Column
			</button>
			<DndContext>
				{/* Display statuses columns */}
				<div className="flex" style={{ height: "inherit" }}>
					{activeBoard?.statuses.map((status) => {
						return (
							<div
								className="column grow-0 shrink-0 !basis-72 bg-base-200 mr-2 pb-1 rounded-t-md "
								key={status.id}
							>
								<div className="column-header flex items-center  px-2 py-2 bg-neutral  rounded-md">
									<span
										className="w-4 h-4 rounded-full inline-block mr-3"
										style={{ backgroundColor: status.color }}
									></span>
									<h2 className="font-semibold">{status.title}</h2>
								</div>
								<DroppableColumn columnId={status.id}>
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
														}}
													>
														{task.title}
													</button>
												);
											})}
									</div>
								</DroppableColumn>
							</div>
						);
					})}
					<button className="btn btn-ghost min-h-max">+</button>
				</div>
			</DndContext>
			{/* insert reach ui dialog */}
			<Dialog
				isOpen={showDialog}
				onDismiss={closeDialog}
				aria-label="Task Details"
				className="!bg-base-100 max-w-md text-left rounded-md relative"
			>
				<TaskDetails
					task={taskSelected as TaskFormatted}
					onClose={closeDialog}
				/>
			</Dialog>
		</section>
	);
}
