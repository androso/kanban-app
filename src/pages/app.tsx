import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import PageContainer from "../components/Layout/PageContainer";
import { useAuth } from "../lib/hooks/useAuth";
import useProtectedRoute from "../lib/hooks/useProtectedRoute";
import Navbar from "../components/Layout/Navbar";
import { useActiveBoard, useBoards } from "../lib/hooks/boards";
import Drawer from "../components/Layout/Drawer";
import {
	ActiveBoardIdProvider,
	useActiveBoardId,
} from "../lib/context/activeBoardId";
import { Icon } from "@iconify/react";
import Dialog from "@reach/dialog";
import { useDialog } from "../lib/hooks/useDialog";
import { useState } from "react";
import NewBoardForm from "../components/NewBoardForm";
import NewTaskForm from "../components/NewTaskForm";

export default function AppWrapper() {
	return (
		<>
			<ActiveBoardIdProvider>
				<App />
			</ActiveBoardIdProvider>
		</>
	);
}

function App() {
	// if user is not logged in, redirect to /login
	// if user is logged in, allow them access.
	const { user, status } = useProtectedRoute();
	const { logout } = useAuth();
	const closeSession = async () => {
		try {
			await logout();
		} catch (e) {
			toast.error("Error while logging out");
		}
	};
	// if it's null, means user dosn't have any boards created.
	// const [activeBoardId, setActiveBoardId] = useState<number | null>(null);
	const { activeBoardId, setActiveBoardId } = useActiveBoardId();
	const { data: activeBoard } = useActiveBoard();
	// const activeBoard = boards?.find((board) => board.id === activeBoardId);
	const { showDialog, openDialog, closeDialog } = useDialog();
	const [dialogAction, setDialogAction] = useState<
		"newTask" | "newBoard" | null
	>(null);

	return (
		<PageContainer>
			{status === "loading" ? (
				<LoadingSpinner />
			) : user ? (
				<Drawer
					activeBoardId={activeBoardId}
					setActiveBoardId={setActiveBoardId}
				>
					<Navbar
						activeBoardId={activeBoardId}
						setActiveBoardId={setActiveBoardId}
					/>
					<h1>{activeBoard?.title}</h1>

					<div className="dropdown dropdown-top dropdown-left absolute bottom-6 right-6 md:hidden">
						<label
							tabIndex={0}
							className="btn btn-circle bg-primary hover:bg-primary-focus focus:bg-primary-focus m-1 text-3xl text-primary-content w-16 h-16"
						>
							<Icon icon="fa6-solid:plus" />
						</label>
						<ul
							tabIndex={0}
							className="dropdown-content menu p-2 bg-primary text-primary-content shadow rounded-box w-52"
						>
							<li>
								<button
									onClick={() => {
										openDialog();
										setDialogAction("newBoard");
									}}
								>
									Create Board
								</button>
							</li>
							{activeBoard && (
								<li>
									<button
										onClick={() => {
											openDialog();
											setDialogAction("newTask");
										}}
									>
										Create Task
									</button>
								</li>
							)}
						</ul>
					</div>

					<Dialog
						isOpen={showDialog}
						onDismiss={closeDialog}
						className="!bg-base-100 !w-[90vw] max-w-[490px] rounded-md relative"
						aria-label="Create new board"
					>
						{dialogAction === "newBoard" ? (
							<NewBoardForm closeUpperModal={closeDialog} />
						) : (
							<NewTaskForm closeUpperModal={closeDialog} />
						)}
					</Dialog>
				</Drawer>
			) : null}
		</PageContainer>
	);
}
