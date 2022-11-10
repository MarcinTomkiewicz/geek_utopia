import React, { useState } from "react";
import { db } from "../config/firebaseConfig";
import {
	doc,
	setDoc,
	collection,
	getDocs,
	addDoc,
	query,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";
import { useUser } from "../hooks/useUser";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Logout } from "./Logout";
import { Button } from "@mui/material";

const initialValues = {
	nickname: "",
	email: "",
	password: "",
	error: "",
};

const createUser = async (uid: string, nickname: string, email: string) => {
	await setDoc(doc(db, "users", uid), {
		mail: email,
		is_online: true,
		name: nickname,
	});
};

export const Registration = () => {
	const isLogged = useUser();
	const [user, setUser] = useState(initialValues);

	const usersFromDatabase: any[] = [];

	const { nickname, email, password } = user;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
			error: "",
		});
	};

	const checkUserNameInDb = async () => {
		const existingUser = query(collection(db, "users"));
		const allUsers = await getDocs(existingUser);

		allUsers.docs.forEach((user) => {
			usersFromDatabase.push(user.data().name);
		});
		return usersFromDatabase;
	};

	const createNewUser = (e: React.FormEvent<HTMLFormElement>) => {
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				createUser(user.uid, nickname, email);
				setUser(initialValues);
			})
			.catch((error) => {
				setUser({
					...user,
					error,
				});
			});
	};

	const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let isUserInDatabase: boolean = false;
		const usersExistingInDatabase = await checkUserNameInDb();
		usersExistingInDatabase.map((userName) => {
			if (userName === user.nickname) {
				return (isUserInDatabase = true);
			}
			return 0;
		});
		if (isUserInDatabase) {
			alert(
				`Uzytkownik o nazwie ${nickname} juz istnieje! Wybierz inną nazwę!`
			);
			setUser({ nickname: "", email: "", password: "", error: "" });
		} else {
			createNewUser(e);
		}
		isUserInDatabase = false;
	};

	return (
		<>
			{isLogged !== null && isLogged !== undefined ? (
				<Box
					component="div"
					sx={{
						width: "100%",
						height: "100%",
						display: "flex",
						alignItems: "center",
						flexDirection: "column",
						justifyContent: "space-around",
					}}
				>
					<div>Zalogowano jako {isLogged?.name}</div>
					<div>
						<Logout />
					</div>
				</Box>
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
					<label htmlFor="">
						<TextField
							label="Pseudonim"
							variant="standard"
							color="secondary"
							size="small"
							value={nickname}
							type="text"
							className="f"
							name="nickname"
							id="nickname"
							required
							style={{ paddingBottom: "10px", fontSize: "12px" }}
							onChange={handleChange}
						/>
					</label>
					<label htmlFor="">
						<TextField
							label="Email"
							variant="standard"
							color="secondary"
							size="small"
							value={email}
							type="email"
							className=""
							name="email"
							autoComplete="username email"
							id="signUp-email"
							required
							style={{ paddingBottom: "10px" }}
							onChange={handleChange}
						/>
					</label>
					<label htmlFor="">
						<TextField
							label="Hasło"
							variant="standard"
							color="secondary"
							size="small"
							value={password}
							type="password"
							className=""
							autoComplete="new-password"
							name="password"
							id="signUp-password"
							required
							sx={{ paddingBottom: "10px", color: "#fff" }}
							onChange={handleChange}
						/>
					</label>
					<br />
					{nickname.length === 0 ||
					password.length === 0 ||
					email.length === 0 ? (
						<Button
							type="submit"
							className=""
							variant="contained"
							disabled
						>
							Zarejestruj się!
						</Button>
					) : (
						<Button
							type="submit"
							className=""
							variant="contained"
							color="secondary"
						>
							Zarejestruj się!
						</Button>
					)}
				</Box>
				// </div>
			)}
		</>
	);
};
