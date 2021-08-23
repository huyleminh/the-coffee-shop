import React from "react";
import PropTypes from "prop-types";
import ProductItem from "./ProductItem";
import Sort from "../../../../utilities/Sort/Sort";

ProductsList.propTypes = {
    products: PropTypes.array,
    filter: PropTypes.string,
};

function ProductsList(props) {
    const { products, filter } = props;

    const productsList = products.map((item) => {
        const { product, categoryName, rating, discount } = item;
        const productCard = {
            id: product.id,
            name: product.name,
            image: require("../../../../assets/images/default_image.png").default,
            imageOrigin: product.image,
            description: product.description,
            categoryName: categoryName,
            rate: 0,
            discount: discount ? ((new Date(discount.endDate).valueOf() > Date.now()) ? discount.percent * 100 : null) : null,
            oldPrice: product.price,
            newPrice: product.price,
            startDate: discount ? discount.startDate: null,
            endDate: discount ? discount.endDate : null
        };

        productCard.rate =
            rating.totalRating !== 0
                ? parseInt((rating.totalStar / rating.totalRating).toFixed(1))
                : 0;
        productCard.newPrice = discount
            ? product.price * (1 - discount.percent)
            : product.price;

        return productCard;
    });

    let listAfterSort = [];
    switch (filter) {
        case "popularity":
            listAfterSort = [...Sort.sortProductsByKeyDesc(productsList, "rate")];
            break;
        case "price-asc":
            listAfterSort = [...Sort.sortProductsByKeyAsc(productsList, "price")];
            break;
        case "price-desc":
            listAfterSort = [...Sort.sortProductsByKeyDesc(productsList, "price")];
            break;
        case "alphabet-asc":
            listAfterSort = [...Sort.sortProductsByKeyAsc(productsList, "name")];
            break;
        case "alphabet-desc":
            listAfterSort = [...Sort.sortProductsByKeyDesc(productsList, "name")];
            break;
        default:
            listAfterSort = [...productsList];
            break;
    }

    return (
        <div className="products">
            {listAfterSort.map((item) => (
                <ProductItem details={item} key={item.id} />
            ))}
        </div>
    );
}

export default ProductsList;
