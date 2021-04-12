export default {
    setInvoices(state, payload) {
        state.invoices = payload;
    },
    addInvoice(state, payload) {
        state.invoices.push(payload);
    }
}