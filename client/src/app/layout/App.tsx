import { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import {
	Container,
	CssBaseline,
	ThemeProvider,
	createTheme,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../utils/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/ConfigureStore";
import { FetchBasketAsync, setBasket } from "../../features/basket/BasketSlice";
import { fetchCurrentUserAsync } from "../../features/account/accountSlice";

function App() {
	const dispatch = useAppDispatch();
	// const { setBasket } = useStoreContext();
	const [loading, setLoading] = useState(true);
	const [darkMode, setDarkMode] = useState(false);
	const paletteType = darkMode ? "dark" : "light";
	const theme = createTheme({
		palette: {
			mode: paletteType,
			background: {
				default: paletteType === "light" ? "#eaeaea" : "#121212",
			},
		},
	});

	const initApp = useCallback(async () => {
		try {
			await dispatch(fetchCurrentUserAsync());
			await dispatch(FetchBasketAsync());
		} catch (error) {
			console.log(error);
		}
	}, [dispatch]);

	useEffect(() => {
		initApp()
			.then(() => console.log("init app done"))
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
		// const buyerId = getCookie("buyerId");
		// dispatch(fetchCurrentUserAsync());
		// if (buyerId) {
		// 	agent.Basket.get()
		// 		.then((basket) => dispatch(setBasket(basket)))
		// 		.catch((err) => console.log(err))
		// 		.finally(() => setLoading(false));
		// } else {
		// 	setLoading(false);
		// }
	}, [initApp]);

	function handleThemeChange() {
		setDarkMode(!darkMode);
	}

	if (loading)
		return (
			<LoadingComponent message="Initializing App..."></LoadingComponent>
		);

	return (
		<ThemeProvider theme={theme}>
			<ToastContainer
				position="bottom-right"
				hideProgressBar
				theme="colored"
			></ToastContainer>
			<CssBaseline></CssBaseline>
			<Header
				darkMode={darkMode}
				handleThemeChange={handleThemeChange}
			></Header>
			<Container>
				<Outlet></Outlet>
			</Container>
		</ThemeProvider>
	);
}

export default App;
