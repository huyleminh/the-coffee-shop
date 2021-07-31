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
import WishlistAPI from "../../../services/Wishlist/WishlistAPI";
import CartAPI from "../../../services/Cart/CartAPI.js";
import { Storage } from "../../../utilities/firebase/FirebaseConfig";
import { LoadingOutlined } from "@ant-design/icons";

const { Content } = Layout;

function Wishlist() {
    const history = useHistory();
    const [data, setData] = useState(() => {
        const wishlist = JSON.parse(localStorage.getItem("wishlist"));
        return wishlist ? wishlist : [];
    });

    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState([]);
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        const fetchWishlist = async () => {
            const user = JSON.parse(localStorage.getItem("user"));

            if (!user || !user.token) {
                localStorage.removeItem("user");
                setIsLoading(false);
            } else {
                try {
                    const response = await WishlistAPI.getWishlist(user.token);
                    if (response.status === 200) {
                        const resWishlist = response.data;
                        setData(resWishlist);
                        localStorage.setItem("wishlist", JSON.stringify(resWishlist));
                    } else if (
                        response.status === 404 ||
                        response.status === 401 ||
                        response.status === 403
                    ) {
                        localStorage.removeItem("user");
                        const wishlist = JSON.parse(localStorage.getItem("wishlist"));
                        if (!wishlist) {
                            setData([]);
                        } else {
                            setData(wishlist);
                        }
                    }
                } catch (error) {
                    console.log(error);
                    alert("Something went wrong.");
                }
            }
        };

        fetchWishlist();
    }, []);

    useEffect(() => {
        const fetchImages = async () => {
            const imagePromises = data.map((item) => {
                const image = item.product.image;
                if (image) return Storage.ref(`products/${item.product.image}`).getDownloadURL();
                else return Storage.ref(`products/latte.jpg`).getDownloadURL();
            });

            const images = await Promise.all(imagePromises);
            setImages(images);
            setIsLoading(false);
        };
        fetchImages();
    }, [data]);

    // useEffect(() => {
    //     const removeItems = () => {
    //         if (isRemoving) {
    //             console.log("remove item");
    //             removeSelectedItem();
    //             setIsRemoving(false);
    //             setSelectedItem([]);
    //         }
    //     };
    //     removeItems();
    // });

    const tempArray = data.map(function (item, index) {
        let row = {};
        row.key = item.product.id;
        row.product = item.product.name;
        row.action = "cart";
        if (!item.discount) {
            row.price = { price: item.product.price, discount: 0 };
        } else {
            const dateTemp = new Date(item.discount.endDate);
            if (Date.now() <= dateTemp.valueOf()) {
                row.price = { price: item.product.price, discount: item.discount.percent };
            } else {
                row.price = { price: item.product.price, discount: 0 };
            }
            row.startDate = item.discount.startDate;
            row.endDate = item.discount.endDate;
        }

        if (item.product.image)
            row.image = {
                src: images[index],
                width: "100px",
                height: "100px",
            };
        return row;
    });

    const handleGoToMenu = () => {
        history.push("/menu");
    };

    const handleSelected = (keys, rows) => {
        setSelectedItem(rows);
    };

    const handleRemoveItem = (key) => {
        setIsSending(true);
        // setSelectedItem([key]);
        // setIsRemoving(true);
        removeSelectedItem([key]);
    };

    const removeSelectedItem = async (params) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const wishlist = JSON.parse(localStorage.getItem("wishlist"));
        const newWishlist = [];
        const removeItem = [];
        let isExist = false;
        let deleted = false;
        for (let item of wishlist) {
            deleted = false;
            for (let key of params) {
                if (item["product"]["id"] === key["key"]) {
                    isExist = true;
                    removeItem.push(item);
                    deleted = true;
                }
            }
            if (!deleted) {
                newWishlist.push(item);
            }
        }

        if (!user || !user.token) {
            localStorage.removeItem("user");
            if (isExist) {
                alert("Remove successfully.");
                localStorage.setItem("wishlist", JSON.stringify(newWishlist));
                setData(newWishlist);
                setIsSending(false);
            }
        } else {
            try {
                const removeItemPromise = removeItem.map((item) => {
                    return WishlistAPI.deleteItem(user.token, item.product.id);
                });
                const response = await Promise.all(removeItemPromise);
                let countNotExist = 0;
                for (let item of response) {
                    if (item.status === 200) {
                        console.log("success");
                    } else if (item.status === 404) {
                        if (item.message === "This user does not exist") {
                            localStorage.removeItem("user");
                        } else {
                            console.log(item.message);
                            countNotExist += 1;
                        }
                    } else if (item.status === 401 || item.status === 403) {
                        localStorage.removeItem("user");
                    }
                }
                if (isExist) {
                    alert("Remove successfully.");
                    if (countNotExist !== 0) {
                        alert(`${countNotExist} item(s) does not exist in your wishlist.`);
                    }
                    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
                    setData(newWishlist);
                    setIsSending(false);
                }
            } catch (error) {
                console.log(error);
                alert("Something went wrong.");
            }
        }
    };

    const addSelectedToCart = async (params) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

        let listOfSelected = JSON.parse(JSON.stringify(params));

        const items = JSON.parse(JSON.stringify(cart));
        let isExisted = false;
        let countExisted = 0;
        for (let element of listOfSelected) {
            isExisted = false;
            for (let pro of cart) {
                if (element.key === pro.product.id) {
                    isExisted = true;
                }
            }
            if (!isExisted) {
                items.push({
                    product: {
                        id: element.key,
                        image: element.image.src.match(
                            /img_.+((\.jpg)|(\.png)|(\.jpeg)|(\.jfif))/g
                        )[0],
                        name: element.product,
                        price: element.price.price,
                    },
                    discount:
                        element.price.discount === 0
                            ? null
                            : {
                                  percent: element.price.discount,
                                  startDate: element.startDate,
                                  endDate: element.endDate,
                              },
                    quantity: 1,
                });
            } else countExisted += 1;
        }
        let flag = false;
        if (user && user.token) {
            try {
                const promiseList = listOfSelected.map((item) => {
                    return CartAPI.addToCart(user.token, {
                        productId: item.key,
                        quantity: 1,
                    });
                });
                const response = await Promise.all(promiseList);
                for (let item of response) {
                    if (item.status === 200) {
                        console.log("success");
                        localStorage.setItem("cart", JSON.stringify(items));
                    } else if (item.status === 409) {
                        console.log("existed");
                    } else {
                        if (
                            item.status === 401 ||
                            item.status === 403 ||
                            item.message === "This user does not exist"
                        )
                            flag = true;
                        else console.log("success");
                    }
                }
                if (countExisted !== 0) {
                    alert(`Added sucessfully. ${countExisted} item(s) existed in your cart.`);
                } else alert(`Added sucessfully.`);
                setIsSending(false);
            } catch (error) {
                console.log(error);
                alert("Something went wrong");
            }
        } else flag = true;

        if (flag) {
            localStorage.removeItem("user");
            localStorage.setItem("cart", JSON.stringify(items));
            if (countExisted !== 0) {
                alert(`Added sucessfully. ${countExisted} item(s) existed in your cart.`);
            } else alert(`Added sucessfully.`);
            setIsSending(false);
        }
    };

    const handleRemoveSelected = () => {
        if (selectedItem.length === 0) {
            alert("No item is being selected.\nPlease select item(s) and try again.");
        } else {
            setIsSending(true);
            removeSelectedItem(selectedItem);
            setSelectedItem([]);
        }
    };

    const handleCartSelected = () => {
        if (selectedItem.length === 0) {
            alert("No item is being selected.\nPlease select item(s) and try again.");
        } else {
            setIsSending(true);
            addSelectedToCart(selectedItem);
        }
    };

    const handleAddToCart = (record) => {
        setIsSending(true);
        addSelectedToCart([record]);
    };

    return (
        <Content>
            <Hero title="Wishlist" sologan="" image={MenuImage} />
            <div className="wrapper wishlist">
                <div className="command_bar">
                    <div className="cmd_item">
                        {isSending ? <LoadingOutlined spin /> : <span></span>}
                    </div>
                    <div className="cmd_item">
                        <span>{selectedItem.length} item(s) selected</span>
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
                {isLoading ? (
                    <Loading
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    />
                ) : (
                    <>
                        <ProductTable
                            records={tempArray}
                            pagination={{ position: ["bottomCenter"], pageSize: 5 }}
                            disable
                            hiddens={["quantity", "total"]}
                            handleSelected={handleSelected}
                            handleDeleted={handleRemoveItem}
                            handleAction={handleAddToCart}
                        />
                    </>
                )}

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
