import { baseURL } from '../../../base-url.js';

export default {
    async loadOrders(context, data) {
        let url = new URL(baseURL + '/order/getMonthOrders');
        url.search = new URLSearchParams({
            month: data.month,
            year: data.year
        })

        const response = await fetch(url, {
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
        let url = new URL(baseURL + '/order/getOrder');
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
        const response = await fetch(baseURL + '/order/createOrder', {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("jwt"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            alert("Nie dodano zamówienia");
        }

        context.commit('addOrder', data);
    },
    async deleteOrder(context, data) {
        let url = new URL(baseURL + '/order/delete');
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
        const response = await fetch(baseURL + '/order/update', {
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
    },
    async createPdf(context, data) {
        let url = new URL(baseURL + '/order/createPdf');
        url.search = new URLSearchParams({
            id: data
        })

        await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("jwt"),
                'Accept': 'application/octet-stream'
            },
        }).then((res) => res.arrayBuffer())
            .then(data => {
                var base64Str = Buffer.from(data).toString('base64');

                var binaryString = window.atob(base64Str);
                var binaryLen = binaryString.length;
                var bytes = new Uint8Array(binaryLen);
                for (var i = 0; i < binaryLen; i++) {
                    var ascii = binaryString.charCodeAt(i);
                    bytes[i] = ascii;
                }
                var arrBuffer = bytes;

                var newBlob = new Blob([arrBuffer], { type: "application/pdf" });

                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(newBlob);
                    return;
                }

                data = window.URL.createObjectURL(newBlob);

                var link = document.createElement('a');
                document.body.appendChild(link);
                link.href = data;
                link.download = "Zlecenie.pdf";
                link.click();
                window.URL.revokeObjectURL(data);
                link.remove();
            })
    }
};