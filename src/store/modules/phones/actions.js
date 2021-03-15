export default {
    async deletePhoneNumbers(context, data) {
        const response = await fetch('http://localhost:8080/phoneNumber/deletePhoneNumbers', {
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