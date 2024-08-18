import { Button, ButtonGroup, Typography } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import {
// 	CounterState,
// 	decrement,
// 	increment,
// } from "../../app/context/CounterReducer";
import { useAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import { decrement, increment } from "../../app/context/CounterSlice";

export default function ContactPage() {
	const dispatch = useAppDispatch();
	const { data, title } = useAppSelector((state) => state.counterSlice);
	// const title = useAppSelector((state: CounterState) => state.title);
	return (
		<>
			<Typography variant="h2">{title}</Typography>
			<Typography variant="h5">{data}</Typography>
			<ButtonGroup>
				<Button
					onClick={() => dispatch(decrement(1))}
					variant="contained"
					color="error"
				>
					Decrement
				</Button>
				<Button
					onClick={() => dispatch(increment(1))}
					variant="contained"
					color="primary"
				>
					Increment
				</Button>
				<Button
					onClick={() => dispatch(increment(6))}
					variant="contained"
					color="secondary"
				>
					Increment By 6
				</Button>
			</ButtonGroup>
		</>
	);
}
