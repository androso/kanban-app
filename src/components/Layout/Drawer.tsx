import { useBoards } from "../../lib/hooks/boards";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import NewTaskForm from "../NewTaskForm";
import { useDialog } from "../../lib/hooks/useDialog";
import { Icon } from "@iconify/react";

export default function Drawer({
	children,
	activeBoardId,
	setActiveBoardId,
}: {
	children: React.ReactNode;
	activeBoardId?: number | null;
	setActiveBoardId?: (id: number) => void;
}) {
	const { boards } = useBoards();
	const { showDialog, open: openDialog, close: closeDialog } = useDialog();

	return (
		<div>
			<div className="drawer drawer-mobile z-0">
				<span className="drawer-toggle"></span>
				<div className="drawer-content">{children}</div>
				<div className="drawer-side">
					<label htmlFor="my-drawer-2" className="drawer-overlay"></label>
					<ul className="menu p-4 overflow-y-auto bg-base-300 text-base-content max-w-[16rem] w-fit">
						<div className="prose">
							<h1 className="text-3xl pl-3 mb-4">Kanban 💃</h1>
						</div>
						{boards?.map((board) => (
							<li key={board.id}>
								<button
									onClick={() => setActiveBoardId?.(board.id)}
									className={`${
										activeBoardId === board.id ? "bg-primary text-white" : ""
									} mb-1`}
								>
									{board.title}
								</button>
							</li>
						))}
						<li className="">
							<button
								onClick={openDialog}
								className="!transition-colors !duration-500 hover:bg-secondary hover:text-white"
							>
								+ Create New Board
							</button>
						</li>
					</ul>
				</div>
			</div>
			<Dialog
				isOpen={showDialog}
				onDismiss={closeDialog}
				className="!bg-base-100 max-w-md rounded-md relative"
				aria-label="Create new board"
			>
				<NewTaskForm closeUpperModal={closeDialog}/>
			</Dialog>
		</div>
	);
}
