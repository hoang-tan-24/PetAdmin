import axios from 'axios';

const updateShopStatus = async (id, status) => {
    try {
        const response = await axios.put(`https://localhost:7196/api/Shop/updateStatus?id=${id}&status=${status}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }   
};

export { updateShopStatus };