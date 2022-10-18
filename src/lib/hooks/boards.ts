import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { queryClient } from "../../pages/_app";
import { useActiveBoardId } from "../context/activeBoardId";
import { client } from "../helpers";
import {
	Board,
	BoardFormatted,
	BoardFormTypes,
	ReactQueryQueries,
} from "../types";

export const useBoards = () => {
	const { setActiveBoardId, activeBoardId } = useActiveBoardId();
	const { data: boards, status } = useQuery(
		[ReactQueryQueries.USER_BOARDS],
		async () => {
			const boards = (await client("/user/boards")) as Board[];
			if (
				!window.localStorage.getItem("kanban-activeBoardId") &&
				activeBoardId === undefined &&
				boards.length > 0
			) {
				setActiveBoardId(boards[0].id);
			}

			return boards;
		}
	);
	return { boards, status };
};

export const useActiveBoard = () => {
	const { activeBoardId } = useActiveBoardId();
	const query = useQuery(
		[ReactQueryQueries.ACTIVE_BOARD, activeBoardId],
		async () => {
			if (!activeBoardId) return null;
			const board = (await client(
				`/user/boards/${activeBoardId}`
			)) as BoardFormatted;
			return board;
		}
	);
	// console.log(query.data);
	return query;
};

export const useCreateBoard = () => {
	return useMutation(
		(newBoard: BoardFormTypes) => {
			return client("/user/boards", { body: JSON.stringify(newBoard) });
		},
		{
			onSuccess: (data) => {
				queryClient.invalidateQueries([ReactQueryQueries.USER_BOARDS]);
				console.log("board created succesfully!", data);
			},
		}
	);
};
export const useDeleteBoard = () => {
	const { setActiveBoardId } = useActiveBoardId();
	const { boards } = useBoards();
	const [boardToDelete, setBoardToDelete] = useState<number | null>(null);
	const mutate = useMutation(
		(boardId: number) => {
			return client(`/user/boards/${boardId}`, undefined, "DELETE");
		},
		{
			onSuccess: (_, boardId) => {
				queryClient.invalidateQueries([ReactQueryQueries.USER_BOARDS]);

				if (boards && boards.length >= 2) {
					const newBoards = boards.filter((board) => board.id !== boardId);
					setActiveBoardId(newBoards[0].id);
				} else if (boards && boards.length === 1) {
					// deleting the only board
					window.localStorage.removeItem("kanban-activeBoardId");
				}
			},
			onError: (error) => {
				if (error instanceof Error) {
					toast.error("Error while deleting board");
				}
			},
		}
	);

	return {
		...mutate,
		boardToDelete,
		setBoardToDelete,
	};
};

export const useEditBoard = () => {
	const { boards } = useBoards();
	const mutate = useMutation(
		(board: Board) => {
			return client(
				`/user/boards/${board.id}`,
				{
					body: JSON.stringify(board),
				},
				"PUT"
			);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries([ReactQueryQueries.USER_BOARDS]);
			},
		}
	);

	const editBoardById = async (
		newTitle: string,
		newDescription: string,
		boardId: number
	) => {
		const board = boards?.find((board) => board.id === boardId);
		if (board) {
			return mutate.mutateAsync({
				...board,
				title: newTitle,
				description: newDescription,
			});
		}
	};

	return { ...mutate, editBoardById };
};
