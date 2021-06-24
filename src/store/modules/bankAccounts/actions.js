import { baseURL } from '../../../base-url.js';

export default {
    async deleteBankAccounts(context, data) {
        const response = await fetch(baseURL + '/bankAccount/deleteBankAccounts', {
            method: 'DELETE',
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("jwt"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            // error
        }
        
    }
};