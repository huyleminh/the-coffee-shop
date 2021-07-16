import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { Radio, Space } from "antd";
import React, { useState, useRef } from "react";
import Loading from "../../../../components/Loading";

SidebarFilter.propTypes = {
    isLoading: PropTypes.bool,
    isFilterVisible: PropTypes.bool,
    filter: PropTypes.string,
    sort: PropTypes.string,
    categoriesList: PropTypes.array,
    handleSearchTerm: PropTypes.func,
    handleChangeFilter: PropTypes.func,
    handleSortBy: PropTypes.func,
    setFilterVisible: PropTypes.func,
};

function SidebarFilter(props) {
    const {
        isLoading,
        isFilterVisible,
        filter,
        sort,
        categoriesList,
        handleSearchTerm,
        handleChangeFilter,
        handleSortBy,
    } = props;
    const activeClassname = isFilterVisible ? "active" : null;

    const [searchTerm, setSearchTerm] = useState("");
    // Search term
    const typingTimeoutRef = useRef(null);

    const handleSubmitSearchTerm = (e) => {
        const target = e.target;
        if (!target.value || target.value.match(/^(\s)+$/g)) return;
        if (!handleSearchTerm) return;
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        setSearchTerm(target.value);

        typingTimeoutRef.current = setTimeout(() => {
            handleSearchTerm(target.value.trim());
        }, 1000);
    };

    const handleFilter = (e) => {
        const target = e.target;
        if (!handleChangeFilter) return;
        if (searchTerm) setSearchTerm("");
        handleChangeFilter(target.value);
    };

    const handleSort = (e) => {
        const target = e.target;
        if (!handleSortBy) return;
        handleSortBy(target.value);
    };

    const list = categoriesList.map((item) => (
        <Radio value={item.name} key={item.id}>
            {item.name}
        </Radio>
    ));

    return (
        <>
            <div className={`menu__filter ${activeClassname}`}>
                <FontAwesomeIcon
                    icon={faTimes}
                    id="hide"
                    onClick={() => {
                        isFilterVisible && props.setFilterVisible(false);
                    }}
                />
                <div className="menu__group search">
                    <label htmlFor="search"></label>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={handleSubmitSearchTerm}
                    />
                </div>

                <div className="menu__group filter">
                    <h1>Categories</h1>
                    <Radio.Group onChange={handleFilter} defaultValue="" value={filter}>
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
                                list.map((item) => item)
                            )}
                        </Space>
                    </Radio.Group>
                </div>

                <div className="menu__group sort">
                    <h1>Sort by</h1>
                    <Radio.Group value={sort} onChange={handleSort}>
                        <Space direction="vertical">
                            <Radio value="default">Default</Radio>
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
                        isFilterVisible && props.setFilterVisible(false);
                    }}
                ></div>
            ) : null}
        </>
    );
}

export default SidebarFilter;
