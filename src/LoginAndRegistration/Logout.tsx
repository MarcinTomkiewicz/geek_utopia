import { getAuth, signOut } from "firebase/auth";
import { Button } from "react-bootstrap";

export const Logout = () => {
	const handleLogout = () => {
		const auth = getAuth();
		signOut(auth)
			.then(() => {})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<Button variant="light" onClick={handleLogout}>
			Wyloguj
		</Button>
	);
};
