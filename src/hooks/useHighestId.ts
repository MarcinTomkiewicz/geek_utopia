import { useEffect, useState, useMemo } from "react";
import { ArticleParameters } from "../utils/interfaces";
import { useGetArticles } from "./useGetArticles";

export const useHighestId = (category?: string): any => {
  const [highestId, setHighestId] = useState(0);
  const articlesListAsArray = useGetArticles(category);

  const articlesIds: number[] = useMemo(
    () =>
      articlesListAsArray
        .map((article: ArticleParameters) => article?.id)
        .sort((a: number, b: number) => a - b),
    [articlesListAsArray]
  );

  useEffect(() => {
    if (articlesIds.length === 0) {
      setHighestId(0);
      return;
    }
    setHighestId(articlesIds[articlesIds.length - 1]);
  }, [articlesIds]);

  return highestId;
};
