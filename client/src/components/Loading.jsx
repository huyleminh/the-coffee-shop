import { Spin } from "antd";
import PropTypes from 'prop-types';
import React from "react";

Loading.propTypes = {
    style: PropTypes.object
};

function Loading(props) {
    return (
        <div style={props.style}>
            <Spin size="large" tip="Loading, please wait for a moment..." />
        </div>
    );
}

export default Loading;
