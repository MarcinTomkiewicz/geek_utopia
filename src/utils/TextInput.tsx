import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Dispatch, SetStateAction } from "react";
import { ArticleParameters } from "../AdminPanel/AdminPanel";
import { Timestamp } from "firebase/firestore";
import { useHighestId } from "../hooks/useHighestId";
import { useUser } from "../hooks/useUser";

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
}

export const TextInput = ({ input, isRequired, type, name, data, setData, textarea, disabled }: Properties) => {
  const user = useUser();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        style={textarea ? {height: "200px", fontSize: "1rem"} : { height: "45px", fontSize: "1rem"}}
        className="form__control--input"
        type={type}
        placeholder={`${name}${isRequired === "true" ? "*" : " (opcjonalnie)"}`}
        required={isRequired === "true" ? true : false}
        disabled={disabled ? true : false}
        name={name}
        onChange={handleChange}
        value={name === "date" ? data.date.toDate() : data[name]}
      />
    </FloatingLabel>
  );
};
