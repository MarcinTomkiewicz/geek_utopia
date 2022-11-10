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
			</div>
		</main>
	);
}

export default App;
