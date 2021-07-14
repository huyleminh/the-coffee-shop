import React from "react";
import PropTypes from "prop-types";
import { Pagination } from "antd";
import "../../assets/css/navigation/Pagination.css";

CustomePagination.propTypes = {
    page: PropTypes.number,
    limit: PropTypes.number,
    total: PropTypes.number,
};

CustomePagination.defaultProps = {
    page: 1,
    limit: 10,
};

function CustomePagination(props) {
    const { page, limit, total } = props;

    return (
        <div className="pagination">
            <Pagination defaultCurrent={1} current={page} pageSize={limit} total={total} />
        </div>
    );
}

export default CustomePagination;
