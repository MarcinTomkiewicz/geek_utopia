import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import { Badge, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ArticleParameters, ArticleType } from "../utils/interfaces";
import { db } from "../config/firebaseConfig";
import { useGetArticles } from "../hooks/useGetArticles";
import { useLanguagePacks } from "../hooks/useLanguagePacks";
import { useLanguageSettings } from "../hooks/useLanguageSettings";
import { useEffect, useState } from "react";
import { Tags } from "../atoms/Tags/Tags";
import { generateDate } from "../utils/generateDate";
import { BusyBox } from "../utils/BusyBox";

export const ArticlesTab = ({ articleType, howMany }: ArticleType): JSX.Element | null => {
  const language = useLanguagePacks();
  const langCode = useLanguageSettings();

  const articles = useGetArticles(articleType).filter((article: ArticleParameters) => article.is_online);
  const articlesToShowOnList = articles.slice(0, howMany);

  const calculateAverageRatingFromSnapshot = (article: ArticleParameters): number => {
    let rating: number;
    if (article === undefined) {
      return 0;
    }
    const ratings = article?.rating;
    rating = ratings?.reduce((partialSum: number, a: number) => partialSum + a, 0) / ratings?.length;
    if (isNaN(rating)) {
      return 0;
    } else {
      return rating;
    }
  };

  return (
    <div className="aside__content">
      <h2 className="text-center">{language.headers?.[articleType ? articleType : 0][langCode]}</h2>
      {articlesToShowOnList.length === 0 ? (
        <BusyBox />
      ) : (
        articlesToShowOnList.map((article: ArticleParameters) => {
          const linkToNavigate = `/${articleType}/${article.id}`;
          return (
            <div key={article.id} className="d-flex flex-column gap-2 w-100">
              <div className="d-flex justify-content-between align-items-center flex-row w-100 mb-3 article__list--feed" key={article.id}>
                <div className="d-flex mt-3 mx-3 justify-content-start align-items-start flex-column w-100 h-100">
                  <Link to={linkToNavigate} className="general__text" style={{ cursor: "pointer", width: "100%" }}>
                    <div className="articles__image--container w-100">
                      <img src={article?.picture} alt={article?.title} className="articles__image" style={{ maxHeight: "125px" }} />
                    </div>
                    <div className="d-flex align-items-center flex-row w-100 mt-2">
                      <h4 style={{ marginBottom: "0" }}>{article?.title} </h4>
                      {article.is_adult ? (
                        <h6
                          className="mx-2"
                          style={{
                            marginBottom: "0",
                          }}>
                          <Badge bg="danger">18+</Badge>
                        </h6>
                      ) : (
                        ""
                      )}
                    </div>
                  </Link>
                  <Tags article={article} variant={"small"} />
                  <Link to={linkToNavigate} className="general__text" style={{ cursor: "pointer", width: "100%" }}>
                    <div className="d-flex justify-content-evenly align-items-center flex-row w-100 mb-3">
                      <div className="d-flex justify-content-between align-items-center flex-row mt-1 grow-1 w-100" style={{ overflow: "auto" }}>
                        <div style={{ fontSize: "10px" }}>{generateDate(article)}</div>
                        <div className="d-flex justify-content-end align-items-center flex-row flex-1">
                          <div
                            className="star__rating"
                            style={{
                              width: "11px",
                              height: "11px",
                            }}></div>
                          {calculateAverageRatingFromSnapshot(article) === 0 ? (
                            <div
                              style={{
                                fontSize: "10px",
                              }}>
                              Brak ocen
                            </div>
                          ) : (
                            <div
                              style={{
                                fontSize: "10px",
                              }}>
                              {calculateAverageRatingFromSnapshot(article).toFixed(2)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
