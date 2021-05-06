export default {
    async deleteProducts(context, data) {
        const response = await fetch('http://localhost:8080/product/deleteProducts', {
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