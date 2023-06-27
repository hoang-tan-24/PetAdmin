import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const updateShopStatus = async (id, status) => {
    try {
        const promise = await axios.put(`https://petuni-api.azurewebsites.net/api/Shop/updateStatus?id=${id}&status=${status}`);
        toast.promise(
            promise,
            {
                pending: 'Đang chỉnh sửa cửa hàng...',
                success: 'Chỉnh sửa cửa hàng thành công!',
                error: 'Chỉnh sửa cửa hàng không thành công! Vui lòng thử lại!',
            },
            { toastId: 'updateShopStatusToast' }
        );

        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        // toast.error('Cập nhật không thành công! Vui lòng thử lại!');
        throw error;
    }
};

export { updateShopStatus };