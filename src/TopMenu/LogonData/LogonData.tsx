import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useLanguagePacks } from "../../hooks/useLanguagePacks";
import { useLanguageSettings } from "../../hooks/useLanguageSettings";
import { useUser } from "../../hooks/useUser";
import { Login } from "../../LoginAndRegistration/Login";
import { Registration } from "../../LoginAndRegistration/Registration";

export const LogonData = () => {
  const user = useUser();
  const language = useLanguagePacks();
  const langCode = useLanguageSettings();

  const [determineModal, setdetermineModal] = useState<JSX.Element>(<Login />);
  const [panelChanger, setPanelChanger] = useState<string>("login");
  const [modalTitle, setModalTitle] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (user === null && panelChanger === "login") {
      setdetermineModal(<Login isModal={true} />);
      setModalTitle(language.labels?.logging[langCode]);
    }
    if (user === null && panelChanger === "register") {
      setdetermineModal(<Registration isModal={true} />);
      setModalTitle(language.headers?.create_account[langCode]);
    }
  }, [panelChanger, user]);

  const openModal = () => {
    setShowModal(true);
    setModalTitle(language.labels?.logging[langCode]);
  };

  const hideModal = () => {
	setShowModal(false);
	setPanelChanger('login');
  }

  const determinePanels = () => {
    if (user === null && panelChanger === "register") {
      return (
        <div
          style={{
            marginTop: "2rem",
            textAlign: "center",
            width: "100%",
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
    if (user === null && panelChanger === "login") {
      return (
        <div
          style={{
            marginTop: "2rem",
            textAlign: "center",
            width: "100%",
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
  if (user !== null && user !== undefined) {
    return (
      <button className="logon" style={{ cursor: "unset" }}>
        {language.labels?.greet[langCode]} {user?.name}!
      </button>
    );
  } else {
    return (
      <>
        <button className="logon" onClick={openModal}>
          {language.labels?.logging[langCode]}
        </button>
        <Modal
          size="sm"
          show={showModal}
          onHide={hideModal}
          aria-labelledby="example-modal-sizes-login-lg"
          centered
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "flex-start",
            marginTop: "1.5em",
          }}>
          <Modal.Header closeButton closeVariant="white" style={{ backgroundColor: "rgba(161, 14, 184)" }}>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "rgba(0, 0, 0)" }}>
            {determineModal}
            {determinePanels()}
          </Modal.Body>
        </Modal>
      </>
    );
  }
};
