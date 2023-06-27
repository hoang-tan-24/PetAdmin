import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const updateProductStatus = async (id, status) => {
    try {
        const promise = await axios.put(`https://petuni-api.azurewebsites.net/api/Product/updateStatus/${status}?id=${id}`);
        toast.promise(
            promise,
            {
                pending: 'Đang chỉnh sửa sản phẩm...',
                success: 'Chỉnh sửa sản phẩm thành công!',
                error: 'Chỉnh sửa sản phẩm không thành công! Vui lòng thử lại!',
            },
            { toastId: 'updateProductStatusToast' }
        );

        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        // toast.error('Cập nhật không thành công! Vui lòng thử lại!');
        throw error;
    }
};

export { updateProductStatus };