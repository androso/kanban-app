import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import PageContainer from "../components/Layout/PageContainer";

import { useAuth } from "../lib/hooks/useAuth";
import useRedirectIfAuthorized from "../lib/hooks/useRedirectIfAuthorized";
// so far we make requests, but how do we get the user data?
export default function Login() {
	const { status } = useRedirectIfAuthorized();

	const [loginError, setLoginError] = React.useState<null | Error>(null);
	const { login } = useAuth();

	const loginUser = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const $email = event.currentTarget.elements[0] as HTMLInputElement;
		const $password = event.currentTarget.elements[1] as HTMLInputElement;
		try {
			await login($email.value, $password.value);
		} catch (error) {
			if (error instanceof Error) {
				// setLoginError(error);
			}
			toast.error("Invalid credentials");
		}
	};

	return (
		<PageContainer extraCss="flex justify-center items-center">
			{status === "loading" ? (
				<LoadingSpinner />
			) : (
				<div className="card card-normal bg-base-300 shadow-lg max-w-lg">
					<form className="card-body" onSubmit={loginUser}>
						<div className="card-title">
							<h1>Welcome to kanban</h1>
						</div>

						{loginError && (
							<span className="label-text text-error">
								{loginError?.message}
							</span>
						)}

						<div className="form-control w-full max-w-xs">
							<label htmlFor="email" className="label">
								<span className="label-text">Email</span>
							</label>
							<input
								type="email"
								name="email"
								placeholder="type here"
								id="email"
								className="input input-bordered"
								required
							/>
						</div>
						<div className="form-control w-full max-w-xs mb-4">
							<label htmlFor="password" className="label">
								<span className="label-text">Password</span>
							</label>
							<input
								type="password"
								name="password"
								placeholder="type here"
								id="password"
								className="input input-bordered"
								required
							/>
						</div>
						<div className="card-actions">
							<button className="btn btn-primary w-full">Login</button>
							<p>
								Not a member?{" "}
								<Link href="register">
									<a className="link text-blue-500">Register now</a>
								</Link>
							</p>
						</div>
					</form>
				</div>
			)}
		</PageContainer>
	);
}
