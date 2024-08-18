import { ShoppingCart } from "@mui/icons-material";
import {
	AppBar,
	Badge,
	Box,
	IconButton,
	List,
	ListItem,
	Switch,
	Toolbar,
	Typography,
} from "@mui/material";
import { Component } from "react";
import { NavLink, Link } from "react-router-dom";
// import { StoreContext } from "../context/StoreContext";
import { BasketState } from "../../features/basket/BasketSlice";
import { connect } from "react-redux";
import { BasketItem } from "../models/basket";
import { RootState } from "../store/ConfigureStore";
import { AccountState } from "../../features/account/accountSlice";
import SignedInMenu from "./SignedInMenu";

const midLinks = [
	{ title: "catalog", path: "/catalog" },
	{ title: "about", path: "/about" },
	{ title: "contact", path: "/contact" },
];

const rightLinks = [
	{ title: "login", path: "/login" },
	{ title: "register", path: "/register" },
];

const navStyles = {
	color: "inherit",
	typography: "h6",
	textDecoration: "none",
	"&:hover": {
		color: "grey.500",
	},
	"&.active": {
		color: "text.secondary",
	},
};

interface Props {
	darkMode: boolean;
	handleThemeChange: () => void;
	basketState: BasketState;
	user: AccountState;
}

interface State {}

class HeaderClass extends Component<Props, State> {
	// static contextType = StoreContext;
	// declare context: React.ContextType<typeof StoreContext>;
	itemCount: number | undefined;

	constructor(props: Props) {
		super(props);
		// this.state = {
		// 	loading: false,
		// };
	}

	render() {
		const { basketState } = this.props;
		if (basketState) {
			this.itemCount = basketState.basket?.items.reduce(
				(sum: number, item: BasketItem) => sum + item.quantity,
				0
			);
		}

		return (
			<AppBar position="static" sx={{ mb: 4 }}>
				<Toolbar
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Box display="flex" alignItems="center">
						<Typography
							variant="h6"
							component={NavLink}
							to="/"
							sx={navStyles}
						>
							RE-STORE
						</Typography>
						<Switch
							checked={this.props.darkMode}
							onChange={this.props.handleThemeChange}
						></Switch>
					</Box>
					<List sx={{ display: "flex" }}>
						{midLinks.map(({ title, path }) => (
							<ListItem
								component={NavLink}
								to={path}
								key={path}
								sx={navStyles}
							>
								{title.toUpperCase()}
							</ListItem>
						))}
					</List>

					<Box display="flex" alignItems="center">
						<IconButton
							component={Link}
							to="/basket"
							size="large"
							edge="start"
							color="inherit"
							sx={{ mr: 2 }}
						>
							<Badge
								badgeContent={this.itemCount}
								color="secondary"
							>
								<ShoppingCart></ShoppingCart>
							</Badge>
						</IconButton>
						{this.props.user.user ? (
							<SignedInMenu></SignedInMenu>
						) : (
							<List sx={{ display: "flex" }}>
								{rightLinks.map(({ title, path }) => (
									<ListItem
										component={NavLink}
										to={path}
										key={path}
										sx={navStyles}
									>
										{title.toUpperCase()}
									</ListItem>
								))}
							</List>
						)}
					</Box>
				</Toolbar>
			</AppBar>
		);
	}
}

const mapStateToProps = (state: RootState) => ({
	basketState: state.basket,
	user: state.account,
});

const Header = connect(mapStateToProps)(HeaderClass);

export default Header;
