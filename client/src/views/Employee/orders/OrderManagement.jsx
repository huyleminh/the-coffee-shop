<<<<<<< HEAD
import React from "react";
import PropTypes from "prop-types";

OrderManagement.propTypes = {};

function OrderManagement(props) {
    return <div>Order management</div>;
=======
import { Button, DatePicker, Divider, Select, Space, Table } from "antd";
import React, { useState } from "react";
import OrderModal from "./OrderModal";

const { RangePicker } = DatePicker;
const { Option } = Select;

// Trạng thái: Primary, Success, Warning, Danger, Cancel
// Normal: 007ff5, 00d349, ff933d, ff1f32, bdbec2
// Hover: 0062cf, 6ec335, ff8631, f90525, aeb0b7 (shadow)
// Active: 0062cf, 6ec335, ff8631, f90525, aeb0b7

function OrderManagement() {
    const [currentModal, setCurrentModal] = useState({ visible: false, dataIndex: 0 });
    const columns = [
        { title: "Order ID", dataIndex: "aliasId" },
        {
            title: "Price",
            dataIndex: "totalPrice",
            render: (price) => {
                return <span>{price} VND</span>;
            },
        },
        { title: "Order date", dataIndex: "createdAt" },
        {
            title: "Status",
            dataIndex: "status",
            render: (status) => {
                let content = status ? "" : "None";
                switch (status) {
                    case 0:
                        content = "Pending";
                        break;
                    case 1:
                        content = "Accepted";
                        break;
                    case 2:
                        content = "Denied";
                        break;
                    case 3:
                        content = "Done";
                        break;
                    case 4:
                        content = "Cancelled";
                        break;
                    case 5:
                        content = "Delivery";
                        break;
                    default:
                        content = "None";
                        break;
                }
                return (
                    <div className="status-tag">
                        <span id={content.toLowerCase()}>{content}</span>
                    </div>
                );
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (dataIndex) => {
                return (
                    <button
                        className="table-view-action"
                        // onClick={() => setCurrentModal({ visible: true, dataIndex: dataIndex })}
                    >
                        View
                    </button>
                );
            },
        },
    ];

    const toggleModal = () => {
        setCurrentModal({ ...currentModal, visible: false });
    };

    return (
        <div className="custom-site-orders">
            <div className="custom-site-orders__filter">
                <Space direction="horizontal" size="large">
                    <div className="orders__filter-item">
                        <span>Filter by date</span>
                        <RangePicker />
                    </div>
                    <div className="orders__filter-item">
                        <span>Status</span>
                        <Select style={{ width: 120 }}>
                            <Option value={-1}>Default</Option>
                            <Option value={0}>Pending</Option>
                            <Option value={1}>Accepted</Option>
                            <Option value={2}>Denied</Option>
                            <Option value={3}>Done</Option>
                            <Option value={4}>Cancelled</Option>
                            <Option value={5}>Delivery</Option>
                        </Select>
                    </div>
                </Space>
            </div>

            <Divider />
            <Button onClick={() => setCurrentModal({ ...currentModal, visible: true })}>
                Open modal
            </Button>

            <Table
                columns={columns}
                pagination={{ position: ["bottomCenter"], pageSize: 5 }}
                bordered
            />

            <OrderModal visible={currentModal.visible} toggleModal={toggleModal} />
        </div>
    );
>>>>>>> develop
}

export default OrderManagement;
