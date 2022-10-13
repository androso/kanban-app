import React from "react";
import { useForm } from "react-hook-form";
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
	const { mutate: createBoard, status, data } = useCreateBoard();
	const submitForm = async (data: BoardFormTypes) => {
		createBoard(data);
	};
	const { setActiveBoardId } = useActiveBoardId();

	React.useEffect(() => {
		if (status === "success" && data && closeUpperModal) {
			setActiveBoardId(data.id);
			closeUpperModal();
		}
	}, [status, data, closeUpperModal, setActiveBoardId]);

	return (
		<form
			className="prose max-w-xs mx-auto"
			onSubmit={form.handleSubmit(submitForm)}
		>
			<BoardFormFields formMethods={form} mode="New" />
		</form>
	);
}
