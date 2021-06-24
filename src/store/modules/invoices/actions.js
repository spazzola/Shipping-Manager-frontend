import { baseURL } from '../../../base-url.js';

export default {
    async loadInvoices(context) {
        const response = await fetch(baseURL + '/invoice/getAll', {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            },
        });
        const responseData = await response.json();

        if (!response.ok) {
            // error
        }

        const invoices = [];

        for (const key in responseData) {
            const invoice = {
                id: responseData[key].id,
                invoiceNumber: responseData[key].invoiceNumber,
                issuedIn: responseData[key].issuedIn,
                paymentMethod: responseData[key].paymentMethod,
                currency: responseData[key].currency,
                issuedDate: responseData[key].issuedDate,
                daysTillPayment: responseData[key].daysTillPayment,
                valueWithTax: responseData[key].valueWithTax,
                valueWithoutTax: responseData[key].valueWithoutTax,
                paidAmount: responseData[key].paidAmount,
                amountToPay: responseData[key].amountToPay,
                issuedBy: responseData[key].issuedBy,
                receivedBy: responseData[key].receivedBy,
                products: responseData[key].products,
                paid: responseData[key].paid
            };

            invoices.push(invoice);
        }

        context.commit('setInvoices', invoices);
    },
    async loadInvoice(context, data) {
        let url = new URL(baseURL + '/invoice/getInvoice');
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
        context.commit('setInvoice', responseData);
    },
    async addInvoice(context, data) {
        const response = await fetch(baseURL + '/invoice/createInvoice', {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("jwt"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            alert("Nie dodano faktury") 
        }

        context.commit('addInvoice', data);
    },
    async createInvoiceToOrder(context, data) {
        const response = await fetch(baseURL + '/invoice/createInvoiceToOrder', {
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
    async createPdf(context, data) {
        let url = new URL(baseURL + '/invoice/createPdf');
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
                link.download = "Faktura.pdf";
                link.click();
                window.URL.revokeObjectURL(data);
                link.remove();
            })
    },
    async payForInvoice(context, data) {
        let url = new URL(baseURL + '/invoice/payForInvoice');
        url.search = new URLSearchParams({
            id: data
        })

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            }
        });

        if (!response.ok) {
            // error
        }   
    },
    async deleteInvoice(context, data) {
        let url = new URL(baseURL + '/invoice/delete');
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
    async updateInvoice(context, data) {
        const response = await fetch(baseURL + '/invoice/update', {
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
    },
    async setInvoice(context, data) {
        context.commit('setInvoice', data);
    }
}