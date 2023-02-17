import LeftPanel from "../LeftPanel/LeftPanel";
import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "../Home/Home";
import { About } from "../About/About";
import { ArticlesTab } from "../ArticlesTab/ArticlesTab";
import { useUser } from "../hooks/useUser";
import { AdminPanel, ArticleParameters } from "../AdminPanel/AdminPanel";
import { ArticlesOnlyPage } from "../ArticlesOnlyPage/ArticlesOnlyPage";
import { useGetArticles } from "../hooks/useGetArticles";
import { ShowFullArticle } from "../ShowFullArticle/ShowFullArticle";

export const MainContent = () => {
  let location = useLocation();
  const user = useUser();

  const news = useGetArticles("news");
  const articles = useGetArticles("articles");

  return (
    <main className="pt-2 d-flex flex-row justify-content-between align-items-start gap-3">
      <aside className="d-flex flex-column justify-content-start w-25">
        <div className="side__content">
          <LeftPanel />
        </div>
        <div className="side__content">
        <ArticlesTab type="news" />  
        </div>
        <div className="side__content">
        <ArticlesTab type="articles"/>
        </div>
      </aside>
      <div className="articles__content d-flex flex-column justify-content-start align-items-center w-75 pb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<ArticlesOnlyPage articleType="news" defaultPostsOnPage={20} />} />
          {user?.is_admin ? <Route path="/admin/*" element={<AdminPanel />} /> : <Route path="/admin" element="Nie masz wystarczających uprawnień, aby tu wejść" />}
          {news.map((newsItem: ArticleParameters) => {
            return <Route path={`/news/${newsItem.id}`} key={newsItem.id} element={<ShowFullArticle type="news" id={newsItem?.id} />} />;
          })}
          {articles.map((article: ArticleParameters) => {
            return <Route path={`/news/${article.id}`} key={article.id} element={<ShowFullArticle type="articles" id={article?.id} />} />;
          })}
        </Routes>
      </div>
    </main>
  );
};
