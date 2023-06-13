import axios from 'axios';

const createProduct = async (productData) => {
    try {
        const response = await axios.post('https://localhost:7196/api/Product', productData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { createProduct };