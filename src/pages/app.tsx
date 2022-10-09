import { useEffect, useState } from "react";
import { client } from "../lib/helpers";
import useUser from "../lib/hooks/useUser";

export default function App() {
	// if user is not logged in, redirect to /login
	// if user is logged in, allow them access.

	const { user } = useUser();

	if (user) {
		return (
			<div>
				<h1>hello {user.email}</h1>
			</div>
		);
	}
	return (
		<div>
			<h1 className="text-xl text-red-800">App</h1>
			<p>This is a simple example of a React component.</p>
		</div>
	);
}
