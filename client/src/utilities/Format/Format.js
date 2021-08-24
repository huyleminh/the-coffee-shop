export default class Format {
    static formatPriceWithVND = (price) => {
        const tokens = []
        const priceString = Math.round(price).toString()
        let start = priceString.length
        const count = 3

        while (start > 0) {
            tokens.push(priceString.substring(start - count, start))
            start -= count
        }

        return tokens.reverse().join(".")
    }
}
