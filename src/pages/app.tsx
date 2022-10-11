import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import PageContainer from "../components/Layout/PageContainer";
import { useAuth } from "../lib/hooks/useAuth";
import useProtectedRoute from "../lib/hooks/useProtectedRoute";
import Navbar from "../components/Layout/Navbar";
import { useBoards } from "../lib/hooks/boards";
import Drawer from "../components/Layout/Drawer";
import {
	ActiveBoardIdProvider,
	useActiveBoardId,
} from "../lib/context/activeBoardId";

export default function AppWrapper() {
	return (
		<>
			<ActiveBoardIdProvider>
				<App />
			</ActiveBoardIdProvider>
		</>
	);
}

function App() {
	// if user is not logged in, redirect to /login
	// if user is logged in, allow them access.
	const { user, status } = useProtectedRoute();
	const { logout } = useAuth();
	const closeSession = async () => {
		try {
			await logout();
		} catch (e) {
			toast.error("Error while logging out");
		}
	};
	const { boards, status: boardsStatus } = useBoards();
	// if it's null, means user dosn't have any boards created.
	// const [activeBoardId, setActiveBoardId] = useState<number | null>(null);
	const { activeBoardId, setActiveBoardId } = useActiveBoardId();

	return (
		<PageContainer>
			{status === "loading" ? (
				<LoadingSpinner />
			) : user ? (
				<Drawer
					activeBoardId={activeBoardId}
					setActiveBoardId={setActiveBoardId}
				>
					<Navbar
						activeBoardId={activeBoardId}
						setActiveBoardId={setActiveBoardId}
					/>
					<h1>hello {user.email}</h1>
					<p>
						You{`'`}re currently using board: {activeBoardId}
					</p>
				</Drawer>
			) : null}
		</PageContainer>
	);
}
