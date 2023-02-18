import {
	deleteDoc,
	deleteField,
	doc,
	DocumentData,
	onSnapshot,
	updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { db } from "../../config/firebaseConfig";
import { useGetArticles } from "../../hooks/useGetArticles";
import ReactPaginate from "react-paginate";
import { ArticleParameters } from "../../utils/interfaces";

interface EditArticleType {
	articleType?: string;
}

let dateToShow: string;

interface Months {
	key: number;
	value: string;
}

export const EditArticles = ({ articleType }: EditArticleType) => {
	const [showModal, setShowModal] = useState<boolean>(false);
	const [modal, setModal] = useState<ArticleParameters>();
	const articles = useGetArticles(articleType);

	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(10);

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = articles.slice(indexOfFirstPost, indexOfLastPost);

	const paginate = ({ selected }: any) => {
		setCurrentPage(selected + 1);
	};

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

	const deleteItem = async (e: any) => {
		if (articleType === undefined) {
			return;
		}
		const fieldName = e.target.name;

		await updateDoc(doc(db, "content", articleType), {
			[fieldName]: deleteField(),
		});
	};

	const openModal = (modalData: ArticleParameters) => {
		setShowModal(true);
		setModal(modalData);
	};

	const hideModal = () => {
		setShowModal(false);
	};

	return (
		<div className="d-flex flex-column p-2 align-items-center gap-2">
			{articles !== undefined
				? currentPosts.map((article: ArticleParameters) => {
						return (
							<div
								className="d-flex w-100 flex-row gap-1"
								style={{
									border: "white 1px solid",
									borderRadius: "20px",
									cursor: "pointer",
									minHeight: "120px",
								}}
								onClick={() => openModal(article)}
							>
								<div
									className="d-flex align-items-center justify-content-center text-center"
									style={{
										borderRight: "white 1px solid",
										width: "20%",
									}}
								>
									<img
										src={article.picture}
										className="articles__image d-flex align-self-center"
										style={{
											maxHeight: "100px",
											maxWidth: "150px",
										}}
									/>
								</div>
								<div
									className="d-flex px-2 pt-2 align-items-center justify-content-center text-center"
									style={{
										borderLeft: "white 1px solid",
										borderRight: "white 1px solid",
										width: "20%",
									}}
								>
									<div>{article.title}</div>
								</div>
								<div
									className="d-flex px-2 pt-2 align-items-center justify-content-start text-left"
									style={{
										borderLeft: "white 1px solid",
										borderRight: "white 1px solid",
										width: "70%",
									}}
								>
									<div>{article.short_descr}</div>
								</div>
								<div
									className="d-flex px-2 pt-2 align-items-center justify-content-center text-center"
									style={{
										borderLeft: "white 1px solid",
										borderRight: "white 1px solid",
										width: "10%",
										borderTopRightRadius: "20px",
										borderBottomRightRadius: "20px",
									}}
								>
									<div>
										<button
											className="logon"
											name={`${articleType}_id_${article.id}`}
										>
											Edytuj
										</button>
										<button
											onClick={deleteItem}
											className="logon"
											name={`${articleType}_id_${article.id}`}
										>
											Usuń
										</button>
									</div>
								</div>
							</div>
						);
				  })
				: ""}
			{Math.ceil(articles.length / postsPerPage) > 1 ? <div className="pt-2">
				<ReactPaginate
					onPageChange={paginate}
					pageCount={Math.ceil(articles.length / postsPerPage)}
					previousLabel={"Prev"}
					nextLabel={"Next"}
					containerClassName={"pagination"}
					pageLinkClassName={"page-link"}
					previousLinkClassName={"page-link"}
					nextLinkClassName={"page-link"}
					activeLinkClassName={"page-link active"}
					disabledLinkClassName={"page-link disabled"}
				/>
			</div> : ''}
			<Modal
				size="lg"
				show={showModal}
				onHide={hideModal}
				centered
				style={{
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
					justifyContent: "flex-start",
					marginTop: "1.5em",
				}}
			>
				<Modal.Header
					closeButton
					closeVariant="white"
					style={{ backgroundColor: "rgba(161, 14, 184)" }}
				>
					<Modal.Title>{modal?.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body style={{ backgroundColor: "rgba(0, 0, 0)" }}>
					<div className="mt-4 px-4 pb-3 d-flex flex-column w-100 align-items-center">
						<img
							src={modal?.picture}
							alt={modal?.title}
							style={{
								height: "30%",
								maxHeight: "400px",
								borderRadius: "10px",
							}}
						></img>
						<div className="d-flex justify-content-start align-items-start flex-column mt-3 w-100 ">
							<div style={{ fontSize: "0.75rem" }}>
								Data publikacji:{" "}
								{modal ? generateDate(modal) : ""}
							</div>
							<div
								className="w-100"
								style={{ fontSize: "0.75rem" }}
							>
								Autor: {modal?.author}
							</div>
						</div>
						<h1 className="mb-4">{modal?.title}</h1>
						<div
							className="mb-4 text-left w-100"
							style={{ fontWeight: "bold" }}
						>
							{modal?.short_descr}
						</div>
						{modal?.content.split("\n").map((paragraph: string) => {
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
				</Modal.Body>
			</Modal>
		</div>
	);
};
