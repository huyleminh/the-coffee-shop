import { LoadingOutlined } from "@ant-design/icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DatePicker, Modal, Select, Skeleton, Space } from "antd";
import moment from "moment";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import NotificationBox from "../../../components/NotificationBox";
import AdminAPI from "../../../services/Admin/AdminAPI";
import FirebaseAPI from "../../../services/FirsebaseAPI";
import ProductAPI from "../../../services/Product/ProductAPI";

moment.locale("vie");
const momentFormat = "DD/MM/YYYY";

const { RangePicker } = DatePicker;

function ProductManagementModal(props) {
    const { visible, data, image, handleCancel } = props;
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [dataModal, setDataModal] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [discounts, setDiscounts] = useState([]);
    const [currentDiscount, setCurrentDiscount] = useState({});

    const handleClose = () => handleCancel();

    const handleSaveChange = async () => {
        if (isDeleting) {
            alert("You can not edit this product. Please wait for a moment!");
            return;
        }

        setIsSaving(true);

        if (dataModal.name === "" || dataModal.name.match(/^\s+$/g)) {
            alert("Product name must be filled.");
            setIsSaving(false);
            return;
        }

        if (dataModal.category === "" || dataModal.category.match(/^\s+$/g)) {
            alert("Product category must be filled.");
            setIsSaving(false);
            return;
        }

        if (dataModal.price === "" || parseFloat(dataModal.price) <= 0) {
            alert("Product price must be larger than 0.");
            setIsSaving(false);
            return;
        }

        const newData = {
            productId: dataModal.id,
            name: dataModal.name.trim(),
            description: dataModal.description,
            price: dataModal.price,
            categoryName: dataModal.category.trim().toLowerCase(),
            discount: { id: null },
        };

        newData.categoryName =
            newData.categoryName[0].toUpperCase() + newData.categoryName.slice(1);

        if (Object.keys(currentDiscount).length !== 0) newData.discount.id = currentDiscount.id;
        else {
            if (
                dataModal.newDiscount !== "" &&
                parseFloat(dataModal.newDiscount) > 0 &&
                dataModal.startDate !== null &&
                dataModal.endDate !== null
            ) {
                newData.discount = {
                    percent: parseFloat(dataModal.newDiscount) / 100,
                    startDate: dataModal.startDate,
                    endDate: dataModal.endDate,
                };
            }
        }

        const user = JSON.parse(localStorage.getItem("user"));
        try {
            const response = await AdminAPI.updateProductById(user.token, newData);
            setIsSaving(false);
            if (response.status === 409) {
                NotificationBox.triggerWarning("UPDATE WARNING", response.statusText);
            } else if (
                response.status === 403 &&
                response.status === 401 &&
                response.status === 404
            ) {
                alert(response.statusText);
                history.push("/403");
            } else {
                // status = 200
                NotificationBox.triggerSuccess("UPDATE SUCCESS", "Update successfully.");
                handleClose();
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong.");
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (isSaving) {
            alert("You can not delete this product. Please wait for a moment.");
            return;
        }
        setIsDeleting(true);
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.token) {
            alert("You are not allowed to access this page.");
            history.push("/403");
        } else {
            try {
                const response = await AdminAPI.deleteProductById(
                    user.token,
                    queryString.stringify({ productId: dataModal.id })
                );
                setIsDeleting(false);
                if (response.status === 200) {
                    NotificationBox.triggerSuccess(
                        "DELETE SUCCESS",
                        `Delete ${dataModal.name} successfully.`
                    );

                    const imageName = dataModal.img;
                    FirebaseAPI.deleteImage(imageName);
                    // .then((res) => {
                    //     if (res.status === 200) {
                    //     } else if (res.status === 400) {
                    //         NotificationBox.triggerError(
                    //             "DELETE PRODUCT ERROR",
                    //             `Can not delete ${dataModal.name} image.`
                    //         );
                    //         console.log(res.error);
                    //     }
                    // })
                    // .catch((e) => {});
                    handleClose();
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                } else if (
                    response.status === 401 ||
                    response.status === 403 ||
                    response.status === 404
                ) {
                    alert("You are not allowed to access this page.");
                    history.push("/403");
                } else if (response.status === 400) {
                    NotificationBox.triggerError(
                        "DELETE ERROR",
                        `Can not delete ${dataModal.name}.`
                    );
                }
            } catch (error) {
                setIsDeleting(false);
                console.log(error);
                alert("Something went wrong.");
            }
        }
    };

    const handleOnChange = (e) => {
        const target = e.target;
        if (target.name === "newDiscount") setCurrentDiscount({});
        setDataModal({ ...dataModal, [target.name]: target.value });
    };

    const handleChangeDiscount = (value) => {
        const index = discounts.findIndex((item) => item.id === value);
        const targetDiscount = discounts[index];

        setCurrentDiscount({
            id: targetDiscount.id,
            percent: targetDiscount.percent * 100,
            startDate: moment(new Date(targetDiscount.startDate), momentFormat),
            endDate: moment(new Date(targetDiscount.endDate), momentFormat),
        });
        setDataModal({ ...dataModal, newDiscount: 0, startDate: null, endDate: null });
    };

    const handleChangeNewDiscount = (values) => {
        if (!values) {
            setDataModal({ ...dataModal, startDate: null, endDate: null });
        } else {
            setDataModal({ ...dataModal, startDate: values[0], endDate: values[1] });
        }
    };

    useEffect(() => {
        if (!visible) {
            setDataModal({});
            setIsSaving(false);
            setIsDeleting(false);
        }
        const newData = {
            id: data.product.id,
            img: data.product.image,
            name: data.product.name,
            price: data.product.price,
            description: data.product.description,
            category: data.categoryName,
            rate: parseInt(data.rating.totalStar / data.rating.totalRating).toFixed(1),
            newDiscount: 0,
            startDate: null,
            endDate: null,
        };

        setCurrentDiscount({
            id: data.discount ? data.discount.id : null,
            percent: data.discount ? data.discount.percent * 100 : 0,
            startDate: data.discount
                ? moment(new Date(data.discount.startDate), momentFormat)
                : null,
            endDate: data.discount ? moment(new Date(data.discount.endDate), momentFormat) : null,
        });
        setIsLoading(false);
        setDataModal(newData);

        return () => {
            setDataModal({});
            setCurrentDiscount({
                percent: data.discount ? data.discount.percent * 100 : 0,
                startDate: data.discount
                    ? moment(new Date(data.discount.startDate), momentFormat)
                    : null,
                endDate: data.discount
                    ? moment(new Date(data.discount.endDate), momentFormat)
                    : null,
            });
        };
    }, [data, visible]);

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

    if (isLoading) return <></>;
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
                        {isDeleting ? <LoadingOutlined spin /> : "Delete"}
                    </button>
                    <button className="order-modal-btn" id="save" onClick={handleSaveChange}>
                        {isSaving ? <LoadingOutlined spin /> : "Save"}
                    </button>
                </div>
            }
        >
            <div className="product-management-modal">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        height: "100%",
                    }}
                >
                    {!image ? (
                        <Skeleton.Image style={{ width: "250px", height: "300px" }} />
                    ) : (
                        <img src={image} alt="product" loading="lazy" />
                    )}
                    <span style={{ textAlign: "center", fontSize: "1.2rem", fontWeight: 600 }}>
                        <FontAwesomeIcon
                            icon={faStar}
                            style={{ color: "gold", marginRight: "5px" }}
                        />
                        {dataModal.rate}
                    </span>
                </div>

                <div className="product-management-modal-content">
                    <div className="product-management-modal-content__item">
                        <label>Name</label> <br />
                        <input
                            type="text"
                            name="name"
                            id=""
                            placeholder="Product's name"
                            value={dataModal.name}
                            onChange={handleOnChange}
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
                                value={dataModal.price}
                                onChange={handleOnChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="category">Category</label> <br />
                            <input
                                type="text"
                                name="category"
                                id="category"
                                placeholder="Category"
                                value={dataModal.category}
                                onChange={handleOnChange}
                            />
                        </div>
                    </div>

                    <div className="product-management-modal-content__item">
                        <label>Discount</label> <br />
                        <Space direction="horizontal" size={[100]}>
                            <Select
                                style={{ width: "100px" }}
                                placeholder="Percent"
                                value={currentDiscount.percent}
                                onChange={handleChangeDiscount}
                            >
                                {discounts.map((item) => (
                                    <Select.Option key={item.id} value={item.id}>
                                        {item.percent * 100}
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
                                value={dataModal.newDiscount}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div style={{ width: "220px" }}>
                            <RangePicker
                                value={[dataModal.startDate, dataModal.endDate]}
                                onChange={handleChangeNewDiscount}
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
                            value={dataModal.description}
                            onChange={handleOnChange}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ProductManagementModal;
