import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "../../lib/hooks/useAuth";
import Image from "next/image";
import {
	useActiveBoard,
	useBoards,
	useDeleteBoard,
} from "../../lib/hooks/boards";
import { Icon } from "@iconify/react";
import { useDialog } from "../../lib/hooks/useDialog";
import Dialog from "@reach/dialog";
import NewTaskForm from "../NewTaskForm";
import toast from "react-hot-toast";

// navigation bar + sidebar (desktop)

export default function Navbar({
	activeBoardId,
	setActiveBoardId,
}: {
	activeBoardId?: number | null;
	setActiveBoardId?: (id: number) => void;
}) {
	const { logout } = useAuth();
	const { boards, status } = useBoards();
	const { activeBoard } = useActiveBoard();
	const { showDialog, openDialog, closeDialog } = useDialog();
	const [dialogCategory, setDialogCategory] = useState<
		"deleteBoardAlert" | "newTask" | "editBoard" | null
	>(null);
	const [showDropdown, setShowDropdown] = useState(false);
	const {
		mutateAsync: deleteBoardAsync,
		boardToDelete,
		setBoardToDelete,
	} = useDeleteBoard();

	return (
		<>
			<div className="navbar flex md:justify-end items-center justify-between bg-[#242933] ">
				<div className="flex-1  md:hidden">
					<div className="dropdown">
						{status === "loading" ? (
							<label className="btn btn-ghost">...</label>
						) : (
							<>
								{activeBoard && (
									<label
										className="btn btn-ghost text-purple-400"
										onClick={() => {
											if (boards && boards.length > 1) {
												setShowDropdown(!showDropdown);
											}
										}}
									>
										{activeBoard.title}

										<>
											{boards && boards.length > 1 && (
												<Icon icon="bi:caret-down-fill" className="ml-2" />
											)}

											<span
												onClick={(e) => {
													e.stopPropagation();
													openDialog();
													setDialogCategory("deleteBoardAlert");
													setBoardToDelete(activeBoard.id);
												}}
												className="btn-ghost p-1 rounded-md transition-colors hover:bg-error hover:text-primary-content ml-1"
											>
												<Icon icon="fe:trash" />
											</span>
										</>
									</label>
								)}
								{boards && boards.length > 1 && showDropdown && (
									<ul
										className={`${
											showDropdown && "!visible !opacity-100"
										} p-2 shadow menu dropdown-content bg-base-200 w-max rounded-md !text-left`}
									>
										{boards
											?.filter((board) => board.id !== activeBoardId)
											.map((board) => {
												return (
													<button
														key={board.id}
														onClick={() => setActiveBoardId?.(board.id)}
														className="btn btn-ghost !text-left"
													>
														{board.title}
														<span
															onClick={(e) => {
																e.stopPropagation();
																openDialog();
																setDialogCategory("deleteBoardAlert");
																setBoardToDelete(board.id);
															}}
															className="btn-ghost p-1 rounded-md transition-colors hover:bg-error hover:text-primary-content ml-2"
														>
															<Icon icon="fe:trash" />
														</span>
													</button>
												);
											})}
									</ul>
								)}
							</>
						)}
					</div>
				</div>
				{activeBoard && (
					<button
						className="btn btn-primary mr-3 hidden md:block"
						onClick={openDialog}
					>
						+ New Task
					</button>
				)}
				<div className="dropdown dropdown-end">
					<label
						tabIndex={0}
						className="btn btn-circle btn-ghost w-max avatar flex"
					>
						<div className="w-10 rounded-full avatar flex">
							<Image
								src="https://placeimg.com/80/80/people"
								alt="Profile"
								layout="fill"
							/>
						</div>
						<Icon icon="bi:caret-down-fill" className="ml-1" />
					</label>
					<ul
						tabIndex={0}
						className="mt-4 p-2 shadow menu menu-compact dropdown-content bg-base-300 rounded-box w-52"
					>
						<li>
							<Link href="/profile" shallow>
								<a className="justify-between">Profile</a>
							</Link>
						</li>
						<li>
							<button
								onClick={logout}
								className="hover:bg-error hover:text-white transition-colors"
							>
								Logout
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
				{dialogCategory === "deleteBoardAlert" ? (
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
				) : (
					<NewTaskForm closeUpperModal={closeDialog} />
				)}
			</Dialog>
		</>
	);
}
