import { getAuth, signOut } from "firebase/auth";
import { Button, Placeholder } from "react-bootstrap";
import { useUser } from "../hooks/useUser";
import { useLanguagePacks } from "../hooks/useLanguagePacks";
import { useLanguageSettings } from "../hooks/useLanguageSettings";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

interface LogoutType {
  isInLeftPanel: boolean;
}

export const Logout = ({ isInLeftPanel }: LogoutType) => {
  const user = useUser();
  const language = useLanguagePacks();
  const langCode = useLanguageSettings();

  const handleLogout = () => {
    const auth = getAuth();
    updateDoc(doc(db, "users", user.uid), {
      ...user,
      is_online: false,
    });
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={!isInLeftPanel ? "user__form" : "logout__button"}>
      {user === undefined || language.labels === undefined ? (
        <Placeholder.Button xs={12} style={{ height: "35px", width: "65px" }} size="lg" bg="info" animation="wave" />
      ) : (
        <Button variant="info" onClick={handleLogout}>
          {language.buttons?.log_out[langCode]}!
        </Button>
      )}
    </div>
  );
};
