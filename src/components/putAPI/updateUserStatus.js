import axios from 'axios';

const updateUserStatus = async (id, status) => {
    try {
        const response = await axios.put(`https://localhost:7196/api/User/updateStatus?id=${id}&status=${status}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }   
};

export { updateUserStatus };