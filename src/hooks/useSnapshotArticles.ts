import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ArticleParameters } from "../AdminPanel/AdminPanel";
import { db } from "../config/firebaseConfig";

export const useSnapshotArticles = (type: string): any => {
  const [snapshotArticles, setSnapshotArticles] = useState<DocumentData>();
  const [articlesToReturn, setArticlesToReturn] = useState<DocumentData>();

  const compareIdsForSorting = (
    a: ArticleParameters,
    b: ArticleParameters
) => {
    if (a.id < b.id) {
        return 1;
    }
    if (a.id > b.id) {
        return -1;
    }
    return 0;
};

  useEffect(() => {
    const articleOnSnapshot = onSnapshot(doc(db, "content", type), (doc) => {
      setSnapshotArticles(doc.data());
    });
  }, []);

  useEffect(() => {
    const createArticlesList = (): any => {
      if (snapshotArticles === undefined) {
        return null;
      }
      const articlesArray = Object.values(snapshotArticles);
      const sortedArticlesArray = articlesArray.sort(compareIdsForSorting);
      console.log(sortedArticlesArray);
      
      return setArticlesToReturn(sortedArticlesArray);
    };
    createArticlesList();
  }, []);

  if (articlesToReturn === undefined) {
    return;
  }
  
  return articlesToReturn;
  
};
