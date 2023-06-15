import axios from 'axios';

const createService = async (serviceData) => {
    try {
        const response = await axios.post('https://localhost:7196/api/Service', serviceData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { createService };