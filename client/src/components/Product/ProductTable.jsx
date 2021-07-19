import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import PropTypes from "prop-types";
import { Table, InputNumber } from "antd";
import React from "react";
import "../../assets/css/Table/ProductTable.css";

ProductTable.propTypes = {};

function ProductTable(props) {
    const {
        records,
        pagination,
        readonly,
        handleSelected,
        handleDeleted,
        handleAction,
        handleQuantity,
    } = props;

    const columns = [
        {
            title: "",
            dataIndex: "image",
            render: (image) => {
                if (image)
                    return (
                        <img
                            src={image.src}
                            width={image.width}
                            height={image.height}
                            loading="lazy"
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
                        <ul>
                            <li style={{ textDecoration: "line-through" }}>{priceObj.price} VND</li>
                            <li style={{ color: "#f00" }}>{newPrice} VND</li>
                        </ul>
                    );
                } else
                    return (
                        <ul>
                            <li>{priceObj.price} VND</li>
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
                    />
                );
            },
            editable: true,
        },
        {
            title: "Total",
            dataIndex: "total",
            render: (total) => {
                return <span>{total} VND</span>;
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (action, record) => {
                const icon =
                    action === "cart" ? (
                        <span className="table-cart" onClick={() => handleAction(record.key)}>
                            <FontAwesomeIcon icon={faShoppingCart} />
                        </span>
                    ) : (
                        <span className="table-wishlist" onClick={() => handleAction(record.key)}>
                            <FontAwesomeIcon icon={faHeart} />
                        </span>
                    );

                return (
                    <div>
                        {icon}
                        <button className="table-deleted" onClick={() => handleDeleted(record.key)}>Delete</button>
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

    return (
        <div style={{ width: "100%" }}>
            {readonly ? (
                <Table columns={columns} dataSource={records} pagination={pagination} />
            ) : (
                <Table
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={records}
                    pagination={pagination}
                />
            )}
        </div>
    );
}

export default ProductTable;
