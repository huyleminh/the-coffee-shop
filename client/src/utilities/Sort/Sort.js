class Sort {
    static sortProductsByKeyAsc = (products, key) => {
        if (products.length === 0 || products.length === 1) return products;

        const clone = JSON.parse(JSON.stringify(products));

        for (let i = 0; i < clone.length - 1; ++i) {
            for (let j = i + 1; j < clone.length; ++j) {
                if (key === "price") key = clone[i].discount ? "newPrice" : "oldPrice";
                if (clone[i][key] > clone[j][key]) [clone[i], clone[j]] = [clone[j], clone[i]];
            }
        }

        return clone;
    };

    static sortProductsByKeyDesc = (products, key) => {
        if (products.length === 0 || products.length === 1) return products;

        const clone = JSON.parse(JSON.stringify(products));

        for (let i = 0; i < clone.length - 1; ++i) {
            for (let j = i + 1; j < clone.length; ++j) {
                if (key === "price") key = clone[i].discount ? "newPrice" : "oldPrice";
                if (clone[i][key] < clone[j][key]) [clone[i], clone[j]] = [clone[j], clone[i]];
            }
        }

        return clone;
    };
}

export default Sort;
