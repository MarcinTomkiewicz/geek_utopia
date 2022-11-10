import { Button } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";

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
		<Button variant="contained" color="error" onClick={handleLogout}>
			Wyloguj
		</Button>
	);
};
