import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const updateProductStatus = async (id, status) => {
    try {
        const response = await axios.put(`https://api20230626100239.azurewebsites.net/api/Product/updateStatus/${status}?id=${id}`);
        toast.success('Cập nhật thành công!');
        return response.data;
    } catch (error) {
        console.error(error);
        toast.error('Cập nhật không thành công! Vui lòng thử lại!');
        throw error;
    }
};

export { updateProductStatus };