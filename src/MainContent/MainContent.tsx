import LeftPanel from "../LeftPanel/LeftPanel";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Home } from "../Home/Home";
import { About } from "../About/About";
import { ArticlesTab } from "../ArticlesTab/ArticlesTab";
import { useUser } from "../hooks/useUser";
import { AdminPanel, ArticleParameters } from "../AdminPanel/AdminPanel";
import { News } from "../News/News";
import { useGetArticles } from "../hooks/useGetArticles";
import { ShowArticles } from "../ShowArticles/ShowArticles";
import { ShowFullArticle } from "../ShowFullArticle/ShowFullArticle";
import { InstagramFeed } from "../InstagramFeed/InstagramFeed";

export const MainContent = () => {
  let location = useLocation();
  const user = useUser();

  const news = useGetArticles("news");
  const articles = useGetArticles("articles");

  return (
    <main className="main__content">
      <aside>
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
      <div className="articles__content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          {user?.is_admin ? <Route path="/admin" element={<AdminPanel />} /> : <Route path="/admin" element="Nie masz wystarczających uprawnień, aby tu wejść" />}
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
