import { DatePicker, Divider, Select, Space, Table } from "antd";
import moment from "moment";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import EmployeeAPI from "../../../services/Employee/EmployeeAPI";
import Sort from "../../../utilities/Sort/Sort";
import OrderModal from "./OrderModal";

moment.locale("vie");
const momentFormat = "DD/MM/YYYY";

const { RangePicker } = DatePicker;
const { Option } = Select;

function OrderManagement() {
    const history = useHistory();
    const [currentModal, setCurrentModal] = useState({ visible: false, dataIndex: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [sortBy, setSortBy] = useState(-1);
    const [filters, setFilters] = useState({
        startDate: moment(new Date(), momentFormat),
        endDate: moment(new Date(), momentFormat),
    });

    const [date, setDate] = useState({
        start: moment(new Date(), momentFormat),
        end: moment(new Date(), momentFormat),
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
                        content = "Delivering";
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
                        onClick={() => setCurrentModal({ visible: true, dataIndex: dataIndex })}
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
            setDate({ start: moment(start, momentFormat), end: moment(end, momentFormat) });
            setFilters({
                ...filters,
                startDate: moment(start, momentFormat),
                endDate: moment(end, momentFormat),
            });
        }
    };

    const handleChangeSortBy = (value) => setSortBy(value);

    useEffect(() => {
        const fetchAllOrders = async () => {
            setIsLoading(true);
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

                try {
                    const response = await EmployeeAPI.getAllOrders(
                        user.token,
                        queryString.stringify(params)
                    );

                    if (response.status === 200) {
                        setOrders(response.data);
                        setIsLoading(false);
                    } else if (response.status === 401 || response.status === 403) {
                        alert("You are not allowed to access this page.");
                        localStorage.removeItem("user");
                        history.push("/403");
                    } else if (response.status === 404) {
                        if (response.message === "This user does not exist") {
                            alert("You are not allowed to access this page.");
                            localStorage.removeItem("user");
                            history.push("/403");
                        } else {
                            alert(response.message);
                        }
                    }
                } catch (error) {
                    console.log(error);
                    alert("Someting went wrong.");
                }
            }
        };

        fetchAllOrders();
    }, [history, filters]);

    const records = orders.map((item, index) => {
        const record = {
            key: item.order.aliasId,
            aliasId: item.order.aliasId,
            totalPrice: 0,
            createdAt: new Date(item.order.createdAt).toLocaleString(),
            status: item.order.status,
            action: index,
        };
        record.totalPrice = item.order.deliveryFee + item.order.totalPrice;

        return record;
    });

    const sortedRecords = Sort.sortOrderssByStatus(
        records.sort(
            (left, right) =>
                new Date(right.createdAt.replace(",", "")) -
                new Date(left.createdAt.replace(",", ""))
        ),
        sortBy
    );

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
                        <Select value={sortBy} style={{ width: 120 }} onChange={handleChangeSortBy}>
                            <Option value={-1}>Default</Option>
                            <Option value={0}>Pending</Option>
                            <Option value={1}>Accepted</Option>
                            <Option value={2}>Denied</Option>
                            <Option value={3}>Done</Option>
                            <Option value={4}>Cancelled</Option>
                            <Option value={5}>Delivering</Option>
                        </Select>
                    </div>
                </Space>
            </div>

            <Divider />
            <Table
                columns={columns}
                dataSource={sortedRecords}
                pagination={{ position: ["bottomCenter"], pageSize: 5 }}
                bordered
                loading={isLoading}
            />

            <OrderModal
                data={orders[currentModal.dataIndex]}
                visible={currentModal.visible}
                toggleModal={toggleModal}
            />
        </div>
    );
}

export default OrderManagement;
