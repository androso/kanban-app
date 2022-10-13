import { useForm, useFieldArray, appendErrors } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Icon } from "@iconify/react";
import type { NewTaskFormTypes } from "../lib/types";

export default function NewTaskForm({
	closeUpperModal,
}: {
	closeUpperModal?: () => void;
}) {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<NewTaskFormTypes>({
		defaultValues: {
			subtasks: [{ title: "" }],
		},
	});
	const { fields, remove, append } = useFieldArray({
		control: control,
		name: "subtasks",
		rules: {
			required: "Required",
		},
	});
	const submitForm = (data: unknown) => {
		console.log(data);
	};

	return (
		<form
			className="prose max-w-xs mx-auto"
			onSubmit={handleSubmit(submitForm)}
		>
			<div className="mb-4 flex justify-between items-center">
				<h2 className="!m-0 text-primary-content">Add New Task</h2>
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
			<span>Note: Task is added to the currently active board</span>
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
			<div className="form-control w-full max-w-xs mb-4">
				<label className="label">
					<span className="label-text">Subtasks</span>
				</label>
				{fields.map((_, index) => {
					return (
						<div key={index}>
							<div className="flex mb-2">
								<input
									type="text"
									{...register(`subtasks.${index}.title`, {
										required: "This field is required",
									})}
									id={`subtasks.${index}.title`}
									placeholder="e.g Take coffee break"
									className="input input-bordered focus:outline-offset-0 w-full rounded-r-none"
								/>
								<button
									type="button"
									className="btn btn-ghost rounded-l-none btn-outline"
									onClick={() => remove(index)}
								>
									<Icon icon="bi:x-circle" />
								</button>
							</div>
							{errors.subtasks && (errors.subtasks as [])?.at(index) && (
								<label className="label" htmlFor={`subtasks.${index}.title`}>
									<span className="label-text text-error">
										<ErrorMessage
											errors={errors}
											name={`subtasks.${index}.title`}
										/>
									</span>
								</label>
							)}
						</div>
					);
				})}
				<button
					type="button"
					className="btn btn-ghost btn-outline"
					onClick={() => append({ title: "" })}
				>
					+ Add Subtask
				</button>
			</div>
			<div className="form-control w-full max-w-xs mb-4 ">
				<label className="label" htmlFor="status">
					<span className="label-text">Status</span>
				</label>
				<select
					className="select select-bordered"
					defaultValue={0}
					id="status"
					{...register("status", {
						validate: (val) =>
							Number(val) > 0 || "You must select a valid status",
					})}
				>
					<option value={0} disabled>
						Select status
					</option>
				</select>
				<label className="label" htmlFor="status">
					<span className="label-text text-error">
						<ErrorMessage errors={errors} name="status" />
					</span>
				</label>
			</div>
			<button type="submit" className="btn btn-primary w-full max-w-xs">
				Submit
			</button>
		</form>
	);
}
