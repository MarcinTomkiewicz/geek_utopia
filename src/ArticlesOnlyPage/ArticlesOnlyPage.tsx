import { useGetArticles } from "../hooks/useGetArticles";
import { useState } from "react";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { ArticleParameters, Months } from "../utils/interfaces";
import { badgeBackground, monthLabels } from "../utils/utilsObjects";

interface ArticlesPageProps {
	articleType: string;
	defaultPostsOnPage: number;
}

export const ArticlesOnlyPage = ({
	articleType,
	defaultPostsOnPage,
}: ArticlesPageProps): any => {
	const news = useGetArticles(articleType);
	const newsExceptOfFirst = news.slice(1);

	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage, setPostsPerPage] = useState(defaultPostsOnPage);

	const indexOfLastNews = currentPage * postsPerPage;
	const indexOfFirstNews = indexOfLastNews - postsPerPage;
	const currentNews = newsExceptOfFirst.slice(
		indexOfFirstNews,
		indexOfLastNews
	);

	const paginate = ({ selected }: any) => {
		setCurrentPage(selected + 1);
	};

	if (news === undefined) {
		return null;
	}

	const handlePostsOnPageChange = (e: any) => {
		setPostsPerPage(e.target.value);
		if (currentNews.length === 0) {
			setCurrentPage(1);
		}
	};

	let dateToShow: string;

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

	return (
		<>
			<h1 className="py-3">Newsy</h1>
			<div className="d-flex flex-column gap-2 w-100">
				<div
					className="d-flex justify-content-between align-items-center flex-column w-100 mb-3 p-2 article__list no--opacity"
					key={news[0]?.id}
				>
					<div className="d-flex justify-content-center w-100">
						<Link
							to={`/news/${news[0]?.id}`}
							className="general__text"
							style={{ cursor: "pointer" }}
						>
							<img
								src={news[0]?.picture}
								alt={news[0]?.title}
								style={{ borderRadius: "10px", width: "100%" }}
							/>
						</Link>
					</div>
					<div className="d-flex mt-2 justify-content-start align-items-start flex-column w-100 h-100">
						<Link
							to={`/news/${news[0]?.id}`}
							className="general__text"
							style={{ cursor: "pointer" }}
						>
							<div className="d-flex align-items-center flex-row w-100">
								<h2 style={{ marginBottom: "0" }}>
									{news[0]?.title}{" "}
								</h2>
								{news[0]?.is_adult ? (
									<h5
										className="mx-2 align-middle"
										style={{
											marginBottom: "0",
										}}
									>
										<Badge bg="danger">18+</Badge>
									</h5>
								) : (
									""
								)}
							</div>
							<div className="d-flex justify-content-between align-items-center flex-row w-100">
								<div style={{ fontSize: "0.75rem" }}>
									{generateDate(news[0])}
								</div>
							</div>
						</Link>
						<div className="d-flex flex-row justify-content-start gap-2 align-items-center mt-1 mb-3 flex-wrap w-100">
							{news[0]?.tags[0] !== ""
								? news[0]?.tags.map((tag: any) => {
										return (
											<Badge
												bg={
													badgeBackground[
														Math.floor(
															Math.random() *
																badgeBackground.length
														)
													]
												}
											>
												{tag}
											</Badge>
										);
								  })
								: "Nie ma żadnych tagów do tego artykułu"}
						</div>
						<div>
							{news[0]?.short_descr === undefined ||
							news[0]?.short_descr === ""
								? news[0]?.content.substring(0, 500)
								: news[0]?.short_descr}
							...
						</div>
					</div>
				</div>
			</div>
			<div className="d-flex flex-row justify-content-between align-items-center w-100 mb-3 w-75">
				<h3>
					Pozostałe {articleType === "news" ? "newsy" : "artykuły"}
				</h3>
				<div className="d-flex flex-row justify-content-around align-items-center flex-1 gap-2">
					<div>Postów na stronę: </div>
					<button
						onClick={handlePostsOnPageChange}
						style={{
							background: "#a10eb8",
							color: "#f7fcfc",
							border: "white 1px solid",
							borderRadius: "5px",
						}}
						className="text-center"
						value={1}
					>
						10
					</button>
					<button
						onClick={handlePostsOnPageChange}
						style={{
							background: "#a10eb8",
							color: "#f7fcfc",
							border: "white 1px solid",
							borderRadius: "5px",
						}}
						className="text-center"
						value={2}
					>
						20
					</button>
					<button
						onClick={handlePostsOnPageChange}
						style={{
							background: "#a10eb8",
							color: "#f7fcfc",
							border: "white 1px solid",
							borderRadius: "5px",
						}}
						className="text-center"
						value={5}
					>
						50
					</button>
				</div>
			</div>
			<div className="article__wrap">
				{currentNews.map((article: ArticleParameters, i: number) => {
					const linkToNavigate = `/news/${article?.id}`;

					return (
						<div
							key={article?.id}
							className="article__wrap--children"
						>
							<div
								className="d-flex justify-content-between align-items-start flex-column w-100 mb-3 p-2 article__list"
								style={{ height: "calc(100% - 1rem)" }}
								key={article?.id}
							>
								<div className="articles__image--container w-50 align-self-center">
									<Link
										to={linkToNavigate}
										className="general__text"
										style={{ cursor: "pointer" }}
									>
										<img
											src={article?.picture}
											alt={article?.title}
											className="articles__image"
										/>
									</Link>
								</div>
								<div className="d-flex mt-2 mx-3 justify-content-start align-items-start flex-column w-100 h-100">
									<Link
										to={linkToNavigate}
										className="general__text"
										style={{ cursor: "pointer" }}
									>
										<div className="d-flex align-items-center flex-row w-100">
											<h2
												style={{
													marginBottom: "0",
												}}
											>
												{article?.title}{" "}
											</h2>
											{article.is_adult ? (
												<h5
													className="mx-2 align-middle"
													style={{
														marginBottom: "0",
													}}
												>
													<Badge bg="danger">
														18+
													</Badge>
												</h5>
											) : (
												""
											)}
										</div>
										<div className="d-flex justify-content-between align-items-center flex-row w-100 mb-3">
											<div
												style={{
													fontSize: "10px!important",
												}}
											>
												{generateDate(article)}
											</div>
										</div>
									</Link>
									<div className="d-flex flex-row justify-content-start gap-2 align-items-center mt-1 mb-3 flex-wrap w-100">
										{article?.tags[0] !== ""
											? article?.tags.map((tag) => {
													if (tag === "") {
														return;
													}
													return (
														<Badge
															bg={
																badgeBackground[
																	Math.floor(
																		Math.random() *
																			badgeBackground.length
																	)
																]
															}
														>
															{tag}
														</Badge>
													);
											  })
											: "Nie ma żadnych tagów do tego artykułu"}
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
			{Math.ceil(news.length / postsPerPage) > 1 ? (
				<div className="pt-2">
					<ReactPaginate
						onPageChange={paginate}
						pageCount={Math.ceil(news.length / postsPerPage)}
						previousLabel={"Prev"}
						nextLabel={"Next"}
						containerClassName={"pagination"}
						pageLinkClassName={"page-link"}
						previousLinkClassName={"page-link"}
						nextLinkClassName={"page-link"}
						activeLinkClassName={"page-link active"}
						disabledLinkClassName={"page-link disabled"}
					/>
				</div>
			) : (
				""
			)}
		</>
	);
};
