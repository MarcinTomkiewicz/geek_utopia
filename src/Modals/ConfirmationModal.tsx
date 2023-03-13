import { Button, Form, Modal } from "react-bootstrap";

import { ConfirmationModalProps } from "../utils/interfaces";

export const ConfirmationModal = ({ confirm, setConfirm, modalText, modalHeader, open, close }: ConfirmationModalProps) => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setConfirm(true);
    close(false);
  };

  return (
    <Modal
      //   size="lg"
      show={open}
      onHide={() => close(false)}
      centered
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "flex-start",
        marginTop: "1.5em",
      }}>
      <Modal.Header closeButton closeVariant="white" style={{ backgroundColor: "rgba(161, 14, 184)" }}>
        <Modal.Title>{modalHeader}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "rgba(0, 0, 0)" }} className="d-flex justify-content-center align-items-center flex-column">
        <h1 className="text-center mb-4">{modalHeader}</h1>
        <div>{modalText}</div>
        <Form
          style={{
            width: "80%",
            alignSelf: "center",
            alignItems: "center",
          }}
          onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}>
            <Button variant="info" type="submit">
              {modalHeader}
            </Button>
            <Button variant="warning" type="reset" onClick={() => close(false)} id="cancel">
              Anuluj
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
