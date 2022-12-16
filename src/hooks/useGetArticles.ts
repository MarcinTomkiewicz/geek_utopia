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
import { ArticleParameters } from "../AdminPanel/AdminPanel";

export const useGetArticles = (category?: string): any => {
	const [allCategories, setAllCategories] = useState<any[]>([]);
	const [articlesList, setArticlesList] = useState<any>({});

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
			if (currentCategory === category) {
				const getArticlesFromDB = async () => {
					const docRef = doc(db, "content", currentCategory);
					const docSnap = await getDoc(docRef);					
					setArticlesList(docSnap.data());					
				};
				getArticlesFromDB();
			}
		});
	}, [allCategories]);

	const articlesListAsArray: ArticleParameters[] =
		Object.values(articlesList);

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

	const sortedArticlesList = articlesListAsArray.sort(compareIdsForSorting);

	return sortedArticlesList;
};
