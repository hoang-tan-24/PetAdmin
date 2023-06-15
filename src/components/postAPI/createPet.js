import axios from 'axios';

const createPet = async (createData) => {
    try {
        const response = await axios.post('https://localhost:7196/api/Pet', createData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { createPet };