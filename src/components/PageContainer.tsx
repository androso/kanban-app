import React from "react";

export default function PageContainer({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="w-full h-[100vh] flex justify-center items-center">
			{children}
		</div>
	);
}
