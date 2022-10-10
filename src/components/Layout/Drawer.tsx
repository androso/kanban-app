import { useBoards } from "../../lib/hooks/boards";

export default function Drawer({
	children,
	activeBoardId,
	setActiveBoardId,
}: {
	children: React.ReactNode;
	activeBoardId?: number | null;
	setActiveBoardId?: (id: number) => void;
}) {
	const { boards, status } = useBoards();
	return (
		<div>
			<div className="drawer drawer-mobile">
				<span className="drawer-toggle"></span>
				<div className="drawer-content">{children}</div>
				<div className="drawer-side">
					<label htmlFor="my-drawer-2" className="drawer-overlay"></label>
					<ul className="menu p-4 overflow-y-auto bg-base-300 text-base-content max-w-[13rem] w-fit">
						<div className="prose">
							<h1 className="text-3xl pl-3 mb-4">Kanban 💃</h1>
						</div>
						{boards?.map((board) => (
							<li key={board.id}>
								<button
									onClick={() => setActiveBoardId?.(board.id)}
									className={`${
										activeBoardId === board.id ? "bg-primary text-white" : ""
									} mb-1`}
								>
									{board.title}
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
