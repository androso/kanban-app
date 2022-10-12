import { Icon } from "@iconify/react";
import { UseFormReturn } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { BoardFormTypes } from "../lib/types";

export default function BoardFormFields({
	formMethods,
	closeUpperModal,
	mode,
}: {
	formMethods: UseFormReturn<BoardFormTypes>;
	mode: "Edit" | "New";
	closeUpperModal?: () => void;
}) {
	const {
		register,
		formState: { errors },
	} = formMethods;

	return (
		<>
			<div className="mb-4 flex justify-between items-center">
				<h2 className="!m-0 text-primary-content">{mode} Board</h2>
				{closeUpperModal && (
					<button
						type="button"
						onClick={closeUpperModal}
						className="btn-ghost p-3 rounded-md transition-all"
					>
						<Icon icon="bi:x-circle" />
					</button>
				)}
			</div>
			<div className="form-control w-full max-w-xs">
				<label className="label" htmlFor="title">
					<span className="label-text">Title</span>
				</label>
				<input
					type="text"
					{...register("title", { required: "This field is required" })}
					id="title"
					placeholder="e.g tea with the queen"
					className="input input-bordered"
				/>
				<label className="label" htmlFor="title">
					<span className="label-text text-error">
						<ErrorMessage errors={errors} name="title" />
					</span>
				</label>
			</div>
			<div className="form-control w-full max-w-xs">
				<label className="label" htmlFor="description">
					<span className="label-text">Description</span>
				</label>
				<textarea
					{...register("description", { required: "This field is required" })}
					placeholder="e.g be kind with her bc she angry"
					id="description"
					className="textarea textarea-bordered"
				></textarea>
				<label className="label" htmlFor="description">
					<span className="label-text text-error">
						<ErrorMessage errors={errors} name="description" />
					</span>
				</label>
			</div>
			{status === "loading" ? (
				<button
					type="submit"
					className="btn btn-primary loading w-full max-w-xs"
				>
					{mode === "Edit" ? "Saving" : "Creating"}
				</button>
			) : (
				<button type="submit" className="btn btn-primary w-full max-w-xs">
					{mode === "Edit" ? "Save" : "Create"}
				</button>
			)}
		</>
	);
}
