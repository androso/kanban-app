import { ErrorMessage } from "@hookform/error-message";
import { Icon } from "@iconify/react";
import React from "react";
import { useForm } from "react-hook-form";

interface NewBoardFormTypes {
	title: string;
	description: string;
}

export default function NewBoardForm({
	closeUpperModal,
}: {
	closeUpperModal?: () => void;
}) {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<NewBoardFormTypes>({});

	const submitForm = (data: unknown) => {
		console.log(data);
	};

	return (
		<form
			className="prose max-w-xs mx-auto"
			onSubmit={handleSubmit(submitForm)}
		>
			<div className="mb-4 flex justify-between items-center">
				<h2 className="!m-0 text-primary-content">New Board</h2>
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
					placeholder="e.g Take coffee break"
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
					placeholder="e.g Take coffee break"
					id="description"
					className="textarea textarea-bordered"
				></textarea>
				<label className="label" htmlFor="description">
					<span className="label-text text-error">
						<ErrorMessage errors={errors} name="description" />
					</span>
				</label>
			</div>
			<button type="submit" className="btn btn-primary w-full max-w-xs">
				Create
			</button>
		</form>
	);
}
