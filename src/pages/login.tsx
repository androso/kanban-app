import Link from "next/link";
import React from "react";
// import client 
import { client } from '../lib/helpers';
export default function Login() {
	// Save email and password from form
	const saveForm = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(event.target);
		const $email = event.target?.email;
		const $password = event.target?.password;
		const body = { email: $email.value, password: $password.value }
		console.log(JSON.stringify(body))
		const result = await client('/login', { body });

	}
	return (
		<div className="w-full h-[100vh] flex justify-center items-center">
			<div className="card card-normal bg-base-300 shadow-lg max-w-lg">
				<form className="card-body" onSubmit={saveForm}>
					<div className="card-title">
						<h1>Welcome to kanban</h1>
					</div>
					<div className="form-control w-full max-w-xs">
						<label htmlFor="username" className="label">
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
		</div>
	);
}
