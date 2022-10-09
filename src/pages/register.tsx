import Link from "next/link";
import React from "react";
import { useAuth } from "../lib/hooks/useAuth";
import useRedirectIfAuthorized from "../lib/hooks/useRedirectIfAuthorized";

export default function Register() {
	// todo: if user is not logged in, show this.
	useRedirectIfAuthorized();
	const { register } = useAuth();
	const [registerError, setRegisterError] = React.useState<null | Error>(null);

	const registerUser = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const $email = event.currentTarget.elements[0] as HTMLInputElement;
		const $username = event.currentTarget.elements[1] as HTMLInputElement;
		const $password = event.currentTarget.elements[2] as HTMLInputElement;
		try {
			await register($username.value, $email.value, $password.value);
		} catch (error) {
			if (error instanceof Error) {
				setRegisterError(error);
			}
		}
	};
	return (
		<div className="w-full h-[100vh] flex justify-center items-center">
			<div className="card card-normal bg-base-300 shadow-lg max-w-lg">
				<form className="card-body" onSubmit={registerUser}>
					<div className="card-title">
						<h1>Create a kanban account</h1>
					</div>
					{registerError && (
						<span className="label-text text-error">
							{registerError?.message}
						</span>
					)}

					<div className="form-control w-full max-w-xs">
						<label htmlFor="username" className="label">
							<span className="label-text">Email</span>
						</label>
						<input
							type="email"
							name="email"
							placeholder="type here"
							id="username"
							className="input input-bordered"
							required
						/>
					</div>
					<div className="form-control w-full max-w-xs">
						<label htmlFor="name" className="label">
							<span className="label-text">Name</span>
						</label>
						<input
							type="text"
							name="username"
							placeholder="type here"
							id="username"
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
						<button className="btn btn-primary w-full">Register</button>
						<p>
							Have an account?{" "}
							<Link href="login">
								<a className="link text-blue-500">Login now</a>
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}
