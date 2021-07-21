import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../../../assets/css/layouts/wishlist/Wishlist.css";
import MenuImage from "../../../assets/images/menu.jpg";
import Hero from "../../../components/layouts/Hero";
import ProductTable from "../../../components/Product/ProductTable";
import Loading from "../../../components/Loading";

const { Content } = Layout;

function Wishlist() {
    const history = useHistory();
    const [numberOfSelected, setNumberOfItem] = useState(0);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchWishlist = async () => {
            
        }
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
                action: "wishlist",
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
            },
        ]);
    }, []);

    const handleRemove = (key) => {
        console.log(key);
    };

    const handleQuantity = (record, value) => {
        let clone = [...data];

        for (let item in data) {
            if (record["key"] === data[item]["key"]) {
                clone[item]["quantity"] = value;
                clone[item]["total"] =
                    value * clone[item]["price"]["price"] * (1 - clone[item]["price"]["discount"]);
            }
        }
        setData(clone);
    };

    const handleGoToMenu = () => {
        history.push("/menu");
    };

    const handleSelected = (keys, rows) => {
        let count = 0;
        for (let item in keys) {
            count = count + 1;
        }
        setNumberOfItem(count);
    };

    const handleRemoveItem = (key) => {
        console.log(key);
    };

    const handleRemoveSelected = () => {
        console.log("Click")
    };

    const handleCartSelected = () => {
        console.log("Click")
    };

    return (
        <Content>
            <Hero title="Wishlist" sologan="" image={MenuImage} />
            <div className="wrapper wishlist">
                <div className="command_bar">
                    <div className="cmd_item">
                        <span>{numberOfSelected} item(s) selected</span>
                    </div>
                    <div className="cmd_item" title="Add selected item(s) to cart">
                        <button className="btn_cart_selected" onClick={handleCartSelected}>
                            <FontAwesomeIcon icon={faShoppingCart} />
                        </button>
                    </div>
                    <div className="cmd_item" title="Remove selected item(s) from wishlist">
                        <button className="table-deleted" onClick={handleRemoveSelected}>
                            Remove
                        </button>
                    </div>
                </div>
                <ProductTable
                    records={data}
                    pagination={{ position: ["bottomCenter"], pageSize: 5 }}
                    disable
                    hiddens={["quantity", "total"]}
                    handleDeleted={handleRemove}
                    handleSelected={handleSelected}
                    handleDeleted={handleRemoveItem}
                />
                <div>
                    <button className="btn_go_menu" onClick={handleGoToMenu}>
                        VISIT MENU
                    </button>
                </div>
            </div>
        </Content>
    );
}

export default Wishlist;
