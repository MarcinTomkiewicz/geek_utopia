import { db } from "../config/firebaseConfig";
import { collection, query, doc, getDoc, getDocs, DocumentSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ArticleParameters } from "../AdminPanel/AdminPanel";

export const useHighestId = (category?: string): number => {
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [articlesList, setArticlesList] = useState<any>({});
  const [highestId, setHighestId] = useState<number>(0);

  useEffect(() => {
    const getCategory = async () => {
      const collectDataFromDB = query(collection(db, "content"));
      const dataFromDB: any[] = [];
      const documents = await getDocs(collectDataFromDB);
      documents.docs.map((document) => {
        dataFromDB.push(document.id);
      });
      setAllCategories(dataFromDB);
    };
    getCategory();
  }, []);

  useEffect(() => {
    allCategories.map((currentCategory) => {
      const getArticlesFromDB = async () => {
        const docRef = doc(db, "content", currentCategory);
        const docSnap = await getDoc(docRef);
        setArticlesList(docSnap.data());
      };
      getArticlesFromDB();
    });
  }, [allCategories]);

  const articlesListAsArray: ArticleParameters[] = Object.values(articlesList);
  const articlesIds: number[] = [];

  articlesListAsArray.forEach((article) => {
    articlesIds.push(article?.id);
  });

  useEffect(() => {
    if (articlesIds.sort().reverse()[0] !== undefined) {
      setHighestId(articlesIds.sort().reverse()[0]);
    }
  }, [articlesIds]);

  return parseInt(highestId?.toFixed());
};
