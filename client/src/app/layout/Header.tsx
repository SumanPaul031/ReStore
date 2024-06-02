import { AppBar, Switch, Toolbar, Typography } from "@mui/material";
import React, { Component } from "react";

interface Props {
	darkMode: boolean;
	handleThemeChange: () => void;
}

interface State {}

class Header extends Component<Props, State> {
	render() {
		return (
			<AppBar position="static" sx={{ mb: 4 }}>
				<Toolbar>
					<Typography variant="h6">RE-STORE</Typography>
					<Switch
						checked={this.props.darkMode}
						onChange={this.props.handleThemeChange}
					></Switch>
				</Toolbar>
			</AppBar>
		);
	}
}

export default Header;
