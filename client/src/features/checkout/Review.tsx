import { Typography, Grid } from "@mui/material";
import BasketSummary from "../basket/BasketSummary";
import BasketTable from "../basket/BasketTable";
import { useAppSelector } from "../../app/store/ConfigureStore";

export default function Review() {
	const { basket } = useAppSelector((state) => state.basket);
	return (
		<>
			<Typography variant="h6" gutterBottom>
				Order summary
			</Typography>
			{basket && (
				<BasketTable
					items={basket.items}
					isBasket={false}
				></BasketTable>
			)}
			<Grid container>
				<Grid item xs={6}></Grid>
				<Grid item xs={6}>
					<BasketSummary></BasketSummary>
				</Grid>
			</Grid>
		</>
	);
}
