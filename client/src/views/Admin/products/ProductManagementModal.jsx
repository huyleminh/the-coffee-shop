import { LoadingOutlined } from "@ant-design/icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DatePicker, Modal, Select, Skeleton, Space } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ProductAPI from "../../../services/Product/ProductAPI";

moment.locale("vie");
const momentFormat = "DD/MM/YYYY";

const { RangePicker } = DatePicker;

function ProductManagementModal(props) {
    const { visible, data, image, handleCancel } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [dataModal, setDataModal] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [discounts, setDiscounts] = useState([]);
    const [currentDiscount, setCurrentDiscount] = useState({});

    const handleClose = () => handleCancel();

    const handleSaveChange = () => {
        setIsSaving(true);
    };

    const handleDelete = () => {
        setIsDeleting(true);
    };

    const handleOnChange = (e) => {
        const target = e.target;
        if (target.name === "newDiscount") setCurrentDiscount({});
        setDataModal({ ...dataModal, [target.name]: target.value });
    };

    const handleChangeDiscount = (value) => {
        const index = discounts.findIndex((item) => item.id === value);
        const targetDiscount = discounts[index];

        setCurrentDiscount({
            id: targetDiscount.id,
            percent: targetDiscount.percent * 100,
            startDate: moment(new Date(targetDiscount.startDate), momentFormat),
            endDate: moment(new Date(targetDiscount.endDate), momentFormat),
        });
        setDataModal({ ...dataModal, newDiscount: 0, startDate: null, endDate: null });
    };

    const handleChangeNewDiscount = (values) => {
        if (!values) {
            setDataModal({ ...dataModal, startDate: null, endDate: null });
        } else {
            setDataModal({ ...dataModal, startDate: values[0], endDate: values[1] });
        }
    };

    useEffect(() => {
        if (!visible) {
            setDataModal({});
            setIsSaving(false);
            setIsDeleting(false);
        }
        const newData = {
            id: data.product.id,
            name: data.product.name,
            price: data.product.price,
            description: data.product.description,
            category: data.categoryName,
            rate: parseInt(data.rating.totalStar / data.rating.totalRating).toFixed(1),
            newDiscount: 0,
            startDate: null,
            endDate: null,
        };

        setCurrentDiscount({
            id: data.discount ? data.discount.discountId : null,
            percent: data.discount ? data.discount.percent * 100 : 0,
            startDate: data.discount
                ? moment(new Date(data.discount.startDate), momentFormat)
                : null,
            endDate: data.discount ? moment(new Date(data.discount.endDate), momentFormat) : null,
        });
        setIsLoading(false);
        setDataModal(newData);

        return () => {
            setDataModal({});
            setCurrentDiscount({
                percent: data.discount ? data.discount.percent * 100 : 0,
                startDate: data.discount
                    ? moment(new Date(data.discount.startDate), momentFormat)
                    : null,
                endDate: data.discount
                    ? moment(new Date(data.discount.endDate), momentFormat)
                    : null,
            });
        };
    }, [data, visible]);

    useEffect(() => {
        const fetchDiscounts = () => {
            ProductAPI.getDiscounts()
                .then((res) => {
                    const data = res.status === 200 && res.data;
                    const discounts = data.filter((item) => item.endDate > new Date().toJSON());
                    setDiscounts(discounts);
                })
                .catch((error) => console.log(error));
        };
        fetchDiscounts();
    }, []);

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
                        {isDeleting ? <LoadingOutlined spin /> : "Delete"}
                    </button>
                    <button className="order-modal-btn" id="save" onClick={handleSaveChange}>
                        {isSaving ? <LoadingOutlined spin /> : "Save"}
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
                                value={currentDiscount.percent}
                                onChange={handleChangeDiscount}
                            >
                                {discounts.map((item) => (
                                    <Select.Option key={item.id} value={item.id}>
                                        {item.percent * 100}
                                    </Select.Option>
                                ))}
                            </Select>
                            <RangePicker
                                value={[currentDiscount.startDate, currentDiscount.endDate]}
                                disabled
                            />
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
                                value={dataModal.newDiscount}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div style={{ width: "220px" }}>
                            <RangePicker
                                value={[dataModal.startDate, dataModal.endDate]}
                                onChange={handleChangeNewDiscount}
                            />
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