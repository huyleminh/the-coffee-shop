import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import Hero from "../../../components/layouts/Hero";
import backgroundImage from "../../../assets/images/menu.jpg";
import ProductTable from "../../../components/Product/ProductTable";
import "../../../assets/css/layouts/cart/CartLayout.css";
import { useHistory } from "react-router-dom";
import Loading from "../../../components/Loading";
const { Content } = Layout;

// Handle items which are selected

function CartLayout() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const [numberOfSelected, setNumberOfSelected] = useState(0);

  let totalMoney = 0;
  //const [images, setImages] = useState([]);

  const [cart, setCart] = useState([
    {
      key: "1",
      product: "Latte",
      price: {
        discount: 0.25,
        price: 100000,
      },
      quantity: "1",
      total: 75000,
      action: "remove",
    },
    {
      key: "2",
      product: "John Brown",
      price: {
        discount: 0.25,
        price: 100000,
      },
      quantity: "1",
      total: 75000,
      action: "remove",
    },
    {
      key: "3",
      product: "John Brown",
      price: {
        discount: 0.25,
        price: 100000,
      },
      quantity: "1",
      total: 75000,
      action: "remove",
    },
    {
      key: "4",
      product: "John Brown",
      price: {
        discount: 0.25,
        price: 100000,
      },
      quantity: "1",
      total: 75000,
      action: "remove",
    },
    {
      key: "5",
      product: "John Brown",
      price: {
        discount: 0.25,
        price: 100000,
      },
      quantity: "1",
      total: 75000,
      action: "remove",
    },
    {
      key: "6",
      product: "John Brown",
      price: {
        discount: 0.25,
        price: 100000,
      },
      quantity: "1",
      total: 75000,
      action: "remove",
    },
    {
      key: "7",
      product: "John Brown",
      price: {
        discount: 0.25,
        price: 100000,
      },
      quantity: "1",
      total: 75000,
      action: "remove",
    },
    {
      key: "8",
      product: "John Brown",
      price: {
        discount: 0.25,
        price: 100000,
      },
      quantity: "1",
      total: 75000,
      action: "remove",
    },
  ]);

  const handleGoHome = () => {
    history.push("/menu");
  };

  const handleRemoveItem = (key) => {
    setIsSending(true);
    setSelectedItem([key]);
    setIsRemoving(true);
  };

  //   const handleRemoveSelected = () => {
  //     console.log(selectedItem);

  //     const removeSelectedItem = () => {
  //       const tempCart = cart;
  //       const removeItem = [];
  //       let isDeleted = false;
  //       for (let item of cart) {
  //         for (let key of selectedItem) {
  //           isDeleted = false;
  //           if (item["product"]["id"] === key) {
  //             removeItem.push(item);
  //             isDeleted = true;
  //           }
  //           if (!isDeleted) {
  //             tempCart.push(item);
  //           }
  //         }
  //         console.log(removeItem);
  //         console.log(tempCart);
  //       }
  //       setCart(tempCart);
  //     };
  //     removeSelectedItem();
  //     setNumberOfSelected(0);
  //   };

  const handleSelected = (products, rows) => {
    let count = 0;
    for (let i in products) {
      count++;
      console.log(i);
      console.log(products);
    }
    setNumberOfSelected(count);
    setSelectedItem(products);
  };

  const handleQuantity = (item, value) => {
    console.log(item);

    const cloneData = [...cart];

    for (let i in cloneData) {
      if (cloneData[i]["key"] === item["key"]) {
        cloneData[i]["quantity"] = value;
        break;
      }
    }
    setCart(cloneData);
  };

  const removeSelectedItem = async () => {
    //const user = JSON.parse(localStorage.getItem("user"));
    //const cart = JSON.parse(localStorage.getItem("cart"));
    const newCart = [];
    const removeItem = [];
    let isExist = false;
    let deleted = false;
    for (let item of cart) {
      deleted = false;
      for (let key of selectedItem) {
        if (item["product"]["id"] === key) {
          isExist = true;
          removeItem.push(item);
          deleted = true;
        }
        if (!deleted) {
          newCart.push(item);
        }
      }
    }

    if (isExist) {
      setCart(newCart);
      setIsSending(false);
    }

    // if (!user || !user.token) {
    //   localStorage.removeItem("user");
    //   if (isExist) {
    //     alert("Remove successfully.");
    //     localStorage.setItem("cart", JSON.stringify(newcart));
    //     setCart(newcart);
    //     setIsSending(false);
    //   }
    // } else {
    //   try {
    //     const removeItemPromise = removeItem.map((item) => {
    //       return cartAPI.deleteItem(user.token, item.product.id);
    //     });
    //     const response = await Promise.all(removeItemPromise);
    //     let countNotExist = 0;
    //     for (let item of response) {
    //       if (item.status === 200) {
    //         console.log("success");
    //       } else if (item.status === 404) {
    //         if (item.message === "This user does not exist") {
    //           localStorage.removeItem("user");
    //         } else {
    //           console.log(item.message);
    //           countNotExist += 1;
    //         }
    //       } else if (item.status === 401 || item.status === 403) {
    //         localStorage.removeItem("user");
    //       }
    //     }
    //     if (isExist) {
    //       alert("Remove successfully.");
    //       if (countNotExist !== 0) {
    //         alert(`${countNotExist} item(s) does not exist in your cart.`);
    //       }
    //       localStorage.setItem("cart", JSON.stringify(newcart));
    //       setData(newcart);
    //       setIsSending(false);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //     alert("Something went wrong.");
    //   }
    // }
  };

  const handleRemoveSelected = () => {
    if (selectedItem.length === 0) {
      alert("No item is being selected.\nPlease select item(s) and try again.");
    } else {
      setIsSending(true);
      setIsRemoving(true);
    }
  };

