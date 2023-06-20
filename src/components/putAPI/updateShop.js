import axios from 'axios';

const updateShop = async (id, updateData) => {
    try {
        const response = await axios.put(`https://localhost:7196/api/Shop/update?id=${id}`, updateData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { updateShop };