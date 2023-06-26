import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const createService = async (serviceData) => {
    try {
        const response = await axios.post('https://api20230626100239.azurewebsites.net/api/Service', serviceData);
        toast.success('Thêm dịch vụ thành công!');
        return response.data;
    } catch (error) {
        console.error(error);
        toast.error('Thêm dịch vụ không thành công! Vui lòng thử lại!');
        throw error;
    }
};

export { createService };