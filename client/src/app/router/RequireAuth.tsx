import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/ConfigureStore";

export default function RequireAuth() {
	const { user } = useAppSelector((state) => state.account);
	const location = useLocation();

	if (!user) {
		return <Navigate to="/login" state={{ from: location }}></Navigate>;
	}

    return <Outlet></Outlet>
}
