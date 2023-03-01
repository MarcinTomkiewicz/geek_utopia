import LeftPanel from "../LeftPanel/LeftPanel";
import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "../Home/Home";
import { About } from "../About/About";
import { ArticlesTab } from "../ArticlesTab/ArticlesTab";
import { useUser } from "../hooks/useUser";
import { AdminPanel } from "../AdminPanel/AdminPanel";
import { ArticlesOnlyPage } from "../ArticlesOnlyPage/ArticlesOnlyPage";
import { useGetArticles } from "../hooks/useGetArticles";
import { ShowFullArticle } from "../ShowFullArticle/ShowFullArticle";
import { ArticleParameters } from "../utils/interfaces";
import { ShowArticles } from "../ShowArticles/ShowArticles";

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
        <ArticlesTab articleType="news" currentTag=''/>  
        </div>
        <div className="side__content">
        <ArticlesTab articleType="articles" currentTag=''/>
        </div>
      </aside>
      <div className="articles__content d-flex flex-column justify-content-start align-items-center w-75 pb-2 mb-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/news/" element={<ArticlesOnlyPage articleType="news" defaultPostsOnPage={20} currentTag=''/>} />
          {user?.is_admin ? <Route path="/admin/*" element={<AdminPanel />} /> : <Route path="/admin" element="Nie masz wystarczających uprawnień, aby tu wejść" />}
          {news.map((newsItem: ArticleParameters) => {
            return <Route path={`/news/${newsItem.id}`} key={newsItem.id} element={<ShowFullArticle articleType="news" id={newsItem?.id} currentTag=''/>} />;
          })}
          {news.map((newsItem: ArticleParameters) => {
            return newsItem.tags.map((tag: string) => {
              return <Route path={`/news/${tag}`} key={newsItem.id} element={<ArticlesOnlyPage articleType="news" currentTag={tag} defaultPostsOnPage={20} />} />;
          })
          })}
          {articles.map((article: ArticleParameters) => {
            return <Route path={`/articles/${article.id}`} key={article.id} element={<ShowFullArticle articleType="articles" id={article.id} currentTag=''/>} />;
          })}
        </Routes>
      </div>
    </main>
  );
};
