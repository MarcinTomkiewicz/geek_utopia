import { useGetArticles } from "../hooks/useGetArticles";
import { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { ArticleParameters, ArticleType } from "../utils/interfaces";
import { Tags } from "../atoms/Tags/Tags";
import { generateDate } from "../utils/generateDate";
import { capitalizeFirstLetter } from "../utils/helperFunctions";
import { BusyBox } from "../utils/BusyBox";

export const ArticlesOnlyPage = ({ articleType, defaultPostsOnPage, currentTag, category }: ArticleType): JSX.Element => {
  const [filteredTag, setFilteredTag] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setFilteredTag(currentTag);
  }, [currentTag]);

  const articles = useGetArticles(articleType)
    .filter((article: ArticleParameters) => article.is_online)
    .filter((article: ArticleParameters) => {
      if (category) {
        return article?.category?.includes(category);
      }
      if (filteredTag) {
        return article?.tags.includes(filteredTag);
      } else {
        return true;
      }
    });
  const newsExceptOfFirst = articles.slice(1);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(defaultPostsOnPage ? defaultPostsOnPage : 10);

  const indexOfLastNews = currentPage * postsPerPage;
  const indexOfFirstNews = indexOfLastNews - postsPerPage;
  const currentNews = newsExceptOfFirst.slice(indexOfFirstNews, indexOfLastNews);

  const paginate = ({ selected }: any) => {
    setCurrentPage(selected + 1);
  };

  const handlePostsOnPageChange = (e: any) => {
    setPostsPerPage(e.target.value);
    if (currentNews.length === 0) {
      setCurrentPage(1);
    }
  };

  const removeFilters = () => {
    const removeFilterInAddress = location.pathname.split("/", 2).join("/");
    navigate(removeFilterInAddress);
    setFilteredTag("");
  };

  const [header, setHeader] = useState("");

  const determineHeader = () => {
    if (articleType === "news") {
      return <h1 className={filteredTag ? "pt-3" : "py-3"}>Newsy {filteredTag ? `z tagiem: ${filteredTag}` : ""}</h1>;
    }
    if (articleType === "articles" && category) {
      return <h1 className={filteredTag ? "pt-3" : "py-3"}>{filteredTag ? `Artykuły z tagiem: ${filteredTag}` : capitalizeFirstLetter(category ? category : "")}</h1>;
    }
    if (articleType === "articles" && !category) {
      return <h1 className={filteredTag ? "pt-3" : "py-3"}>{filteredTag ? `Artykuły z tagiem: ${filteredTag}` : "Wszystkie artykuły"}</h1>;
    }
  };

  return (
    <>
      {determineHeader()}
      {filteredTag ? (
        <button className="logon pb-3" onClick={removeFilters}>
          Usuń tagi
        </button>
      ) : (
        ""
      )}
      {articles.length === 0 ? (
        <BusyBox />
      ) : (
        <div className="d-flex flex-column gap-2 w-100">
          <div className="d-flex justify-content-between align-items-center flex-column w-100 mb-3 p-2 article__list no--opacity" key={articles[0]?.id}>
            <div className="articles__image--container w-50 align-self-center">
              <Link to={`/${articleType}/${articles[0]?.id}`} className="general__text" style={{ cursor: "pointer" }}>
                <img src={articles[0]?.picture} alt={articles[0]?.title} className="articles__image" style={{ borderRadius: "10px", maxHeight: "250px", border: "1px solid white" }} />
              </Link>
            </div>
            <div className="d-flex mt-2 justify-content-start align-items-start flex-column w-100 h-100">
              <Link to={`/${articleType}/${articles[0]?.id}`} className="general__text" style={{ cursor: "pointer" }}>
                <div className="d-flex align-items-center flex-row w-100">
                  <h2 style={{ marginBottom: "0" }}>{articles[0]?.title} </h2>
                  {articles[0]?.is_adult ? (
                    <h5
                      className="mx-2 align-middle"
                      style={{
                        marginBottom: "0",
                      }}>
                      <Badge bg="danger">18+</Badge>
                    </h5>
                  ) : (
                    ""
                  )}
                </div>
                <div className="d-flex justify-content-between align-items-center flex-row w-100">
                  <div style={{ fontSize: "0.75rem" }}>{generateDate(articles[0])}</div>
                </div>
              </Link>
              <Tags article={articles[0]} filteredTag={filteredTag} setFilteredTag={setFilteredTag} isFromOnlyPageComponent />
              <div>
                {articles[0]?.short_descr === undefined || articles[0]?.short_descr === "" ? articles[0]?.content.substring(0, 500) : articles[0]?.short_descr}
                ...
              </div>
            </div>
          </div>
        </div>
      )}
      {newsExceptOfFirst.length > 0 ? (
        <>
          <div className="d-flex flex-row justify-content-between align-items-center w-100 mb-3 w-75">
            <h3>Pozostałe {articleType === "news" ? "newsy" : "artykuły"}</h3>
            <div className="d-flex flex-row justify-content-around align-items-center flex-1 gap-2">
              <div>Postów na stronę: </div>
              <button
                onClick={handlePostsOnPageChange}
                style={{
                  background: "#a10eb8",
                  color: "#f7fcfc",
                  border: "white 1px solid",
                  borderRadius: "5px",
                }}
                className="text-center"
                value={10}>
                10
              </button>
              <button
                onClick={handlePostsOnPageChange}
                style={{
                  background: "#a10eb8",
                  color: "#f7fcfc",
                  border: "white 1px solid",
                  borderRadius: "5px",
                }}
                className="text-center"
                value={20}>
                20
              </button>
              <button
                onClick={handlePostsOnPageChange}
                style={{
                  background: "#a10eb8",
                  color: "#f7fcfc",
                  border: "white 1px solid",
                  borderRadius: "5px",
                }}
                className="text-center"
                value={50}>
                50
              </button>
            </div>
          </div>
          <div className="article__wrap">
            {currentNews.length === 0 ? (
              <BusyBox />
            ) : (
              currentNews.map((article: ArticleParameters, i: number) => {
                const linkToNavigate = `/news/${article?.id}`;

                return (
                  <div key={article?.id} className="article__wrap--children">
                    <div className="d-flex justify-content-between align-items-start flex-column w-100 mb-3 p-2 article__list" style={{ height: "calc(100% - 1rem)" }} key={article?.id}>
                      <div className="articles__image--container w-50 align-self-center">
                        <Link to={linkToNavigate} className="general__text" style={{ cursor: "pointer" }}>
                          <img src={article?.picture} alt={article?.title} className="articles__image" />
                        </Link>
                      </div>
                      <div className="d-flex mt-2 justify-content-start align-items-start flex-column w-100 h-100">
                        <Link to={linkToNavigate} className="general__text" style={{ cursor: "pointer" }}>
                          <div className="d-flex align-items-center flex-row w-100">
                            <h2
                              style={{
                                marginBottom: "0",
                              }}>
                              {article?.title}{" "}
                            </h2>
                            {article.is_adult ? (
                              <h5
                                className="mx-2 align-middle"
                                style={{
                                  marginBottom: "0",
                                }}>
                                <Badge bg="danger">18+</Badge>
                              </h5>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="d-flex justify-content-between align-items-center flex-row w-100 mb-3">
                            <div
                              style={{
                                fontSize: "10px!important",
                              }}>
                              {generateDate(article)}
                            </div>
                          </div>
                        </Link>
                        <Tags article={article} filteredTag={filteredTag} setFilteredTag={setFilteredTag} isFromOnlyPageComponent />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      ) : (
        ""
      )}
      {Math.ceil(articles.length / postsPerPage) > 1 ? (
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
    </>
  );
};
