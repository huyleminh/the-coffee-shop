import { LoadingOutlined } from "@ant-design/icons";
import { DatePicker, Select, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import NotificationBox from "../../../components/NotificationBox";
import FirebaseAPI from "../../../services/FirsebaseAPI";
import ProductAPI from "../../../services/Product/ProductAPI";
import CreateNewProductWorkflow from ".././../../workflow/CreateNewProductWorkflow";

moment.locale("vie");
const momentFormat = "DD/MM/YYYY";

const { RangePicker } = DatePicker;

function CreateProductForm(props) {
    const { visible, handleCancel } = props;
    const history = useHistory();
    const [imageFile, setImageFile] = useState("No file has been choosen.");
    const [discounts, setDiscounts] = useState([]);
    const [currentDiscount, setCurrentDiscount] = useState({});
    const [productInfo, setProductInfo] = useState({
        name: "",
        price: 0,
        categoryName: "",
        newDiscount: 0,
        startDate: null,
        endDate: null,
        description: "",
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleClose = () => handleCancel();

    const handleSave = () => {
        setIsSaving(true);
        const newProduct = { ...productInfo };
        if (currentDiscount.percent !== undefined) {
            // If user choose existed discount
            const index = discounts.findIndex((item) => item.id === currentDiscount.id);
            newProduct.discount = index === -1 ? { id: null } : { id: discounts[index].id };
        } else {
            // If user choose new discount
            const { newDiscount, startDate, endDate } = newProduct;
            if (newDiscount === 0 || !startDate || !endDate) {
                newProduct.discount = { id: null };
            } else {
                newProduct.discount = {
                    percent: parseFloat(newDiscount) / 100,
                    startDate: startDate.toJSON(),
                    endDate: endDate.toJSON(),
                };
            }
        }

        delete newProduct.newDiscount;
        delete newProduct.startDate;
        delete newProduct.endDate;
        const flow = new CreateNewProductWorkflow({ ...newProduct, image: imageFile.name });
        flow.startFlow()
            .then((res) => {
                setIsSaving(false);
                if (res.status === 400) {
                    NotificationBox.triggerWarning("CREATE WARNING", res.statusText);
                } else if (res.status === 403) {
                    localStorage.removeItem("user");
                    alert(res.statusText);
                    history.push("/403");
                } else if (res.status === 409) {
                    NotificationBox.triggerError("CREATE ERROR", res.statusText);
                } else if (res.status === 200) {
                    NotificationBox.triggerSuccess(
                        "CREATE SUCCESS",
                        `Create ${newProduct.name} successfully.`
                    );
                }
                const upLoadURL = res.data;
                if (upLoadURL) {
                    FirebaseAPI.uploadImage(imageFile, upLoadURL)
                        .then((res) => {
                            if (res.status === 200) {
                            } else if (res.status === 400)
                                NotificationBox.triggerError(
                                    "UPLOAD ERROR",
                                    "Can not upload your image."
                                );
                        })
                        .catch((error) => {
                            NotificationBox.triggerError(
                                "UPLOAD ERROR",
                                "Can not upload your image."
                            );
                            console.log(error);
                        });
                }
                handleClose();
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            })
            .catch((error) => {
                console.log(error);
                NotificationBox.triggerError(
                    "CREATE ERROR",
                    "Something wenrt wrong. Can not create new product."
                );
            });
    };

    const changeImage = (e) => {
        const target = e.target;
        setImageFile(target.files[0]);
    };

    const handleChangeDiscount = (value) => {
        const index = discounts.findIndex((item) => item.id === value);
        const targetDiscount = discounts[index];
        setProductInfo({ ...productInfo, newDiscount: 0, startDate: null, endDate: null });
        setCurrentDiscount({
            id: targetDiscount.id,
            percent: targetDiscount.percent,
            startDate: moment(new Date(targetDiscount.startDate), momentFormat),
            endDate: moment(new Date(targetDiscount.endDate), momentFormat),
        });
    };

    const handleChangeProductInfo = (e) => {
        const target = e.target;
        if (target.name === "newDiscount") setCurrentDiscount({});
        setProductInfo({ ...productInfo, [target.name]: target.value });
    };

    const handleChangeDate = (values) => {
        if (!values) {
            setProductInfo({ ...productInfo, startDate: null, endDate: null });
        } else {
            setProductInfo({ ...productInfo, startDate: values[0], endDate: values[1] });
        }
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
                    {isSaving ? <LoadingOutlined spin /> : "Save"}
                </button>
            }
        >
            <div className="product-management-modal">
                <div className="product-management-modal-content" style={{ padding: "0" }}>
                    <div className="product-management-modal-content__item">
                        <label htmlFor="name">Name</label> <br />
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Product's name"
                            value={productInfo.name}
                            onChange={handleChangeProductInfo}
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
                                value={productInfo.price}
                                onChange={handleChangeProductInfo}
                            />
                        </div>

                        <div>
                            <label htmlFor="categoryName">Category</label> <br />
                            <input
                                name="categoryName"
                                id="categoryName"
                                placeholder="Category"
                                value={productInfo.categoryName}
                                onChange={handleChangeProductInfo}
                            />
                        </div>
                    </div>

                    <div className="product-management-modal-content__item">
                        <label htmlFor="image">Image</label> <br />
                        <input
                            type="file"
                            name="image"
                            id="image"
                            onChange={changeImage}
                            accept=".jpg,.jpeg,.png,.jfif"
                        />
                        <span>{imageFile.name}</span>
                    </div>

                    <div className="product-management-modal-content__item">
                        <label>Existed discounts</label> <br />
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
                                value={productInfo.newDiscount}
                                onChange={handleChangeProductInfo}
                            />
                        </div>
                        <div style={{ width: "252px" }}>
                            <RangePicker
                                value={[productInfo.startDate, productInfo.endDate]}
                                onChange={handleChangeDate}
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
                            value={productInfo.description}
                            onChange={handleChangeProductInfo}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default CreateProductForm;
