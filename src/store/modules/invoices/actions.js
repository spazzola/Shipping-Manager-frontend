export default {
    async createInvoiceToOrder(context, data) {
        const response = await fetch('http://localhost:8080/invoice/createInvoiceToOrder', {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("jwt"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            // error 
        }

        context.commit('addInvoice', data);
    },
}