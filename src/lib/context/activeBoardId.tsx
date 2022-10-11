import { createContext, useContext, useEffect, useState } from "react";

const ActiveBoardContext = createContext<
	| {
			activeBoardId: number | undefined;
			setActiveBoardId: (id: number) => void;
	  }
	| undefined
>(undefined);

const ActiveBoardIdProvider = ({ children }: { children: React.ReactNode }) => {
	const [activeBoardId, dispatch] = useState<number>();

	useEffect(() => {
		const newId =
			Number(window.localStorage.getItem("kanban-activeBoardId")) ?? undefined;
		dispatch(newId);
	}, []);

	const setActiveBoardId = (newId: number) => {
		window.localStorage.setItem("kanban-activeBoardId", newId.toString());
		dispatch(newId);
	};

	const value = { activeBoardId, setActiveBoardId };

	return (
		<ActiveBoardContext.Provider value={value}>
			{children}
		</ActiveBoardContext.Provider>
	);
};

const useActiveBoardId = () => {
	const context = useContext(ActiveBoardContext);
	if (context === undefined) {
		throw new Error(
			"useActiveBoardId must be used within a ActiveBoardIdProvider"
		);
	}
	return context;
};

export { useActiveBoardId, ActiveBoardIdProvider };
