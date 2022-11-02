import { User } from "../types";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { client } from "../helpers";
const useUser = () => {
	const queryClient = useQueryClient();

	const {
		data: user,
		status,
		error,
	} = useQuery(
		["user"],
		async () => {
			try {
				const user = await client("/user");
				return user as User;
			} catch (e) {
				return null;
			}
		},
		{ retry: false, refetchOnWindowFocus: false }
	);

	const updateUser = (newUser: User) => {
		queryClient.setQueryData(["user"], newUser);
	};

	const clearUser = () => {
		queryClient.clear();
		window.localStorage.removeItem("kanban-activeBoardId");
	};

	return {
		user,
		updateUser,
		status,
		error,
		clearUser,
	};
};

export default useUser;
