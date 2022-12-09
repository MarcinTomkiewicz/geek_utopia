import { doc, updateDoc } from "firebase/firestore";
import { ArticleParameters } from "../AdminPanel/AdminPanel";
import { db } from "../config/firebaseConfig";
import { useGetArticles } from "../hooks/useGetArticles";

interface FullArticleProps {
	type: string;
	id: number;
}

let dateToShow: string;

interface Months {
	key: number;
	value: string;
}

const monthLabels = [
	{ key: 1, value: "stycznia" },
	{ key: 2, value: "lutego" },
	{ key: 3, value: "marca" },
	{ key: 4, value: "kwietnia" },
	{ key: 5, value: "maja" },
	{ key: 6, value: "czerwca" },
	{ key: 7, value: "lipca" },
	{ key: 8, value: "sierpnia" },
	{ key: 9, value: "września" },
	{ key: 10, value: "października" },
	{ key: 11, value: "listopada" },
	{ key: 12, value: "grudnia" },
];

const generateDate = (article: ArticleParameters): string => {
	monthLabels.forEach((month: Months) => {
		if (article?.date.toDate().getMonth() + 1 === month.key) {
			return (dateToShow =
				article?.date.toDate().getDate() +
				" " +
				month.value +
				" " +
				article?.date.toDate().getFullYear());
		}
	});
	return dateToShow;
};

export const ShowFullArticle = ({ type, id }: FullArticleProps) => {
	const articles = useGetArticles(type);
	const currentArticle =
		articles[
			articles.findIndex(
				(article: ArticleParameters) => article.id === id
			)
		];
	let averageRating: number;

	const calculateAverageRating = (): number => {
		let averageRating = 0;
		articles.map((article: ArticleParameters) => {
			if (article.id === id) {
				averageRating =
					article.rating.reduce(
						(partialSum, a) => partialSum + a,
						0
					) / article.rating.length;
			}
		});
		return averageRating;
	};

	averageRating = calculateAverageRating();

	const partOfStarSelected =
		(averageRating - Math.floor(averageRating)) * 100;

	const handleChangeStarRating = async (e: any) => {
		const articleName = `${type}_id_${id}`;
		currentArticle.rating.push(parseInt(e.target.id));
		await updateDoc(doc(db, "content", type), {
			[articleName]: {
				...currentArticle,
				rating: currentArticle.rating,
			},
		});
	};

	return (
		<>
			{articles.map((article: ArticleParameters) => {
				if (article.id === id) {
					return (
						<>
							<div className="mt-4 px-4 pb-3 d-flex flex-column w-100 align-items-center">
								<img
									src={article.picture}
									alt={article.title}
									style={{
										height: "30%",
										maxHeight: "400px",
									}}
								></img>
								<div className="d-flex justify-content-start align-items-start flex-column mt-3 w-100 ">
									<div style={{ fontSize: "0.75rem" }}>
										Data publikacji: {generateDate(article)}
									</div>
									<div
										className="w-100"
										style={{ fontSize: "0.75rem" }}
									>
										Autor: {article?.author}
									</div>
								</div>
								<h1 className="mb-3">{article.title}</h1>
								{article.content
									.split("\n")
									.map((paragraph: string) => {
										return (
											<div
												className="text-left w-100 mb-2"
												style={{ textAlign: "justify" }}
											>
												{paragraph}
											</div>
										);
									})}
							</div>
							<div className="d-flex flex-row">
								{[1, 2, 3, 4, 5].map((el) => {
									if (Math.floor(averageRating) >= el) {
										return (
											<button
												key={el}
												className="star__rating"
												id={`${el}`}
												style={{
													width: "100px",
													height: "100px",
												}}
												onClick={handleChangeStarRating}
											></button>
										);
									} else if (
										Math.floor(averageRating) < el &&
										el - averageRating > 0 &&
										el - averageRating < 1
									) {
										return (
											<button
												key={el}
												id={`${el}`}
												className="star__rating--white"
												style={{
													width: "100px",
													height: "100px",
													background: `linear-gradient(90deg, rgba(0,0,0,1) ${partOfStarSelected.toString()}%, rgba(255,255,255,1) ${partOfStarSelected.toString()}%)`,
												}}
												onClick={handleChangeStarRating}
											></button>
										);
									} else {
										return (
											<button
												key={el}
												id={`${el}`}
												className="star__rating--white"
												style={{
													width: "100px",
													height: "100px",
												}}
												onClick={handleChangeStarRating}
											></button>
										);
									}
								})}
							</div>
							<div>
								{article.rating.length === 0 ||
								article.rating === undefined
									? "Nie ma jeszcze ocen"
									: `Ocena łączna: ${averageRating.toFixed(
											2
									  )} / Ocen: ${article.rating.length}`}
							</div>
						</>
					);
				}
			})}
		</>
	);
};
