import { baseURL } from '../../../base-url.js';

export default {
    async loadUsers(context) {
        const response = await fetch(baseURL + '/user/getAll', {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            },
        });
        const responseData = await response.json();

        if (!response.ok) {
            // error
        }

        const users = [];

        for (const key in responseData) {
            const user = {
                id: responseData[key].id,
                name: responseData[key].name,
                surname: responseData[key].surname,
                email: responseData[key].email,
                login: responseData[key].login
            };
            users.push(user);
        }
        context.commit('setUsers', users);
    },
    async loadUser(context, data) {
        let url = new URL(baseURL + '/user/getUser');
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
        context.commit('setUser', responseData);
    },
    async addUser(context, data) {
        const response = await fetch(baseURL + '/user/register', {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("jwt"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            alert("Nie dodano użytkownika")
        }

        context.commit('addUser', data);
    },
    async deleteUser(context, data) {
        let url = new URL(baseURL + '/user/deleteUser');
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
    async setUser(context, data) {
        context.commit('setUser', data);
    }
}