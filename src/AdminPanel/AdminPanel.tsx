import { Timestamp } from "firebase/firestore";
import { Route, Routes } from "react-router-dom";
import { AdminMenu } from "./AdminMenu";
import { AddArticle } from "./AddArticle/AddArticle";
import { EditArticles } from "./EditArticles/EditArticles";
import { useState } from "react";

export const AdminPanel = (): JSX.Element => {
  const [category, setCategory] = useState<string>("");
  return (
    <div className="d-flex pe-3 pt-4 flex-column w-100 flex-wrap">
      <AdminMenu />
      <Routes>
        <Route
          path="/add_news"
          key={"news"}
          element={<AddArticle categoryOfArticle="news" />}
        />
        <Route
          path="/add_article"
          key={"articles"}
          element={<AddArticle categoryOfArticle="articles" />}
        />
        <Route
          path="/edit_article"
          element={<EditArticles articleType="news" currentTag=''/>}
        />
      </Routes>
    </div>
  );
};
