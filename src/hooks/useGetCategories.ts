import { db } from "../config/firebaseConfig";
import { collection, query, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useGetCategories = (): any => {
  const [allCategories, setAllCategories] = useState<string[]>([]);

  useEffect(() => {
    const getCategory = async () => {
      const collectDataFromDB = query(collection(db, "content"));
      const dataFromDB: any[] = [];
      const documents = await getDocs(collectDataFromDB);
      documents.docs.forEach((document) => {
        dataFromDB.push(document.id);
      });
      setAllCategories(dataFromDB);
    };
    getCategory();
  }, []);

  return allCategories;
};
