import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Dispatch, SetStateAction } from "react";
import { useUser } from "../hooks/useUser";
import { ArticleParameters } from "./interfaces";

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
  setData: Dispatch<SetStateAction<DispatchTypes>> | Dispatch<SetStateAction<ArticleParameters>> | any;
  textarea?: boolean;
  disabled?: boolean;
  height?: number;
}

export const TextInput = ({ input, isRequired, type, name, data, setData, textarea, disabled, height }: Properties) => {
  const user = useUser();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (name === "tags") {
      const tags = e.target.value;
      setData({ ...data, [name]: tags.split("\n") });
    }
    setData({ ...data, [name]: e.target.value });
  };

  if (name === "author" && user?.name !== undefined) {
    data.author = user?.name;
  }
  if (name === "databaseTitle") {
    data.databaseTitle = `${data.category}_id_${data.id}`
  }

  return (
    <FloatingLabel  label={`${input}${isRequired === "true" ? "*" : " (opcjonalnie)"}`} className="mb-3" style={{fontSize: "0.75rem"}}>
      <Form.Control
        as={textarea ? "textarea" : 'input'}
        style={textarea ? {height: height, fontSize: "1rem"} : { height: "45px", fontSize: "1rem"}}
        className="form__control--input"
        type={type}
        placeholder={`${name}${isRequired === "true" ? "*" : " (opcjonalnie)"}`}
        required={isRequired === "true" ? true : false}
        disabled={disabled ? true : false}
        name={name}
        onChange={handleChange}
        value={name === "date" ? data.date.toDate().toLocaleString()+"."+data.date.toDate().getMilliseconds() : data[name]}
      />
    </FloatingLabel>
  );
};
