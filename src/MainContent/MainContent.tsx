import LeftPanel from "../LeftPanel/LeftPanel";
// import { Registration } from "../LoginAndRegistration/Registration"

export const MainContent = () => {
	return (
		<main className="main__content">
			<aside>
				<div className="side__content">
					<LeftPanel />
				</div>
				<div className="side__content"></div>
				<div className="side__content"></div>
			</aside>
			<div className="articles__content"></div>
		</main>
	);
};
