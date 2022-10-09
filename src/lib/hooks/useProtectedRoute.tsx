import { useRouter } from "next/router";
import useUser from "./useUser";

const useProtectedRoute = () => {
	const { user, status, clearUser, error, updateUser } = useUser();
	const router = useRouter();

	if (status === "error" || (status !== "loading" && !user)) {
		router.push("/login", undefined, { shallow: true });
	}

	return {
		user,
		status,
		clearUser,
		error,
		updateUser,
	};
};

export default useProtectedRoute;
