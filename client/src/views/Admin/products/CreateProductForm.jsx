import { DatePicker, Select, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ProductAPI from "../../../services/Product/ProductAPI";

moment.locale("vie");
const momentFormat = "DD/MM/YYYY";

const { RangePicker } = DatePicker;

function CreateProductForm(props) {
    const { visible, handleCancel } = props;
    const [imageFile, setImageFile] = useState("No file has been choosen.");
    const [discounts, setDiscounts] = useState([]);
    const [currentDiscount, setCurrentDiscount] = useState({});

    const handleClose = () => handleCancel();

    const handleSave = () => {};

    const changeImage = (e) => {
        const target = e.target;
        setImageFile(target.files[0].name);
    };

    const handleChangeDiscount = (value) => {
        const index = discounts.findIndex((item) => item.id === value);
        const targetDiscount = discounts[index];
        setCurrentDiscount({
            percent: targetDiscount.percent,
            startDate: moment(new Date(targetDiscount.startDate), momentFormat),
            endDate: moment(new Date(targetDiscount), momentFormat),
        });
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
                        <input type="text" name="name" id="name" placeholder="Product's name" />
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
                            />
                        </div>

                        <div>
                            <label htmlFor="category">Category</label> <br />
                            <input name="category" id="category" placeholder="Category" />
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
                                value={0}
                                // onChange={handleOnChange}
                            />
                        </div>
                        <div style={{ width: "252px" }}>
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
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default CreateProductForm;
