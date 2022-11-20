import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useUser } from "../hooks/useUser";
import { Button, FloatingLabel, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { DispatchTypes, TextInput } from "../utils/TextInput";

const initialValues: DispatchTypes = {
  email: "",
  password: "",
  error: "",
};

export const Login = () => {
  const isLogged = useUser();

  const [user, setUser] = useState(initialValues);

  const { email, password } = user;

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setUser({
  //     ...user,
  //     [e.target.name]: e.target.value,
  //     error: "",
  //   });
  // };

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

  const renderTooltip = () => <Tooltip id="button-tooltip">Podaj login i hasło aby aktywować przycisk</Tooltip>;

  return (
    <Form
      onSubmit={handleOnSubmit}
      style={{
        width: "80%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "flex-start",
        marginTop: "1.5em",
      }}>
      <h4 className="mb-4">Logowanie</h4>
      <TextInput input="E-mail" isRequired="true" type="email" name="email" data={user} setData={setUser} />
      <TextInput input="Hasło" isRequired="true" type="password" name="password" data={user} setData={setUser} />
      {password.length === 0 || email.length === 0 ? (
        <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-login">Podaj login i hasło, aby aktywować przycisk.</Tooltip>}>
        <span className="d-inline-block">
          <Button type="submit" variant="light" disabled>
            Zaloguj się!
          </Button>
          </span>
        </OverlayTrigger>
      ) : (
        <Button type="submit" className="" variant="info" color="secondary">
          Zaloguj się!
        </Button>
      )}
    </Form>
  );
};
