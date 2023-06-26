import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const updateUserStatus = async (id, status) => {
    try {
        const response = await axios.put(`https://api20230626100239.azurewebsites.net/api/User/updateStatus?id=${id}&status=${status}`);
        toast.success('Cập nhật thành công!');
        return response.data;
    } catch (error) {
        console.error(error);
        toast.error('Cập nhật không thành công! Vui lòng thử lại!');
        throw error;
    }
};

export { updateUserStatus };