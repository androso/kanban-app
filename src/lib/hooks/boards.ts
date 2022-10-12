import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { queryClient } from "../../pages/_app";
import { useActiveBoardId } from "../context/activeBoardId";

import { client } from "../helpers";
import { Board, NewBoardFormTypes } from "../types";

const fakeBoards = [
	{
		id: 1,
		created_at: new Date(),
		title: "Board 1",
		description: "Board 1 description",
	},
	{
		id: 2,
		created_at: new Date(),
		title: "Board 2",
		description: "Board 2 description",
	},
	{
		id: 3,
		created_at: new Date(),
		title: "Board 3",
		description: "Board 3 description",
	},
];

export const useBoards = () => {
	const { data: boards, status } = useQuery(["userBoards"], async () => {
		const boards = (await client("/user/boards")) as Board[];
		return boards;
	});

	return { boards, status };
};

export const useActiveBoard = () => {
	const { activeBoardId } = useActiveBoardId();
	const { boards } = useBoards();
	return { activeBoard: boards?.find((board) => board.id === activeBoardId) };
};

export const useCreateBoard = () => {
	return useMutation(
		(newBoard: NewBoardFormTypes) => {
			return client("/user/boards", { body: JSON.stringify(newBoard) });
		},
		{
			onSuccess: (data, variables) => {
				queryClient.invalidateQueries(["userBoards"]);
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
				queryClient.invalidateQueries(["userBoards"]);
				console.log({ boardId });
				if (boards && boards.length >= 2) {
					const newBoards = boards.filter((board) => board.id !== boardId);
					setActiveBoardId(newBoards[0].id);
				} else if (boards && boards.length === 1) {
					// deleting the only board
					window.localStorage.removeItem("activeBoardId");
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
