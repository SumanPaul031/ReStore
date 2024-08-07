import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App></App>,
		children: [
			{ path: "", element: <HomePage></HomePage> },
			{ path: "catalog", element: <Catalog></Catalog> },
			{ path: "catalog/:id", element: <ProductDetails></ProductDetails> },
			{ path: "about", element: <AboutPage></AboutPage> },
			{ path: "contact", element: <ContactPage></ContactPage> },
			{ path: "server-error", element: <ServerError></ServerError> },
			{ path: "not-found", element: <NotFound></NotFound> },
			{ path: "checkout", element: <CheckoutPage></CheckoutPage> },
			{ path: "basket", element: <BasketPage></BasketPage> },
			{
				path: "*",
				element: <Navigate replace to="/not-found"></Navigate>,
			},
		],
	},
]);
