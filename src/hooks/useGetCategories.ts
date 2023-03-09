import { db } from "../config/firebaseConfig";
import { collection, query, getDocs, getDoc, doc, onSnapshot, DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { CategoryInterface } from "../utils/interfaces";
import { compareIdsForSorting } from "../utils/helperFunctions";

export const useGetCategories = (): CategoryInterface[] => {
  const [allCategories, setAllCategories] = useState<CategoryInterface[]>([]);

  useEffect(() => {
    const getCategory = async () => {
      return onSnapshot(doc(db, "content", "categories"), (doc) => {
        const dataFromDB: CategoryInterface[] = [];

        const dataObj = doc.data();

        if (!dataObj) return;

        const convertToArray = Object.values(dataObj);

        convertToArray.forEach((document) => {
          dataFromDB.push(document);
        });
        console.log(dataFromDB.sort(compareIdsForSorting));
        
        const sortedCategories = dataFromDB.sort(compareIdsForSorting).reverse();
        setAllCategories(sortedCategories);
      });
    };
    getCategory();
  }, []);

  return allCategories;
};
