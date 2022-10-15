import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useActiveBoardId } from "../lib/context/activeBoardId";
import { useCreateBoard } from "../lib/hooks/boards";
import { BoardFormTypes } from "../lib/types";
import BoardFormFields from "./BoardFormFields";

export default function NewBoardForm({
	closeUpperModal,
}: {
	closeUpperModal?: () => void;
}) {
	const form = useForm<BoardFormTypes>({});
	const { mutateAsync: createBoardAsync } = useCreateBoard();
	const { setActiveBoardId } = useActiveBoardId();
	const submitForm = async (data: BoardFormTypes) => {
		try {
			const boardCreated = await createBoardAsync(data);
			setActiveBoardId(boardCreated.id);
			closeUpperModal?.();
		} catch (e) {
			console.error(e);
			toast.error("Error while creating a board");
		}
	};
	
	return (
		<form
			className="prose max-w-xs mx-auto"
			onSubmit={form.handleSubmit(submitForm)}
		>
			<BoardFormFields formMethods={form} mode="New" />
		</form>
	);
}
