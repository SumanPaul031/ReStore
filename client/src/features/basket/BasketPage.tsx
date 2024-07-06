import {
	Box,
	Button,
	Grid,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../app/context/StoreContext";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";

export default function BasketPage() {
	const { basket, setBasket, removeItem } = useStoreContext();
	const [status, setStatus] = useState({
		loading: false,
		name: "",
	});

	function handleAddItem(productId: number, name: string) {
		setStatus({ loading: true, name });
		agent.Basket.addItem(productId)
			.then((basket) => setBasket(basket))
			.catch((err) => console.log(err))
			.finally(() => setStatus({ loading: false, name: "" }));
	}

	function handleRemoveItem(
		productId: number,
		name: string,
		quantity: number = 1
	) {
		setStatus({ loading: true, name });
		agent.Basket.removeItem(productId, quantity)
			.then(() => removeItem(productId, quantity))
			.catch((err2) => console.log(err2))
			.finally(() => setStatus({ loading: false, name: "" }));
	}

	if (!basket)
		return <Typography variant="h3">Your basket is empty</Typography>;

	return (
		<>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }}>
					<TableHead>
						<TableRow>
							<TableCell>Product</TableCell>
							<TableCell align="right">Price</TableCell>
							<TableCell align="center">Quantity</TableCell>
							<TableCell align="right">Subtotal</TableCell>
							<TableCell align="right"></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{basket.items.map((item) => (
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
									<LoadingButton
										loading={
											status.loading &&
											status.name ===
												"remove" + item.productId
										}
										onClick={() =>
											handleRemoveItem(
												item.productId,
												"remove" + item.productId
											)
										}
										color="error"
									>
										<Remove></Remove>
									</LoadingButton>
									{item.quantity}
									<LoadingButton
										loading={
											status.loading &&
											status.name ===
												"add" + item.productId
										}
										onClick={() =>
											handleAddItem(
												item.productId,
												"add" + item.productId
											)
										}
										color="secondary"
									>
										<Add></Add>
									</LoadingButton>
								</TableCell>
								<TableCell align="right">
									$
									{(
										(item.price * item.quantity) /
										100
									).toFixed(2)}
								</TableCell>
								<TableCell align="right">
									<LoadingButton
										loading={
											status.loading &&
											status.name ===
												"del" + item.productId
										}
										onClick={() =>
											handleRemoveItem(
												item.productId,
												"del" + item.productId,
												item.quantity
											)
										}
										color="error"
									>
										<Delete></Delete>
									</LoadingButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Grid container>
				<Grid item xs={6}></Grid>
				<Grid item xs={6}>
					<BasketSummary></BasketSummary>
					<Button component={Link} to="/checkout" variant="contained" size="large" fullWidth>
						Checkout
					</Button>
				</Grid>
			</Grid>
		</>
	);
}
