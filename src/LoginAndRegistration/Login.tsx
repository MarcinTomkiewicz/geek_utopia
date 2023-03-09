import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useUser } from "../hooks/useUser";
import { Button, Form, OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import Placeholder from "react-bootstrap/Placeholder";
import { TextInput } from "../utils/TextInput";
import { useLanguagePacks } from "../hooks/useLanguagePacks";
import { useLanguageSettings } from "../hooks/useLanguageSettings";
import { DispatchTypes, UserData } from "../utils/interfaces";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { BusyBox } from "../utils/BusyBox";

const initialValues: DispatchTypes = {
  email: "",
  password: "",
  error: "",
};

export const Login = ({ isModal }: any) => {
  const currentUser = useUser();
  const language = useLanguagePacks();
  const langCode = useLanguageSettings();

  const [user, setUser] = useState<DispatchTypes>(initialValues);

  const { email, password } = user;

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(user);
        const currentUserID = auth.currentUser !== null ? auth.currentUser.uid : "";
        updateDoc(doc(db, "users", currentUserID), {
          ...currentUser,
          is_online: true,
        });
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
      <h4 className="my-3">{isModal ? "" : language.labels?.logging[langCode]}</h4>
      <>
        {currentUser === undefined || language.labels === undefined ? (
          <Placeholder xs={12} style={{ height: "45px", marginBottom: "1rem", backgroundColor: "rgba(108, 67, 184, 0.7)", borderRadius: "10px", border: "white 1px solid" }} animation="wave" />
        ) : (
          <TextInput input={`${language.labels?.email[langCode]}`} isRequired="true" type="email" name="email" data={user} setData={setUser} />
        )}
      </>
      {currentUser === undefined || language.labels === undefined ? (
        <Placeholder xs={12} style={{ height: "45px", marginBottom: "1rem", backgroundColor: "rgba(108, 67, 184, 0.7)", borderRadius: "10px", border: "white 1px solid" }} animation="wave" />
      ) : (
        <TextInput input={`${language.labels?.password[langCode]}`} isRequired="true" type="password" name="password" data={user} setData={setUser} />
      )}

      {password.length === 0 || email.length === 0 ? (
        <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-login">{language.tooltips?.login_fill[langCode]}</Tooltip>}>
          <span className="d-inline-block">
            {currentUser === undefined || language.labels === undefined ? (
              <Placeholder.Button xs={12} style={{ height: "35px", width: "65px" }} size="lg" bg="info" animation="wave" />
            ) : (
              <Button type="submit" variant="info" disabled>
                {language.labels?.log_in[langCode]}!
              </Button>
            )}
          </span>
        </OverlayTrigger>
      ) : (
        <>
          {currentUser === undefined || language.labels === undefined ? (
            <Placeholder.Button xs={12} size="lg" bg="info" animation="wave" />
          ) : (
            <Button type="submit" className="" variant="light" color="secondary">
              {language.labels?.log_in[langCode]}!
            </Button>
          )}
        </>
      )}
    </Form>
  );
};
