import { useUser } from "../../hooks/useUser";
import { db, storage } from "../../config/firebaseConfig";
import { doc, Timestamp, updateDoc } from "firebase/firestore";
import { ChangeEvent, FormEvent, useEffect, useState, MouseEvent } from "react";
import { Alert, Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { TextInput } from "../../utils/TextInput";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { AddArticleProps, ArticleParameters, CategoryInterface } from "../../utils/interfaces";
import { useGetCategories } from "../../hooks/useGetCategories";
import { useHighestId } from "../../hooks/useHighestId";
import { useGetArticles } from "../../hooks/useGetArticles";
import { CategoryModal } from "../../Modals/CategoryModal";
import { capitalizeFirstLetter } from "../../utils/helperFunctions";
import { useNavigate } from "react-router-dom";
import { ConfirmationModal } from "../../Modals/ConfirmationModal";

const Confirm = require("react-confirm-bootstrap");

const currentDate = new Date();

const initialParameters: ArticleParameters = {
  category: "",
  id: 0,
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

type UserFile = {
  file: File;
  url: string;
};

export const AddArticle = ({ categoryOfArticle, dataToEdit }: AddArticleProps): JSX.Element => {
  const user = useUser();
  const categories = useGetCategories();
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState(false);
  const [error, setError] = useState("");

  const [userFile, setUserFile] = useState<UserFile | null>(null);
  const [percent, setPercent] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const [isNewsOrArticle, setIsNewsOrArticle] = useState(categoryOfArticle);
  const [articleCategory, setArticleCategory] = useState<string[]>([""]);
  const articles = useGetArticles(categoryOfArticle);

  const [data, setData] = useState<ArticleParameters>(initialParameters);

  const highestIdFromHook = useHighestId(isNewsOrArticle);
  const [listOfCategories, setListOfCategories] = useState<string[]>([]);

  const [confirmationModal, setConfirmationModal] = useState(false)
  const [confirm, setConfirm] = useState(false);

  // Handle file upload event and update state
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setUserFile({
      url: URL.createObjectURL(e.target.files[0]),
      file: e.target.files[0],
    });
  };

  const handleUpload = async () => {
    if (!userFile) return;

    const storageRef = ref(storage, `/files/${data.id}/${userFile.file.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, userFile.file);

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
    await updateDoc(doc(db, "content", isNewsOrArticle), {
      [newArticleData.databaseTitle]: {
        category: newArticleData.category,
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

  const resetForm = (e?: MouseEvent<HTMLElement>) => {
    setData((prev: ArticleParameters) => ({
      ...initialParameters,
      type: isNewsOrArticle === "news" ? "news" : "article",
      id: prev.id,
      category: isNewsOrArticle === "news" ? "news" : categories[0]?.category,
    }));
    setUserFile(null);
    if (e?.currentTarget.id === "cancel") {
      setSuccess(false);
    }
  };  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userFile && !dataToEdit) {
      console.log(!userFile && !dataToEdit);

      alert("Please upload an image first!");
      return;
    }
    
    if (!data.isOnline) {
      setConfirmationModal(true)
    }
    else {
      setConfirm(true)
    }
    if (!confirm) {
      return;
    }
    await handleUpload();
    if (data.databaseTitle !== "" && data.picture !== "") {
      try {
        const response = await addArticle(data);
        setSuccess(true);
        if (dataToEdit) {
          navigate(`/admin/edit_${isNewsOrArticle}`);
        } else {
          resetForm();
        }
      } catch (err: any) {
        console.error(err);
        setFormError((prev) => !prev);
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    }
  };

  const handleSelectCategory = (e: ChangeEvent<HTMLSelectElement>) => setData({ ...data, category: e.target.value });

  useEffect(() => {
    setIsNewsOrArticle(categoryOfArticle);
  }, [categoryOfArticle]);

  useEffect(() => {
    if (dataToEdit) {
      setData({
        ...dataToEdit,
        category: dataToEdit.category ? dataToEdit.category : "news",
        type: isNewsOrArticle === "news" ? "news" : "article",
        databaseTitle: `${articleCategory}_id_${dataToEdit.id}`,
        isAdult: dataToEdit.is_adult === undefined ? false : dataToEdit.is_adult,
        isOnline: dataToEdit.is_online === undefined ? false : dataToEdit.is_online,
      });
    } else {
      setData({
        ...initialParameters,
        type: isNewsOrArticle === "news" ? "news" : "article",
        id: dataToEdit ? data.id : highestIdFromHook + 1,
        category: isNewsOrArticle === "news" ? "news" : categories[0]?.category,
      });
    }
  }, [isNewsOrArticle, highestIdFromHook, categories, dataToEdit]);

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
      <h1 className="text-center mb-4">Dodaj {category === "news" ? "Newsa" : `artykuł w kategorii: ${capitalizeFirstLetter(category)}`}</h1>
      <Form
        style={{
          width: "80%",
          alignSelf: "center",
          alignItems: "center",
        }}
        onSubmit={handleSubmit}>
        {categoryOfArticle === "articles" ? (
          <div className="d-flex flex-row w-100 justify-content-between gap-3 align-items-center">
            <FloatingLabel controlId="floatingSelect" label="Wybierz kategorię" className="d-flex flex-grow-1 mb-3">
              <Form.Select onChange={handleSelectCategory} size="sm" aria-label="Kategoria artykułów" className="form__control--input" value={category}>
                {categories?.map((category: CategoryInterface) => {
                  return (
                    <option value={category?.category} key={category?.id}>
                      {capitalizeFirstLetter(category.category)}
                    </option>
                  );
                })}
              </Form.Select>
            </FloatingLabel>
            <Button variant="primary" onClick={() => setOpenModal(true)}>
              Dodaj kategorię artykułów
            </Button>
          </div>
        ) : (
          ""
        )}
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
          {userFile ? <img src={userFile.url} style={{ maxHeight: "200px" }} alt=""></img> : dataToEdit ? <img src={data.picture} style={{ maxHeight: "200px" }} alt=""></img> : ""}
        </div>
        <div className="d-flex flex-row justify-content-between align-items-center gap-5">
          <TextInput input="Data dodania" isRequired="true" disabled type="text" name="date" data={data} setData={setData} />
          <TextInput input="Tagi" isRequired="true" type="text" name="tags" data={data} setData={setData} textarea height={100} />
          <TextInput input="ID Newsa" isRequired="true" disabled type="number" name="id" data={data} setData={setData} />
        </div>
        <div className="d-flex flex-row justify-content-between align-items-center gap-5">
          <div className="d-flex flex-column justify-content-between align-items-start w-100">
            <Form.Check type="switch" label="Opublikować?" id="isOnline" name="isOnline" onChange={handleSwitch} className="me-3" defaultChecked={dataToEdit && dataToEdit.is_online}></Form.Check>
            <Form.Check type="switch" label="Tylko dla dorosłych?" id="isAdult" name="isAdult" onChange={handleSwitch} className="mb-3 me-3" defaultChecked={dataToEdit && dataToEdit.is_adult}></Form.Check>
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
      {openModal ? <CategoryModal setOpenModal={setOpenModal} openModal={openModal} /> : ""}
      {confirmationModal ? <ConfirmationModal open={confirmationModal} close={setConfirmationModal} confirm={confirm} setConfirm={setConfirm} modalText={`Czy na pewno chcesz dodać ${categoryOfArticle === "news" ? "newsa" : "artykuł"} bez publikowania?`} modalHeader="Dodawanie bez publikacji" /> : ''}
    </div>
  );
};
