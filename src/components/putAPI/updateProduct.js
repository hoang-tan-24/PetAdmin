import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const updateProduct = async (id, productData) => {
    try {
        const response = await axios.put(`https://localhost:7196/api/Product/${id}`, productData);
        toast.success('Chỉnh sửa sản phẩm thành công!');
        return response.data;
    } catch (error) {
        console.error(error);
        toast.error('Chỉnh sửa sản phẩm không thành công! Vui lòng thử lại!');
        throw error;
    }
};

export { updateProduct };