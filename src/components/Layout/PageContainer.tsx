import React from "react";

export default function PageContainer({
	children,
	extraCss,
}: {
	children: React.ReactNode;
	extraCss?: string;
}) {
	return <div className={`min-w-full min-h-[100vh]  ${extraCss}`}>{children}</div>;
}
