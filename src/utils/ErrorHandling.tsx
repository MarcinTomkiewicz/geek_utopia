import { Alert } from "react-bootstrap";

export const ErrorHandling = ({ error }: any) => {

    return <Alert variant="danger">Error with code {error} occured</Alert>

};
