import { Component } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";

interface Props {}

interface State {
	products: Product[];
	loading: boolean;
}

class Catalog extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			products: [],
			loading: true,
		};

		// Bind the addProduct method to the component instance
		this.addProduct = this.addProduct.bind(this);
	}

	componentDidMount() {
		// Effect similar to useEffect(() => { ... }, [])
		this.fetchData();
	}

	fetchData = () => {
		// Fetch data from an API or perform some side effect
		agent.Catalog.list()
			.then((products) => this.setState({ products }))
			.catch((error) => console.error("Error fetching data:", error))
			.finally(() => this.setState(() => ({ loading: false })));
	};

	addProduct() {
		this.setState((prevState) => ({
			products: [
				...prevState.products,
				{
					id: prevState.products.length + 1,
					name: "product" + (prevState.products.length + 1),
					price: prevState.products.length * 100.0 + 100.0,
					brand: "brand",
					description: "description",
					pictureUrl: "http://picsum.photos/200",
				},
			],
		}));
	}

	render() {
		if (this.state.loading)
			return (
				<LoadingComponent message="Loading products..."></LoadingComponent>
			);

		return (
			<>
				<ProductList products={this.state.products} />
			</>
		);
	}
}

export default Catalog;
