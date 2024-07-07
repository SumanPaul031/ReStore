import { configureStore } from "@reduxjs/toolkit";
// import CounterReducer from "../context/CounterReducer";
import { CounterSlice } from "../context/CounterSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { BasketSlice } from "../../features/basket/BasketSlice";
import { CatalogSlice } from "../../features/catalog/CatalogSlice";

// export function ConfigureStore() {
// 	return configureStore({
// 		reducer: {
// 			CounterReducer,
// 		},
// 	});
// }

export const store = configureStore({
	reducer: {
		counterReducerSlice: CounterSlice.reducer,
		basket: BasketSlice.reducer,
		catalog: CatalogSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
