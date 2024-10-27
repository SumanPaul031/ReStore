import { Button, Grid, Typography } from "@mui/material";
// import { useStoreContext } from "../../app/context/StoreContext";
// import { useState } from "react";
// import agent from "../../app/api/agent";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/store/ConfigureStore";
import BasketTable from "./BasketTable";

export default function BasketPage() {
	// const { basket, setBasket, removeItem } = useStoreContext();
	const { basket } = useAppSelector((state) => state.basket);
	// const dispatch = useAppDispatch();
	// const [status, setStatus] = useState({
	// 	loading: false,
	// 	name: "",
	// });

	// function handleAddItem(productId: number, name: string) {
	// 	setStatus({ loading: true, name });
	// 	agent.Basket.addItem(productId)
	// 		.then((basket) => dispatch(setBasket(basket)))
	// 		.catch((err) => console.log(err))
	// 		.finally(() => setStatus({ loading: false, name: "" }));
	// }

	// function handleRemoveItem(
	// 	productId: number,
	// 	name: string,
	// 	quantity: number = 1
	// ) {
	// 	setStatus({ loading: true, name });
	// 	agent.Basket.removeItem(productId, quantity)
	// 		.then(() => dispatch(removeItem({ productId, quantity })))
	// 		.catch((err2) => console.log(err2))
	// 		.finally(() => setStatus({ loading: false, name: "" }));
	// }

	if (!basket)
		return <Typography variant="h3">Your basket is empty</Typography>;

	return (
		<>
			<BasketTable items={basket.items}></BasketTable>
			<Grid container>
				<Grid item xs={6}></Grid>
				<Grid item xs={6}>
					<BasketSummary></BasketSummary>
					<Button
						component={Link}
						to="/checkout"
						variant="contained"
						size="large"
						fullWidth
					>
						Checkout
					</Button>
				</Grid>
			</Grid>
		</>
	);
}
