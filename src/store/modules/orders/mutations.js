export default {
    setOrders(state, payload) {
        state.orders = payload;
    },
    setOrder(state, payload) {
        state.order = payload;
    },
    addOrder(state, payload) {
        state.orders.push(payload)
    },
    updateOrder(state, payload) {
        state.orders.push(payload)
    },
    unloadOrder(state) {
        state.order = null;
    }
};