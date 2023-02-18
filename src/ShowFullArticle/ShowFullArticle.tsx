import { FirebaseApp } from "firebase/app";
import { doc, DocumentData, Firestore, FirestoreDataConverter, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { db } from "../config/firebaseConfig";
import { useGetArticles } from "../hooks/useGetArticles";
import { ArticleParameters, Months } from "../utils/interfaces";
import { badgeBackground, monthLabels } from "../utils/utilsObjects";

interface FullArticleProps {
  type: string;
  id: number;
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

export const ShowFullArticle = ({ type, id }: FullArticleProps) => {
  const [articleForRating, setArticleForRating] = useState<DocumentData>();
  const [averageRating, setAverageRatingFromSnapshot] = useState<number>(0);

  const articles = useGetArticles(type);
  const currentArticle = articles[articles.findIndex((article: ArticleParameters) => article.id === id)];

  useEffect(() => {
    const averageRatingOnSnapshot = onSnapshot(doc(db, "content", type), (doc) => {
      setArticleForRating(doc.data());	  
    });
  }, []);
 

  useEffect(() => {
    const calculateAverageRatingFromSnapshot = (): void => {
      if (articleForRating === undefined) {
        return;
      }
      const ratings = articleForRating[`${type}_id_${id}`].rating;
      const averageRatings = ratings.reduce((partialSum: number, a: number) => partialSum + a, 0) / ratings.length;
      return setAverageRatingFromSnapshot(averageRatings);
    };
    calculateAverageRatingFromSnapshot();
  });

  const partOfStarSelected = (averageRating - Math.floor(averageRating)) * 100;

  const handleChangeStarRating = async (e: any) => {
    const articleName = `${type}_id_${id}`;
    currentArticle.rating.push(parseInt(e.target.id));
    await updateDoc(doc(db, "content", type), {
      [articleName]: {
        ...currentArticle,
        rating: currentArticle.rating,
      },
    });
  };

  return (
    <>
      {articles.map((article: ArticleParameters) => {
        if (article.id === id) {
          return (
            <>
              <div className="mt-4 px-4 pb-3 d-flex flex-column w-100 align-items-center">
                <img
                  src={article.picture}
                  alt={article.title}
                  style={{
                    height: "30%",
                    maxHeight: "400px",
                    borderRadius: "10px"
                  }}></img>
                <div className="d-flex justify-content-start align-items-start flex-column mt-3 w-100 ">
                  <div style={{ fontSize: "0.75rem" }}>Data publikacji: {generateDate(article)}</div>
                  <div className="w-100" style={{ fontSize: "0.75rem" }}>
                    Autor: {article?.author}
                  </div>
                </div>
                <h1 className="mb-4">{article.title}</h1>
                <div className="d-flex flex-row justify-content-start gap-2 align-items-center mt-1 mb-3 flex-wrap w-100">
										{article?.tags[0] !== ""
											? article?.tags.map((tag) => {
													if (tag === "") {
														return;
													}
													return (
														<Badge
															bg={
																badgeBackground[
																	Math.floor(
																		Math.random() *
																			badgeBackground.length
																	)
																]
															}
														>
															{tag}
														</Badge>
													);
											  })
											: "Nie ma żadnych tagów do tego artykułu"}
									</div>
                <div className="mb-4 text-left w-100" style={{fontWeight: "bold"}}>{article.short_descr}</div>
                {article.content.split("\n").map((paragraph: string) => {
                  return (
                    <div className="text-left w-100 mb-2" style={{ textAlign: "justify" }}>
                      {paragraph}
                    </div>
                  );
                })}
              </div>
              <div className="d-flex flex-row">
                {[1, 2, 3, 4, 5].map((el) => {
                  if (Math.floor(averageRating) >= el) {
                    return (
                      <button
                        key={el}
                        className="star__rating"
                        id={`${el}`}
                        style={{
                          width: "100px",
                          height: "100px",
                        }}
                        onClick={handleChangeStarRating}></button>
                    );
                  } else if (Math.floor(averageRating) < el && el - averageRating > 0 && el - averageRating < 1) {
                    return (
                      <button
                        key={el}
                        id={`${el}`}
                        className="star__rating--white"
                        style={{
                          width: "100px",
                          height: "100px",
                          background: `linear-gradient(90deg, rgba(0,0,0,1) ${partOfStarSelected.toString()}%, rgba(255,255,255,1) ${partOfStarSelected.toString()}%)`,
                        }}
                        onClick={handleChangeStarRating}></button>
                    );
                  } else {
                    return (
                      <button
                        key={el}
                        id={`${el}`}
                        className="star__rating--white"
                        style={{
                          width: "100px",
                          height: "100px",
                        }}
                        onClick={handleChangeStarRating}></button>
                    );
                  }
                })}
              </div>
              <div>{article.rating.length === 0 || article.rating === undefined ? "Nie ma jeszcze ocen" : `Ocena łączna: ${averageRating.toFixed(2)} / Ocen: ${article.rating?.length}`}</div>
            </>
          );
        }
      })}
    </>
  );
};
