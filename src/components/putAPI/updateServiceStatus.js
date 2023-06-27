import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const updateServiceStatus = async (id, status) => {
    try {
        const promise = await axios.put(`https://petuni-api.azurewebsites.net/api/Service/updateStatus/${id}?status=${status}`);
        toast.promise(
            promise,
            {
                pending: 'Đang chỉnh sửa dịch vụ...',
                success: 'Chỉnh sửa dịch vụ thành công!',
                error: 'Chỉnh sửa dịch vụ không thành công! Vui lòng thử lại!',
            },
            { toastId: 'updateServiceStatusToast' }
        );

        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        // toast.error('Cập nhật không thành công! Vui lòng thử lại!');
        throw error;
    }
};

export { updateServiceStatus };