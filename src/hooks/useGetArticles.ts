import { db } from "../config/firebaseConfig";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ArticleParameters } from "../utils/interfaces";
import { compareIdsForSorting } from "../utils/helperFunctions";

export const useGetArticles = (category?: string): any => {
  const [articlesList, setArticlesList] = useState<ArticleParameters[]>([]);

  useEffect(() => {
    const getArticlesFromDB = async () => {
      if (!category) return;
      // const docRef = doc(db, "content", category);
      // const docSnap = await getDoc(docRef);

      return onSnapshot(doc(db, "content", category), (doc) => {
        const dataObj = doc.data();

        if (!dataObj) return;

        const convertToArray = Object.values(dataObj);
        const sortedArticles = convertToArray.sort(compareIdsForSorting);

        setArticlesList(sortedArticles);
      });
    };
    getArticlesFromDB();
  }, [category]);

  return articlesList;
};
