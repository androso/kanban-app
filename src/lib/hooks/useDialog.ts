import { useState } from "react";

export const useDialog = () => {
	const [showDialog, setShowDialog] = useState<boolean>(false);
	const openDialog = () => setShowDialog(true);
	const closeDialog = () => setShowDialog(false);
	return {
		openDialog,
		closeDialog,
		showDialog,
	};
};
