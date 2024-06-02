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

interface Props {
	product: Product;
}

interface State {
	value: string;
}

class ProductCard extends Component<Props, State> {
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
						${(this.props.product.price / 100.0).toFixed(2)}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{this.props.product.brand} / {this.props.product.type}
					</Typography>
				</CardContent>
				<CardActions>
					<Button size="small">Add To Cart</Button>
					<Button size="small">View</Button>
				</CardActions>
			</Card>
		);
	}
}

export default ProductCard;
