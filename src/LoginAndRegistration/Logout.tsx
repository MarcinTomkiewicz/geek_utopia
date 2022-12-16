import { getAuth, signOut } from "firebase/auth";
import { Button, Spinner } from "react-bootstrap";
import { useUser } from "../hooks/useUser";
import { useLanguagePacks } from "../hooks/useLanguagePacks";
import { useLanguageSettings } from "../hooks/useLanguageSettings";

interface LogoutType {
  isInLeftPanel: boolean
}

export const Logout = ({isInLeftPanel}: LogoutType) => {
  const language = useLanguagePacks();
  const langCode = useLanguageSettings();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const user = useUser();

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
