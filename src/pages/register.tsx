import Link from "next/link";
import React from "react";
import { client } from '../lib/helpers';

export default function register() {
	const registerUser = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const $email = event.target?.email;
		const $password = event.target?.password;
		const body = { email: $email.value, password: $password.value }
		const result = await client('/register', { body });
	}
	return (
		<div className="w-full h-[100vh] flex justify-center items-center">
			<div className="card card-normal bg-base-300 shadow-lg max-w-lg">
				<form className="card-body" onSubmit={registerUser}>
					<div className="card-title">
						<h1>Create a kanban account</h1>
					</div>
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
