import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const createPet = async (createData) => {
    try {
        const response = await axios.post('https://localhost:7196/api/Pet', createData);
        toast.success('Thêm thú cưng thành công!');
        return response.data;
    } catch (error) {
        console.error(error);
        toast.error('Thêm thú cưng không thành công! Vui lòng thử lại!');
        throw error;
    }
};

export { createPet };