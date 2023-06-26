import axios from 'axios';

const updateOrderStatus = async (id, status) => {
    try {
        const response = await axios.put(`https://api20230626100239.azurewebsites.net/api/Order/updateStatus/${id}?status=${status}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { updateOrderStatus };