import { useUser } from "../../hooks/useUser";
import { db, storage } from "../../config/firebaseConfig";
import { doc, setDoc, collection, getDocs, addDoc, query, Timestamp, updateDoc } from "firebase/firestore";
import { ChangeEvent, FormEvent, FormEventHandler, MouseEventHandler, SetStateAction, useEffect, useState } from "react";
import { Alert, Button, Col, Form, FormCheck, Row } from "react-bootstrap";
import { TextInput } from "../../utils/TextInput";
import { useHighestId } from "../../hooks/useHighestId";
import { getDownloadURL, ref, StorageReference, uploadBytesResumable } from "firebase/storage";
import { ArticleParameters } from "../../utils/interfaces";

const currentDate = new Date();

export const AddArticle = (): JSX.Element => {
  const user = useUser();

  const [success, setSuccess] = useState<boolean>(false);
  const [formError, setFormError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [articleType, setArticleType] = useState<string>("news");
  let highestIdFromHook = useHighestId(articleType);

  const parameters: ArticleParameters = {
    category: `${articleType}`,
    id: highestIdFromHook + 1,
    title: "",
    content: "",
    author: "",
    date: Timestamp.fromDate(currentDate),
    picture: "",
    rating: [],
    tags: [],
    short_descr: "",
    isOnline: false,
    isAdult: false,
    databaseTitle: "",
  };

  const [file, setFile] = useState<any>("");
  const [displayFile, setDisplayFile] = useState<any>();
  const [percent, setPercent] = useState<number>(0);
  const [data, setData] = useState<ArticleParameters>(parameters);
  const [articleDatabaseName, setArticleDatabaseName] = useState<string>(`${data.category}_id_${data.id}`);
  const [obj, setObj] = useState<any>({});
  const [hashtags, setTags] = useState<string[]>([])

  useEffect(() => {
    if (parameters.id > 1) {
      setData({ ...data, id: highestIdFromHook + 1 });
    } else {
      return;
    }
  }, [highestIdFromHook]);

  // Handle file upload event and update state
  const handleChange = (event: any) => {
    setFile(event.target.files[0]);
    setDisplayFile(URL.createObjectURL(event.target.files[0]));   
  }

  const handleUpload = () => {
    const storageRef = ref(storage, `/files/${data.id}/${file.name}`);

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
          setData({ ...data, picture: url });
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
        picture: newArticleData.picture,
        rating: newArticleData.rating,
        short_descr: newArticleData.short_descr,
        tags: newArticleData.tags,
        is_online: newArticleData.isOnline,
        is_adult: newArticleData.isAdult,
      },
    });
  };

  const handleSwitch = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.checked });
  };

  const { category, id, title, content, author, date, picture, tags, short_descr, isOnline, isAdult } = data;

  const resetForm = (e?: React.MouseEvent<HTMLElement>) => {
    setData({ ...parameters });
    setArticleDatabaseName(`${data.category}_id_${data.id}`);
    if (e?.currentTarget.id === "cancel") {
      setSuccess(false);
    }
  }; 

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload an image first!");
      return;
    }
    data.tags = data.tags.toString().split("\n");
    console.log(data.tags);
    

    handleUpload();
    if (data.databaseTitle !== "" && data.picture !== "") {
      try {
          addArticle(data)
          setSuccess(true);
          resetForm();
        }
        catch(err: unknown) {
          console.log(err);
          setFormError((prev) => !prev);
          if (err instanceof Error) {
            setError(err.message);
          }
          console.log(error);
        };
    }
  };

  return (
    <div className="articles__content--wrapper">
      {success ? (
        <Alert variant="success" style={{ width: "80%", alignSelf: "center" }}>
          Artykuł "{data.title}" został pomyślnie dodany do bazy pod id: {data.id}
        </Alert>
      ) : (
        ""
      )}
      {formError ? (
        <Alert variant="danger">
          Artykuł "{data.title}" nie został dodany. Powód: {error}
        </Alert>
      ) : (
        ""
      )}
      <h1 className="text-center mb-4">Dodaj {articleType}</h1>
      <Form
        style={{
          width: "80%",
          alignSelf: "center",
          alignItems: "center",
        }}
        onSubmit={handleSubmit}>
        <TextInput input="Tytuł" isRequired="true" type="text" name="title" data={data} setData={setData} />
        <TextInput input="Krótki opis" isRequired="true" type="text" name="short_descr" data={data} setData={setData} textarea height={75} />
        <TextInput input="Treść" isRequired="true" type="text" name="content" data={data} setData={setData} textarea height={200} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          className="pb-3">
          <Form.Group controlId="formFile">
            <Form.Label>Dodaj obrazek</Form.Label>
            <Form.Control className="form__control--input" type="file" accept="image/*" onChange={handleChange} />
          </Form.Group>
          {file ? <img src={displayFile} style={{maxHeight: "200px"}}></img> : ''}
          </div>
          <div
         className="d-flex flex-row justify-content-between align-items-center gap-5">
          <TextInput input="Data dodania" isRequired="true" disabled type="text" name="date" data={data} setData={setData} />
          <TextInput input="Tagi" isRequired="true" type="text" name="tags" data={data} setData={setData} textarea height={100}/>
          <TextInput input="ID Newsa" isRequired="true" disabled type="number" name="id" data={data} setData={setData} />
        </div>
        <div
          className="d-flex flex-row justify-content-between align-items-center gap-5">
          <div className="d-flex flex-column justify-content-between align-items-start w-100">
            <Form.Check type="switch" label="Opublikować?" id="isOnline" name="isOnline" onChange={handleSwitch} className="me-3"></Form.Check>
            <Form.Check type="switch" label="Tylko dla dorosłych?" id="isAdult" name="isAdult" onChange={handleSwitch} className="mb-3 me-3"></Form.Check>
          </div>
          <TextInput input="Autor" isRequired="true" disabled type="text" name="author" data={data} setData={setData} />
          <TextInput input="Nazwa w bazie" isRequired="true" disabled type="text" name="databaseTitle" data={data} setData={setData} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}>
          <Button variant="info" type="submit">
            Zapisz dane
          </Button>
          <Button variant="warning" type="reset" onClick={resetForm} id="cancel">
            Wyczyść formularz
          </Button>
        </div>
      </Form>
    </div>
  );
};
