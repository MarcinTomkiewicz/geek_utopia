import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ArticleParameters } from "../AdminPanel/AdminPanel";
import { useGetArticles } from "../hooks/useGetArticles";

interface ArticlesProps {
  type: string;
  startFrom: number;
  howMany: number;
}

export const ShowArticles = ({ type, startFrom, howMany }: ArticlesProps): JSX.Element | null => {
  const articles = useGetArticles(type);
  const articlesToShowOnList = articles.slice(startFrom, howMany).filter((article: ArticleParameters) => article.is_online);

  if (articles === undefined) {
    return null;
  }

  let dateToShow: string;

  interface Months {
    key: number;
    value: string;
  }

  const monthLabels = [
    { key: 1, value: "stycznia" },
    { key: 2, value: "lutego" },
    { key: 3, value: "marca" },
    { key: 4, value: "kwietnia" },
    { key: 5, value: "maja" },
    { key: 6, value: "czerwca" },
    { key: 7, value: "lipca" },
    { key: 8, value: "sierpnia" },
    { key: 9, value: "września" },
    { key: 10, value: "października" },
    { key: 11, value: "listopada" },
    { key: 12, value: "grudnia" },
  ];

  const generateDate = (article: ArticleParameters): string => {
    monthLabels.forEach((month: Months) => {
      if (article?.date.toDate().getMonth() + 1 === month.key) {
        return (dateToShow = article?.date.toDate().getDate() + " " + month.value + " " + article?.date.toDate().getFullYear());
      }
    });
    return dateToShow;
  };

  return (
    <>
      {articlesToShowOnList.map((article: ArticleParameters) => {
        const linkToNavigate = `/${type}/${article.id}`;
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
