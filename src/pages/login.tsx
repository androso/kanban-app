import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { client } from "../lib/helpers";
// so far we make requests, but how do we get the user data?
export default function Login() {
	// Save email and password from form
	const router = useRouter();
	const [loginError, setLoginError] = React.useState<null | Error>(null);
	const loginUser = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const $email = event.currentTarget.elements[0] as HTMLInputElement;
		const $password = event.currentTarget.elements[1] as HTMLInputElement;
		const body = { email: $email.value, password: $password.value };

		try {
			const result = await client("/auth/login", {
				body: body as unknown as BodyInit,
			});
			console.log(result);
			router.push("/profile", undefined, { shallow: true });
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message, {
					duration: 5000,
					className: "mt-8",
				});
				setLoginError(error);
			}
		}
	};

	return (
		<div className="w-full h-[100vh] flex justify-center items-center">
			<div className="card card-normal bg-base-300 shadow-lg max-w-lg">
				<form className="card-body" onSubmit={loginUser}>
					<div className="card-title">
						<h1>Welcome to kanban</h1>
					</div>
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
						<button
							type="button"
							onClick={async (e) => {
								e.preventDefault();
								try {
									const result = await client("/me");
									console.log(result);
									// router.push("/profile", undefined, { shallow: true });
								} catch (error) {
									if (error instanceof Error) {
										toast.error(error.message, {
											duration: 5000,
											className: "mt-8",
										});
									}
								}
							}}
							className="btn btn-primary"
						>
							/ME
						</button>
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
