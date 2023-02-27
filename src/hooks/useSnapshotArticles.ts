import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";
import { ArticleParameters } from "../utils/interfaces";

export const useSnapshotArticles = (type: string | undefined): any => {
  const [snapshotArticles, setSnapshotArticles] = useState<DocumentData>();
  const [articlesToReturn, setArticlesToReturn] = useState<DocumentData>();

  const compareIdsForSorting = (a: ArticleParameters, b: ArticleParameters) => {
    if (a.id < b.id) {
      return 1;
    }
    if (a.id > b.id) {
      return -1;
    }
    return 0;
  };

  useEffect(() => {
    if (type === undefined) return;

    return onSnapshot(doc(db, "content", type), (doc) => {
      const articlesData = doc.data();
    });
  }, [type]);

  useEffect(() => {
    if (snapshotArticles === undefined) return;

    const sortedArticlesArray: ArticleParameters[] =
      Object.values(snapshotArticles).sort(compareIdsForSorting);

    setArticlesToReturn(sortedArticlesArray);
  }, [snapshotArticles]);

  // if (articlesToReturn === undefined) {

  //   return;
  // }

  return articlesToReturn;
};
