import { useEffect, useState } from "react";
import { ArticleParameters } from "../utils/interfaces";
import { useGetArticles } from "./useGetArticles";

export const useHighestId = (category?: string): any => {
  const [highestId, setHighestId] = useState<number>(0);
  const articlesListAsArray = useGetArticles(category);
  const articlesIds: number[] = [];

  console.log(category);
  console.log(articlesListAsArray);

    articlesListAsArray.forEach((article: ArticleParameters) => {
      articlesIds.push(article?.id);
    });
  

  useEffect(() => {
    if (articlesIds.length === 0) {
      return setHighestId(0)
    }
    if (
      articlesIds
        .sort(function (a, b) {
          return b - a;
        })
        .reverse()[0] !== undefined ||
      articlesIds
        .sort(function (a, b) {
          return b - a;
        })
        .reverse()[0] <= 0
    ) {
      setHighestId(
        articlesIds.sort(function (a, b) {
          return b - a;
        })[0]
      );
    }
  }, [articlesIds.length]);

  return highestId;
};
