import { ArticleParameters } from "../AdminPanel/AdminPanel";
import { useGetArticles } from "../hooks/useGetArticles";
import { useEffect, useState } from "react";

export const News = (): any => {
	const news = useGetArticles("news");

	if (news.length === 0) {
		return;
	}

	const newsToShow = news?.filter((item: any) => item.is_online).slice(-5);
	console.log(newsToShow);

	return (
		<div className="articles__content--wrapper">
			<div
				style={{
					width: "100%",
					maxHeight: "400px",
					display: "flex",
					flexDirection: "row",
					border: "1px solid white",
				}}
			>
				<div
					style={{
						width: "100%",
						height: "100%",
						border: "1px solid white",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
					}}
				>
					<img
						src={newsToShow[0].picture}
						style={{ maxWidth: "100%", marginTop: "-8%" }}
					/>
                    <h1 style={{ height: "10%", marginTop: "-15%" }}>{newsToShow[0].title}</h1>
				</div>
				<div
					style={{
						width: "100%",
						height: "100%",
						border: "1px solid white",
						display: "flex",
						flexDirection: "row",
						flexWrap: "wrap",
					}}
				>
					<div
						style={{
							border: "1px solid white",
							width: "50%",
							height: "50%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center"
						}}
					>
						<img
							src={newsToShow[1]?.picture}
							style={{ maxWidth: "100%", maxHeight: "100%", marginTop: "-9.5%"}}
						/>
                        <h4 style={{ height: "10%", marginTop: "-20%" }}>{newsToShow[1].title}</h4>
					</div>
					<div
						style={{
							border: "1px solid white",
							width: "50%",
							height: "50%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center"
						}}
					>
						<img
							src={newsToShow[2]?.picture}
							style={{ maxWidth: "100%", maxHeight: "100%", marginTop: "-9.5%"}}
						/>
                        <h4 style={{ height: "10%", marginTop: "-20%" }}>{newsToShow[2].title}</h4>
					</div>
					<div
						style={{
							border: "1px solid white",
							width: "50%",
							height: "50%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center"
						}}
					>
						<img
							src={newsToShow[3]?.picture}
							style={{ width: "auto", maxWidth: "100%", maxHeight: "100%", alignSelf: "center" }}
						/>
					</div>
					<div
						style={{
							border: "1px solid white",
							width: "50%",
							height: "50%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center"
						}}
					>
						<img
							src={newsToShow[4]?.picture}
							style={{ width: "auto", maxWidth: "100%", maxHeight: "100%", alignSelf: "center" }}
						/>
					</div>
				</div>
			</div>
			{/* <div className="news__wrapper">
				<div className="first__news--wrapper">
					<img
						key={newsToShow[0].picture}
						src={newsToShow[0].picture}
						alt={newsToShow[0].title}
						className="news__picture"
					/>
					<h1 className="news__header" key={newsToShow[0].id}>
						{newsToShow[0].title}
					</h1>
				</div>
                <div className="other__news--wrapper">
				{newsToShow.map((el: ArticleParameters, i: number) => {
					if (i > 0) {
						return (
                            <div className="other__news--content">
                            <img
                                key={el?.picture}
                                src={el?.picture}
                                alt={el?.title}
                                className="other__news--picture"
                            />
                            <h4 className="other__news--header" key={el?.id}>
                                {el?.title}
                            </h4>
                        </div>
                        )
					}
				})}
                </div>
			</div> */}
		</div>
	);
};
