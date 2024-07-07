import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
	data: number;
	title: string;
}

const initialState: CounterState = {
	data: 86,
	title: "7856btr6",
};

export const CounterSlice = createSlice({
	name: "counterReducerSlice",
	initialState,
	reducers: {
		increment: (state, action) => {
			state.data += action.payload;
		},
		decrement: (state, action) => {
			state.data -= action.payload;
		},
	},
});

export const { increment, decrement } = CounterSlice.actions;
