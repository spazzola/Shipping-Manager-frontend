export default {
    setInvoices(state, payload) {
        state.invoices = payload;
    },
    setInvoice(state, payload) {
        state.invoice = payload;
    },
    addInvoice(state, payload) {
        state.invoices.push(payload);
    }
}