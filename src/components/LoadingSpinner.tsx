import React from "react";
import { DotLoader } from "react-spinners";

export default function LoadingSpinner() {
	return (
		<div className="flex-col prose">
			<DotLoader color="#641ae6" size="125px" />
			<h3 className="block mt-10 text-center">Thinking...</h3>
		</div>
	);
}
