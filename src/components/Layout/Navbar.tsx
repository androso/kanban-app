import Link from "next/link";
import React from "react";
import { useAuth } from "../../lib/hooks/useAuth";
import Image from "next/image";
import { useBoards } from "../../lib/hooks/boards";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";

export default function Navbar({ children }: { children: React.ReactNode }) {
	const { logout } = useAuth();
	const { boards, status } = useBoards();
	const router = useRouter();

	return (
		<div className="navbar flex items-center justify-between bg-[#242933] ">
			<div className="flex ">
				<div>
					<Image
						src="/wicked.png"
						width={50}
						height={50}
						alt="company logo"
						title="company logo"
					/>
				</div>
				{router.pathname.includes("/app/board/") && (
					<div className="flex-1">
						<div className="dropdown">
							<label tabIndex={0} className="btn btn-ghost">
								Boards
								<Icon icon="bi:caret-down-fill" className="ml-2" />
							</label>
							<ul
								tabIndex={0}
								className="p-2 shadow menu dropdown-content bg-base-200 w-max rounded-md"
							>
								{status === "loading" ? (
									<li>Loading...</li>
								) : (
									boards?.map((board) => {
										return (
											<Link href={`/app/board/${board.id}`} key={board.id}>
												<a className="btn btn-ghost">{board.title}</a>
											</Link>
										);
									})
								)}
							</ul>
						</div>
					</div>
				)}
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
