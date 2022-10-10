import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import PageContainer from "../components/Layout/PageContainer";
import { useAuth } from "../lib/hooks/useAuth";
import useProtectedRoute from "../lib/hooks/useProtectedRoute";
import Navbar from "../components/Layout/Navbar";

export default function App() {
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
	return (
		<PageContainer>
			{status === "loading" ? (
				<LoadingSpinner />
			) : user ? (
				<Navbar>
					<h1>hello {user.email}</h1>
					<button className="btn btn-secondary" onClick={() => closeSession()}>
						Logout
					</button>
				</Navbar>
			) : null}
		</PageContainer>
	);
}
