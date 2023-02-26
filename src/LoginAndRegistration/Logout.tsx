import { getAuth, signOut } from "firebase/auth";
import { Button, Spinner } from "react-bootstrap";
import { useUser } from "../hooks/useUser";
import { useLanguagePacks } from "../hooks/useLanguagePacks";
import { useLanguageSettings } from "../hooks/useLanguageSettings";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

interface LogoutType {
  isInLeftPanel: boolean
}

export const Logout = ({isInLeftPanel}: LogoutType) => {
  const user = useUser();
  const language = useLanguagePacks();
  const langCode = useLanguageSettings();

  const handleLogout = () => {
    const auth = getAuth();
    updateDoc(doc(db, "users", user.uid), {
      ...user, is_online: false
    })
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };


  if(language === undefined) {
    return <Spinner animation="border" variant="info" size="sm" />
  }

  return (
    <div
      className={!isInLeftPanel ? "user__form" : "logout__button"}>
      <Button variant="info" onClick={handleLogout}>
	  {language.buttons?.log_out[langCode]}!
      </Button>
    </div>
  );
};
