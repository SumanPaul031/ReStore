import { Component } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
// import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { AppDispatch, RootState } from "../../app/store/ConfigureStore";
import { fetchProductsAsync, ProductSelectors } from "./CatalogSlice";
import { connect } from "react-redux";

interface Props {
	products: Product[];
	status: string;
	productsLoaded: boolean
	fetchProductsAsync: () => void;
}

// interface State {
// 	products: Product[];
// 	loading: boolean;
// }
interface State {}

class CatalogClass extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		// this.state = {
		// 	products: [],
		// 	loading: true,
		// };
		this.state = {};

		// Bind the addProduct method to the component instance
		// this.addProduct = this.addProduct.bind(this);
	}

	componentDidMount() {
		// Effect similar to useEffect(() => { ... }, [])
		if (!this.props.productsLoaded) {
			this.fetchData();
		}
	}

	fetchData = () => {
		// Fetch data from an API or perform some side effect
		// agent.Catalog.list()
		// 	.then((products) => this.setState({ products }))
		// 	.catch((error) => console.error("Error fetching data:", error))
		// 	.finally(() => this.setState(() => ({ loading: false })));
		this.props.fetchProductsAsync()
	};

	// addProduct() {
	// 	this.setState((prevState) => ({
	// 		products: [
	// 			...prevState.products,
	// 			{
	// 				id: prevState.products.length + 1,
	// 				name: "product" + (prevState.products.length + 1),
	// 				price: prevState.products.length * 100.0 + 100.0,
	// 				brand: "brand",
	// 				description: "description",
	// 				pictureUrl: "http://picsum.photos/200",
	// 			},
	// 		],
	// 	}));
	// }

	render() {
		if (this.props.status.includes("pendingFetchProducts"))
			return (
				<LoadingComponent message="Loading products..."></LoadingComponent>
			);

		return (
			// <ProductList products={this.state.products} />
			<ProductList products={this.props.products} />
		);
	}
}

const mapStateToProps = (state: RootState) => ({
	products: ProductSelectors.selectAll(state),
	status: state.catalog.status,
	productsLoaded: state.catalog.productsLoaded
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
	fetchProductsAsync: () => dispatch(fetchProductsAsync()),
});

const Catalog = connect(mapStateToProps, mapDispatchToProps)(CatalogClass);

export default Catalog;
