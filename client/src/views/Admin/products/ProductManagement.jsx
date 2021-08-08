import { Divider, Table } from "antd";
import React, { useState } from "react";
import "../../../assets/css/layouts/Admin/ProductManagement.css";
import CreateProductForm from "./CreateProductForm";
import ProductManagementModal from "./ProductManagementModal";

function ProductManagement() {
    const [isLoading, setIsLoading] = useState(false);
    const [currentModal, setCurrentModal] = useState({ visible: false });
    const [isCreateVisible, setIsCreateVisible] = useState(false);

    const handleCancelDetails = () => setCurrentModal({ ...currentModal, visible: false });
    const handleCancelCreate = () => setIsCreateVisible(false);
    const columns = [
        {
            title: "Image",
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
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Price",
            dataIndex: "price",
            render: (priceObj) => {
                if (priceObj.newPrice) {
                    return (
                        <ul className="price_style">
                            <li style={{ textDecoration: "line-through" }}>
                                {priceObj.oldPrice} VND
                            </li>
                            <li style={{ color: "#f00", fontWeight: "650" }}>
                                {priceObj.newPrice} VND
                            </li>
                        </ul>
                    );
                } else
                    return (
                        <ul className="price_style">
                            <li>{priceObj.oldPrice} VND</li>
                        </ul>
                    );
            },
        },
        {
            title: "Discount",
            dataIndex: "discount",
            width: 150,
            render: (discount) => {
                if (!discount)
                    return (
                        <div className="product-discount">
                            <span id="none">None</span>
                        </div>
                    );
                return (
                    <div className="product-discount">
                        <span id="discount">{discount * 100} %</span>
                    </div>
                );
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            width: 100,
            render: () => {
                return (
                    <button
                        className="table-view-action"
                        onClick={() => setCurrentModal({ ...currentModal, visible: true })}
                    >
                        Details
                    </button>
                );
            },
        },
    ];

    const sortedRecords = [
        {
            key: 1,
            name: "Instant coffee",
            price: { oldPrice: 15000, newPrice: 10000 },
            discount: 0.35,
            action: "view",
        },
        {
            key: 2,
            name: "Instant coffee",
            price: { oldPrice: 15000 },
            discount: "",
            action: "view",
        },
        {
            key: 3,
            name: "Instant coffee",
            price: { oldPrice: 15000 },
            discount: "",
            action: "view",
        },
        {
            key: 4,
            name: "Instant coffee",
            price: { oldPrice: 15000 },
            discount: "",
            action: "view",
        },
        {
            key: 5,
            name: "Instant coffee",
            price: { oldPrice: 15000 },
            discount: "",
            action: "view",
        },
        {
            key: 6,
            name: "Instant coffee",
            price: { oldPrice: 15000 },
            discount: "",
            action: "view",
        },
        {
            key: 7,
            name: "Instant coffee",
            price: { oldPrice: 15000 },
            discount: "",
            action: "view",
        }
    ];

    return (
        <div className="custom-site-main-content">
            <div
                className="custom-site-main-content__filter"
                style={{ justifyContent: "space-between" }}
            >
                <div className="main-content__filter-item">
                    <span>Search product:</span>
                    <input
                        type="text"
                        name="search"
                        placeholder="Type product's name here to search"
                    />
                </div>
                <div className="main-content__filter-item">
                    <button
                        style={{ height: "40px", fontWeight: 600, margin: 0 }}
                        onClick={() => setIsCreateVisible(true)}
                    >
                        Create
                    </button>
                </div>
            </div>

            <Divider />
            <Table
                className="main_table"
                columns={columns}
                dataSource={sortedRecords}
                pagination={{ position: ["bottomCenter"], pageSize: 5 }}
                bordered
                loading={isLoading}
            />

            <ProductManagementModal
                visible={currentModal.visible}
                handleCancel={handleCancelDetails}
            />
            <CreateProductForm visible={isCreateVisible} handleCancel={handleCancelCreate} />
        </div>
    );
}

export default ProductManagement;
