import React, { useState } from "react";
import { db } from "../config/firebaseConfig";
import { doc, setDoc, collection, getDocs, addDoc, query } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";
import { useUser } from "../hooks/useUser";
import { Logout } from "./Logout";
import { Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { DispatchTypes, TextInput } from "../utils/TextInput";

const initialValues: DispatchTypes = {
  nickname: "",
  email: "",
  password: "",
  error: "",
};

const createUser = async (uid: string, nickname: string | undefined, email: string) => {
  await setDoc(doc(db, "users", uid), {
    mail: email,
    is_online: true,
    name: nickname,
  });
};

export const Registration = () => {
  const isLogged = useUser();
  const [user, setUser] = useState<DispatchTypes>(initialValues);

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
      alert(`Uzytkownik o nazwie ${nickname} juz istnieje! Wybierz inną nazwę!`);
      setUser({ nickname: "", email: "", password: "", error: "" });
    } else {
      createNewUser(e);
    }
    isUserInDatabase = false;
  };

  return (
    <>
      {isLogged !== null && isLogged !== undefined ? (
        <Form
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-around",
          }}>
          <div>Zalogowano jako {isLogged?.name}</div>
          <div>
            <Logout />
          </div>
        </Form>
      ) : (
        <Form
          style={{
            width: "80%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "flex-start",
            marginTop: "1.5em",
          }}
          onSubmit={handleOnSubmit}>
			<h4 className="mb-4">Rejestracja</h4>
          <TextInput input="Pseudonim" isRequired="true" type="text" name="nickname" data={user} setData={setUser} />

          <TextInput input="Email" isRequired="true" type="email" name="email" data={user} setData={setUser} />

          <TextInput input="Hasło" isRequired="true" type="password" name="password" data={user} setData={setUser} />
          {nickname?.length === 0 || password.length === 0 || email.length === 0 ? (
			<OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-registration">Musisz wypełnić wszystkie pola, aby aktywować przycisk.</Tooltip>}>
			<span className="d-inline-block">
            <Button type="submit" variant="light" disabled>
              Zarejestruj się!
            </Button>
			</span>
			</OverlayTrigger>
          ) : (
            <Button type="submit" className="" variant="info" color="secondary">
              Zarejestruj się!
            </Button>
          )}
        </Form>
      )}
    </>
  );
};
