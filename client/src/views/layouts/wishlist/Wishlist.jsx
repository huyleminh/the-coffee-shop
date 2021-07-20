import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../../../assets/css/layouts/wishlist/Wishlist.css";
import MenuImage from "../../../assets/images/menu.jpg";
import defaultAvatar from "../../../assets/images/store-logo.png";
import Hero from "../../../components/layouts/Hero";
import ProductTable from "../../../components/Product/ProductTable";

const { Content } = Layout;

function Wishlist() {
    const history = useHistory();
    const [numberOfSelected, setNumberOfItem] = useState(0);
    const [data, setData] = useState([]);
    useEffect(() => {
        setData([
            {
                key: "1",
                image: {
                    src: "https://i.pinimg.com/564x/b4/60/38/b460382e96eb99db245f89cf9ace4462.jpg",
                    width: 100,
                    height: 100,
                },
                product: "Siesta",
                price: {
                    discount: 0,
                    price: 10000000,
                },
                quantity: 0,
                total: 0,
                action: "cart",
            },
            {
                key: "2",
                image: {
                    src: "https://i.pinimg.com/564x/b4/60/38/b460382e96eb99db245f89cf9ace4462.jpg",
                    width: 100,
                    height: 100,
                },
                product: "Siesta",
                price: {
                    discount: 0,
                    price: 10000000,
                },
                quantity: 0,
                total: 0,
                action: "cart",
            },
            {
                key: "3",
                image: {
                    src: "https://i.pinimg.com/564x/b4/60/38/b460382e96eb99db245f89cf9ace4462.jpg",
                    width: 100,
                    height: 100,
                },
                product: "Siesta",
                price: {
                    discount: 0,
                    price: 10000000,
                },
                quantity: 0,
                total: 0,
                action: "cart",
            },
            {
                key: "4",
                image: {
                    src: "https://i.pinimg.com/564x/b4/60/38/b460382e96eb99db245f89cf9ace4462.jpg",
                    width: 100,
                    height: 100,
                },
                product: "Siesta",
                price: {
                    discount: 0,
                    price: 10000000,
                },
                quantity: 0,
                total: 0,
                action: "cart",
            },
            {
                key: "5",
                image: {
                    src: "https://i.pinimg.com/564x/b4/60/38/b460382e96eb99db245f89cf9ace4462.jpg",
                    width: 100,
                    height: 100,
                },
                product: "Siesta",
                price: {
                    discount: 0,
                    price: 10000000,
                },
                quantity: 0,
                total: 0,
                action: "cart",
            },
            {
                key: "6",
                image: {
                    src: "https://i.pinimg.com/564x/b4/60/38/b460382e96eb99db245f89cf9ace4462.jpg",
                    width: 100,
                    height: 100,
                },
                product: "Siesta",
                price: {
                    discount: 0,
                    price: 10000000,
                },
                quantity: 0,
                total: 0,
                action: "cart",
            }
        ]);
    }, []);

    const handleRemove = (key) => {
        console.log(key);
    };

    const handleQuantity = (record, value) => {
        let clone = [...data]
        
        for (let item in data) {
            if (record["key"] === data[item]["key"]) {
                clone[item]["quantity"] = value
                clone[item]["total"] = value * clone[item]["price"]["price"] * (1 - clone[item]["price"]["discount"])
            }
        }
        setData(clone)
    };

    const handleGoToMenu = () => {
        history.push("/menu");
    };

    return (
        <Content>
            <Hero title="Wishlist" sologan="" image={MenuImage} />
            <div className="wrapper wishlist">
                <div className="command_bar">
                    <div className="cmd_item">
                        <span>{numberOfSelected} item(s) selected</span>
                    </div>
                    <div className="cmd_item">
                        <button className="btn_delete_selected" onClick={handleGoToMenu}>Delete</button>
                    </div>
                </div>
                <ProductTable
                    records={data}
                    pagination={{ position: ["bottomCenter"], pageSize: 5 }}
                    disable
                    hiddens={["quantity", "total"]}
                    handleDeleted={handleRemove}
                />
                <div>
                    <button className="btn_go_menu" onClick={handleGoToMenu}>VISIT MENU</button>
                </div>
            </div>   
        </Content>
    );
}

export default Wishlist;
