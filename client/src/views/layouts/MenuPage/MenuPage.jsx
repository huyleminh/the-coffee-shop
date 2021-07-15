import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout, Radio, Space } from "antd";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import "../../../assets/css/layouts/menu/MenuPage.css";
import MenuImage from "../../../assets/images/menu.jpg";
import Hero from "../../../components/layouts/Hero";
import Loading from "../../../components/Loading";
import CustomPagination from "../../../components/navigation/CustomPagination";
import ProductAPI from "../../../services/Product/ProductAPI";
import ProductItem from "./Product/ProductItem";

const { Content } = Layout;

function MenuPage(props) {
    // Responsive filter bar
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    // Loading products section
    const [isLoading, setIsLoading] = useState(true);

    // Products list
    const [totalProducts, setTotalProducts] = useState([]);

    // Categories on filter bar
    const [categories, setCategories] = useState([]);

    // Pagination
    const [paginationState, setPaginationState] = useState({
        page: 1,
        limit: 9,
        total: 0,
    });

    const [filters, setFilters] = useState({
        page: 1,
        limit: 9,
    });

    const toggleFilterBar = () => {
        console.log("clicked");
        if (isFilterVisible) setIsFilterVisible(false);
        else setIsFilterVisible(true);
    };

    const activeClassname = isFilterVisible ? "active" : null;

    const handleChangeFilter = (e) => {
        const target = e.target;
        alert("Radio checked ", target.value);
    };

    const handlePageChange = (page) => {
        console.log(page);
        setPaginationState({
            ...paginationState,
            page: page,
        });
        setFilters({
            ...filters,
            page: page,
        });
    };

    useEffect(() => {
        //Scroll to list
        document.querySelector(".menu").scrollIntoView({ behavior: "smooth", block: "start" });

        // Fetch products from db
        const fetchProducts = async () => {
            const { page, limit } = filters;

            try {
                const categoriesRes = await ProductAPI.getCategories();
                const response = await ProductAPI.getAllProducts(
                    `${queryString.stringify({ page, limit })}`
                );

                if (response.status === 200) {
                    const { pagination, products } = response.data;

                    setTotalProducts(products);
                    setPaginationState(pagination);

                    setCategories(categoriesRes.data);
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

    const productsList = totalProducts.map((item) => (
        <ProductItem
            product={item.product}
            rating={item.rating}
            discount={item.discount}
            key={item.product.id}
        />
    ));

    const categoriesList = categories.map((item) => (
        <Radio value={item.name} key={item.id}>
            {item.name}
        </Radio>
    ));

    return (
        <Content>
            <Hero title="Menu" sologan="Add your favourite drink to cart" image={MenuImage} />

            <div className="wrapper menu">
                <div className={`menu__filter ${activeClassname}`}>
                    <FontAwesomeIcon icon={faTimes} id="exit" onClick={toggleFilterBar} />
                    <div className="menu__group search">
                        <label htmlFor="search"></label>
                        <input type="text" name="search" id="search" placeholder="Search" />
                    </div>

                    <div className="menu__group filter">
                        <h1>Categories</h1>
                        <Radio.Group onChange={handleChangeFilter}>
                            <Space direction="vertical">
                                {isLoading ? (
                                    <Loading
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                        size="small"
                                        tip=""
                                    />
                                ) : (
                                    categoriesList.map((item) => item)
                                )}
                            </Space>
                        </Radio.Group>
                    </div>

                    <div className="menu__group sort">
                        <h1>Sort by</h1>
                        <Radio.Group onChange={handleChangeFilter}>
                            <Space direction="vertical">
                                <Radio value="popularity">Popularity</Radio>
                                <Radio value="price-asc">Price: Low to high</Radio>
                                <Radio value="price-desc">Price: High to Low</Radio>
                                <Radio value="alphabet-asc">A-Z</Radio>
                                <Radio value="alphabet-desc">Z-A</Radio>
                            </Space>
                        </Radio.Group>
                    </div>
                </div>

                {isFilterVisible ? (
                    <div
                        className="menu-overlay"
                        onClick={() => {
                            isFilterVisible && setIsFilterVisible(false);
                        }}
                    ></div>
                ) : null}

                <div className="menu__products">
                    <div
                        className={`menu__filter-bar ${activeClassname}`}
                        onClick={toggleFilterBar}
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
                        <div className="products">{productsList.map((item) => item)}</div>
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
