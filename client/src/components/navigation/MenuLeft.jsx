import React from "react";
import PropsTypes from "prop-types";
import { Menu } from "antd";
import { HomeOutlined, UnorderedListOutlined, ArrowLeftOutlined } from "@ant-design/icons";

MenuLeft.propsTypes = {
    menulist: PropsTypes.array,
};

function MenuLeft(props) {
    const data = [
        {
            title: "Home",
            key: "1",
            path: "/employee/manage",
            icon: <HomeOutlined />,
            hasChild: false,
            children: [],
        },
        {
            title: "Orders",
            key: "2",
            path: "/employee/manage/orders",
            icon: <UnorderedListOutlined />,
            hasChild: false,
            children: [],
        },
        {
            title: "Exit",
            key: "3",
            path: "/menu",
            icon: <ArrowLeftOutlined />,
            hasChild: false,
            children: [],
        },
    ];

    const dynamicMenu = data.map((item) => {
        if (!item.hasChild)
            return (
                <Menu.Item title={item.title} key={item.key} icon={item.icon}>
                    {item.title}
                </Menu.Item>
            );
        else return <></>;
    });

    return <Menu>{dynamicMenu}</Menu>;
}

export default MenuLeft;
