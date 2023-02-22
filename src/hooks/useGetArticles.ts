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
import { useGetCategories } from "./useGetCategories";

export const useGetArticles = (category?: string): any => {
	const [articlesList, setArticlesList] = useState<any>({});
	const allCategories = useGetCategories();

	useEffect(() => {
		allCategories.map((currentCategory: string) => {
			if (currentCategory === category) {
				const getArticlesFromDB = async () => {
					const docRef = doc(db, "content", currentCategory);
					const docSnap = await getDoc(docRef);					
					setArticlesList(docSnap.data());					
				};
				getArticlesFromDB();
			}
		});
	}, [allCategories, category]);

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
