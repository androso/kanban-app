import { useBoards, useDeleteBoard } from "../../lib/hooks/boards";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { useDialog } from "../../lib/hooks/useDialog";
import NewBoardForm from "../NewBoardForm";
import { Icon } from "@iconify/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Board } from "../../lib/types";
import EditBoardForm from "../EditBoardForm";

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
	const { showDialog, openDialog, closeDialog } = useDialog();
	const [dialogCategory, setDialogCategory] = useState<
		"newBoard" | "deleteBoardAlert" | "editBoard" | null
	>(null);
	const [boardToEdit, setBoardToEdit] = useState<Board | null>(null);
	const {
		status,
		mutateAsync: deleteBoardAsync,
		boardToDelete,
		setBoardToDelete,
	} = useDeleteBoard();

	return (
		<div>
			<div className="drawer drawer-mobile z-0">
				<span className="drawer-toggle"></span>
				<div className="drawer-content relative">{children}</div>
				<div className="drawer-side md:z-0">
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
									} mb-1 flex justify-between group`}
								>
									<span className="py-1">{board.title}</span>
									<div
										className="invisible flex group-hover:visible  transition-all"
										onClick={(e) => {
											e.stopPropagation();
										}}
									>
										<span
											className="btn-ghost p-1 rounded-md"
											onClick={() => {
												setDialogCategory("editBoard");
												setBoardToEdit(board);
												openDialog();
											}}
										>
											<Icon icon="icon-park-outline:pencil" />
										</span>
										<span
											className="btn-ghost p-1 rounded-md transition-colors hover:bg-error hover:text-primary-content"
											onClick={(e) => {
												openDialog();
												setDialogCategory("deleteBoardAlert");
												setBoardToDelete(board.id);
											}}
										>
											<Icon icon="fe:trash" />
										</span>
									</div>
								</button>
							</li>
						))}
						<li className="">
							<button
								onClick={() => {
									setDialogCategory("newBoard");
									openDialog();
								}}
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
				{dialogCategory === "newBoard" ? (
					<NewBoardForm closeUpperModal={closeDialog} />
				) : dialogCategory === "editBoard" ? (
					<EditBoardForm
						boardToEdit={boardToEdit}
						closeUpperModal={closeDialog}
					/>
				) : (
					<div className=" prose">
						<h4 className="mb-4">
							Are you sure you want to delete this board?
						</h4>
						<div className="flex justify-end">
							<button className="btn btn-ghost mr-2" onClick={closeDialog}>
								Cancel
							</button>
							<button
								className={`btn btn-error ${status === "loading" && "loading"}`}
								onClick={async () => {
									if (boardToDelete) {
										try {
											const s = await deleteBoardAsync(boardToDelete);
											closeDialog();
										} catch (e) {
											console.error(e);
											toast.error("Error while deleting board");
										}
									}
								}}
							>
								Delete
							</button>
						</div>
					</div>
				)}
			</Dialog>
		</div>
	);
}
