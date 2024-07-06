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
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import { StoreContext } from "../../app/context/StoreContext";
import { currencyFormat } from "../../app/utils/util";

interface Props {
	product: Product;
}

interface State {
	loading: boolean;
}

class ProductCard extends Component<Props, State> {
	static contextType = StoreContext;
	declare context: React.ContextType<typeof StoreContext>;

	// setBasket: (basket: Basket) => void;

	constructor(props: Props) {
		super(props);
		this.state = {
			loading: false,
		};

		this.handleAddItem = this.handleAddItem.bind(this);
	}

	handleAddItem = (productId: number) => {
		this.setState(() => ({ loading: true }));
		agent.Basket.addItem(productId)
			.then((basket) => {
				console.log(basket);
				console.log(this.context);
				this.context?.setBasket(basket);
			})
			.catch((error) =>
				console.error("Error adding item to basket:", error)
			)
			.finally(() => this.setState(() => ({ loading: false })));
	};

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
						loading={this.state.loading}
						size="small"
						onClick={() =>
							this.handleAddItem(this.props.product.id)
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

export default ProductCard;
