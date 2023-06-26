import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const updatePetStatus = async (id, status) => {
    try {
        const promise = await axios.put(`https://petuni-api.azurewebsites.net/api/Pet/updateStatus/${status}?id=${id}`);
        toast.promise(
            promise,
            {
                pending: 'Đang chỉnh sửa thú cưng...',
                success: 'Chỉnh sửa thú cưng thành công!',
                error: 'Chỉnh sửa thú cưng không thành công! Vui lòng thử lại!',
            },
            { toastId: 'updatePetStatusToast' }
        );

        const response = await promise;
        return response.data;
    } catch (error) {
        console.error(error);
        // toast.error('Cập nhật không thành công! Vui lòng thử lại!');
        throw error;
    }
};

export { updatePetStatus };