//   const fetchcart = async () => {
//     if (!cart) {
//       setCart([]);
//     } else {
//       setCart(cart);
//     }
//   };

//   useEffect(() => {
//     fetchcart();
//   }, [cart]);

  //   useEffect(() => {
  //     const fetchImages = async () => {
  //       const imagePromises = data.map((item) => {
  //         const image = item.product.image;
  //         if (image)
  //           return Storage.ref(`products/${item.product.image}`).getDownloadURL();
  //         else return Storage.ref(`products/latte.jpg`).getDownloadURL();
  //       });

  //       const images = await Promise.all(imagePromises);
  //       setImages(images);
  //       setIsLoading(false);
  //     };
  //     fetchImages();
  //   }, [data]);

  useEffect(() => {
    if (isRemoving) {
      removeSelectedItem();
      setIsRemoving(false);
      setSelectedItem([]);
    }
  }, [isRemoving]);

  return (
    <Content>
      <Hero title="MY CART" image={backgroundImage} />
      <div className="wrapper cart">
        <div className="cart__top">
          <div className="cart__topRight">
            <span className="numberOfItems"> {numberOfSelected} Item(s)</span>
            <button className="CartRemoveButton" onClick={handleRemoveSelected}>
              Remove
            </button>
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
                records={cart}
                pagination={{ position: ["bottomCenter"], pageSize: 5 }}
                handleSelected={handleSelected}
                handleDeleted={handleRemoveItem}
                handleQuantity={handleQuantity}
              />
            </>
          )}
          {/* <ProductTable
                        records={cart}
                        pagination={{ position: ["bottomCenter"], pageSize: 5 }}
                        handleDeleted={handleDeleted}
                        handleQuantity={handleQuantity}
                        handleSelected={handleSelected}
                        handleRemoveItem={handleRemoveItem}
                        handleRemoveAll={handleRemoveAll}
                    ></ProductTable> */}
        </div>
      </div>
      <div className="cart__bottom">
        <span className="cart__bottom__returnAndTotal">
          <button className="CartBuyMoreButton" onClick={handleGoHome}>
            Buy More
          </button>
          <text className="TotalPrice">TOTAL PRICE: {totalMoney} đ</text>
        </span>
      </div>
    </Content>
  );
}
export default CartLayout;
