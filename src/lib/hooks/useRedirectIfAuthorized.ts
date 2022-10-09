import { useRouter } from "next/router";

import useUser from "./useUser";

const useRedirectIfAuthorized = () => {
	const { user, status } = useUser();
	const router = useRouter();

	if (user) {
		router.push("/app", undefined, { shallow: true });
		return {
			status,
		};
	}

	return {
		status,
	};
};
export default useRedirectIfAuthorized;
