import Link from "next/link";
import React from "react";
import { useAuth } from "../../lib/hooks/useAuth";
import Image from "next/image";
import { useBoards } from "../../lib/hooks/boards";
import { Icon } from "@iconify/react";

// navigation bar + sidebar (desktop)


export default function Navbar({
	activeBoardId,
	setActiveBoardId,
}: {
	activeBoardId?: number | null;
	setActiveBoardId?: (id: number) => void;
}) {
	const { logout } = useAuth();
	const { boards, status } = useBoards();

	return (
		<div className="navbar flex md:justify-end items-center justify-between bg-[#242933] ">
			<div className="flex-1  md:hidden">
				<div className="dropdown">
					{status === "loading" ? (
						<label className="btn btn-ghost">...</label>
					) : (
						<>
							<label tabIndex={0} className="btn btn-ghost">
								{status === "success" &&
									boards &&
									activeBoardId &&
									boards.find((board) => board.id === activeBoardId)?.title}

								<Icon icon="bi:caret-down-fill" className="ml-2" />
							</label>
							<ul
								tabIndex={0}
								className="p-2 shadow menu dropdown-content bg-base-200 w-max rounded-md"
							>
								{boards
									?.filter((board) => board.id !== activeBoardId)
									.map((board) => {
										return (
											<button
												key={board.id}
												onClick={() => setActiveBoardId?.(board.id)}
												className="btn btn-ghost"
											>
												{board.title}
											</button>
										);
									})}
							</ul>
						</>
					)}
				</div>
			</div>

			<div className="dropdown dropdown-end">
				<label
					tabIndex={0}
					className="btn btn-circle btn-ghost w-max avatar flex"
				>
					<div className="w-10 rounded-full avatar flex">
						<Image
							src="https://placeimg.com/80/80/people"
							alt="Profile"
							layout="fill"
						/>
					</div>
					<Icon icon="bi:caret-down-fill" className="ml-1" />
				</label>
				<ul
					tabIndex={0}
					className="mt-4 p-2 shadow menu menu-compact dropdown-content bg-base-300 rounded-box w-52"
				>
					<li>
						<Link href="/profile" shallow>
							<a className="justify-between">Profile</a>
						</Link>
					</li>
					<li>
						<button
							onClick={logout}
							className="hover:bg-error hover:text-white transition-colors"
						>
							Logout
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
}
