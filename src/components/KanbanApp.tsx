import { useActiveBoard } from "../lib/hooks/boards";
import { Board } from "../lib/types";

export default function KanbanApp() {
	const { data: activeBoard } = useActiveBoard();

	return (
		<>
			{/* Display statuses columns */}
			<div className="flex">
				{activeBoard?.statuses.map((status) => {
					return (
						<div
							key={status.id}
							className="flex items-center grow shrink-0 !basis-72 px-2 py-2 bg-neutral mr-2 rounded-md"
						>
							<span
								className="w-4 h-4 rounded-full inline-block mr-3"
								style={{ backgroundColor: status.color }}
							></span>
							<h2 className="font-semibold">{status.title}</h2>
						</div>
					);
				})}
			</div>
			{/* Display tasks for this column */}
		</>
	);
}
