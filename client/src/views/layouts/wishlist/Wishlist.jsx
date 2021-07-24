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
import { Storage } from "../../../utilities/firebase/FirebaseConfig";

const { Content } = Layout;

function Wishlist() {
    const history = useHistory();
    const [numberOfSelected, setNumberOfItem] = useState(0);
    const [data, setData] = useState(() => {
        const wishlist = JSON.parse(localStorage.getItem("wishlist"));
        return wishlist ? wishlist : [];
    });

    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState([])
    const [isSending, setIsSending] = useState(false)

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
                        console.log(resWishlist);
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
        }

        if (item.product.image)
            row.image = {
                src: images[index],
                width: "150px",
                height: "150px",
            };
        return row;
    });

    /*const handleQuantity = (record, value) => {
        let clone = [...data];

        for (let item in data) {
            if (record["key"] === data[item]["key"]) {
                clone[item]["quantity"] = value;
                clone[item]["total"] =
                    value * clone[item]["price"]["price"] * (1 - clone[item]["price"]["discount"]);
            }
        }
        setData(clone);
    };*/

    const handleGoToMenu = () => {
        history.push("/menu");
    };

    const handleSelected = (keys, rows) => {
        let count = 0;
        // eslint-disable-next-line
        for (let item in keys) {
            count = count + 1;
        }
        setNumberOfItem(count);
        setSelectedItem(keys)
    };

    const handleRemoveItem = (key) => {
        console.log(key);
        const removeItem = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            const wishlist = JSON.parse(localStorage.getItem("wishlist"));
            const newWishlist = []
            var isExist = false
            for (let item of wishlist) {
                if (item["product"]["id"] !== key) {
                    newWishlist.push(item)
                }
                else {
                    isExist = true
                }
            }
            if (!user || !user.token) {
                localStorage.removeItem("user");
                if (isExist) {
                    alert("Remove successfully.")
                    localStorage.setItem("wishlist", JSON.stringify(newWishlist))
                    setData(newWishlist)
                    setIsSending(false)
                }
            } else {
                try {
                    const response = await WishlistAPI.deleteItem(user.token, key)
                    if (response.status === 200) {
                        console.log("success");
                        alert("Remove successfully.");
                        localStorage.setItem("wishlist", JSON.stringify(newWishlist))
                        setData(newWishlist)
                        setIsSending(false)
                    } else if (response.status === 404) {
                        if (response.message === "This user does not exist") {
                            localStorage.removeItem("user");
                            if (isExist) {
                                alert("Remove successfully.")
                                localStorage.setItem("wishlist", JSON.stringify(newWishlist))
                                setData(newWishlist)
                                setIsSending(false)
                            }
                        } else {
                            console.log(response.message);
                            alert("This product does not exist in your wishlist.");
                            if (isExist) {
                                localStorage.setItem("wishlist", JSON.stringify(newWishlist))
                                setData(newWishlist)
                                setIsSending(false)
                            }
                        }
                    } else if (response.status === 401 || response.status === 403) {
                        localStorage.removeItem("user");
                        if (isExist) {
                            alert("Remove successfully.")
                            localStorage.setItem("wishlist", JSON.stringify(newWishlist))
                            setData(newWishlist)
                            setIsSending(false)
                        }
                    }
                } catch(error) {
                    console.log(error)
                    alert("Something went wrong.")
                }
            }
        }
        setIsSending(true)
        removeItem()
    };

    const handleRemoveSelected = () => {
        console.log(selectedItem);
        const removeSelectedItem = async () => {
            console.log(isSending)
            const user = JSON.parse(localStorage.getItem("user"));
            const wishlist = JSON.parse(localStorage.getItem("wishlist"));
            const newWishlist = []
            const removeItem = []
            var isExist = false
            var deleted = false
            for (let item of wishlist) {
                deleted = false
                for (let key of selectedItem) {
                    if (item["product"]["id"] === key) {
                        isExist = true
                        removeItem.push(item)
                        deleted = true
                    }
                }
                if (!deleted) {
                    newWishlist.push(item)
                }
            }
            console.log(newWishlist)
            if (!user || !user.token) {
                localStorage.removeItem("user");
                if (isExist) {
                    alert("Remove successfully.")
                    localStorage.setItem("wishlist", JSON.stringify(newWishlist))
                    setData(newWishlist)
                    setIsSending(false)
                }
            } else {
                try {
                    const removeItemPromise = removeItem.map((item) => {
                        return WishlistAPI.deleteItem(user.token, item.product.id)
                    })
                    const response = await Promise.all(removeItemPromise)
                    var countNotExist = 0
                    for (let item of response) {
                        if (item.status === 200) {
                            console.log("success");
                        } else if (item.status === 404) {
                            if (item.message === "This user does not exist") {
                                localStorage.removeItem("user");
                            } else {
                                console.log(item.message);
                                countNotExist += 1
                            }
                        } else if (item.status === 401 || item.status === 403) {
                            localStorage.removeItem("user");
                        }
                    }
                    if (isExist) {
                        alert("Remove successfully.")
                        if (countNotExist !== 0)
                        {
                            alert(`${countNotExist} item(s) does not exist in your wishlist.`)
                        }
                        localStorage.setItem("wishlist", JSON.stringify(newWishlist))
                        setData(newWishlist)
                        setIsSending(false)
                    }
                } catch(error) {
                    console.log(error)
                    alert("Something went wrong.")
                }    
            }
        }
        setIsSending(true)
        removeSelectedItem()
        console.log(isSending)
        setNumberOfItem(0)
    };

    const handleCartSelected = () => {
        console.log("Click");
    };

    return (
        <Content>
            <Hero title="Wishlist" sologan="" image={MenuImage} />
            <div className="wrapper wishlist">
                <div className="command_bar">
                <div className="cmd_item">
                        {isSending ? (
                            <span>Sending request, please wait....</span>
                        ) : <span></span>}
                    </div>
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
