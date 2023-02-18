import { Timestamp } from "firebase/firestore";
import { Route, Routes } from "react-router-dom";
import { AdminMenu } from "../TopMenu/AdminMenu"
import { AddArticle } from "./AddArticle/AddArticle"
import { EditArticles } from "./EditArticles/EditArticles";

export const AdminPanel = () => {
  return (
    <div className="d-flex pe-3 pt-4 flex-column w-100 flex-wrap">
      <AdminMenu />
      <Routes>
      <Route path="/add_article" element={<AddArticle />} />
      <Route path="/edit_article" element={<EditArticles articleType="news" />} />
      </Routes>
    </div>
  )
}