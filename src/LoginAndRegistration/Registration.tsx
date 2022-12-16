import React, { useState } from "react";
import { db } from "../config/firebaseConfig";
import { doc, setDoc, collection, getDocs, addDoc, query } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";
import { useUser } from "../hooks/useUser";
import { Logout } from "./Logout";
import { Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { DispatchTypes, TextInput } from "../utils/TextInput";
import { useLanguagePacks } from "../hooks/useLanguagePacks";
import { useLanguageSettings } from "../hooks/useLanguageSettings";

const initialValues: DispatchTypes = {
  nickname: "",
  email: "",
  password: "",
  error: "",
};

const createUser = async (uid: string, nickname: string | undefined, email: string, language: number) => {
  await setDoc(doc(db, "users", uid), {
    mail: email,
    is_online: true,
    is_admin: false,
    name: nickname,
    language: language,
  });
};

export const Registration = ({ isModal }: any) => {
  const isLogged = useUser();
  const language = useLanguagePacks();
  const langCode = useLanguageSettings();
  const [user, setUser] = useState<DispatchTypes>(initialValues);

  const { nickname, email, password } = user;

  const createNewUser = (e: React.FormEvent<HTMLFormElement>) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        createUser(user.uid, nickname, email, langCode);
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
    createNewUser(e);
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
          <div>
            {language.labels?.already_logged[langCode]} {isLogged?.name}
          </div>
          <div>
            <Logout isInLeftPanel={false}/>
          </div>
        </Form>
      ) : (
        <Form className={isModal ? "user__form--modal" : "user__form"} onSubmit={handleOnSubmit}>
          <h4 className="mb-4">{isModal ? '' : language.headers?.create_account[langCode]}</h4>
          <TextInput input={`${language.labels?.nickname[langCode]}`} isRequired="true" type="text" name="nickname" data={user} setData={setUser} />

          <TextInput input={`${language.labels?.email[langCode]}`} isRequired="true" type="email" name="email" data={user} setData={setUser} />

          <TextInput input={`${language.labels?.password[langCode]}`} isRequired="true" type="password" name="password" data={user} setData={setUser} />
          {nickname?.length === 0 || password.length === 0 || email.length === 0 ? (
            <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-registration">{language.tooltips?.registration_fill[langCode]}</Tooltip>}>
              <span className="d-inline-block">
                <Button type="submit" variant="light" disabled>
                  {language.headers?.create_account[langCode]}!
                </Button>
              </span>
            </OverlayTrigger>
          ) : (
            <Button type="submit" className="" variant="info" color="secondary">
              {language.headers?.create_account[langCode]}!
            </Button>
          )}
        </Form>
      )}
    </>
  );
};