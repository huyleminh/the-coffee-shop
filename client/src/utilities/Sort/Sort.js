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

    static sortOrderssByStatus = (records, status = -1) => {
        if (records.length === 0 || records.length === 1 || status === -1) return records;

        const clone = JSON.parse(JSON.stringify(records));
        let result = [];

        for (let i = 0; i < clone.length; ++i) {
            if (clone[i].status === status) result.push(clone[i]);
        }

        for (let i = 0; i < clone.length; ++i) {
            if (clone[i].status !== status) result.push(clone[i]);
        }

        return result;
    };
}

export default Sort;
