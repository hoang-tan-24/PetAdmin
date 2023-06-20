import axios from 'axios';

const updateOrderStatus = async (id, status) => {
    try {
        const response = await axios.put(`https://localhost:7196/api/Order/updateStatus/${id}?status=${status}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { updateOrderStatus };