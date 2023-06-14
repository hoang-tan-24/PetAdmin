import axios from 'axios';

const updateProduct = async (id, productData) => {
    try {
        const response = await axios.put(`https://localhost:7196/api/Product/${id}`, productData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { updateProduct };