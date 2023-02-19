import { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useUser } from "../hooks/useUser";
import { Properties } from "./interfaces";

export const TextInput = ({ input, isRequired, type, name, data, setData, textarea, disabled, height }: Properties) => {
  const user = useUser();
  
  const [tags, setTags] = useState<string[]>([])

  const convertTagsToArray = (tagFromForm: string): void => {
    if (tagFromForm.includes('\n')) {
      return data.tags.push(tagFromForm.substring(0, tagFromForm.length-3))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (name === "tags") {
      // const tags = e.target.value;
      // setTags(data.tags.push(e.target.value.split("\n")))
      convertTagsToArray(e.target.value)
      setData({ ...data, [name]: tags });
    }
    else {
    setData({ ...data, [name]: e.target.value });
    }
  };  

  if (name === "author" && user?.name !== undefined) {
    data.author = user?.name;
  }
  if (name === "databaseTitle") {
    data.databaseTitle = `${data.category}_id_${data.id}`
  }

  return (
    <FloatingLabel  label={`${input}${isRequired === "true" ? "*" : " (opcjonalnie)"}`} className="d-flex mb-3 w-100" style={{fontSize: "0.75rem"}}>
      <Form.Control
        as={textarea ? "textarea" : 'input'}
        style={textarea ? {height: height, fontSize: "1rem"} : { height: "45px", fontSize: "12px"}}
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
