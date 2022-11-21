import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useUser } from "../hooks/useUser";
import { Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { DispatchTypes, TextInput } from "../utils/TextInput";
import { useLanguagePacks } from "../hooks/useLanguagePacks";
import { useLanguageSettings } from "../hooks/useLanguageSettings";

const initialValues: DispatchTypes = {
  email: "",
  password: "",
  error: "",
};

export const Login = ({ isModal }: any) => {
  const isLogged = useUser();
  const language = useLanguagePacks();
  const langCode = useLanguageSettings();

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

  return (
    <Form onSubmit={handleOnSubmit} className={isModal ? "user__form--modal" : "user__form"}>
      <h4 className="mb-4">{isModal ? '' : language.labels?.logging[langCode]}</h4>
      <TextInput input={`${language.labels?.email[langCode]}`} isRequired="true" type="email" name="email" data={user} setData={setUser} />
      <TextInput input={`${language.labels?.password[langCode]}`} isRequired="true" type="password" name="password" data={user} setData={setUser} />
      {password.length === 0 || email.length === 0 ? (
        <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-login">Podaj login i hasło, aby aktywować przycisk.</Tooltip>}>
          <span className="d-inline-block">
            <Button type="submit" variant="light" disabled>
            {language.labels?.log_in[langCode]}!
            </Button>
          </span>
        </OverlayTrigger>
      ) : (
        <Button type="submit" className="" variant="info" color="secondary">
          {language.labels?.log_in[langCode]}!
        </Button>
      )}
    </Form>
  );
};
