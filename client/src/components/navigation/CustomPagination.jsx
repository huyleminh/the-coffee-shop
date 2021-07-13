import React from "react";
import PropTypes from "prop-types";
import { Pagination } from "antd";
import "../../assets/css/navigation/Pagination.css";

CustomePagination.propTypes = {
    pagination: PropTypes.object.isRequired,
};

function CustomePagination(props) {
    // const { pagination } = props;

    return (
        <div className="pagination">
            <Pagination defaultCurrent={1} total={50} />
        </div>
    );
}

export default CustomePagination;
