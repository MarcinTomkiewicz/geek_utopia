import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Dispatch, SetStateAction } from "react";

export interface DispatchTypes {
  nickname?: string;
  email: string;
  password: string;
  error?: string;
}

interface Properties {
  input: string;
  isRequired: string;
  type: string;
  name: string;
  data: any;
  setData: Dispatch<SetStateAction<DispatchTypes>>;
}

export const TextInput = ({ input, isRequired, type, name, data, setData }: Properties) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [name]: e.target.value });
  };

  return (
    <FloatingLabel  label={`${input}${isRequired === "true" ? "*" : " (opcjonalnie)"}`} className="mb-3" style={{fontSize: "0.75rem"}}>
      <Form.Control
        style={{ height: "45px", fontSize: "1rem"}}
        className="form__control--input"
        type={type}
        placeholder={`${name}${isRequired === "true" ? "*" : " (opcjonalnie)"}`}
        required={isRequired === "true" ? true : false}
        name={name}
        onChange={handleChange}
        value={data[name]}
      />
    </FloatingLabel>
  );
};
