import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout, Radio, Space } from "antd";
import React, { useState } from "react";
import "../../../assets/css/layouts/menu/MenuPage.css";
import MenuImage from "../../../assets/images/menu.jpg";
import Hero from "../../../components/layouts/Hero";
import CustomePagination from "../../../components/navigation/CustomPagination";
import ProductItem from "./Product/ProductItem";

const { Content } = Layout;

function MenuPage(props) {
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const toggleFilterBar = () => {
        console.log("clicked");
        if (isFilterVisible) setIsFilterVisible(false);
        else setIsFilterVisible(true);
    };

    const activeClassname = isFilterVisible ? "active" : null;

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
                        <h1>Filter</h1>
                        <Radio.Group>
                            <Space direction="vertical">
                                <Radio value="cappucino1">Cappucino 1</Radio>
                                <Radio value="cappucino2">Cappucino 2</Radio>
                                <Radio value="cappucino3">Cappucino 3</Radio>
                                <Radio value="cappucino4">Cappucino 4</Radio>
                            </Space>
                        </Radio.Group>
                    </div>

                    <div className="menu__group sort">
                        <h1>Sort by</h1>
                        <Radio.Group>
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
                    <div className="products">
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                    </div>
                    <CustomePagination />
                </div>
            </div>
        </Content>
    );
}

export default MenuPage;
