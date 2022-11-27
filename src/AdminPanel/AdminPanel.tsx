import { useUser } from "../hooks/useUser";
import { db, storage } from "../config/firebaseConfig";
import { doc, setDoc, collection, getDocs, addDoc, query, Timestamp, updateDoc } from "firebase/firestore";
import { ChangeEvent, FormEvent, FormEventHandler, useEffect, useState } from "react";
import { Button, Col, Form, FormCheck, Row } from "react-bootstrap";
import { TextInput } from "../utils/TextInput";
import { useHighestId } from "../hooks/useHighestId";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export interface ArticleParameters {
  category: string;
  id: number;
  title: string;
  content: string;
  author: string;
  date: Timestamp;
  tags: string[];
  isOnline: boolean;
  isAdult: boolean;
  databaseTitle: string;
}

const currentDate = new Date();

export const AdminPanel = () => {
  const user = useUser();
  let highestIdFromHook = useHighestId();

  const parameters: ArticleParameters = {
    category: "news",
    id: highestIdFromHook + 1,
    title: "",
    content: "",
    author: "",
    date: Timestamp.fromDate(currentDate),
    tags: [""],
    isOnline: false,
    isAdult: false,
    databaseTitle: "",
  };

  const [data, setData] = useState<ArticleParameters>(parameters);
  const [articleDatabaseName, setArticleDatabaseName] = useState<string>(`${data.category}_id_${data.id}`);
  const [file, setFile] = useState<any>("");
  const [percent, setPercent] = useState<number>(0);

  // Handle file upload event and update state
  function handleChange(event: any) {
    setFile(event.target.files[0]);
  }

  const handleUpload = () => {
    const storageRef = ref(storage, `/files/${file.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
        });
      }
    );
  };

  const addArticle = async (newArticleData: ArticleParameters) => {
    await updateDoc(doc(db, "content", newArticleData.category), {
      [newArticleData.databaseTitle]: {
        id: newArticleData.id,
        title: newArticleData.title,
        content: newArticleData.content,
        author: newArticleData.author,
        date: newArticleData.date,
        tags: newArticleData.tags,
        is_online: newArticleData.isOnline,
        is_adult: newArticleData.isAdult,
      },
    });
  };

  const handleSwitch = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.checked });
  };

  //   const handleChange = (e: any) => {
  //     setFile(e.target.files[0]);
  //   };

  const { category, id, title, content, author, date, tags, isOnline, isAdult } = data;

  const resetForm = () => {
    setArticleDatabaseName(`${data.category}_id_${data.id}`);
    setData({
      category: "news",
      id: highestIdFromHook + 1,
      title: "",
      content: "",
      author: "",
      date: Timestamp.fromDate(currentDate),
      tags: [""],
      isOnline: false,
      isAdult: false,
      databaseTitle: articleDatabaseName,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload an image first!");
    }
    if (data.databaseTitle !== "") {
      addArticle(data);
      handleUpload();
      resetForm();
    } else {
      console.log("Shit");
    }
  };

  return (
    <div className="articles__content--wrapper">
      <h1 className="text-center mb-4">Dodaj newsa</h1>
      <Form
        style={{
          width: "80%",
          alignSelf: "center",
          alignItems: "center",
        }}
        onSubmit={handleSubmit}>
        <TextInput input="Tytuł" isRequired="true" type="text" name="title" data={data} setData={setData} />
        <TextInput input="Treść" isRequired="true" type="text" name="content" data={data} setData={setData} textarea />
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Dodaj obrazek</Form.Label>
          <Form.Control className="form__control--input" type="file" accept="image/*" onChange={handleChange} />
        </Form.Group>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <TextInput input="Data dodania" isRequired="true" disabled type="text" name="date" data={data} setData={setData} />
          <TextInput input="ID Newsa" isRequired="true" disabled type="number" name="id" data={data} setData={setData} />
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start" }}>
            <Form.Check type="switch" label="Opublikować?" id="isOnline" name="isOnline" onChange={handleSwitch} className="me-3"></Form.Check>
            <Form.Check type="switch" label="Tylko dla dorosłych?" id="isAdult" name="isAdult" onChange={handleSwitch} className="mb-3 me-3"></Form.Check>
          </div>
        </div>
        <TextInput input="Autor" isRequired="true" disabled type="text" name="author" data={data} setData={setData} />
        <TextInput input="Nazwa w bazie" isRequired="true" disabled type="text" name="databaseTitle" data={data} setData={setData} />
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
          <Button variant="info" type="submit">
            Zapisz dane
          </Button>
          <Button variant="warning" type="reset" onClick={resetForm}>
            Wyczyść formularz
          </Button>
        </div>
      </Form>
    </div>
  );
};
