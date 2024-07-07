import React from "react";
import ReactDOM from "react-dom/client";
import "./app/layout/styles.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/Routes.tsx";
// import { StoreProvider } from "./app/context/StoreContext.tsx";
// import { ConfigureStore } from "./app/store/ConfigureStore.ts";
import { Provider } from "react-redux";
import { store } from "./app/store/ConfigureStore.ts";

// const store = ConfigureStore();
// console.log(store.getState());

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
		{/* <StoreProvider>
		</StoreProvider> */}
	</React.StrictMode>
);
