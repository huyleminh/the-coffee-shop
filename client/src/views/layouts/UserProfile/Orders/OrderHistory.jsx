import { Divider, Select, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../../../../assets/css/layouts/profile/OrderHistory.css";
import UserAPI from "../../../../services/User/UserAPI";

const { Option } = Select;

function OrderHistory() {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [sortBy, setSortBy] = useState("all");

    const columns = [
        { title: "Order ID", dataIndex: "aliasId" },
        { title: "Price", dataIndex: "totalPrice", render: (price) => {
            return <span>{price} VND</span>
        } },
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
            render: () => {
                return <button className="table-view-action">View</button>;
            },
        },
    ];

    const handleChangeSortBy = (value) => {
        setSortBy(value);
    };

    useEffect(() => {
        const fetchOrdersHistory = async () => {
            try {
                const token = JSON.parse(localStorage.getItem("user")).token;
                const response = await UserAPI.getOrdersHistory(token);
                if (response.status === 200) {
                    setOrders(response.data);
                    setIsLoading(false);
                } else if (response.status === 404) {
                    localStorage.removeItem("user");
                    alert(response.message);
                    history.push("/404");
                } else if (response.status === 403 || response.status === 401) {
                    localStorage.removeItem("user");
                    alert("You are not allowed to access this page.");
                    history.push("/403");
                }
            } catch (error) {
                console.log(error);
                alert("Something went wrong.");
                history.push("/403");
            }
        };

        fetchOrdersHistory();
    }, [history]);

    const records = orders.map(item => {
        const record = {
            key: item.order.aliasId,
            aliasId: item.order.aliasId,
            totalPrice: 0,
            createdAt: new Date(item.order.createdAt).toLocaleString(),
            status: item.order.status,
            action: "view"
        };
        record.totalPrice = item.products.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.price;
        }, 0)

        return record;
    });

    return (
        <div className="profile__order">
            <h1>Order history</h1>
            <Space direction="horizontal">
                <span>Sort by</span>
                <Select value={sortBy} onChange={handleChangeSortBy} style={{ width: 120 }}>
                    <Option value="all">Default</Option>
                    <Option value="pending">Pending</Option>
                    <Option value="accepted">Accepted</Option>
                    <Option value="denied">Denied</Option>
                    <Option value="done">Done</Option>
                    <Option value="delivery">Delivery</Option>
                    <Option value="cancelled">Cancelled</Option>
                </Select>
            </Space>

            <Divider />

            <Table
                columns={columns}
                dataSource={records}
                pagination={{ position: ["bottomCenter"], pageSize: 5 }}
                loading={isLoading}
            />
        </div>
    );
}

export default OrderHistory;
