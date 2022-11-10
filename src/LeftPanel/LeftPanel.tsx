import { FunctionComponent, useEffect, useState } from "react";
import { Registration } from "../LoginAndRegistration/Registration";
import { Login } from "../LoginAndRegistration/Login";
import { useUser } from "../hooks/useUser";
import { Logout } from "../LoginAndRegistration/Logout";

const LeftPanel: FunctionComponent = () => {
	const user = useUser();

	const [panelChanger, setPanelChanger] = useState<string>("login");
	const [leftPanel, setLeftPanel] = useState<JSX.Element>(<Login />);

	useEffect(() => {
		if (user === null && panelChanger === "login") {
			setLeftPanel(<Login />);
		}
		if (user === null && panelChanger === "register") {
			setLeftPanel(<Registration />);
		}
		if (user !== null) {
			setLeftPanel(<Logout />);
		}
	}, [panelChanger, user]);

	const determinePanels = () => {
		if (user === null && panelChanger === "register") {
			return (
				<div
					style={{
						marginTop: "2rem",
						textAlign: "center",
						width: "60%",
					}}
				>
					Masz już konto?{" "}
					<button
						className="logon"
						style={{ padding: "0" }}
						onClick={() => {
							setPanelChanger("login");
						}}
					>
						Zaloguj się!
					</button>
				</div>
			);
		}
		if (user === null && panelChanger === "login") {
			return (
				<div
					style={{
						marginTop: "2rem",
						textAlign: "center",
						width: "60%",
					}}
				>
					Nie masz jeszcze konta?{" "}
					<button
						className="logon"
						style={{ padding: "0" }}
						onClick={() => {
							setPanelChanger("register");
						}}
					>
						Zarejestruj się!
					</button>
				</div>
			);
		}
		if (
			user !== null &&
			(panelChanger === "login" || panelChanger === "register")
		) {
			setPanelChanger("statistics");
		}
		if (user === null && panelChanger === "statistics") {
			setPanelChanger("login");
		}
	};

	return (
		<>
			{leftPanel}
			{determinePanels()}
		</>
	);
};

export default LeftPanel;
