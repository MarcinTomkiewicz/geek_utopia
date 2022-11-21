import { getAuth, signOut } from "firebase/auth";
import { Button } from "react-bootstrap";
import { useUser } from "../hooks/useUser";
import { useLanguagePacks } from "../hooks/useLanguagePacks";
import { useLanguageSettings } from "../hooks/useLanguageSettings";

export const Logout = () => {
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

  return (
    <div
      style={{
        width: "80%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "flex-start",
        marginTop: "1.5em",
      }}>
      <Button variant="info" onClick={handleLogout}>
	  {language.buttons?.log_out[langCode]}!
      </Button>
    </div>
  );
};
