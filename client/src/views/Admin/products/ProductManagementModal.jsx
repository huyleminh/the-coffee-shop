import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DatePicker, Modal, Select, Skeleton, Space } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";

moment.locale("vie");
const momentFormat = "DD/MM/YYYY";

const { RangePicker } = DatePicker;

function ProductManagementModal(props) {
    const { visible, data, image, handleCancel } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [dataModal, setDataModal] = useState({});

    const handleClose = () => handleCancel();

    const handleSaveChange = () => {};

    const handleDelete = () => {};

    const handleOnChange = (e) => {
        const target = e.target;
        setDataModal({ ...dataModal, [target.name]: target.value });
    };

    useEffect(() => {
        if (!visible) setDataModal({});
        const newData = {
            id: data.product.id,
            name: data.product.name,
            price: data.product.price,
            description: data.product.description,
            category: data.categoryName,
            rate: parseInt(data.rating.totalStar / data.rating.totalRating).toFixed(1),
            discount: data.discount ? data.discount.percent : 0,
            startDate: data.discount ? moment(new Date(data.discount.startDate), momentFormat) : null,
            endDate: data.discount ? moment(new Date(data.discount.endDate), momentFormat) : null,
        };
        setIsLoading(false);
        setDataModal(newData);

        return () => setDataModal(false);
    }, [data, visible]);

    if (isLoading) return <></>;
    return (
        <Modal
            title="Product Details"
            visible={visible}
            width={800}
            onCancel={handleClose}
            style={{ borderRadius: "8px" }}
            className="custom-modal"
            footer={
                <div>
                    <button
                        className="order-modal-btn"
                        style={{ marginRight: "10px" }}
                        id="delete"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                    <button className="order-modal-btn" id="save" onClick={handleSaveChange}>
                        Save
                    </button>
                </div>
            }
        >
            <div className="product-management-modal">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        height: "100%",
                    }}
                >
                    {!image ? (
                        <Skeleton.Image style={{ width: "250px", height: "300px" }} />
                    ) : (
                        <img src={image} alt="product" loading="lazy" />
                    )}
                    <span style={{ textAlign: "center", fontSize: "1.2rem", fontWeight: 600 }}>
                        <FontAwesomeIcon icon={faStar} style={{ color: "gold" }} />
                        {dataModal.rate}
                    </span>
                </div>

                <div className="product-management-modal-content">
                    <div className="product-management-modal-content__item">
                        <label>Name</label> <br />
                        <input
                            type="text"
                            name="name"
                            id=""
                            placeholder="Product's name"
                            value={dataModal.name}
                            onChange={handleOnChange}
                        />
                    </div>

                    <div className="product-management-modal-content__item">
                        <div>
                            <label htmlFor="price">Price</label> <br />
                            <input
                                type="number"
                                name="price"
                                id="price"
                                placeholder="Price"
                                min="0"
                                value={dataModal.price}
                                onChange={handleOnChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="category">Category</label> <br />
                            <input
                                type="text"
                                name="category"
                                id="category"
                                placeholder="Category"
                                value={dataModal.category}
                                onChange={handleOnChange}
                            />
                        </div>
                    </div>

                    <div className="product-management-modal-content__item">
                        <label>Discount</label> <br />
                        <Space direction="horizontal" size={[100]}>
                            <Select
                                style={{ width: "100px" }}
                                placeholder="Percent"
                                value={dataModal.discount}
                                onClick={()=> console.log("click")}
                                loading
                            >
                                {/* <Select.Option>0.2</Select.Option>
                                <Select.Option>0.2</Select.Option>
                                <Select.Option>0.2</Select.Option> */}
                            </Select>
                            <RangePicker value={[dataModal.startDate, dataModal.endDate]} />
                        </Space>
                    </div>

                    <div
                        className="product-management-modal-content__item"
                        style={{
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "space-between",
                        }}
                    >
                        <div>
                            <label htmlFor="newDiscount">New discount</label> <br />
                            <input
                                type="number"
                                name="newDiscount"
                                id="newDiscount"
                                placeholder="Discount"
                                min="0"
                                value={0}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div style={{ width: "220px" }}>
                            <RangePicker />
                        </div>
                    </div>

                    <div className="product-management-modal-content__item">
                        <label htmlFor="description">Description</label> <br />
                        <textarea
                            type="text"
                            name="description"
                            id="description"
                            placeholder="Description..."
                            rows="3"
                            value={dataModal.description}
                            onChange={handleOnChange}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ProductManagementModal;
