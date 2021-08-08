import { DatePicker, Select, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ProductAPI from "../../../services/Product/ProductAPI";

moment.locale("vie");
const momentFormat = "DD/MM/YYYY";

const { RangePicker } = DatePicker;

function CreateProductForm(props) {
    const { visible, handleCancel } = props;
    const history = useHistory();
    const [imageFile, setImageFile] = useState("No file has been choosen.");
    const [discounts, setDiscounts] = useState([]);
    const [currentDiscount, setCurrentDiscount] = useState({});
    const [productInfo, setProductInfo] = useState({
        name: "",
        price: 0,
        categoryName: "",
        newDiscount: 0,
        startDate: null,
        endDate: null,
        description: "",
    });

    const handleClose = () => handleCancel();

    const handleSave = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.token) {
            alert("You are not allowed to access this page.");
            localStorage.removeItem("user");
            history.push("/403");
        } else {
        }
    };

    const changeImage = (e) => {
        const target = e.target;
        setImageFile(target.files[0].name);
    };

    const handleChangeDiscount = (value) => {
        const index = discounts.findIndex((item) => item.id === value);
        const targetDiscount = discounts[index];
        setProductInfo({ ...productInfo, newDiscount: 0, startDate: null, endDate: null });
        setCurrentDiscount({
            percent: targetDiscount.percent,
            startDate: moment(new Date(targetDiscount.startDate), momentFormat),
            endDate: moment(new Date(targetDiscount.endDate), momentFormat),
        });
    };

    const handleChangeProductInfo = (e) => {
        const target = e.target;
        if (target.name === "newDiscount") setCurrentDiscount({});
        setProductInfo({ ...productInfo, [target.name]: target.value });
    };

    const handleChangeDate = (values) => {
        if (!values) {
            setProductInfo({ ...productInfo, startDate: null, endDate: null });
        } else {
            setProductInfo({ ...productInfo, startDate: values[0], endDate: values[1] });
        }
    };

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

    return (
        <Modal
            title="Product Form"
            visible={visible}
            width={500}
            onCancel={handleClose}
            style={{ borderRadius: "8px" }}
            footer={
                <button className="order-modal-btn" id="save" onClick={handleSave}>
                    Save
                </button>
            }
        >
            <div className="product-management-modal">
                <div className="product-management-modal-content" style={{ padding: "0" }}>
                    <div className="product-management-modal-content__item">
                        <label htmlFor="name">Name</label> <br />
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Product's name"
                            value={productInfo.name}
                            onChange={handleChangeProductInfo}
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
                                value={productInfo.price}
                                onChange={handleChangeProductInfo}
                            />
                        </div>

                        <div>
                            <label htmlFor="categoryName">Category</label> <br />
                            <input
                                name="categoryName"
                                id="categoryName"
                                placeholder="Category"
                                value={productInfo.categoryName}
                                onChange={handleChangeProductInfo}
                            />
                        </div>
                    </div>

                    <div className="product-management-modal-content__item">
                        <label htmlFor="image">Image</label> <br />
                        <input type="file" name="image" id="image" onChange={changeImage} />
                        <span>{imageFile}</span>
                    </div>

                    <div className="product-management-modal-content__item">
                        <label>Existed discounts</label> <br />
                        <Space direction="horizontal" size={[100]}>
                            <Select
                                style={{ width: "100px" }}
                                placeholder="Percent"
                                value={currentDiscount.percent}
                                onChange={handleChangeDiscount}
                            >
                                {discounts.map((item) => (
                                    <Select.Option key={item.id} value={item.id}>
                                        {item.percent}
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
                                value={productInfo.newDiscount}
                                onChange={handleChangeProductInfo}
                            />
                        </div>
                        <div style={{ width: "252px" }}>
                            <RangePicker
                                value={[productInfo.startDate, productInfo.endDate]}
                                onChange={handleChangeDate}
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
                            value={productInfo.description}
                            onChange={handleChangeProductInfo}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default CreateProductForm;
