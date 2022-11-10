import { useState, useEffect } from "react";
import { useUser } from "../../hooks/useUser";

export const LogonData = () => {
	const user = useUser();

	if (user !== null && user !== undefined) {
		return <button className="logon">Witaj {user?.name}</button>;
	} else {
		return <button className="logon">Logowanie</button>;
	}
};
