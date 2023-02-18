import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import { Badge, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ArticleParameters, Months } from "../utils/interfaces";
import { db } from "../config/firebaseConfig";
import { useGetArticles } from "../hooks/useGetArticles";
import { useLanguagePacks } from "../hooks/useLanguagePacks";
import { useLanguageSettings } from "../hooks/useLanguageSettings";
import { useEffect, useState } from "react";
import { monthLabels } from "../utils/utilsObjects";
import { Tags } from "../atoms/Tags/Tags";

export const ArticlesTab = ({ articleType }: any): JSX.Element | null => {

  const [articleForRating, setArticleForRating] = useState<DocumentData>();
  const [averageRating, setAverageRatingFromSnapshot] = useState<number>(0);

  useEffect(() => {
    const averageRatingOnSnapshot = onSnapshot(doc(db, "content", articleType), (doc) => {
      setArticleForRating(doc.data());
    });
  }, []);

  const calculateAverageRatingFromSnapshot = (article: ArticleParameters): number => {
    let rating: number;
    if (articleForRating === undefined) {
      return 0;
    }
    const ratings = articleForRating[`${articleType}_id_${article.id}`]?.rating;
    rating = ratings?.reduce((partialSum: number, a: number) => partialSum + a, 0) / ratings?.length;
    if (isNaN(rating)) {
        return 0;
    }
    else {
    return rating;
    }
  };

  const language = useLanguagePacks();
  const langCode = useLanguageSettings();

  const articles = useGetArticles(articleType);
  const articlesToShowOnList = articles.slice(0, 10);

  if (articles === undefined) {
    return null;
  }

  let dateToShow: string;

  const generateDate = (article: ArticleParameters): string => {
    monthLabels.forEach((month: Months) => {
      if (article?.date.toDate().getMonth() + 1 === month.key) {
        return (dateToShow = article?.date.toDate().getDate() + " " + month.value + " " + article?.date.toDate().getFullYear());
      }
    });
    return dateToShow;
  };

  return (
    <div className="aside__content">
      <h2 className="text-center">{language.headers?.[articleType][langCode]}</h2>
      {articlesToShowOnList.map((article: ArticleParameters) => {
        const linkToNavigate = `/${articleType}/${article.id}`;
        return (
          <div key={article.id} className="d-flex flex-column gap-2 w-100">
            <Link to={linkToNavigate} className="general__text" style={{ cursor: "pointer", width: "100%" }}>
              <div className="d-flex justify-content-between align-items-center flex-row w-100 mb-3 article__list--feed" key={article.id}>
                <div className="d-flex mt-3 mx-3 justify-content-start align-items-start flex-column w-100 h-100">
                  <div className="articles__image--container w-100">
                    <img src={article?.picture} alt={article?.title} className="articles__image" />
                  </div>
                  <div className="d-flex align-items-center flex-row w-100 mt-2">
                    <h4 style={{ marginBottom: "0" }}>{article?.title} </h4>
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
                  <Tags article={article} variant={"small"}/>
                  <div className="d-flex justify-content-evenly align-items-center flex-row w-100 mb-3">
                    <div className="d-flex justify-content-between align-items-center flex-row mt-1 grow-1 w-100" style={{ overflow: "auto" }}>
                      <div style={{ fontSize: "10px"}}>{generateDate(article)}</div>
                      <div className="d-flex justify-content-end align-items-center flex-row w-50">
                        <div
                          className="star__rating mx-1"
                          style={{
                            width: "15px",
                            height: "15px",
                          }}></div>
                        {calculateAverageRatingFromSnapshot(article) === 0 ? "Brak ocen" : calculateAverageRatingFromSnapshot(article).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
