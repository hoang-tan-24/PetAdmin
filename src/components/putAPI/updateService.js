import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const updateService = async (id, serviceData) => {
    try {
        const response = await axios.put(`https://api20230626100239.azurewebsites.net/api/Service/${id}`, serviceData);
        toast.success('Chỉnh sửa dịch vụ thành công!');
        return response.data;
    } catch (error) {
        console.error(error);
        toast.error('Chỉnh sửa dịch vụ không thành công! Vui lòng thử lại!');
        throw error;
    }
};

export { updateService };