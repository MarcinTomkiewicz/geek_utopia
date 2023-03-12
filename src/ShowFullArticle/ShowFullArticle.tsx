import { doc, DocumentData, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState, Fragment } from "react";
import { Tags } from "../atoms/Tags/Tags";
import { db } from "../config/firebaseConfig";
import { useGetArticles } from "../hooks/useGetArticles";
import { BusyBox } from "../utils/BusyBox";
import { generateDate } from "../utils/generateDate";
import { ArticleParameters, ArticleType } from "../utils/interfaces";

export const ShowFullArticle = ({ articleType, id }: ArticleType) => {
  const [averageRating, setAverageRatingFromSnapshot] = useState<number>(0);

  const articles = useGetArticles(articleType);
  const currentArticle = articles[articles.findIndex((article: ArticleParameters) => article.id === id)];

  useEffect(() => {
    const calculateAverageRatingFromSnapshot = (): void => {
      if (currentArticle === undefined) {
        return;
      }
      const ratings = currentArticle?.rating;
      const averageRatings = ratings?.reduce((partialSum: number, a: number) => partialSum + a, 0) / ratings?.length;
      return setAverageRatingFromSnapshot(averageRatings);
    };
    calculateAverageRatingFromSnapshot();
  });

  const partOfStarSelected = (averageRating - Math.floor(averageRating)) * 100;

  console.log(averageRating);
  

  const handleChangeStarRating = async (e: any) => {
    if (!articleType) {
      return;
    }
    const articleName = `${articleType === "articles" ? "article" : articleType}_id_${currentArticle.id}`;
    currentArticle.rating.push(parseInt(e.target.id));
    await updateDoc(doc(db, "content", articleType), {
      [articleName]: {
        ...currentArticle,
        rating: currentArticle.rating,
      },
    });
  };

  return (
    <>
      {!currentArticle ? (
        <BusyBox />
      ) : (
        <Fragment key={currentArticle.id}>
          <div className="mt-4 px-4 pb-3 d-flex flex-column w-100 align-items-center" key={currentArticle?.id}>
            <img
              src={currentArticle.picture}
              alt={currentArticle.title}
              style={{
                height: "30%",
                maxHeight: "400px",
                borderRadius: "10px",
              }}></img>
            <div className="d-flex justify-content-start align-items-start flex-column mt-3 w-100 ">
              <div style={{ fontSize: "0.75rem" }}>Data publikacji: {generateDate(currentArticle)}</div>
              <div className="w-100" style={{ fontSize: "0.75rem" }}>
                Autor: {currentArticle?.author}
              </div>
            </div>
            <h1 className="mb-4">{currentArticle.title}</h1>
            <Tags article={currentArticle} />
            <div className="mb-4 text-left w-100" style={{ fontWeight: "bold" }}>
              {currentArticle.short_descr}
            </div>
            {currentArticle.content.split("\n").map((paragraph: string, id: number) => {
              return (
                <div key={id} className="text-left w-100 mb-2" style={{ textAlign: "justify" }}>
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
          <div>{currentArticle.rating.length === 0 || currentArticle.rating === undefined ? "Nie ma jeszcze ocen" : `Ocena łączna: ${averageRating.toFixed(2)} / Ocen: ${currentArticle.rating?.length}`}</div>
        </Fragment>
      )}
      ;
    </>
  );
};
