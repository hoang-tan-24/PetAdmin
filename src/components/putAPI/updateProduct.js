import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const updateProduct = async (id, productData) => {
    try {
        // const response = await axios.put(`https://api20230626100239.azurewebsites.net/api/Product/${id}`, productData);
        // toast.success('Chỉnh sửa sản phẩm thành công!');
        // return response.data;
        const promise = axios.put(
            `https://api20230626100239.azurewebsites.net/api/Product/${id}`,
            productData
        );

        toast.promise(
            promise,
            {
                pending: 'Đang chỉnh sửa sản phẩm...',
                success: 'Chỉnh sửa sản phẩm thành công!',
                error: 'Chỉnh sửa sản phẩm không thành công! Vui lòng thử lại!',
            },
            { toastId: 'updateProductToast' }
        );

        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        // toast.error('Chỉnh sửa sản phẩm không thành công! Vui lòng thử lại!');
        throw error;
    }
};

export { updateProduct };