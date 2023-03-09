import { FunctionComponent, useEffect, useState } from "react";
import { Registration } from "../LoginAndRegistration/Registration";
import { Login } from "../LoginAndRegistration/Login";
import { useUser } from "../hooks/useUser";
import { Logout } from "../LoginAndRegistration/Logout";
import { useLanguagePacks } from "../hooks/useLanguagePacks";
import { useLanguageSettings } from "../hooks/useLanguageSettings";
import { ShowUserProfile } from "../UserProfile/ShowUserProfile";
import { BusyBox } from "../utils/BusyBox";

const LeftPanel: FunctionComponent = () => {
  const user = useUser();
  const language = useLanguagePacks();
  const langCode = useLanguageSettings();

  const [panelChanger, setPanelChanger] = useState<string>("login");
  const [leftPanel, setLeftPanel] = useState<JSX.Element>(<Login isModal={false} />);

  useEffect(() => {
    if (user === null && panelChanger === "login") {
      setLeftPanel(<Login isModal={false} />);
    }
    if (user === null && panelChanger === "register") {
      setLeftPanel(<Registration isModal={false} />);
    }
    if (user !== null) {
      setLeftPanel(<ShowUserProfile isInLeftPanel />);
    }
  }, [panelChanger, user]);

  const determinePanels = () => {
    if (user === null && panelChanger === "register") {
      return (
        <div
          style={{
            marginTop: "2rem",
            textAlign: "center",
            width: "80%",
          }}>
          {language.labels?.has_account[langCode]}{" "}
          <button
            className="logon"
            style={{ padding: "0" }}
            onClick={() => {
              setPanelChanger("login");
            }}>
            {language.labels?.log_in[langCode]}!
          </button>
        </div>
      );
    }
    else if (user === null && panelChanger === "login") {
      return (
        <div
          style={{
            marginTop: "2rem",
            textAlign: "center",
            width: "80%",
          }}>
          {language.labels?.no_account[langCode]}{" "}
          <button
            className="logon"
            style={{ padding: "0" }}
            onClick={() => {
              setPanelChanger("register");
            }}>
            {language.labels?.register[langCode]}!
          </button>
        </div>
      );
    }
  };

  return (
    <>
      {leftPanel}
      {language.labels === undefined ? '' : determinePanels()}
    </>
  );
};

export default LeftPanel;
