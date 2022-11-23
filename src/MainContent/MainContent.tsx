import LeftPanel from "../LeftPanel/LeftPanel";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Home } from "../Home/Home";
import { About } from "../About/About";
import { ArticlesTab } from "../ArticlesTab/ArticlesTab";

export const MainContent = () => {
	let location = useLocation();

	return (
		<main className="main__content">
			<aside>
				<div className="side__content">
					<LeftPanel />
				</div>
				<div className="side__content"><ArticlesTab /></div>
				<div className="side__content"></div>
			</aside>
			<div className="articles__content">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
				</Routes>
			</div>
		</main>
	);
};
