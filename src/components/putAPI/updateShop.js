import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const updateShop = async (id, updateData) => {
    try {
        const promise = await axios.put(`https://petuni-api.azurewebsites.net/api/Shop/update?id=${id}`, updateData);
        toast.promise(
            promise,
            {
                pending: 'Đang chỉnh sửa cửa hàng...',
                success: 'Chỉnh sửa cửa hàng thành công!',
                error: 'Chỉnh sửa cửa hàng không thành công! Vui lòng thử lại!',
            },
            { toastId: 'updateShopToast' }
        );

        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        // toast.error('Chỉnh sửa cửa hàng không thành công! Vui lòng thử lại!');
        throw error;
    }
};

export { updateShop };