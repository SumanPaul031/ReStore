import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/basket";
import agent from "../../app/api/agent";
import { getCookie } from "../../app/utils/util";

export interface BasketState {
	basket: Basket | null;
	status: string;
}

const initialState: BasketState = {
	basket: null,
	status: "idle",
};

export const FetchBasketAsync = createAsyncThunk<Basket>(
	"basket/fetchBasketAsync",
	async (_, thunkAPI) => {
		try {
			return await agent.Basket.get();
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: error.data });
		}
	},
	{
		condition: () => {
			if (!getCookie("buyerId")) return false;
		},
	}
);

export const AddBasketItemAsync = createAsyncThunk<
	Basket,
	{ productId: number; quantity?: number }
>(
	"basket/addBasketItemAsync",
	async ({ productId, quantity = 1 }, thunkAPI) => {
		try {
			return await agent.Basket.addItem(productId, quantity);
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: error.data });
		}
	}
);

export const RemoveBasketItemAsync = createAsyncThunk<
	void,
	{ productId: number; quantity: number; name?: string }
>("basket/removeBasketItemAsync", async ({ productId, quantity }, thunkAPI) => {
	try {
		return await agent.Basket.removeItem(productId, quantity);
	} catch (error) {
		return thunkAPI.rejectWithValue({ error: error.data });
	}
});

export const BasketSlice = createSlice({
	name: "basket",
	initialState,
	reducers: {
		setBasket: (state, action) => {
			state.basket = action.payload;
		},
		removeItem: (state, action) => {
			const { productId, quantity } = action.payload;
			const itemIndex = state.basket?.items.findIndex(
				(i) => i.productId === productId
			);
			if ([-1, undefined].includes(itemIndex)) return;
			state.basket!.items[itemIndex!].quantity -= quantity;
			if (state.basket!.items[itemIndex!].quantity <= 0) {
				state.basket!.items.splice(itemIndex!, 1);
			}
		},
		clearBasket: (state) => {
			state.basket = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(AddBasketItemAsync.pending, (state, action) => {
			state.status = "pendingAddItem" + action.meta.arg.productId;
		});
		builder.addCase(RemoveBasketItemAsync.pending, (state, action) => {
			state.status =
				"pendingRemoveItem" +
				action.meta.arg.productId +
				action.meta.arg.name;
		});
		builder.addCase(RemoveBasketItemAsync.fulfilled, (state, action) => {
			const { productId, quantity } = action.meta.arg;
			const itemIndex = state.basket?.items.findIndex(
				(i) => i.productId === productId
			);
			if ([-1, undefined].includes(itemIndex)) return;
			state.basket!.items[itemIndex!].quantity -= quantity;
			if (state.basket!.items[itemIndex!].quantity <= 0) {
				state.basket!.items.splice(itemIndex!, 1);
			}
			state.status = "idle";
		});
		builder.addCase(RemoveBasketItemAsync.rejected, (state) => {
			state.status = "idle";
		});
		builder.addMatcher(
			isAnyOf(AddBasketItemAsync.fulfilled, FetchBasketAsync.fulfilled),
			(state, action) => {
				state.basket = action.payload;
				state.status = "idle";
			}
		);
		builder.addMatcher(
			isAnyOf(AddBasketItemAsync.rejected, FetchBasketAsync.fulfilled),
			(state) => {
				state.status = "idle";
			}
		);
	},
});

export const { setBasket, removeItem, clearBasket } = BasketSlice.actions;
