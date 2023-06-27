import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const createProduct = async (productData) => {
    try {
        const promise = await axios.post('https://petuni-api.azurewebsites.net/api/Product', productData);
        toast.promise(
            promise,
            {
                pending: 'Đang thêm sản phẩm...',
                success: 'Thêm sản phẩm thành công!',
                error: 'Thêm sản phẩm không thành công! Vui lòng thử lại!',
            },
            { toastId: 'createProductToast' }
        );

        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        // toast.error('Thêm sản phẩm không thành công! Vui lòng thử lại!');
        throw error;
    }
};

export { createProduct };