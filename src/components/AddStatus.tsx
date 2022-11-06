import toast from "react-hot-toast";
import { useActiveBoardId } from "../lib/context/activeBoardId";
import { client } from "../lib/helpers";
import { ReactQueryQueries } from "../lib/types";
import { queryClient } from "../pages/_app";

export default function AddStatus({ onClose }: { onClose: () => void }) {
	const { activeBoardId } = useActiveBoardId();
	const createStatus = async (e: any) => {
		e.preventDefault();
		try {
			const title = e.currentTarget.title.value;
			const color = e.currentTarget.color.value;
			await client(`/user/boards/${activeBoardId}/statuses`, {
				body: JSON.stringify({ title, color }),
			});
			queryClient.invalidateQueries([ReactQueryQueries.ACTIVE_BOARD]);
			onClose();
		} catch (e) {
			console.error(e);
			if (e instanceof Error) {
				if (e.message === "Conflict") {
					toast.error("Status already created");
				} else {
					toast.error(e.message);
				}
			} else {
				toast.error("Error while creating status");
			}
		}
	};
	return (
		<form className="" onSubmit={createStatus}>
			<h2 className="text-2xl font-bold text-primary-content">New Status</h2>
			<div className="form-control">
				<label htmlFor="title" className="label">
					Title
				</label>
				<input
					type="text"
					id="title"
					required
					name="title"
					className="input input-bordered"
					placeholder="e.g paused"
				/>
			</div>
			<div className="form-control mb-4">
				<label htmlFor="color" className="label">
					Color
				</label>
				<input
					type="color"
					id="color"
					required
					className="w-24 h-12"
					name="color"
				/>
			</div>
			<button className="btn btn-primary" type="submit">
				Create
			</button>
		</form>
	);
}
