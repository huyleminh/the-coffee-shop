import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import PropTypes from "prop-types";
import { InputNumber, Table } from "antd";
import React from "react";
import "../../assets/css/Table/ProductTable.css";
import Format from "../../utilities/Format/Format.js"

ProductTable.propTypes = {};

function ProductTable(props) {
    const {
        records,
        pagination,
        readonly,
        hiddens,
        handleSelected,
        handleDeleted,
        handleAction,
        handleQuantity,
    } = props;

    // const [isLoading, setIsLoading] = useState(true)

    const columns = [
        {
            title: "",
            dataIndex: "image",
            render: (image) => {
                if (image)
                    return (
                        <img
                            src={image.src}
                            alt="table"
                            width={image.width}
                            height={image.height}
                            loading="lazy"
                            className="img_style"
                        />
                    );
                else return <></>;
            },
        },
        {
            title: "Product",
            dataIndex: "product",
        },
        {
            title: "Price",
            dataIndex: "price",
            render: (priceObj) => {
                if (priceObj.discount) {
                    const newPrice = (1 - priceObj.discount) * priceObj.price;
                    return (
                        <ul className="price_style">
                            <li style={{ textDecoration: "line-through" }}>{Format.formatPriceWithVND(priceObj.price)} VND</li>
                            <li style={{ color: "#f00", fontWeight: "650" }}>{Format.formatPriceWithVND(newPrice)} VND</li>
                        </ul>
                    );
                } else
                    return (
                        <ul className="price_style">
                            <li>{Format.formatPriceWithVND(priceObj.price)} VND</li>
                        </ul>
                    );
            },
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            render: (quantity, record) => {
                return (
                    <InputNumber
                        min={0}
                        value={quantity}
                        onChange={(value) => handleQuantity(record, value)}
                        disabled={props.disabled}
                    />
                );
            },
        },
        {
            title: "Total",
            dataIndex: "total",
            render: (total) => {
                return <span>{Format.formatPriceWithVND(total)} VND</span>;
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (action, record) => {
                const icon =
                    action === "cart" ? (
                        props.disabled ? (<span
                            title="Add to cart"
                            className="table-cart-disabled"
                        >
                            <FontAwesomeIcon icon={faShoppingCart} />
                        </span>) : (
                        <span
                            title="Add to cart"
                            className="table-cart"
                            onClick={() => handleAction(record)}
                        >
                            <FontAwesomeIcon icon={faShoppingCart} />
                        </span>)
                    ) : action === "wishlist" ? (
                        props.disabled ? (<span
                            title="Add to wishlist"
                            className="table-wishlist-disabled"
                        >
                            <FontAwesomeIcon icon={faHeart} />
                        </span>) : (
                        <span
                            title="Add to wishlist"
                            className="table-wishlist"
                            onClick={() => handleAction(record)}
                        >
                            <FontAwesomeIcon icon={faHeart} />
                        </span>)
                    ) : (
                        <></>
                    );

                return (
                    <div>
                        {icon}
                        <button className="table-deleted" onClick={() => handleDeleted(record.key)} disabled={props.disabled}>
                            Remove
                        </button>
                    </div>
                );
            },
        },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            if (!handleSelected) return;
            handleSelected(selectedRowKeys, selectedRows);
        },
    };

    const columnsFiltered = Array.isArray(hiddens)
        ? columns.filter((column) => hiddens.indexOf(column.dataIndex) === -1)
        : columns;

    return (
        <div style={{ width: "100%" }}>
            {readonly ? (
                <Table columns={columnsFiltered} dataSource={records} pagination={pagination} />
            ) : (
                <Table
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}
                    columns={columnsFiltered}
                    dataSource={records}
                    pagination={pagination}
                    bordered
                />
            )}
        </div>
    );
}

export default ProductTable;
