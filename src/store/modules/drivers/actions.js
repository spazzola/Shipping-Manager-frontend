export default {
    async loadDrivers(context) {
        const response = await fetch('http://localhost:8080/driver/getAll', {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            },
        });
        const responseData = await response.json();

        if (!response.ok) {
            // error
        }

        const drivers = [];

        for (const key in responseData) {
            const driver = {
                id: responseData[key].id,
                name: responseData[key].name,
                surname: responseData[key].surname,
                plates: responseData[key].plates,
                phoneNumbers: responseData[key].phoneNumbers,
            };
            drivers.push(driver);
        }
        context.commit('setDrivers', drivers);
    },
    async loadDriver(context, data) {
        let url = new URL('http://localhost:8080/driver/getDriver');
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
        context.commit('setDriver', responseData);
    },
    unloadDriver(context) {
        context.commit('unloadDriver');
    },
    async addDriver(context, data) {
        const response = await fetch('http://localhost:8080/driver/create', {
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

        context.commit('addDriver', data);
    },
    async deleteDriver(context, data) {
        let url = new URL('http://localhost:8080/driver/deleteDriver');
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
    async updateDriver(context, data) {
        const response = await fetch('http://localhost:8080/driver/update', {
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
        context.commit('updateDriver', data);
    },
    async setDriver(context, data) {
        context.commit('setDriver', data);
    }
}