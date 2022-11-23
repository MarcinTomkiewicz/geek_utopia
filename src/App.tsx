import { Footer } from "./Footer/Footer";
import { MainContent } from "./MainContent/MainContent";
import { TopLogo } from "./TopLogo/TopLogo";
import { TopMenu } from "./TopMenu/TopMenu";

function App() {
	return (
		<main>
			<div className="wrapper">
				<TopLogo />
				<TopMenu />
				<MainContent />
				<Footer />
			</div>
		</main>
	);
}

export default App;
