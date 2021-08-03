const MAX_PRODUCTS_PER_PAGE = 9;

const UserRole = {
    ADMIN: 1,
    EMPLOYEE: 2,
    CUSTOMER: 3
}
Object.freeze(UserRole)

const OrderStatus = {
    PENDING: 0,
    ACCEPTED: 1,
    DENIED: 2,
    DONE: 3,
    CANCEL: 4,
    DELIVERY: 5
}
Object.freeze(OrderStatus)

export { MAX_PRODUCTS_PER_PAGE, UserRole, OrderStatus };