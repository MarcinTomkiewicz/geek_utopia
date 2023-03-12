import { Timestamp } from "firebase/firestore";
import { Route, Routes } from "react-router-dom";
import { AdminMenu } from "./AdminMenu";
import { AddArticle } from "./AddArticle/AddArticle";
import { EditArticles } from "./EditArticles/EditArticles";
import { useState } from "react";
import { useGetArticles } from "../hooks/useGetArticles";
import { ArticleParameters } from "../utils/interfaces";

export const AdminPanel = (): JSX.Element => {
  const [category, setCategory] = useState<string>("");
  const news = useGetArticles("news");
  const articles = useGetArticles("articles");

  return (
    <div className="d-flex pe-3 pt-4 flex-column w-100 flex-wrap">
      <AdminMenu />
      <Routes>
        <Route path="/add_news" key={"news"} element={<AddArticle categoryOfArticle="news" />} />
        <Route path="/add_article" key={"articles"} element={<AddArticle categoryOfArticle="articles"/>} />
        <Route path="/edit_news/" element={<EditArticles articleType="news" currentTag="" />} />
        <Route path="/edit_articles" element={<EditArticles articleType="articles" currentTag="" />} />
        {news.map((newsItem: ArticleParameters) => {
          return <Route path={`/edit_news/${newsItem.id}`} key={newsItem.id} element={<AddArticle categoryOfArticle="news" dataToEdit={newsItem} />} />;
        })}
        {articles.map((articlesItem: ArticleParameters) => {
          return <Route path={`/edit_articles/${articlesItem.id}`} key={articlesItem.id} element={<AddArticle categoryOfArticle="articles" dataToEdit={articlesItem} />} />;
        })}
      </Routes>
    </div>
  );
};
