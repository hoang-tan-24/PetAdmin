import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const updateShop = async (id, updateData) => {
    try {
        const response = await axios.put(`https://localhost:7196/api/Shop/update?id=${id}`, updateData);
        toast.success('Chỉnh sửa cửa hàng thành công!');
        return response.data;
    } catch (error) {
        console.error(error);
        toast.error('Chỉnh sửa cửa hàng không thành công! Vui lòng thử lại!');
        throw error;
    }
};

export { updateShop };