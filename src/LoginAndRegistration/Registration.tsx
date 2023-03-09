import React, { useState } from "react";
import { db } from "../config/firebaseConfig";
import { doc, setDoc, collection, getDocs, addDoc, query } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";
import { useUser } from "../hooks/useUser";
import { Logout } from "./Logout";
import { Button, Form, OverlayTrigger, Placeholder, Tooltip } from "react-bootstrap";
import { TextInput } from "../utils/TextInput";
import { useLanguagePacks } from "../hooks/useLanguagePacks";
import { useLanguageSettings } from "../hooks/useLanguageSettings";
import { DispatchTypes } from "../utils/interfaces";

const initialValues: DispatchTypes = {
  nickname: "",
  email: "",
  password: "",
  error: "",
};

const createUser = async (uid: string, nickname: string | undefined, email: string, language: number) => {
  await setDoc(doc(db, "users", uid), {
    avatar: "",
    hobby: "",
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
            <Logout isInLeftPanel={false} />
          </div>
        </Form>
      ) : (
        <Form className={isModal ? "user__form--modal" : "user__form"} onSubmit={handleOnSubmit}>
          {isLogged === undefined || language.labels === undefined ? <h4 className="mb-4 mb-3">&nbsp;</h4> : <h4 className="mb-4 mt-3">{isModal ? "" : language.headers?.create_account[langCode]}</h4>}
          {isLogged === undefined || language.labels === undefined ? (
            <Placeholder xs={12} style={{ height: "45px", marginBottom: "1rem", backgroundColor: "rgba(108, 67, 184, 0.7)", borderRadius: "10px", border: "white 1px solid" }} animation="wave" />
          ) : (
            <TextInput input={`${language.labels?.nickname[langCode]}`} isRequired="true" type="text" name="nickname" data={user} setData={setUser} />
          )}

          {isLogged === undefined || language.labels === undefined ? (
            <Placeholder xs={12} style={{ height: "45px", marginBottom: "1rem", backgroundColor: "rgba(108, 67, 184, 0.7)", borderRadius: "10px", border: "white 1px solid" }} animation="wave" />
          ) : (
            <TextInput input={`${language.labels?.email[langCode]}`} isRequired="true" type="email" name="email" data={user} setData={setUser} />
          )}

          {isLogged === undefined || language.labels === undefined ? (
            <Placeholder xs={12} style={{ height: "45px", marginBottom: "1rem", backgroundColor: "rgba(108, 67, 184, 0.7)", borderRadius: "10px", border: "white 1px solid" }} animation="wave" />
          ) : (
            <TextInput input={`${language.labels?.password[langCode]}`} isRequired="true" type="password" name="password" data={user} setData={setUser} />
          )}
          {nickname?.length === 0 || password.length === 0 || email.length === 0 ? (
            <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-registration">{language.tooltips?.registration_fill[langCode]}</Tooltip>}>
              {isLogged === undefined || language.labels === undefined ? (
                <Placeholder.Button xs={12} style={{ height: "35px", width: "65px" }} size="lg" bg="info" animation="wave" />
              ) : (
                <span className="d-inline-block">
                  <Button type="submit" variant="info" disabled>
                    {language.headers?.create_account[langCode]}!
                  </Button>
                </span>
              )}
            </OverlayTrigger>
          ) : (
            <Button type="submit" className="" variant="light" color="secondary">
              {language.headers?.create_account[langCode]}!
            </Button>
          )}
        </Form>
      )}
    </>
  );
};
