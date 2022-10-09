// this hook takes charge of login, register and signout
import { client } from "../helpers";
import { User } from "../types";
import useUser from "./useUser";
import { useRouter } from "next/router";

export const useAuth = () => {
	const { updateUser } = useUser();
	const router = useRouter();

	const login = async (email: string, password: string) => {
		const user = (await client("/auth/login", {
			body: JSON.stringify({
				email,
				password,
			}),
		})) as User;
		// update stored user data
		updateUser(user);
		router.push("/app", undefined, { shallow: true });
	};

	const register = async (
		username: string,
		email: string,
		password: string
	) => {
		const result = await client("/auth/register", {
			body: JSON.stringify({
				username,
				email,
				password,
			}),
		});

		if (result.status === 201) {
			router.push("/login", undefined, { shallow: true });
		}
	};
	return {
		login,
		register,
	};
};
