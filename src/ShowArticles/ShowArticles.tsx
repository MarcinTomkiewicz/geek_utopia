import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Tags } from "../atoms/Tags/Tags";
import { useGetArticles } from "../hooks/useGetArticles";
import { generateDate } from "../utils/generateDate";
import { ArticleParameters, ArticleType } from "../utils/interfaces";

export const ShowArticles = ({ articleType, startFrom, howMany }: ArticleType): JSX.Element | null => {
  const articles = useGetArticles(articleType).filter((article: ArticleParameters) => article.is_online);
  const articlesToShowOnList = articles.slice(startFrom, howMany);

  if (articles === undefined) {
    return null;
  }

  return (
    <>
      {articlesToShowOnList.map((article: ArticleParameters) => {
        const linkToNavigate = `/${articleType}/${article.id}`;
        return (
          <div key={article.id} className="d-flex flex-column gap-2 w-100">
            <Link to={linkToNavigate} className="general__text" style={{ cursor: "pointer" }}>
              <div className="d-flex justify-content-between align-items-center flex-row w-100 mb-3 article__list" key={article.id}>
                <div className="articles__image--container">
                  <img src={article?.picture} alt={article?.title} className="articles__image" />
                </div>
                <div className="d-flex mt-2 mx-3 justify-content-start align-items-start flex-column w-100 h-100">
                  <div className="d-flex align-items-center flex-row w-100">
                    <h2 style={{ marginBottom: "0" }}>{article?.title} </h2>
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
                    <div style={{ fontSize: "0.75rem" }}>{generateDate(article)}</div>
                  </div>
                  <Tags article={article} />
                  <div>
                    {article?.short_descr === undefined || article?.short_descr === "" ? article?.content.substring(0, 500) : article?.short_descr}
                    ...
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
};
