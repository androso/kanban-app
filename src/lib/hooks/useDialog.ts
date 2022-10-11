import { useState } from "react";

export const useDialog = () => {
	const [showDialog, setShowDialog] = useState<boolean>(false);
	const open = () => setShowDialog(true);
	const close = () => setShowDialog(false);
	return {
		open,
		close,
		showDialog,
	};
};
