import { Space, DatePicker, Select } from "antd";
import React from "react";
import CustomPagination from "../../../components/navigation/CustomPagination";

const { RangePicker } = DatePicker;
const { Option } = Select;

// Trạng thái: Primary, Success, Warning, Danger, Cancel
// Normal: 007ff5, 00d349, ff933d, ff1f32, bdbec2
// Hover: 0062cf, 6ec335, ff8631, f90525, aeb0b7 (shadow)
// Active: 0062cf, 6ec335, ff8631, f90525, aeb0b7

function OrderManagement() {
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
                        <Select defaultValue="all" style={{ width: 120 }}>
                            <Option value="all">All</Option>
                            <Option value="pending">Pending</Option>
                            <Option value="accepted">Accepted</Option>
                            <Option value="done">Done</Option>
                            <Option value="delivery">Delivery</Option>
                            <Option value="cancelled">Cancelled</Option>
                        </Select>
                    </div>
                </Space>
            </div>
            <div className="custom-site-orders__table"></div>
            <CustomPagination />
        </div>
    );
}

export default OrderManagement;
