import { db } from "../config/firebaseConfig";
import {
	collection,
	query,
	doc,
	getDoc,
	getDocs,
	DocumentSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { ArticleParameters } from "../utils/interfaces";

export const useGetCategories = (): any => {
	const [allCategories, setAllCategories] = useState<any[]>([]);

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

    return allCategories;
}