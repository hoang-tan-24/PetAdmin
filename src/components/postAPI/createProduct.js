import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const createProduct = async (productData) => {
    try {
        const response = await axios.post('https://localhost:7196/api/Product', productData);
        toast.success('Thêm sản phẩm thành công!');
        return response.data;
    } catch (error) {
        console.error(error);
        toast.error('Thêm sản phẩm không thành công! Vui lòng thử lại!');
        throw error;
    }
};

export { createProduct };