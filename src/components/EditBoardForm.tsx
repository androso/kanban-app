import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useEditBoard } from "../lib/hooks/boards";
import { Board, BoardFormTypes } from "../lib/types";
import BoardFormFields from "./BoardFormFields";

export default function EditBoardForm({
	boardToEdit,
	closeUpperModal,
}: {
	boardToEdit: Board | null;
	closeUpperModal: () => void;
}) {
	// here we're gonna use the hook
	const { mutateAsync } = useEditBoard();

	const form = useForm<BoardFormTypes>({
		defaultValues: {
			description: boardToEdit?.description || "",
			title: boardToEdit?.title || "",
		},
	});

	const submitForm = async (data: BoardFormTypes) => {
		try {
			if (boardToEdit) {
				await mutateAsync({
					...boardToEdit,
					description: data.description,
					title: data.title,
				});
				closeUpperModal();
			}
		} catch (e) {
			toast.error("Error while editing board");
		}
	};

	return (
		<form onSubmit={form.handleSubmit(submitForm)}>
			<BoardFormFields formMethods={form} mode="Edit" />
		</form>
	);
}
