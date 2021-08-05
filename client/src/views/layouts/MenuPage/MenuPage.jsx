import { Layout } from "antd";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "../../../assets/css/layouts/menu/MenuPage.css";
import MenuImage from "../../../assets/images/menu.jpg";
import Hero from "../../../components/layouts/Hero";
import Loading from "../../../components/Loading";
import CustomPagination from "../../../components/navigation/CustomPagination";
import { MenuPageEventsHandler } from "../../../Events";
import ProductAPI from "../../../services/Product/ProductAPI";
import ProductsList from "./Product/ProductsList";
import SidebarFilter from "./SidebarFilter/SidebarFilter";

const { Content } = Layout;

function MenuPage(props) {
    const location = useLocation();
    const history = useHistory();
    // Responsive filter bar
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    // Loading products section
    const [isLoading, setIsLoading] = useState(true);

    // Products list
    const [totalProducts, setTotalProducts] = useState([]);

    // Categories on filter bar
    const [categories, setCategories] = useState([]);

    // Pagination
    const [paginationState, setPaginationState] = useState({ page: 1, limit: 9, total: 0 });

    //Sort
    const [sortBy, setSortBy] = useState(() => {
        const params = queryString.parse(location.search);

        if (params.order) return params.order;
        else return "default";
    });

    const [filters, setFilters] = useState(() => {
        const initialState = { page: 1, limit: 9, filter: "All", search: "" };

        const params = queryString.parse(location.search);
        if (params.filter) {
            initialState.filter = params.filter;
            initialState.search = "";
        } else if (params.search) {
            initialState.search = params.search;
        }
        return initialState;
    });

    // Filter by category
    const handleChangeFilter = (newFilter) => {
        const params = { ...filters, filter: newFilter, order: sortBy };
        delete params["page"];
        delete params["limit"];
        delete params["search"];

        //Change url params
        history.push({
            path: location.pathname,
            search: queryString.stringify(params),
        });
        // Rerender
        setFilters({
            ...filters,
            filter: newFilter,
            page: 1,
            limit: 9,
        });
        setIsLoading(true);
    };

    // Pagination
    const handlePageChange = (page) => {
        setPaginationState({ ...paginationState, page: page });
        setFilters({ ...filters, page: page });
        setIsLoading(true);
    };

    // Handle search term changes
    const handleSearchTerm = (searchTerm) => {
        const params = { ...filters, order: sortBy, search: searchTerm };
        delete params["page"];
        delete params["limit"];
        delete params["filter"];

        history.push({
            path: location.pathname,
            search: queryString.stringify(params),
        });
        setFilters({
            ...filters,
            search: searchTerm,
            filter: "",
            page: 1,
            limit: 9,
        });
        setIsLoading(true);
    };

    const handleSortBy = (newSort) => {
        const params = { ...filters, order: newSort };
        delete params["page"];
        delete params["limit"];
        Object.keys(params).forEach((key) => !params[key] && delete params[key]);

        history.push({
            path: location.pathname,
            search: queryString.stringify(params),
        });
        setSortBy(newSort);
    };

    useEffect(() => {
        MenuPageEventsHandler.subcribe("changeSortBy", handleSortBy);
        MenuPageEventsHandler.subcribe("search", handleSearchTerm);
        MenuPageEventsHandler.subcribe("filter", handleChangeFilter);
        MenuPageEventsHandler.subcribe("toggleSideBar", setIsFilterVisible);

        return () => {
            MenuPageEventsHandler.unSubcribe("changeSortBy", handleSortBy);
            MenuPageEventsHandler.unSubcribe("search", handleSearchTerm);
            MenuPageEventsHandler.unSubcribe("filter", handleChangeFilter);
            MenuPageEventsHandler.unSubcribe("toggleSideBar", setIsFilterVisible);
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        document.querySelector(".menu").scrollIntoView({ behavior: "smooth", block: "start" });

        const fetchProducts = async () => {
            const params = { ...filters };
            Object.keys(params).forEach((key) => !params[key] && delete params[key]);
            if (params.filter === "All") delete params["filter"];

            try {
                const categoriesRes = await ProductAPI.getCategories();
                const response = await ProductAPI.getAllProducts(
                    `${queryString.stringify(params)}`
                );

                if (response.status === 200) {
                    const { pagination, products } = response.data;

                    setTotalProducts(products);
                    setPaginationState(pagination);

                    const newCaterogies = [
                        {
                            id: "All",
                            name: "All",
                        },
                        ...categoriesRes.data,
                    ];
                    setCategories(newCaterogies);
                    setIsLoading(false);
                } else if (response.status === 404) {
                    alert("Products not found!");
                    setIsLoading(false);
                }
            } catch (err) {
                console.log(err);
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [filters]);

    const activeClassname = isFilterVisible ? "active" : null;
    return (
        <Content>
            <Hero title="Menu" sologan="Add your favourite drink to cart" image={MenuImage} />

            <div className="wrapper menu">
                <SidebarFilter
                    isLoading={isLoading}
                    isFilterVisible={isFilterVisible}
                    filter={filters.filter}
                    sort={sortBy}
                    categoriesList={categories}
                />
                <div className="menu__products">
                    <div
                        className={`menu__filter-bar ${activeClassname}`}
                        onClick={() => {
                            setIsFilterVisible(true);
                        }}
                    >
                        <span>Filter</span>
                    </div>
                    {isLoading ? (
                        <Loading
                            style={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        />
                    ) : (
                        <div className="products">
                            <ProductsList products={totalProducts} filter={sortBy} />
                        </div>
                    )}

                    <CustomPagination
                        page={paginationState.page}
                        total={paginationState.total}
                        limit={paginationState.limit}
                        pageChange={handlePageChange}
                    />
                </div>
            </div>
        </Content>
    );
}

export default MenuPage;
