import { deleteDoc, deleteField, doc, DocumentData, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { db } from "../../config/firebaseConfig";
import { useGetArticles } from "../../hooks/useGetArticles";
import ReactPaginate from "react-paginate";
import { ArticleParameters, ArticleType } from "../../utils/interfaces";
import { Tags } from "../../atoms/Tags/Tags";
import { generateDate } from "../../utils/generateDate";
import { Link } from "react-router-dom";

export const EditArticles = ({ articleType }: ArticleType): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modal, setModal] = useState<ArticleParameters>();
  const articles = useGetArticles(articleType);

  const [confirm, setConfirm] = useState(false);

  const [searchResults, setSearchResults] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const [currentPosts, setCurrentPosts] = useState(articles.slice(indexOfFirstPost, indexOfLastPost));
  const [searchedPosts, setSearchedPosts] = useState<ArticleParameters[]>();
  
  useEffect(() => {
    setSearchResults("");
  }, [articleType])

  useEffect(() => {
    if (articles === undefined) return;
    setSearchedPosts(
      articles.filter((article: ArticleParameters) => {
        if (searchResults !== "") {
          return article.title.toLowerCase().includes(searchResults.toLowerCase());
        } else {
          return true;
        }
      })
    );
  }, [articles, searchResults, currentPage]);

  useEffect(() => {
    if (searchedPosts === undefined) return;
    setCurrentPosts(searchedPosts.slice(indexOfFirstPost, indexOfLastPost));
    if (currentPosts.length < postsPerPage) {
      setCurrentPage(1)
    }
    
  }, [searchedPosts]);

  const paginate = ({ selected }: any) => {
    setCurrentPage(selected + 1);
  };

  const handleConfirmation = (e: any) => {
    e.preventDefault();
    setConfirm(true);
  };

  const deleteItem = async (e: any) => {
    if (articleType === undefined) {
      return;
    }

    const fieldName = e.target.name;

    await updateDoc(doc(db, "content", articleType), {
      [fieldName]: deleteField(),
    });
  };

  const openModal = (modalData: ArticleParameters) => {
    setShowModal(true);
    setModal(modalData);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  const performSearch = (e: any) => {
    e.preventDefault();
    setSearchResults(e.target.value);
  };
  
  return (
    <div className="d-flex flex-column p-2 align-items-center gap-2">
      <Form className="d-flex w-100 justify-content-end me-2">
        <Form.Control type="search" placeholder={`Szukaj ${articleType === "news" ? "newsa" : "artykułu"}`} className="w-25" aria-label="Search" onChange={performSearch} value={searchResults}/>
      </Form>
      {currentPosts.length > 0
        ? currentPosts.map((article: ArticleParameters) => {
            return (
              <div
                className="d-flex w-100 flex-row gap-1"
                style={{
                  border: "white 1px solid",
                  borderRadius: "20px",
                  cursor: "pointer",
                  minHeight: "120px",
                }}>
                <div
                  className="d-flex align-items-center justify-content-center text-center"
                  style={{
                    borderRight: "white 1px solid",
                    width: "30%",
                  }}
                  onClick={() => openModal(article)}>
                  <img
                    src={article.picture}
                    className="articles__image d-flex align-self-center"
                    style={{
                      maxHeight: "100px",
                      maxWidth: "150px",
                    }}
                  />
                </div>
                <div
                  className="d-flex px-2 pt-2 align-items-center justify-content-center text-center w-50"
                  style={{
                    borderLeft: "white 1px solid",
                    borderRight: "white 1px solid",
                  }}
                  onClick={() => openModal(article)}>
                  <div className="d-flex w-100 justify-content-between align-items-center" style={{ fontWeight: "bold" }}><div className="d-flex grow-1 text-start w-75">{article.title}</div> <div className={`${article.is_online ? "pulse__green" : "pulse__red"} mx-2`}></div></div>
                </div>
                <div
                  className="d-flex px-2 pt-2 align-items-center justify-content-start text-left w-100 grow-1"
                  style={{
                    borderLeft: "white 1px solid",
                    borderRight: "white 1px solid",
                    width: "70%",
                  }}
                  onClick={() => openModal(article)}>
                  <div>{article.short_descr}</div>
                </div>
                <div
                  className="d-flex px-2 pt-2 align-items-center justify-content-center text-center"
                  style={{
                    borderLeft: "white 1px solid",
                    borderRight: "white 1px solid",
                    width: "10%",
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px",
                  }}>
                  <div>
                    <button className="logon" name={`${articleType}_id_${article.id}`}>
                      <Link to={`/admin/edit_${articleType}/${article.id}`} className="general__text">
                        <span data-content="Edytuj" className="fancy__text align-middle">
                          Edytuj
                        </span>
                      </Link>
                    </button>
                    <button onClick={deleteItem} className="logon" name={`${articleType === "articles" ? "article" : "news"}_id_${article.id}`}>
                      <span data-content="Usuń" className="fancy__text align-middle">
                        Usuń
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        : <div>Żaden {articleType === "news" ? "News" : "Artykuł"} nie spełnia kryteriów wyszukiwania.</div>}
      {Math.ceil(searchedPosts ? searchedPosts.length / postsPerPage : 1) > 1 ? (
        <div className="pt-2">
          <ReactPaginate
            onPageChange={paginate}
            pageCount={Math.ceil(articles.length / postsPerPage)}
            previousLabel={"Prev"}
            nextLabel={"Next"}
            containerClassName={"pagination"}
            pageLinkClassName={"page-link"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
            activeLinkClassName={"page-link active"}
            disabledLinkClassName={"page-link disabled"}
          />
        </div>
      ) : (
        ""
      )}
      <Modal
        size="lg"
        show={showModal}
        onHide={hideModal}
        centered
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "flex-start",
          marginTop: "1.5em",
        }}>
        <Modal.Header closeButton closeVariant="white" style={{ backgroundColor: "rgba(161, 14, 184)" }}>
          <Modal.Title>{modal?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "rgba(0, 0, 0)" }}>
          <div className="mt-4 px-4 pb-3 d-flex flex-column w-100 align-items-center">
            <img
              src={modal?.picture}
              alt={modal?.title}
              style={{
                height: "30%",
                maxHeight: "400px",
                borderRadius: "10px",
              }}></img>
            <div className="d-flex justify-content-start align-items-start flex-column mt-3 w-100 ">
              <div style={{ fontSize: "0.75rem" }}>Data publikacji: {modal ? generateDate(modal) : ""}</div>
              <div className="w-100" style={{ fontSize: "0.75rem" }}>
                Autor: {modal?.author}
              </div>
            </div>
            <Tags article={modal} />
            <h1 className="mb-4">{modal?.title}</h1>
            <div className="mb-4 text-left w-100" style={{ fontWeight: "bold" }}>
              {modal?.short_descr}
            </div>
            {modal?.content.split("\n").map((paragraph: string) => {
              return (
                <div className="text-left w-100 mb-2" style={{ textAlign: "justify" }}>
                  {paragraph}
                </div>
              );
            })}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
