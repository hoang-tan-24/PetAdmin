import axios from 'axios';

const updatePet = async (id, updateData) => {
    try {
        const response = await axios.put(`https://localhost:7196/api/Pet/${id}`, updateData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { updatePet };