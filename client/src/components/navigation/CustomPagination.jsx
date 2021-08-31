import React from "react";
import PropTypes from "prop-types";
import { Pagination } from "antd";

CustomePagination.propTypes = {
    page: PropTypes.number,
    limit: PropTypes.number,
    total: PropTypes.number,
    pageChange: PropTypes.func,
};

CustomePagination.defaultProps = {
    page: 1,
    limit: 9,
    total: 0,
    pageChange: null,
};

function CustomePagination(props) {
    const { page, limit, total, pageChange } = props;

    const handleOnChange = (page) => {
        if (!pageChange) return;
        pageChange(page);
    };

    return (
        <div className="pagination">
            <Pagination defaultCurrent="1" current={page} pageSize={limit} total={total} onChange={handleOnChange} />
        </div>
    );
}

export default CustomePagination;
