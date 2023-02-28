import { db } from "../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ArticleParameters } from "../utils/interfaces";

const compareIdsForSorting = (a: ArticleParameters, b: ArticleParameters) => {
  if (a.id < b.id) {
    return 1;
  }
  if (a.id > b.id) {
    return -1;
  }
  return 0;
};

export const useGetArticles = (category?: string): any => {
  const [articlesList, setArticlesList] = useState<ArticleParameters[]>([]);

  useEffect(() => {
    if (!category) return;

    const getArticlesFromDB = async () => {
      const docRef = doc(db, "content", category);
      const docSnap = await getDoc(docRef);

      const dataObj = docSnap.data();

      if (!dataObj) return;

      const convertToArray = Object.values(dataObj);
      const sortedArticles = convertToArray.sort(compareIdsForSorting);

      setArticlesList(sortedArticles);
    };
    getArticlesFromDB();
  }, [category]);

  return articlesList;
};
