import LeftPanel from "../LeftPanel/LeftPanel";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Home } from "../Home/Home";
import { About } from "../About/About";
import { ArticlesTab } from "../ArticlesTab/ArticlesTab";
import { useUser } from "../hooks/useUser";
import { AdminPanel } from "../AdminPanel/AdminPanel";
import { News } from "../News/News";

export const MainContent = () => {
  let location = useLocation();
  const user = useUser();

  return (
    <main className="main__content">
      <aside>
        <div className="side__content">
          <LeftPanel />
        </div>
        <div className="side__content">
          <ArticlesTab />
        </div>
        <div className="side__content">
          <ArticlesTab />
        </div>
      </aside>
      <div className="articles__content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          {user?.is_admin ? <Route path="/admin" element={<AdminPanel />} /> : <Route path="/admin" element="Nie masz wystarczających uprawnień, aby tu wejść" />}
        </Routes>
      </div>
    </main>
  );
};
