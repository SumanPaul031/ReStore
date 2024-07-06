import { useEffect, useState } from "react";
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
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../utils/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
	const { setBasket } = useStoreContext();
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

	useEffect(() => {
		const buyerId = getCookie("buyerId");
		if (buyerId) {
			agent.Basket.get()
				.then((basket) => setBasket(basket))
				.catch((err) => console.log(err))
				.finally(() => setLoading(false));
		} else {
			setLoading(false);
		}
	}, [setBasket]);

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
