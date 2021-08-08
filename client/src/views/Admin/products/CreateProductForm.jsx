import { DatePicker, Select, Space, Upload } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
// import PropTypes from "prop-types";

// CreateProductForm.propTypes = {};

const { RangePicker } = DatePicker;

function CreateProductForm(props) {
    const { visible, handleCancel } = props;
    const [imageFile, setImageFile] = useState("No file has been choosen.");

    const handleClose = () => handleCancel();

    const handleSave = () => {};

    const handleDelete = () => {};

    const changeImage = (e) => {
        const target = e.target;
        setImageFile(target.files[0].name)
    }

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
                            <Select style={{ width: "100px" }} placeholder="Percent">
                                {/* <Select.Option>0.2</Select.Option>
                                <Select.Option>0.2</Select.Option>
                                <Select.Option>0.2</Select.Option> */}
                            </Select>
                            <RangePicker />
                        </Space>
                    </div>

                    <div className="product-management-modal-content__item">
                        <label>New discount</label> <br />
                        <Space direction="horizontal" size={[100]}>
                            <Select style={{ width: "100px" }} placeholder="Percent">
                                {/* <Select.Option>0.2</Select.Option>
                                <Select.Option>0.2</Select.Option>
                                <Select.Option>0.2</Select.Option> */}
                            </Select>
                            <RangePicker />
                        </Space>
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
