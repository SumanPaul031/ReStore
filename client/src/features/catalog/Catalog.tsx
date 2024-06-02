import { Component } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

interface Props {}

interface State {
	products: Product[];
}

class Catalog extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			products: [],
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
		fetch("http://localhost:5000/api/products")
			.then((response) => response.json())
			.then((data) => this.setState({ products: data }))
			.catch((error) => console.error("Error fetching data:", error));
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
		return (
			<>
				<ProductList products={this.state.products} />
			</>
		);
	}
}

export default Catalog;
