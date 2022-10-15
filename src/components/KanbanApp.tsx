import React from "react";
import { useActiveBoard } from "../lib/hooks/boards";

function KanbanColumn({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex items-center grow-0 shrink-0 !basis-72 px-2 py-2 bg-neutral mr-2 rounded-md">
			{children}
		</div>
	);
}

export default function KanbanApp() {
	const { data: activeBoard } = useActiveBoard();

	return (
		<section
			id="kanban-container"
			className="w-full overflow-x-auto whitespace-nowrap !h-[calc(100%-64px)] p-2"
		>
			<button className="btn btn-outline min-h-fit h-fit py-3 mb-4 hover:bg-primary hover:outline-none hover:border-transparent hover:text-primary-content transition-colors">
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
							<div className="column-header flex items-center  px-2 py-2 bg-neutral  rounded-md mb-4">
								<span
									className="w-4 h-4 rounded-full inline-block mr-3"
									style={{ backgroundColor: status.color }}
								></span>
								<h2 className="font-semibold">{status.title}</h2>
							</div>

							<div key={status.id} className="column-body flex flex-col px-2 ">
								{activeBoard?.tasks
									.filter((task) => task.statusId === status.id)
									.map((task) => {
										return (
											<div
												key={task.id}
												className="px-3 py-3 mb-2 bg-neutral rounded-md"
											>
												{task.title}
											</div>
										);
									})}
							</div>
						</div>
					);
				})}
				<button className="btn btn-ghost min-h-max">+</button>
			</div>
			{/* Display statuses columns */}
			{/* <div className="flex mb-4">
				{activeBoard?.statuses.map((status) => {
					return (
						<div
							key={status.id}
							className="flex items-center grow-0 shrink-0 !basis-72 px-2 py-2 bg-neutral mr-2 rounded-md"
						>
							<span
								className="w-4 h-4 rounded-full inline-block mr-3"
								style={{ backgroundColor: status.color }}
							></span>
							<h2 className="font-semibold">{status.title}</h2>
						</div>
					);
				})}
			</div> */}
			{/* Display tasks for this column */}
			{/* <div className="flex">
				{activeBoard?.statuses.map((status) => {
					return (
						<div
							key={status.id}
							className="flex flex-col grow-0 shrink-0 !basis-64 mr-2 "
						>
							{activeBoard?.tasks
								.filter((task) => task.statusId === status.id)
								.map((task) => {
									return (
										<div
											key={task.id}
											className="px-3 py-3 mb-2 bg-neutral rounded-md"
										>
											{task.title}
										</div>
									);
								})}
						</div>
					);
				})}
			</div> */}
		</section>
	);
}
