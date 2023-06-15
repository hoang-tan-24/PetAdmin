import axios from 'axios';

const updateService = async (id, serviceData) => {
    try {
        const response = await axios.put(`https://localhost:7196/api/Service/${id}`, serviceData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { updateService };