import {
	Avatar,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	Typography,
} from "@mui/material";
import { Component } from "react";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
// import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
// import { StoreContext } from "../../app/context/StoreContext";
import { currencyFormat } from "../../app/utils/util";
import {
	AddBasketItemAsync,
	BasketState,
	removeItem,
	setBasket,
} from "../basket/BasketSlice";
import { connect } from "react-redux";
import { Basket } from "../../app/models/basket";
import { AppDispatch, RootState } from "../../app/store/ConfigureStore";

interface Props {
	product: Product;
	basketState: BasketState;
	setBasket: (basket: Basket) => void;
	removeItem: (productId: number, quantity: number) => void;
	AddBasketItemAsync: (productId: number, quantity?: number) => void;
}

interface State {
	loading: boolean;
}

class ProductCardClass extends Component<Props, State> {
	// static contextType = StoreContext;
	// declare context: React.ContextType<typeof StoreContext>;

	// setBasket: (basket: Basket) => void;

	constructor(props: Props) {
		super(props);
		this.state = {
			loading: false,
		};

		// this.handleAddItem = this.handleAddItem.bind(this);
	}

	// handleAddItem = (productId: number) => {
	// 	this.setState(() => ({ loading: true }));
	// 	agent.Basket.addItem(productId)
	// 		.then((basket) => {
	// 			console.log(basket);
	// 			// this.context?.setBasket(basket);
	// 			this.props.setBasket(basket);
	// 		})
	// 		.catch((error) =>
	// 			console.error("Error adding item to basket:", error)
	// 		)
	// 		.finally(() => this.setState(() => ({ loading: false })));
	// };

	render() {
		return (
			<Card>
				<CardHeader
					avatar={
						<Avatar sx={{ bgcolor: "secondary.main" }}>
							{this.props.product.name.charAt(0).toUpperCase()}
						</Avatar>
					}
					title={this.props.product.name}
					titleTypographyProps={{
						sx: { fontWeight: "bold", color: "primary.main" },
					}}
				></CardHeader>
				<CardMedia
					sx={{
						height: 140,
						backgroundSize: "contain",
						bgcolor: "primary.light",
					}}
					image={this.props.product.pictureUrl}
					title={this.props.product.name}
				/>
				<CardContent>
					<Typography gutterBottom color="secondary" variant="h5">
						{currencyFormat(this.props.product.price)}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{this.props.product.brand} / {this.props.product.type}
					</Typography>
				</CardContent>
				<CardActions>
					<LoadingButton
						loading={
							this.props.basketState?.status ===
							"pendingAddItem" + this.props.product.id
						}
						size="small"
						// onClick={() =>
						// 	this.handleAddItem(this.props.product.id)
						// }
						onClick={() =>
							this.props.AddBasketItemAsync(this.props.product.id)
						}
					>
						Add To Cart
					</LoadingButton>
					<Button
						component={Link}
						to={`/catalog/${this.props.product.id}`}
						size="small"
					>
						View
					</Button>
				</CardActions>
			</Card>
		);
	}
}

const mapStateToProps = (state: RootState) => ({
	basketState: state.basket,
});

// const mapDispatchToProps = () => ({
// 	setBasket,
// 	removeItem,
// });

const mapDispatchToProps = (dispatch: AppDispatch) => ({
	setBasket: (basket: Basket) => dispatch(setBasket(basket)),
	removeItem: (productId: number, quantity: number) =>
		dispatch(removeItem({ productId, quantity })),
	AddBasketItemAsync: (productId: number) =>
		dispatch(AddBasketItemAsync({ productId })),
});

// export default ProductCard;
const ProductCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductCardClass);

export default ProductCard;
