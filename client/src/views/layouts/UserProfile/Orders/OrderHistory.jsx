import { Divider, Select, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../../../../assets/css/layouts/profile/OrderHistory.css";
import { UserProfileEventsHandler } from "../../../../Events";
import UserAPI from "../../../../services/User/UserAPI";
import Sort from "../../../../utilities/Sort/Sort";
import Format from "../../../../utilities/Format/Format";
import OrderHistoryModal from "./OrderHistoryModal";
const { Option } = Select;

function OrderHistory() {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [sortBy, setSortBy] = useState(0);
    const [currentModal, setCurrentModal] = useState({ visible: false, dataIndex: 0 });

    const handleChangeSortBy = (value) => setSortBy(value);
    const toggleOrderHistoryModal = () =>
        setCurrentModal({ ...currentModal, visible: !currentModal.visible });

    useEffect(() => {
        document
            .querySelector(".profile__order")
            .scrollIntoView({ behavior: "smooth", block: "start" });
        document.title = "Orders history -  The Coffee Shop";
        const fetchOrdersHistory = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user || !user.token) {
                alert("You are not allowed to access this page. Please login first.");
                history.push("/login");
            } else {
                try {
                    const response = await UserAPI.getOrdersHistory(user.token);
                    if (response.status === 200) {
                        setOrders(response.data);
                        setIsLoading(false);
                    } else if (
                        response.status === 403 ||
                        response.status === 401 ||
                        response.status === 404
                    ) {
                        alert("You are not allowed to access this page.");
                        localStorage.removeItem("user");
                        localStorage.removeItem("profile");
                        history.push("/403");
                    }
                } catch (error) {
                    console.log(error);
                    alert("Something went wrong.");
                }
            }
        };

        fetchOrdersHistory();
    }, [history]);

    useEffect(() => {
        UserProfileEventsHandler.subcribe("toggleOrderHistoryModal", toggleOrderHistoryModal);
        return () =>
            UserProfileEventsHandler.unSubcribe("toggleOrderHistoryModal", toggleOrderHistoryModal);
    });

    const columns = [
        { title: "Order ID", dataIndex: "aliasId" },
        {
            title: "Price",
            dataIndex: "totalPrice",
            render: (price) => {
                return <span>{Format.formatPriceWithVND(price)} VND</span>;
            },
        },
        {
            title: "Order date",
            dataIndex: "createdAt",
            render: (dateString) => new Date(dateString).toLocaleString(),
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (status) => {
                const STATUS = ["Pending", "Accepted", "Denied", "Done", "Cancelled", "Delivering"];
                const newStatus = Number.parseInt(status) > -1 ? Number.parseInt(status) : -1;
                const content = newStatus > -1 ? STATUS[newStatus] : "None";
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
                        onClick={() => setCurrentModal({ visible: true, dataIndex: dataIndex })}
                    >
                        View
                    </button>
                );
            },
        },
    ];

    const records = orders.map((item, index) => {
        const record = {
            key: item.order.aliasId,
            aliasId: item.order.aliasId,
            totalPrice: 0,
            createdAt: item.order.createdAt,
            status: item.order.status,
            action: index,
        };
        record.totalPrice = item.order.deliveryFee + item.order.totalPrice;

        return record;
    });

    const sortedRecords = Sort.sortOrderssByStatus(
        records.sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt)),
        sortBy
    );

    return (
        <div className="profile__order">
            <h1>Order history</h1>
            <Space direction="horizontal">
                <span style={{ fontWeight: "600" }}>Sort by:</span>
                <Select value={sortBy} onChange={handleChangeSortBy} style={{ width: 120 }}>
                    <Option value={-1}>Default</Option>
                    <Option value={0}>Pending</Option>
                    <Option value={1}>Accepted</Option>
                    <Option value={2}>Denied</Option>
                    <Option value={3}>Done</Option>
                    <Option value={4}>Cancelled</Option>
                    <Option value={5}>Delivering</Option>
                </Select>
            </Space>

            <Divider />
            <Table
                columns={columns}
                dataSource={sortedRecords}
                pagination={{ position: ["bottomCenter"], pageSize: 5 }}
                loading={isLoading}
                bordered
            />

            <OrderHistoryModal
                isVisible={currentModal.visible}
                data={orders[currentModal.dataIndex]}
            />
        </div>
    );
}

export default OrderHistory;
