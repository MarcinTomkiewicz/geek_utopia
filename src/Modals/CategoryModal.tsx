import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { TextInput } from "../utils/TextInput";
import { useHighestId } from "../hooks/useHighestId";
import { CategoryInterface, ModalProps } from "../utils/interfaces";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const initialData: CategoryInterface = {
  category: "",
  id: 0,
  abbreviation: "",
  polish: "",
  english: "",
}

export const CategoryModal = ({ setOpenModal, openModal }: ModalProps): JSX.Element => {
  const categoriesIds = useHighestId("categories");
  const [category, setCategory] = useState<CategoryInterface>(initialData);

  const addCategory = async (data: CategoryInterface) => {
    await updateDoc(doc(db, "content", "categories"), {
      [`category_id_${data.id}`]: {
        category: data.category,
        id: data.id,
        abbreviation: data.abbreviation,
      },
    });
  };

  const addLocale = async (data: CategoryInterface) => {
    await updateDoc(doc(db, "language_packs", "categories"), {
      [data.abbreviation]: [
        data.polish,
        data.english,
      ],
    });
  };

  useEffect(() => {
    setCategory((prev: CategoryInterface) => ({
      ...prev,
      id: categoriesIds + 1,
    }));
  }, [categoriesIds]);

  useEffect(() => {
    setCategory((prev: CategoryInterface) => ({
      ...prev,
      abbreviation: prev.abbreviation.toLowerCase()
    }));
  }, [category.abbreviation]);

  useEffect(() => {
    setCategory((prev: CategoryInterface) => ({
      ...prev,
      category: prev.english.toLowerCase().split(' ').join('_'),
    }));
  }, [category.english]);

  const resetForm = () => {
    setCategory((prev: CategoryInterface) => ({
      category: "",
      id: prev.id,
      abbreviation: "",
      polish: "",
      english: "",
    }));
  };  

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const success = await addCategory(category);
      const localeSuccess = await addLocale(category);
      resetForm();
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <Modal
      size="lg"
      show={openModal}
      onHide={() => setOpenModal(false)}
      centered
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "flex-start",
        marginTop: "1.5em",
      }}>
      <Modal.Header closeButton closeVariant="white" style={{ backgroundColor: "rgba(161, 14, 184)" }}>
        <Modal.Title>Dodaj kategorię</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "rgba(0, 0, 0)" }} className="d-flex justify-content-center align-items-center flex-column">
        <h1 className="text-center mb-4">Dodaj kategorię</h1>
        <Form
          style={{
            width: "80%",
            alignSelf: "center",
            alignItems: "center",
          }}
          onSubmit={handleSubmit}>
          <TextInput input="Nazwa kategorii (po polsku)" isRequired="true" type="text" name="polish" data={category} setData={setCategory} />
          <TextInput input="Nazwa kategorii (po angielsku)" isRequired="true" type="text" name="english" data={category} setData={setCategory} />
          <TextInput input="Skrót" isRequired="true" type="text" name="abbreviation" data={category} setData={setCategory} />
          <TextInput input="Identyfikator kategorii" disabled isRequired="true" type="text" name="category" data={category} setData={setCategory} />
          <TextInput input="Id kategorii" isRequired="true" disabled type="text" name="id" data={category} setData={setCategory} />
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
      </Modal.Body>
    </Modal>
  );
};
