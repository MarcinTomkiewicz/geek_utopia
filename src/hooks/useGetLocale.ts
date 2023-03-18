import { db } from "../config/firebaseConfig";
import {
	collection,
	query,
	getDocs,
	getDoc,
	doc,
	onSnapshot,
	DocumentData,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export const useGetLocale = (localeCategory: string) => {
	const [locales, setLocales] = useState<DocumentData>([]);    

	useEffect(() => {
		const getLocales = async () => {
			return onSnapshot(
				doc(db, "language_packs", localeCategory),
				(doc) => {
					const dataFromDB: string[] = [];

					const dataObj = doc.data();

					if (!dataObj) return;

					const convertToArray = Object.values(dataObj);

					convertToArray.forEach((document) => {
						dataFromDB.push(document);
					});
                    setLocales(dataObj);
				}
			);
		};
		getLocales();
	}, [localeCategory]);

	return locales;
};
