export default {
    async loadCompanies(context) {
        const response = await fetch('http://localhost:8080/company/getAll', {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            },
        });
        const responseData = await response.json();

        if (!response.ok) {
            // error
        }

        const companies = [];
        for (const key in responseData) {
            const company = {
                id: responseData[key].id,
                companyName: responseData[key].companyName,
                nip: responseData[key].nip,
                regon: responseData[key].regon,
                email: responseData[key].email,
                address: responseData[key].address,
                phoneNumbers: responseData[key].phoneNumbers,
                bankAccounts: responseData[key].bankAccounts,
                mainCompany: responseData[key].mainCompany
            };
            companies.push(company);
        }

        context.commit('setCompanies', companies);
    },
    async loadCompany(context, data) {
        let url = new URL('http://localhost:8080/company/getCompany');
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
        context.commit('setCompany', responseData);
    },
    unloadCompany(context) {
        context.commit('unloadCompany');
    },
    async addCompany(context, data) {
        const response = await fetch('http://localhost:8080/company/create', {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("jwt"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            alert("Nie dodano firmy")
        }

        context.commit('addCompany', data);
    },
    async updateCompany(context, data) {
        const response = await fetch('http://localhost:8080/company/update', {
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

        context.commit('updateCompany', data);
    },
    async deleteCompany(context, data) {
        let url = new URL('http://localhost:8080/company/deleteCompany');
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
    async setCompany(context, data) {
        context.commit('setCompany', data);
    }
};