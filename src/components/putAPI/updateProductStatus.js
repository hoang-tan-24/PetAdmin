import axios from 'axios';

const updateProductStatus = async (id, status) => {
    try {
        const response = await axios.put(`https://localhost:7196/api/Product/updateStatus/${status}?id=${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { updateProductStatus };