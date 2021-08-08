import { Modal } from "antd";
import React from "react";
import Image from "../../../assets/images/latte.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { DatePicker, Select, Space } from "antd";

const { RangePicker } = DatePicker;

ProductManagementModal.propTypes = {};

function ProductManagementModal(props) {
    const { visible, handleCancel } = props;
    const handleClose = () => handleCancel();

    const handleSaveChange = () => {};

    const handleDelete = () => {};

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
                <div>
                    <img src={Image} alt="product" />
                </div>

                <div className="product-management-modal-content">
                    <div className="product-management-modal-content__item">
                        <label>Name</label> <br />
                        <input type="text" name="" id="" placeholder="Product's name" />
                    </div>

                    <div className="product-management-modal-content__item">
                        <div>
                            <label>Price</label> <br />
                            <input type="number" name="" id="" placeholder="Price" min="0" />
                        </div>

                        <div>
                            <label>Category</label> <br />
                            <input type="text" name="" id="" placeholder="Category" />
                        </div>
                    </div>

                    <div className="product-management-modal-content__item">
                        <label>Discount</label> <br />
                        <Space direction="horizontal" size={[100]}>
                            <Select style={{ width: "100px" }} placeholder="Percent">
                                <Select.Option>0.2</Select.Option>
                                <Select.Option>0.2</Select.Option>
                                <Select.Option>0.2</Select.Option>
                            </Select>
                            <RangePicker />
                        </Space>
                    </div>

                    <div className="product-management-modal-content__item">
                        <label>New discount</label> <br />
                        <Space direction="horizontal" size={[100]}>
                            <Select style={{ width: "100px" }} placeholder="Percent">
                                <Select.Option>0.2</Select.Option>
                                <Select.Option>0.2</Select.Option>
                                <Select.Option>0.2</Select.Option>
                            </Select>
                            <RangePicker />
                        </Space>
                    </div>

                    <div className="product-management-modal-content__item">
                        <label>Description</label> <br />
                        <textarea
                            type="text"
                            name=""
                            id=""
                            placeholder="Description..."
                            rows="3"
                            value={
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sagittis faucibus iaculis."
                            }
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ProductManagementModal;
