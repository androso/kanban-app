import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "../../pages/_app";
import { useActiveBoardId } from "../context/activeBoardId";
import { client } from "../helpers";
import { TaskFormTypes, ReactQueryQueries } from "../types";

export const useCreateTask = () => {
	const { activeBoardId } = useActiveBoardId();

	return useMutation(
		(taskForm: TaskFormTypes) => {
			return client(`/user/boards/${activeBoardId}/tasks`, {
				body: JSON.stringify(taskForm),
			});
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries([ReactQueryQueries.ACTIVE_BOARD]);
			},
			onError: (e) => {
				if (e instanceof Error) {
					toast.error("Error while creating task");
				}
			},
		}
	);
};
