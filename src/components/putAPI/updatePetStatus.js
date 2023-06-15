import axios from 'axios';

const updatePetStatus = async (id, status) => {
    try {
        const response = await axios.put(`https://localhost:7196/api/Pet/updateStatus/${status}?id=${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { updatePetStatus };