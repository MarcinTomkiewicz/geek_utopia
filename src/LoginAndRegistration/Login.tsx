import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useUser } from "../hooks/useUser";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { grey } from "@mui/material/colors";
import {
	Button,
	createTheme,
	GlobalStyles,
	styled,
	withStyles,
} from "@mui/material";

const initialValues = {
	email: "",
	password: "",
	error: "",
};

const theme = createTheme({
	palette: {
		primary: grey,
	},
});

export const Login = () => {
	const isLogged = useUser();

	const [user, setUser] = useState(initialValues);

	const { email, password } = user;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
			error: "",
		});
	};

	const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const auth = getAuth();

		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				setUser(user);
			})
			.catch((error) => {
				setUser({
					...user,
					error,
				});
			});
	};

	const WhiteBorderTextField = styled(TextField)`
		& label.Mui-focused {
			color: white;
		}
		& .MuiOutlinedInput-root {
			&.Mui-focused fieldset {
				border-color: white;
			}
			border-color: white;
		}
	`;

	return (
		<>
			{isLogged !== null ? (
				<div>Zalogowano jako {isLogged?.name}</div>
			) : (
				<Box
					component="form"
					sx={{
						width: "80%",
						height: "100%",
						display: "flex",
						alignItems: "center",
						flexDirection: "column",
						justifyContent: "flex-start",
						marginTop: "1.5em",
					}}
					noValidate
					autoComplete="off"
					className=""
					id="signUp-form"
					onSubmit={handleOnSubmit}
				>
					<label htmlFor="logIn-email">
						<WhiteBorderTextField
							label="Email"
							// variant="standard"
							size="small"
							type="email"
							className=""
							inputProps={{
								style: { color: "white", border: "white" },
							}}
							InputLabelProps={{ style: { color: "white" } }}
							name="email"
							autoComplete="username email"
							id="logIn-email"
							required
							style={{ paddingBottom: "10px" }}
							onChange={handleChange}
						/>
					</label>
					<label htmlFor="logIn-password">
						<TextField
							label="Hasło"
							variant="standard"
							color="secondary"
							size="small"
							type="password"
							className=""
							autoComplete="current-password"
							name="password"
							id="logIn-password"
							style={{ paddingBottom: "10px" }}
							required
							onChange={handleChange}
						/>
					</label>
					<br />
					{password.length === 0 || email.length === 0 ? (
						<Button
							type="submit"
							className=""
							variant="contained"
							color="secondary"
							disabled
						>
							Zaloguj!
						</Button>
					) : (
						<Button
							type="submit"
							className=""
							variant="contained"
							color="secondary"
						>
							Zaloguj!
						</Button>
					)}
				</Box>
			)}
		</>
	);
};
