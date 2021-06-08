import { Spin } from "antd";
import React from "react";

function Loading() {
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Spin size="large" tip="Loading..." />
        </div>
    );
}

export default Loading;
