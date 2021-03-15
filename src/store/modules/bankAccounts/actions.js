export default {
    async deleteBankAccounts(context, data) {
        const response = await fetch('http://localhost:8080/bankAccount/deleteBankAccounts', {
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