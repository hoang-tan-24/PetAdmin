import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const updateUserStatus = async (id, status) => {
    try {
        const promise = await axios.put(`https://petuni-api.azurewebsites.net/api/User/updateStatus?id=${id}&status=${status}`);
        toast.promise(
            promise,
            {
                pending: 'Đang chỉnh sửa người dùng...',
                success: 'Chỉnh sửa người dùng thành công!',
                error: 'Chỉnh sửa người dùng không thành công! Vui lòng thử lại!',
            },
            { toastId: 'updateUserStatusToast' }
        );

        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        // toast.error('Cập nhật không thành công! Vui lòng thử lại!');
        throw error;
    }
};

export { updateUserStatus };