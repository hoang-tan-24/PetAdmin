import axios from 'axios';

const adminLogin = async (username, password) => {
    try {
        const response = await axios.post(`https://localhost:7196/api/SystemAdmin?username=${username}&password=${password}`);
        const data = response.data;
        // console.log(data);
        if (data != null)
            localStorage.setItem('admin', JSON.stringify(data));
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { adminLogin };