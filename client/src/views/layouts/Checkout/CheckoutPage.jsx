import React, { useState } from "react";
import PropTypes from "prop-types";
import ProductTable from "../../../components/Product/ProductTable";
import MenuImage from "../../../assets/images/menu.jpg";
import Hero from "../../../components/layouts/Hero";
import { Layout } from "antd";

const { Content } = Layout;

CheckoutPage.propTypes = {};

function CheckoutPage(props) {
    const data = [
        {
            key: "1",
            image: {
                src: "https://firebasestorage.googleapis.com/v0/b/the-coffee-shop-gc.appspot.com/o/products%2Fimg_6dcadbfc-5300-484c-b58a-228974efb09e.jpg?alt=media&token=932f56bc-cfa8-4699-bc38-8f642f768b58",
                height: "40px",
                width: "40px",
            },
            product: "Latte",
            price: {
                discount: 0.25,
                price: 100000,
            },
            quantity: "1",
            total: 75000,
        },
        {
            key: "2",
            image: {
                src: "https://firebasestorage.googleapis.com/v0/b/the-coffee-shop-gc.appspot.com/o/products%2Fimg_6dcadbfc-5300-484c-b58a-228974efb09e.jpg?alt=media&token=932f56bc-cfa8-4699-bc38-8f642f768b58",
                height: "40px",
                width: "40px",
            },
            product: "John Brown",
            price: {
                discount: 0.25,
                price: 100000,
            },
            quantity: "1",
            total: 75000,
        },
        {
            key: "3",
            image: {
                src: "https://firebasestorage.googleapis.com/v0/b/the-coffee-shop-gc.appspot.com/o/products%2Fimg_6dcadbfc-5300-484c-b58a-228974efb09e.jpg?alt=media&token=932f56bc-cfa8-4699-bc38-8f642f768b58",
                height: "40px",
                width: "40px",
            },
            product: "John Brown",
            price: {
                discount: 0.25,
                price: 100000,
            },
            quantity: "1",
            total: 75000,
        },
        {
            key: "4",
            image: {
                src: "https://firebasestorage.googleapis.com/v0/b/the-coffee-shop-gc.appspot.com/o/products%2Fimg_6dcadbfc-5300-484c-b58a-228974efb09e.jpg?alt=media&token=932f56bc-cfa8-4699-bc38-8f642f768b58",
                height: "40px",
                width: "40px",
            },
            product: "John Brown",
            price: {
                discount: 0.25,
                price: 100000,
            },
            quantity: "1",
            total: 75000,
            action: "cart",
        },
    ]; // rowSelection object indicates the need for row selection

    // Handle items which are selected
    const handleSelected = (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys, selectedRows);
    };

    const handleDeleted = (key) => {
        console.log(key);
    };

    const handleAction = (key) => {
        console.log(key);
    };

    const handleQuantity = (record, value) => {
        console.log(record, value);
        console.log(data.indexOf(record));
    };

    return (
        <Content>
            <Hero title="Checkout" image={MenuImage} />

            <div className="wrapper menu">
                <ProductTable
                    records={data}
                    pagination={{ position: ["bottomCenter"], pageSize: 5 }}
                    handleSelected={handleSelected}
                    handleQuantity={handleQuantity}
                    handleDeleted={handleDeleted}
                    handleAction={handleAction}
                />
            </div>
        </Content>
    );
}

export default CheckoutPage;
