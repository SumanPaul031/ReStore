import {
	TableContainer,
	Paper,
	Table,
	TableBody,
	TableRow,
	TableCell,
} from "@mui/material";
// import { useStoreContext } from "../../app/context/StoreContext";
import { currencyFormat } from "../../app/utils/util";
import { useAppSelector } from "../../app/store/ConfigureStore";

interface Props {
	subtotal?: number;
}

export default function BasketSummary({ subtotal }: Props) {
	// const {basket} = useStoreContext()
	const { basket } = useAppSelector((state) => state.basket);
	if (subtotal === undefined) {
		subtotal =
			basket?.items.reduce(
				(sum, item) => sum + item.quantity * item.price,
				0
			) ?? 0;
	}
	const deliveryFee = subtotal > 10000 ? 0 : subtotal * 0.05;

	return (
		<TableContainer component={Paper} variant={"outlined"}>
			<Table>
				<TableBody>
					<TableRow>
						<TableCell colSpan={2}>Subtotal</TableCell>
						<TableCell align="right">
							{currencyFormat(subtotal)}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell colSpan={2}>Delivery fee*</TableCell>
						<TableCell align="right">
							{currencyFormat(deliveryFee)}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell colSpan={2}>Total</TableCell>
						<TableCell align="right">
							{currencyFormat(subtotal + deliveryFee)}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<span style={{ fontStyle: "italic" }}>
								*Orders over $100 qualify for free delivery
							</span>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
}
