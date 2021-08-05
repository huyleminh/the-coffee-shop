import { Button, DatePicker, Divider, Select, Space, Table } from "antd";
import moment from "moment";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import EmployeeAPI from "../../../services/Employee/EmployeeAPI";
import OrderModal from "./OrderModal";

moment.locale("vie");

const { RangePicker } = DatePicker;
const { Option } = Select;

function OrderManagement() {
    const history = useHistory();
    const [currentModal, setCurrentModal] = useState({ visible: false, dataIndex: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [filters, setFilters] = useState({
        startDate: moment(new Date(), "YYYY-MM-DD"),
        endDate: moment(new Date(), "YYYY-MM-DD"),
        sortBy: 0,
    });

    const [date, setDate] = useState({
        start: moment(new Date(), "YYYY-MM-DD"),
        end: moment(new Date(), "YYYY-MM-DD"),
    });

    const columns = [
        { title: "Order ID", dataIndex: "aliasId" },
        {
            title: "Total",
            dataIndex: "totalPrice",
            render: (price) => {
                return <span>{price} VND</span>;
            },
        },
        { title: "Created Date", dataIndex: "createdAt" },
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

    const handleChangeDate = (values) => {
        if (!values) {
            setDate({ start: "", end: "" });
        } else {
            const [start, end] = values;
            setDate({ start: moment(start, "YYYY-MM-DD"), end: moment(end, "YYYY-MM-DD") });
            setFilters({
                ...filters,
                startDate: moment(start, "YYYY-MM-DD"),
                endDate: moment(end, "YYYY-MM-DD"),
            });
        }
    };

    const handleChangeSortBy = (value) => setFilters({ ...filters, sortBy: value });

    useEffect(() => {
        const fetchAllOrders = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user || !user.token) {
                alert("You are not allowed to access this page.");
                localStorage.removeItem("user");
                history.push("/403");
            } else {
                const params = {
                    startDate: new Date(filters.startDate).toJSON().match(/\d{4}-\d{2}-\d{2}/g)[0],
                    endDate: new Date(filters.endDate).toJSON().match(/\d{4}-\d{2}-\d{2}/g)[0],
                };

                const response = await EmployeeAPI.getAllOrders(
                    user.token,
                    queryString.stringify(params)
                );
                console.log(response);
                if (response.status === 200) {
                    setOrders(response.data);
                    setIsLoading(false);
                }
            }
        };

        fetchAllOrders();
    }, [history, filters]);

    const sortedOrders = orders.map(item => {
        return {};
    });

    return (
        <div className="custom-site-orders">
            <div className="custom-site-orders__filter">
                <Space direction="horizontal" size="large">
                    <div className="orders__filter-item">
                        <span>Filter by date</span>
                        <RangePicker value={[date.start, date.end]} onChange={handleChangeDate} />
                    </div>
                    <div className="orders__filter-item">
                        <span>Status</span>
                        <Select
                            value={filters.sortBy}
                            style={{ width: 120 }}
                            onChange={handleChangeSortBy}
                        >
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
                dataSource={sortedOrders}
                pagination={{ position: ["bottomCenter"], pageSize: 5 }}
                bordered
                loading={isLoading}
            />

            <OrderModal visible={currentModal.visible} toggleModal={toggleModal} />
        </div>
    );
}

export default OrderManagement;
