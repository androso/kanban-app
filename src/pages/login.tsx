import Link from "next/link";
import React from "react";

export default function Login() {
	return (
		<div className="w-full h-[100vh] flex justify-center items-center">
			<div className="card card-normal bg-base-300 shadow-lg max-w-lg">
				<form className="card-body">
					<div className="card-title">
						<h1>Welcome to kanban</h1>
					</div>
					<div className="form-control w-full max-w-xs">
						<label htmlFor="username" className="label">
							<span className="label-text">Email</span>
						</label>
						<input
							type="email"
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
