import { Outlet } from "react-router-dom";
import NavBar from "./navbar";

export default function() {
	return (
		<>
			<NavBar auth={false} />
			<Outlet />
		</>
	)
}