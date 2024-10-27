import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Box,
} from "@mui/material";
import { RemoveBasketItemAsync, AddBasketItemAsync } from "./BasketSlice";
import { useAppSelector, useAppDispatch } from "../../app/store/ConfigureStore";
import { BasketItem } from "../../app/models/basket";

interface Props {
	items: BasketItem[];
	isBasket?: boolean;
}

export default function BasketTable({ items, isBasket = true }: Props) {
	const { status } = useAppSelector((state) => state.basket);
	const dispatch = useAppDispatch();
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }}>
				<TableHead>
					<TableRow>
						<TableCell>Product</TableCell>
						<TableCell align="right">Price</TableCell>
						<TableCell align="center">Quantity</TableCell>
						<TableCell align="right">Subtotal</TableCell>
						{isBasket && <TableCell align="right"></TableCell>}
					</TableRow>
				</TableHead>
				<TableBody>
					{items.map((item) => (
						<TableRow
							key={item.productId}
							sx={{
								"&:last-child td, &:last-child th": {
									border: 0,
								},
							}}
						>
							<TableCell component="th" scope="row">
								<Box display="flex" alignItems="center">
									<img
										src={item.pictureUrl}
										alt={item.name}
										style={{
											height: 50,
											marginRight: 20,
										}}
									/>
									<span>{item.name}</span>
								</Box>
							</TableCell>
							<TableCell align="right">
								${(item.price / 100).toFixed(2)}
							</TableCell>
							<TableCell align="center">
								{isBasket && (
									<LoadingButton
										// loading={
										// 	status.loading &&
										// 	status.name ===
										// 		"remove" + item.productId
										// }
										loading={
											status ===
											"pendingRemoveItem" +
												item.productId +
												"rem"
										}
										// onClick={() =>
										// 	handleRemoveItem(
										// 		item.productId,
										// 		"remove" + item.productId
										// 	)
										// }
										onClick={() =>
											dispatch(
												RemoveBasketItemAsync({
													productId: item.productId,
													quantity: 1,
													name: "rem",
												})
											)
										}
										color="error"
									>
										<Remove></Remove>
									</LoadingButton>
								)}
								{item.quantity}
								{isBasket && (
									<LoadingButton
										// loading={
										// 	status.loading &&
										// 	status.name ===
										// 		"add" + item.productId
										// }
										loading={
											status ===
											"pendingAddItem" + item.productId
										}
										// onClick={() =>
										// 	handleAddItem(
										// 		item.productId,
										// 		"add" + item.productId
										// 	)
										// }
										onClick={() =>
											dispatch(
												AddBasketItemAsync({
													productId: item.productId,
												})
											)
										}
										color="secondary"
									>
										<Add></Add>
									</LoadingButton>
								)}
							</TableCell>
							<TableCell align="right">
								$
								{((item.price * item.quantity) / 100).toFixed(
									2
								)}
							</TableCell>
							{isBasket && (
								<TableCell align="right">
									<LoadingButton
										// loading={
										// 	status.loading &&
										// 	status.name ===
										// 		"del" + item.productId
										// }
										loading={
											status ===
											"pendingRemoveItem" +
												item.productId +
												"del"
										}
										// onClick={() =>
										// 	handleRemoveItem(
										// 		item.productId,
										// 		"del" + item.productId,
										// 		item.quantity
										// 	)
										// }
										onClick={() =>
											dispatch(
												RemoveBasketItemAsync({
													productId: item.productId,
													quantity: item.quantity,
													name: "del",
												})
											)
										}
										color="error"
									>
										<Delete></Delete>
									</LoadingButton>
								</TableCell>
							)}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
