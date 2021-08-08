import { Divider, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../../../assets/css/layouts/Admin/ProductManagement.css";
import AdminAPI from "../../../services/Admin/AdminAPI";
import FirebaseAPI from "../../../services/FirsebaseAPI";
import CreateProductForm from "./CreateProductForm";
import ProductManagementModal from "./ProductManagementModal";

function ProductManagement() {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [currentModal, setCurrentModal] = useState({ visible: false, dataIndex: 0 });
    const [isCreateVisible, setIsCreateVisible] = useState(false);
    const [products, setProducts] = useState([]);
    const [images, setImages] = useState([]);

    const handleCancelDetails = () => setCurrentModal({ ...currentModal, visible: false });
    const handleCancelCreate = () => setIsCreateVisible(false);

    useEffect(() => {
        const fetchAllProducts = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user || !user.token) {
                alert("You are not allowed to access this page.");
                localStorage.removeItem("user");
                history.push("/403");
            } else {
                const response = await AdminAPI.getAllProducts(user.token);
                if (response.status === 200) {
                    setProducts(response.data);
                    setIsLoading(false);
                } else if (
                    response.status === 401 ||
                    response.status === 403 ||
                    response.status === 404
                ) {
                    alert("You are not allowed to access this page.");
                    localStorage.removeItem("user");
                    history.push("/403");
                }
            }
        };

        fetchAllProducts();
    }, [history]);

    useEffect(() => {
        const fetchImages = async () => {
            const imagePromises = products.map((item, index) => {
                return FirebaseAPI.getImageURL(item.product.image);
            });

            try {
                const res = await Promise.allSettled(imagePromises);
                const newImages = res.map((item) =>
                    item.status === "fulfilled" && item.value.status === 200
                        ? item.value.data
                        : require("../../../assets/images/latte.jpg").default
                );
                setImages(newImages);
            } catch (error) {
                console.log(error);
            }
        };
        fetchImages();
    }, [products]);

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
                return <></>;
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
                        <span id="discount">{discount} %</span>
                    </div>
                );
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            width: 100,
            render: (index) => {
                return (
                    <button
                        className="table-view-action"
                        onClick={() => setCurrentModal({ visible: true, dataIndex: index })}
                    >
                        Details
                    </button>
                );
            },
        },
    ];

    const productRecords = products.map((item, index) => {
        const record = {
            key: item.product.id,
            image: {
                src: images[index],
                width: "100px",
                height: "100px",
            },
            name: item.product.name,
            price: { oldPrice: item.product.price },
            discount: null,
            action: index,
        };
        if (item.discount && item.discount.endDate > new Date().toJSON()) {
            record.discount = item.discount.percent;
            record.price.newPrice = record.price.oldPrice * (1 - record.discount);
        }
        return record;
    });

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
                columns={columns}
                dataSource={productRecords}
                pagination={{ position: ["bottomCenter"], pageSize: 5 }}
                bordered
                loading={isLoading}
            />

            {!isLoading ? (
                <ProductManagementModal
                    visible={currentModal.visible}
                    data={products[currentModal.dataIndex]}
                    image={images[currentModal.dataIndex]}
                    handleCancel={handleCancelDetails}
                />
            ) : (
                <></>
            )}

            <CreateProductForm visible={isCreateVisible} handleCancel={handleCancelCreate} />
        </div>
    );
}

export default ProductManagement;
