export default {
    async loadOrders(context) {
        const response = await fetch('http://localhost:8080/order/getAll', {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            },
        });
        const responseData = await response.json();

        if (!response.ok) {
            // error
        }

        const orders = [];

        for (const key in responseData) {
            const order = {
                id: responseData[key].id,
                createdDate: responseData[key].createdDate,
                value: responseData[key].value,
                weight: responseData[key].weight,
                currency: responseData[key].currency,
                daysTillPayment: responseData[key].daysTillPayment,
                description: responseData[key].description,
                comment: responseData[key].comment,
                orderType: responseData[key].orderType,
                orderNumber: responseData[key].orderNumber,
                givenBy: responseData[key].givenBy,
                receivedBy: responseData[key].receivedBy,
                isInvoiceCreated: responseData[key].invoiceCreated,
                issuedIn: responseData[key].issuedIn,
                orderDrivers: responseData[key].orderDrivers,
                shipper: responseData[key].shipper,
                loadingInformation: responseData[key].loadingInformation,
            };
            orders.push(order);
        }
        context.commit('setOrders', orders);
    },
    async loadOrder(context, data) {
        let url = new URL('http://localhost:8080/order/getOrder');
        url.search = new URLSearchParams({
            id: data
        })

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            }
        });
        const responseData = await response.json();

        if (!response.ok) {
            // error
        }
        context.commit('setOrder', responseData);
    },
    unloadOrder(context) {
        context.commit('unloadOrder');
    },
    async addOrder(context, data) {
        const response = await fetch('http://localhost:8080/order/createOrder', {
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

        context.commit('addOrder', data);
    },
    async deleteOrder(context, data) {
        let url = new URL('http://localhost:8080/order/delete');
        url.search = new URLSearchParams({
            id: data
        })

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            }
        });

        if (!response.ok) {
            // error
        }   
    },
    async updateOrder(context, data) {
        const response = await fetch('http://localhost:8080/order/update', {
            method: 'PUT',
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("jwt"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            // error 
        }

        //context.commit('updateOrder', data);
    },
    async setOrder(context, data) {
        context.commit('setOrder', data);
    }
};