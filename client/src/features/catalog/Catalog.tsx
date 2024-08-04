import { Component } from "react";
import { Product, ProductParams } from "../../app/models/product";
import ProductList from "./ProductList";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { AppDispatch, RootState } from "../../app/store/ConfigureStore";
import {
	fetchFiltersAsync,
	fetchProductsAsync,
	ProductSelectors,
	setPageNumber,
	setProductParams,
} from "./CatalogSlice";
import { connect } from "react-redux";
import { Grid, Paper } from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup"; // Corrected import
import CheckboxButtons from "../../app/components/CheckboxButtons";
import { MetaData } from "../../app/models/pagination";
import AppPagination from "../../app/components/AppPagination";

interface Props {
	products: Product[];
	status: string;
	productsLoaded: boolean;
	filtersLoaded: boolean;
	brands: string[];
	types: string[];
	productParams: ProductParams;
	metaData: MetaData | null;
	fetchProductsAsync: () => void;
	fetchFiltersAsync: () => void;
	setProductParams: (params: ProductParams) => void; // Correct type
	setPageNumber: (pageNumber: number) => void; // Correct type
}

interface State {}

const sortOptions = [
	{ value: "name", label: "Alphabetical" },
	{ value: "priceDesc", label: "Price - High To Low" },
	{ value: "price", label: "Price - Low To High" },
];

class CatalogClass extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		// Effect similar to useEffect(() => { ... }, [])
		if (!this.props.productsLoaded) {
			this.fetchData();
		}
		if (!this.props.filtersLoaded) {
			this.props.fetchFiltersAsync();
		}
	}

	componentDidUpdate(prevProps: Props) {
		// Check if productsLoaded has changed
		if (
			prevProps.productsLoaded !== this.props.productsLoaded &&
			!this.props.productsLoaded
		) {
			this.fetchData();
		}

		// Check if filtersLoaded has changed
		if (
			prevProps.filtersLoaded !== this.props.filtersLoaded &&
			!this.props.filtersLoaded
		) {
			this.props.fetchFiltersAsync();
		}
	}

	fetchData = () => {
		this.props.fetchProductsAsync();
	};

	render() {
		// if (this.props.status.includes("pendingFetchFilters")) {
		// 	return <LoadingComponent message="Loading products..." />;
		// }

		if (!this.props.filtersLoaded) {
			return <LoadingComponent message="Loading products..." />;
		}

		return (
			<Grid container columnSpacing={4}>
				<Grid item xs={3}>
					<Paper sx={{ mb: 2 }}>
						<ProductSearch />
					</Paper>
					<Paper sx={{ mb: 2, p: 2 }}>
						<RadioButtonGroup
							selectedValue={this.props.productParams.orderBy}
							options={sortOptions}
							onChange={(e) =>
								this.props.setProductParams({
									...this.props.productParams, // Ensure existing params are retained
									orderBy: e.target.value,
								})
							}
						/>
					</Paper>
					<Paper sx={{ mb: 2, p: 2 }}>
						<CheckboxButtons
							items={this.props.brands || []}
							checked={this.props.productParams.brands}
							onChange={(items: string[]) =>
								this.props.setProductParams({
									...this.props.productParams,
									brands: items,
								})
							}
						/>
					</Paper>
					<Paper sx={{ mb: 2, p: 2 }}>
						<CheckboxButtons
							items={this.props.types || []}
							checked={this.props.productParams.types}
							onChange={(items: string[]) =>
								this.props.setProductParams({
									...this.props.productParams,
									types: items,
								})
							}
						/>
					</Paper>
				</Grid>
				<Grid item xs={9}>
					<ProductList products={this.props.products} />
				</Grid>
				<Grid item xs={3}></Grid>
				<Grid item xs={9} sx={{ mb: 2 }}>
					{this.props.metaData && (
						<AppPagination
							metaData={this.props.metaData}
							onPageChange={
								(page: number) => this.props.setPageNumber(page) // Pass page number directly
							}
						/>
					)}
				</Grid>
			</Grid>
		);
	}
}

const mapStateToProps = (state: RootState) => ({
	products: ProductSelectors.selectAll(state),
	status: state.catalog.status,
	productsLoaded: state.catalog.productsLoaded,
	filtersLoaded: state.catalog.filtersLoaded,
	brands: state.catalog.brands,
	types: state.catalog.types,
	productParams: state.catalog.productParams,
	metaData: state.catalog.metaData,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
	fetchProductsAsync: () => dispatch(fetchProductsAsync()),
	fetchFiltersAsync: () => dispatch(fetchFiltersAsync()),
	setProductParams: (productParams: ProductParams) =>
		dispatch(setProductParams(productParams)),
	setPageNumber: (pageNumber: number) =>
		dispatch(setPageNumber({ pageNumber })), // Pass page number directly
});

const Catalog = connect(mapStateToProps, mapDispatchToProps)(CatalogClass);

export default Catalog;
